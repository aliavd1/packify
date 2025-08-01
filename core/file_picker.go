package core

import (
	"packify/config"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type FilePicker struct {
	appConfig *config.AppConfig
}

func NewFilePicker(appConfig *config.AppConfig) *FilePicker {
	return &FilePicker{appConfig: appConfig}
}

func (filePicker *FilePicker) OpenSingleFile(title, displayName, pattern string) string {
	filePath, err := runtime.OpenFileDialog(filePicker.appConfig.Ctx, runtime.OpenDialogOptions{
		Title:                title,
		CanCreateDirectories: true,
		Filters: []runtime.FileFilter{
			{
				DisplayName: displayName,
				Pattern:     pattern,
			},
		},
	})
	if err != nil {
		return "Error: " + err.Error()
	}
	return filePath
}

func (filePicker *FilePicker) OpenMultiFile(title, displayName, pattern string) []string {
	filesPath, err := runtime.OpenMultipleFilesDialog(filePicker.appConfig.Ctx, runtime.OpenDialogOptions{
		Title:                title,
		CanCreateDirectories: true,
		Filters: []runtime.FileFilter{
			{
				DisplayName: displayName,
				Pattern:     pattern,
			},
		},
	})
	if err != nil {
		return []string{"Error: " + err.Error()}
	}

	return filesPath
}
