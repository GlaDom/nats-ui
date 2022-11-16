package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// state := app.NewApp()

	router := gin.Default()

	router.POST("/run", func(c *gin.Context) {
		//start back end after validating server connection

		c.IndentedJSON(200, gin.H{
			"message": "pong",
		})
	})

	router.POST("/api/state/server/new", func(ctx *gin.Context) {})
	router.DELETE("/api/state/server/delete/{index}", func(ctx *gin.Context) {})

	router.POST("/api/state/client/new", func(ctx *gin.Context) {})
	router.DELETE("/api/state/client/delete/{index}", func(ctx *gin.Context) {})

	router.GET("/state", func(c *gin.Context) {

	})

	router.Run()
}
