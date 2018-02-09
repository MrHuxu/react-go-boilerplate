package main

import (
	"github.com/MrHuxu/react-go-boilerplate/server/config"
	"github.com/MrHuxu/react-go-boilerplate/server/web"
)

func main() {
	server := web.NewServer(config.GlobalConfig)
	server.Run()
}
