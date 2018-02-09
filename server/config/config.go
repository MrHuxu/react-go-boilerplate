package config

type Config interface {
	ServerPort() int
	ServerTemplatesPath() string
	ServerPublicPath() string
}

type ConfigImpl struct {
	Server struct {
		Port          int    `json:"port"`
		TemplatesPath string `json:"templates_path"`
		PublicPath    string `json:"public_path"`
	} `json:"server"`
}

func (cfg *ConfigImpl) ServerPort() int {
	return cfg.Server.Port
}

func (cfg *ConfigImpl) ServerTemplatesPath() string {
	return cfg.Server.TemplatesPath
}

func (cfg *ConfigImpl) ServerPublicPath() string {
	return cfg.Server.PublicPath
}
