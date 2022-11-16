package main

import (
	"fmt"
	"net/http"

	"github.com/GlaDom/nats-ui/internal/app"
	"github.com/gin-gonic/gin"
	"github.com/nats-io/nats.go"
)

func main() {
	state := app.NewApp()

	router := gin.Default()

	router.POST("/run", func(c *gin.Context) {
		//start back end after validating server connection
		server := app.NatsServer{}
		if err := c.BindJSON(&server); err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			return
		}

		nc, err := nats.Connect(fmt.Sprintf("nats://%s:%s", server.Host, server.Name))
		if err != nil {
			c.AbortWithError(http.StatusInternalServerError, fmt.Errorf("failed to connect to nats-server"))
			return
		}
		defer nc.Close()
		//fmt.Println(server)
		c.IndentedJSON(200, server)
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
