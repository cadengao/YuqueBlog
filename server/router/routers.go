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
	r.GET("/blog/info", v1.BlogInfo)

	// repo
	repo := r.Group("/repo")
	{
		repo.GET("/all", v1.GetRepo)
		repo.GET("/:slug/docs", v1.GetDocListBySlug)
	}

	// doc
	doc := r.Group("/doc")
	{
		doc.GET("/all", v1.GetAllDoc)
		doc.GET("/all/groupRepo", v1.GetAllDocsGroupByRepo)
		doc.GET("/:slug/detail", v1.GetDoc)
	}

	return r
}