package assets

import (
	_ "embed"
)

//go:embed appimagetool.AppImage
var AppImagetoolData []byte

const AppImagetoolPath = "appimagetool.AppImage"
