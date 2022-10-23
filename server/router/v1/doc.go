package v1

import (
	"YuqueBlogServer/pkg/app"
	"YuqueBlogServer/pkg/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetDocListBySlug(c *gin.Context)  {
	appG := app.Gin{C: c}
	slug := c.Param("slug")

	if slug == "" {
		appG.Response(http.StatusInternalServerError, http.StatusInternalServerError, "slug is required")
		return
	}

	docList, err := service.GetDocListBySlug(slug)

	if err != nil {
		appG.Response(http.StatusInternalServerError, http.StatusInternalServerError, err)
		return
	}

	appG.Response(http.StatusOK, http.StatusOK, docList)
}

func GetAllDoc(c *gin.Context) {
	appG := app.Gin{C: c}
	repos, err := service.GetAllDoc()
	if err != nil {
		appG.Response(http.StatusInternalServerError, http.StatusInternalServerError, "get failed")
	}

	appG.Response(http.StatusOK, http.StatusOK, repos)
}

func GetAllDocsGroupByRepo(c *gin.Context) {
	appG := app.Gin{C: c}
	allDoc, err := service.GetAllDocsGroupByRepo()

	if err != nil {
		appG.Response(http.StatusInternalServerError, http.StatusInternalServerError, "group failed")
	}

	appG.Response(http.StatusOK, http.StatusOK, allDoc)
}

func GetDoc(c *gin.Context)  {
	appG := app.Gin{C:c}
	repoSlug := appG.C.Query("repo")
	slug := c.Param("slug")

	ret, err := service.GetDocDetailBySlug(repoSlug, slug)
	if err != nil {
		appG.Response(http.StatusInternalServerError, http.StatusInternalServerError, err)
		return
	}

	appG.Response(http.StatusOK, http.StatusOK, ret)
}
