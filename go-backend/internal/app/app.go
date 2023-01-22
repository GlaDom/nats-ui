package app

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/nats-io/nats.go"
)

type App struct {
	Mu         sync.Mutex
	wsupgrader websocket.Upgrader
	Servers    []NatsServer
	Clients    []Client
}

func NewApp() *App {
	upgrader := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     func(r *http.Request) bool { return true },
	}
	return &App{
		wsupgrader: upgrader,
	}
}

func (a *App) UpdateVarz(s NatsServer) (*Varz, error) {
	newVarz, err := a.getVarz(s)
	if err != nil {
		return nil, err
	}
	// fmt.Println(newVarz)
	return &newVarz, nil
}

func (a *App) getVarz(s NatsServer) (Varz, error) {
	var retval Varz
	httpClient := http.Client{}

	req, err := http.NewRequest("GET", fmt.Sprintf("http://%s:%v/varz", s.Host, s.MonitoringPort), nil)
	if err != nil {
		return Varz{}, fmt.Errorf("failed to create request for endpoint /varz, err: %s", err)
	}

	res, err := httpClient.Do(req)
	if err != nil {
		return Varz{}, fmt.Errorf("failed to execute request for endpoint /varz, err: %s", err)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return Varz{}, fmt.Errorf("failed to read body, err: %s", err)
	}

	if err := json.Unmarshal(body, &retval); err != nil {
		return Varz{}, err
	}

	return retval, nil
}

func (a *App) Wshandler(w http.ResponseWriter, r *http.Request, nc *nats.Conn) {
	conn, err := a.wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("Failed to set websocket upgrade: %s", err)
		return
	}

	ch := make(chan *nats.Msg, 64)
	sub, err := nc.ChanSubscribe(">", ch)
	if err != nil {
		fmt.Print(err)
	}
	defer sub.Unsubscribe()

	for {
		natsmsg := <-ch
		var newMsg Message
		if strings.Contains(natsmsg.Subject, "$SYS.") || strings.Contains(natsmsg.Subject, "$JS.") {
			newMsg = Message{
				Timestamp: time.Now().Format("2006-01-02T15:04:05Z07:00"),
				Type:      "info",
				Subject:   natsmsg.Subject,
				Message:   string(natsmsg.Data),
			}
		} else {
			newMsg = Message{
				Timestamp: time.Now().Format("2006-01-02T15:04:05Z07:00"),
				Type:      "message",
				Subject:   natsmsg.Subject,
				Message:   string(natsmsg.Data),
			}
		}
		data, _ := json.Marshal(newMsg)
		conn.WriteMessage(1, data)
	}
}
