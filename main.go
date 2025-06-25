package main

import (
	"embed"
	"packify/config"
	"packify/core"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	appConfig := config.NewAppConfig()
	installationFileInfo := core.NewInstallationFileInfo(appConfig)

	err := wails.Run(&options.App{
		Title:  appConfig.Info.Title,
		Width:  1024,
		Height: 680,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup: appConfig.Startup,
		Bind: []interface{}{
			appConfig,
			installationFileInfo,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
