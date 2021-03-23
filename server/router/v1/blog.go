package v1

import (
	"YuqueBlogServer/pkg/app"
	"YuqueBlogServer/pkg/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func BlogInfo(c *gin.Context)  {
	appG := app.Gin{C:c}

	appG.Response(http.StatusOK,http.StatusOK, service.BlogInfo())
}
