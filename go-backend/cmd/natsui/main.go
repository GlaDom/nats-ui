package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// var s *app.App

	router := gin.Default()

	router.POST("/run", func(c *gin.Context) {
		c.IndentedJSON(200, gin.H{
			"message": "pong",
		})
	})

	router.Run()
}
