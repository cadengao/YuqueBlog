package myyu

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"path/filepath"
)

type YuqueConfig struct {
	Token string `json:"token"`
	User string `json:"user"`
}
func getConfig() (result YuqueConfig) {

	configPath := filepath.Join("pkg", "myyu", "conf.json")
	bytes, err := ioutil.ReadFile(configPath)

	if err != nil {
		log.Fatalln("读取文件失败", err)
		return
	}

	err = json.Unmarshal(bytes, &result)

	if err != nil {
		log.Fatalln("解析数据失败", err)
		return
	}

	return result
}