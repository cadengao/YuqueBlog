package service

import "github.com/wujiyu115/yuqueg"

type DocDetail struct {
	yuqueg.DocBookDetail
	Repo string `json:"repo"`
}
