package myyu

import "github.com/wujiyu115/yuqueg"

var yuConfig = YuqueConfig{}
var yu = &yuqueg.Service{}

func Init()  {
	yuConfig = getConfig()
	yu = yuqueg.NewService(getConfig().Token)
}
