package service

import (
	"YuqueBlogServer/pkg/myyu"
	"github.com/wujiyu115/yuqueg"
)


func GetDocBySlug(repoSlug string, slug string) (yuqueg.DocDetail, error) {
	d, err := myyu.GetDoc(repoSlug, slug)

	if err != nil {
		return d, err
	}

	return d, nil
}