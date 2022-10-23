package v1

import (
	"YuqueBlogServer/pkg/app"
	"YuqueBlogServer/pkg/myyu"
	"YuqueBlogServer/pkg/service"
	"YuqueBlogServer/pkg/setting"
	"github.com/gin-gonic/gin"
	"github.com/wujiyu115/yuqueg"
	"net/http"
)

type Info struct {
	 User yuqueg.User `json:"user"`
	 Settings setting.Blog `json:"settings"`
}
func BlogInfo(c *gin.Context)  {
	appG := app.Gin{C:c}
	ret := Info{}
	ret.Settings = service.BlogInfo()
	user, err := myyu.GetUserInfo()

	if err != nil {
		appG.Response(http.StatusInternalServerError, http.StatusInternalServerError, nil)
		return
	}
	ret.User = user
	appG.Response(http.StatusOK,http.StatusOK, ret)
}
