package main

import (
	"embed"
	"packify/config"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	appConfig := config.NewAppConfig()

	err := wails.Run(&options.App{
		Title:  appConfig.Info.Title,
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup:        appConfig.Startup,
		Bind: []interface{}{
			appConfig,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
