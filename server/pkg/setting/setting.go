package setting

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"time"
)

type Server struct {
	RunMode string 				`json:"RunMode"`
	HttpPort int 				`json:"HttpPort"`
	ReadTimeout time.Duration 	`json:"ReadTimeout"`
	WriteTimeout time.Duration 	`json:"WriteTimeout"`
}
type FriendLink struct {
	Name string `json:"name"`
	Link string `json:"link"`
}
type SocialLink struct {
	Img string `json:"img"`
	Link string `json:"link"`
}
type Blog struct {
	Title string 			`json:"title"`
	SubTitle string 		`json:"sub_title"`
	Cover string 			`json:"cover"`
	PublicRepos string 		`json:"public_repos"`
	FriendLinks []FriendLink `json:"friend_links"`
	SocialLinks []SocialLink `json:"social_links"`
}
type Config struct {
	Server 	Server 		`json:"server"`
	Blog 	Blog 		`json:"blog"`
}

var Settings = Config{}

func Setup() {
	confPath := filepath.Join("conf", "conf.json")
	bytes, err := ioutil.ReadFile(confPath)

	if err != nil {
		fmt.Printf("读取配置文件失败！", err)
		return
	}

	Settings = Config{}
	err = json.Unmarshal(bytes, &Settings)

	if err != nil {
		fmt.Printf("配置文件json格式不合法！", err)
		return
	}

	Settings.Server.ReadTimeout = Settings.Server.ReadTimeout * time.Second
	Settings.Server.WriteTimeout = Settings.Server.WriteTimeout * time.Second

}