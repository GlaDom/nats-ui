package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/GlaDom/nats-ui/internal/app"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	state := app.NewApp()

	go func(st *app.App) {
		for {
			for i, s := range st.Servers {
				newVarz, err := st.UpdateVarz(s)
				if err != nil {
					fmt.Println(err)
				}
				state.Servers[i].Varz = newVarz
			}
			fmt.Println(state.Servers)
			time.Sleep(time.Second * 5)
		}
	}(state)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:4200"},
		AllowMethods: []string{"GET", "POST"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))

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

	router.DELETE("/api/state/server/delete/:index", func(ctx *gin.Context) {
		uri := app.Uri{}
		if err := ctx.BindJSON(&uri); err != nil {
			ctx.AbortWithError(http.StatusBadRequest, err)
			return
		}

		newServers := []app.NatsServer{}
		for i := range state.Servers {
			if i != int(uri.Index) {
				newServers = append(newServers, state.Servers[i])
			}
		}

		state.Servers = newServers
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

	router.Run()
}
