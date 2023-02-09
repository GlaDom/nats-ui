package main

import (
	"fmt"
	"net/http"
	"path"
	"path/filepath"
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
			fmt.Printf("%+v", state.Servers)
			fmt.Println()
			time.Sleep(time.Second * 5)
		}
	}(state)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"POST", "HEAD", "PATCH", "OPTIONS", "GET", "PUT", "DELETE"},
		AllowHeaders: []string{"Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"},
		MaxAge:       12 * time.Hour,
	}))

	router.NoRoute(func(c *gin.Context) {
		dir, file := path.Split(c.Request.RequestURI)
		ext := filepath.Ext(file)
		if file == "" || ext == "" {
			c.File("./dist/nats-ui/index.html")
		} else {
			c.File("./dist/nats-ui/" + path.Join(dir, file))
		}
	})

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
