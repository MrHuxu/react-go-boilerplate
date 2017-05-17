package web

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

var atPrd = os.Getenv("ENV") == "Production"

func (server *Server) registerRoutes() {
	indexRoutes := server.Engine.Group("/")
	{
		indexRoutes.GET("/", func(c *gin.Context) {
			c.HTML(http.StatusOK, "index.tmpl", gin.H{
				"prd":   atPrd,
				"title": "React & Go Boilerplate",
			})
		})
	}

	testRoutes := server.Engine.Group("/test")
	{
		testRoutes.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"test": "test",
			})
		})

		testRoutes.POST("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"test": "test",
			})
		})
	}
}
