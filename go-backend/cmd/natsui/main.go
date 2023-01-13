package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/GlaDom/nats-ui/internal/app"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/nats-io/nats.go"
)

func main() {
	state := app.NewApp()

	go func(st *app.App) {
		for {
			state.Mu.Lock()
			for i, s := range st.Servers {
				newVarz, err := st.UpdateVarz(s)
				if err != nil {
					fmt.Println(err)
				}
				state.Servers[i].Varz = newVarz
			}
			state.Mu.Unlock()
			fmt.Println(state.Servers)
			time.Sleep(time.Second * 5)
		}
	}(state)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:4200"},
		AllowMethods: []string{"GET", "POST", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))

	// var wsupgrader = websocket.Upgrader{
	// 	ReadBufferSize:  1024,
	// 	WriteBufferSize: 1024,
	// }

	// wshandler := func(w http.ResponseWriter, r *http.Request, nc *nats.Conn) {
	// 	conn, err := wsupgrader.Upgrade(w, r, nil)
	// 	if err != nil {
	// 		fmt.Printf("Failed to set websocket upgrade: %s", err)
	// 		return
	// 	}

	// 	ch := make(chan *nats.Msg, 64)
	// 	sub, err := nc.ChanSubscribe("*", ch)
	// 	if err != nil {
	// 		fmt.Print(err)
	// 	}
	// 	defer sub.Unsubscribe()

	// 	for {
	// 		natsmsg := <-ch
	// 		newMsg := app.Message{
	// 			Timestamp: time.Now(),
	// 			Type:      "message",
	// 			Subject:   natsmsg.Subject,
	// 			Message:   string(natsmsg.Data),
	// 		}
	// 		data, _ := json.Marshal(newMsg)
	// 		conn.WriteMessage(1, data)
	// 	}
	// }

	router.POST("/api/state/server/new", func(ctx *gin.Context) {
		retval := app.NatsServer{}
		var err error
		if err := ctx.BindJSON(&retval); err != nil {
			ctx.AbortWithError(http.StatusBadRequest, err)
			return
		}

		if retval.Host == "" {
			ctx.AbortWithError(http.StatusBadRequest, fmt.Errorf("no hostname provided"))
			return
		}

		if retval.MonitoringPort == 0 {
			ctx.AbortWithError(http.StatusBadRequest, fmt.Errorf("no monitoringPort provided, %v", retval.MonitoringPort))
			return
		}

		retval.Varz, err = state.UpdateVarz(retval)
		if err != nil {
			ctx.AbortWithError(http.StatusInternalServerError, fmt.Errorf("failed to get varz vor server %s", retval.Host))
			return
		}
		state.Servers = append(state.Servers, retval)

		ctx.JSON(http.StatusOK, &retval)
	})

	router.DELETE("/api/state/server/delete", func(ctx *gin.Context) {
		state.Mu.Lock()
		defer state.Mu.Unlock()
		retval := app.NatsServer{}
		serverHost, ok := ctx.GetQuery("hostname")
		if !ok {
			ctx.AbortWithError(http.StatusBadRequest, fmt.Errorf("no hostname provided"))
			return
		}

		newServers := []app.NatsServer{}
		for _, s := range state.Servers {
			if s.Host != serverHost {
				newServers = append(newServers, s)
			} else {
				retval = s
			}
		}

		state.Servers = newServers
		ctx.JSON(http.StatusOK, &retval)
	})

	router.GET("api/state/server/monitoring", func(ctx *gin.Context) {
		retval := app.NatsServer{}
		serverHost, ok := ctx.GetQuery("hostname")
		if !ok {
			ctx.AbortWithError(http.StatusBadRequest, fmt.Errorf("no hostname provided"))
			return
		}
		retval.Host = serverHost
		for _, s := range state.Servers {
			if s.Host == retval.Host {
				retval = s
			}
		}
		ctx.JSON(http.StatusOK, &retval)
	})

	router.GET("api/state/client/add", func(ctx *gin.Context) {
		serverHost, ok := ctx.GetQuery("hostname")
		if !ok {
			ctx.AbortWithError(http.StatusBadRequest, fmt.Errorf("no hostname provided"))
			return
		}
		port, ok := ctx.GetQuery("port")
		if !ok {
			ctx.AbortWithError(http.StatusBadRequest, fmt.Errorf("no port provided"))
			return
		}

		nc, err := nats.Connect(fmt.Sprintf("nats://%s:%s", serverHost, port))
		if err != nil {
			ctx.AbortWithError(http.StatusConflict, fmt.Errorf("failed to connect client to nats server, err: %s", err))
			return
		}
		state.Wshandler(ctx.Writer, ctx.Request, nc)
	})

	router.Run()
}
