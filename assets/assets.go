package assets

import (
	_ "embed"
)

//go:embed appimagetool.AppImage
var AppImagetoolData []byte

const AppImagetoolPath = "appimagetool.AppImage"

//go:embed postinst
var PostinstData []byte

const PostinstPath = "postinst"
