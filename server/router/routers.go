package router

import (
	"YuqueBlogServer/pkg/app"
	"YuqueBlogServer/pkg/e"
	v1 "YuqueBlogServer/router/v1"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Test struct {
	data string
}

func test(c *gin.Context) {
	appG := app.Gin{C: c}

	appG.Response(http.StatusOK, e.SUCCESS, Test{
		data: "It's ok",
	})
}

func InitRouters() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	// GET
	r.GET("/test", test)
	r.GET("/user", v1.GetUser)
	r.GET("/repo", v1.GetRepo)
	r.GET("/repoDocs", v1.GetDocListBySlug)
	r.GET("/blog", v1.BlogInfo)

	return r
}