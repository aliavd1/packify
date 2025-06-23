package config

import (
	"context"
)

type AppInfo struct {
	Title     string
	Company   string
	Developer string
	Email     string
	Version   string
}

func NewAppInfo() *AppInfo {
	return &AppInfo{
		Title:     "Packify",
		Company:   "AVD",
		Developer: "Ali Vatandoost",
		Email:     "alivatandoost95@gmail.com",
		Version:   "1.0",
	}
}

type AppConfig struct {
	Ctx  context.Context
	Info AppInfo
}

func NewAppConfig() *AppConfig {
	appInfo := NewAppInfo()
	return &AppConfig{
		Info: *appInfo,
	}
}

func (a *AppConfig) Startup(ctx context.Context) {
	a.Ctx = ctx
}
