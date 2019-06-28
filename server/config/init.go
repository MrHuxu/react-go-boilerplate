package config

import (
	"encoding/json"
	"os"
)

var (
	DefaultConfig = &ConfigImpl{}
	configPath    = "config/server.json"
)

func init() {
	configFile, err := os.Open(configPath)
	if err != nil {
		panic(err)
	}
	defer configFile.Close()

	jsonParser := json.NewDecoder(configFile)
	jsonParser.Decode(DefaultConfig)
}
