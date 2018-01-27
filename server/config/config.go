package config

type ConfigInterface interface {
	ServerPort() int
	ServerTemplatesPath() string
	ServerPublicPath() string
}

type ConfigStruct struct {
	Server struct {
		Port          int    `json:"port"`
		TemplatesPath string `json:"templates_path"`
		PublicPath    string `json:"public_path"`
	} `json:"server"`
}

func (cfg *ConfigStruct) ServerPort() int {
	return cfg.Server.Port
}

func (cfg *ConfigStruct) ServerTemplatesPath() string {
	return cfg.Server.TemplatesPath
}

func (cfg *ConfigStruct) ServerPublicPath() string {
	return cfg.Server.PublicPath
}
