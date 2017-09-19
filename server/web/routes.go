package web

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.tmpl", gin.H{
		"prd":   IsReleaseMode,
		"title": "React & Go Boilerplate",
	})
}

func (server *Server) RegisterRoutes() {
	indexRoutes := server.Engine.Group("/")
	{
		indexRoutes.GET("/", Index)
		indexRoutes.GET("/get", Index)
		indexRoutes.GET("/post", Index)
		indexRoutes.GET("/random", Index)
	}

	testRoutes := server.Engine.Group("/test")
	{
		testRoutes.GET("/", func(c *gin.Context) {
			var key string
			var value []string
			for rKey, rValue := range c.Request.URL.Query() {
				key = rKey
				value = rValue
			}
			fmt.Println(key, value)

			c.JSON(http.StatusOK, gin.H{
				"requestKey":   key,
				"requestValue": value,
			})
		})

		testRoutes.POST("/", func(c *gin.Context) {
			var body struct {
				Key string `json:"key"`
			}
			c.BindJSON(&body)
			fmt.Println(body)

			c.JSON(http.StatusOK, gin.H{
				"requestValue": body.Key,
			})
		})
	}
}
