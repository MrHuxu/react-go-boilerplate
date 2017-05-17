package web

import (
	"github.com/gin-gonic/gin"
	"strconv"
)

type Server struct {
	Engine *gin.Engine
	Port   int
}

func NewServer(port int, templatePath string, staticPath string) *Server {
	server := &Server{
		Engine: gin.Default(),
		Port:   port,
	}
	server.Engine.LoadHTMLGlob(templatePath)
	server.Engine.Static("/assets", staticPath)
	server.registerRoutes()
	return server
}

func (svr *Server) Run() {
	svr.Engine.Run(":" + strconv.Itoa(svr.Port))
}
