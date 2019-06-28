package server

import (
	"io"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/MrHuxu/react-go-boilerplate/server/config"
)

var IsReleaseMode = os.Getenv("GIN_MODE") == "release"
var IsInsideDocker = os.Getenv("INSIDE_DOCKER") == "true"

type Server struct {
	Engine *gin.Engine
	Port   int
}

func New(cfg config.Config) *Server {
	if IsReleaseMode {
		gin.SetMode(gin.ReleaseMode)
		gin.DisableConsoleColor()
		logToFile()
	}

	server := &Server{
		Engine: gin.Default(),
		Port:   cfg.ServerPort(),
	}
	server.Engine.LoadHTMLGlob(cfg.ServerTemplatesPath())
	server.Engine.Static("/assets", cfg.ServerPublicPath())
	server.RegisterRoutes()
	return server
}

func (svr *Server) Run() {
	svr.Engine.Run(":" + strconv.Itoa(svr.Port))
}

func logToFile() {
	os.Mkdir("log", os.ModePerm)
	var file *os.File
	file, err := os.OpenFile("log/gin.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0600)
	if err != nil {
		file, _ = os.Create("log/gin.log")
	}

	if IsInsideDocker {
		gin.DefaultWriter = io.MultiWriter(os.Stdout, file)
	} else {
		gin.DefaultWriter = io.MultiWriter(file)
	}
}
