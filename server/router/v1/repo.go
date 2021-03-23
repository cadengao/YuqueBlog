package v1

import (
	"YuqueBlogServer/pkg/app"
	"YuqueBlogServer/pkg/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

//


func GetRepo(c *gin.Context)  {
	appG := app.Gin{C:c}

	ret, err := service.GetPublicRepos()
	if err != nil {
		appG.Response(http.StatusInternalServerError, http.StatusInternalServerError, err)
		return
	}

	appG.Response(http.StatusOK, http.StatusOK, ret)
}