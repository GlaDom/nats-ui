package app

type App struct {
	Servers NatsServer
	Clients Client
}

func NewApp() *App {
	return &App{}
}
