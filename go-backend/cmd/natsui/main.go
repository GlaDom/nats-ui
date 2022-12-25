package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/GlaDom/nats-ui/internal/app"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/nats-io/nats.go"
)

func main() {
	state := app.NewApp()

	go func() {
		for {
			state.Run()
			time.Sleep(time.Second * 4)
		}
	}()

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:4200"},
		AllowMethods: []string{"GET", "POST"},
	}))

	router.POST("/run", func(c *gin.Context) {

	})

	router.GET("/api/state/server/status", func(ctx *gin.Context) {
		retval := app.NatsServer{}
		serverHost, ok := ctx.GetQuery("hostname")
		if !ok {
			ctx.AbortWithError(http.StatusBadRequest, fmt.Errorf("no hostname provided"))
			return
		}

		monitoringPort, ok := ctx.GetQuery("monitoringPort")
		if !ok {
			ctx.AbortWithError(http.StatusBadRequest, fmt.Errorf("no monitoringPort provided"))
			return
		}

		httpClient := http.Client{}
		req, err := http.NewRequest("GET", fmt.Sprintf("http://%s:%v/varz", serverHost, monitoringPort), nil)
		if err != nil {
			err := fmt.Errorf("failed to create request for varz, err:%s", err)
			ctx.AbortWithError(http.StatusBadRequest, err)
			return
		}

		res, err := httpClient.Do(req)
		if err != nil {
			err := fmt.Errorf("failed to get for varz, err:%s", err)
			ctx.AbortWithError(http.StatusBadRequest, err)
			return
		}

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			err := fmt.Errorf("failed to get for varz, err:%s", err)
			ctx.AbortWithError(http.StatusBadRequest, err)
		}

		fmt.Print(string(body))
		if err := json.Unmarshal(body, &retval.Varz); err != nil {
			err := fmt.Errorf("failed to unmarshal response for varz, err:%s", err)
			ctx.AbortWithError(http.StatusInternalServerError, err)
			return
		}

		ctx.IndentedJSON(http.StatusOK, retval)
	})

	router.POST("/api/state/server/new", func(ctx *gin.Context) {
		server := app.NatsServer{}
		if err := ctx.BindJSON(&server); err != nil {
			ctx.AbortWithError(http.StatusBadRequest, err)
			return
		}

		nc, err := nats.Connect(fmt.Sprintf("nats://%s:%v", server.Host, server.Port))
		if err != nil {
			ctx.AbortWithError(http.StatusInternalServerError, fmt.Errorf("failed to connect to nats-server"))
			return
		}
		defer nc.Close()

		state.Servers = append(state.Servers, server)
		ctx.JSON(http.StatusAccepted, &server)
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

	router.POST("/api/state/client/new", func(ctx *gin.Context) {})
	router.DELETE("/api/state/client/delete/{index}", func(ctx *gin.Context) {})

	router.GET("/state", func(c *gin.Context) {

	})

	router.Run()
}
