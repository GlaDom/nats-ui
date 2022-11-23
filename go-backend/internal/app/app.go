package app

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type App struct {
	Servers []NatsServer
	Clients []Client
}

func NewApp() *App {
	return &App{}
}

func (a *App) Run() {
	for i, s := range a.Servers {
		fmt.Println(s.Name)
		s.Varz = a.getVarz(i)
		fmt.Printf("%v", s.Varz)
	}
}

func (a *App) getVarz(index int) *Varz {
	var retval *Varz
	httpClient := http.Client{}

	req, err := http.NewRequest("GET", fmt.Sprintf("http://%s:%v/varz", a.Servers[index].Host, a.Servers[index].MonitoringPort), nil)
	if err != nil {
		fmt.Print("failed to create request for endpoint /varz", err)
	}

	res, err := httpClient.Do(req)
	if err != nil {
		fmt.Println("failed to execute request for endpoint /varz", err)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("failed to read body", err)
	}

	if err := json.Unmarshal(body, &retval); err != nil {
		fmt.Print(err)
	}

	return retval
}
