package app

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"
)

type App struct {
	Mu      sync.Mutex
	Servers []NatsServer
	Clients []Client
}

func NewApp() *App {
	return &App{}
}

func (a *App) UpdateVarz(s NatsServer) (*Varz, error) {
	newVarz, err := a.getVarz(s)
	if err != nil {
		return nil, err
	}
	fmt.Println(newVarz)
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
