package v1

import (
	"YuqueBlogServer/pkg/app"
	"YuqueBlogServer/pkg/myyu"
	"YuqueBlogServer/pkg/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetDocListBySlug(c *gin.Context)  {
	appG := app.Gin{C: c}
	slug := appG.C.Query("slug")

	if slug == "" {
		appG.Response(http.StatusInternalServerError, http.StatusInternalServerError, "slug is required")
		return
	}

	docData, err := myyu.GetDocList(slug)

	if err != nil {
		appG.Response(http.StatusInternalServerError, http.StatusInternalServerError, err)
		return
	}

	appG.Response(http.StatusOK, http.StatusOK, docData.Data)
}

func GetDoc(c *gin.Context)  {
	appG := app.Gin{C:c}
	repoSlug := appG.C.Query("repoSlug")
	slug := appG.C.Query("slug")

	ret, err := service.GetDocBySlug(repoSlug, slug)
	if err != nil {
		appG.Response(http.StatusInternalServerError, http.StatusInternalServerError, err)
		return
	}

	appG.Response(http.StatusOK, http.StatusOK, ret)
}
