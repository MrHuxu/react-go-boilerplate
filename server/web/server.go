package web

import (
	"github.com/gin-gonic/gin"
	"io"
	"os"
	"strconv"
)

type Server struct {
	Engine *gin.Engine
	Port   int
}

func NewServer(port int, templatePath string, staticPath string) *Server {
	if AtPrd {
		logToFile()
	}

	server := &Server{
		Engine: gin.Default(),
		Port:   port,
	}
	server.Engine.LoadHTMLGlob(templatePath)
	server.Engine.Static("/assets", staticPath)
	server.RegisterRoutes()
	return server
}

func (svr *Server) Run() {
	svr.Engine.Run(":" + strconv.Itoa(svr.Port))
}

func logToFile() {
	gin.SetMode(gin.ReleaseMode)
	gin.DisableConsoleColor()
	file, _ := os.Create("log/gin.log")
	gin.DefaultWriter = io.MultiWriter(file)
}
