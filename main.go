package main

import (
	"embed"
	"packify/config"
	"packify/core"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	appConfig := config.NewAppConfig()
	installationFileInfo := core.NewInstallationFileInfo(appConfig)
	filePicker := core.NewFilePicker(appConfig)

	err := wails.Run(&options.App{
		Title:  appConfig.Info.Title,
		Width:  700,
		Height: 620,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Windows: &windows.Options{
			ZoomFactor: 1.0,
		},
		Mac: &mac.Options{
			DisableZoom: true,
		},
		DragAndDrop: &options.DragAndDrop{
			EnableFileDrop: true,
		},
		OnStartup: appConfig.Startup,
		Bind: []interface{}{
			appConfig,
			installationFileInfo,
			filePicker,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
