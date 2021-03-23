package v1

import (
	"YuqueBlogServer/pkg/app"
	"YuqueBlogServer/pkg/myyu"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetUser(c *gin.Context)  {
	appG := app.Gin{C: c}
	user, err := myyu.GetUserInfo()

	if err != nil {
		appG.Response(http.StatusInternalServerError, http.StatusInternalServerError, nil)
		return
	}
	appG.Response(http.StatusOK, http.StatusOK, user)
}