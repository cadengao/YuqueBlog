package router

import (
	v1 "YuqueBlogServer/router/v1"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"time"
)

type Test struct {
	data string
}


func InitRouters() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge: 12 * time.Hour,
	}))

	// GET
	r.GET("/user", v1.GetUser)
	r.GET("/repo", v1.GetRepo)
	r.GET("/repoDocs", v1.GetDocListBySlug)
	r.GET("/allDocs", v1.GetAllDoc)
	r.GET("/docDetail", v1.GetDoc)
	r.GET("/blog", v1.BlogInfo)

	return r
}