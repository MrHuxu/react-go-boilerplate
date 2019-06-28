package main

import (
	"github.com/MrHuxu/react-go-boilerplate/server"
	"github.com/MrHuxu/react-go-boilerplate/server/config"
)

func main() {
	server := server.New(config.DefaultConfig)
	server.Run()
}
