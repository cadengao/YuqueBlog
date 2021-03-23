package main

import (
	"YuqueBlogServer/pkg/myyu"
	"YuqueBlogServer/pkg/setting"
	"YuqueBlogServer/router"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func init() {
	setting.Setup()
}

func main() {
	gin.SetMode(setting.Settings.Server.RunMode)
	myyu.Init()
	fmt.Printf("%+v", setting.Settings)
	routersInit := router.InitRouters()
	endPoint := fmt.Sprintf(":%d", setting.Settings.Server.HttpPort)
	MaxHeaderBytes := 1 << 20

	server := &http.Server{
		Addr:           endPoint,
		Handler:        routersInit,
		ReadTimeout: 	setting.Settings.Server.ReadTimeout,
		WriteTimeout: 	setting.Settings.Server.ReadTimeout,
		MaxHeaderBytes: MaxHeaderBytes,
	}

	log.Printf("[info] start http server listening %s", endPoint)

	server.ListenAndServe()
}

