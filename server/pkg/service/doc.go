package service

import (
	"YuqueBlogServer/pkg/myyu"
	"YuqueBlogServer/pkg/setting"
	"github.com/wujiyu115/yuqueg"
	"strings"
)

func GetDocListBySlug(slug string) ([]yuqueg.DocBookDetail, error) {
	docData, err := myyu.GetDocList(slug)

	if err != nil {
		return docData.Data, err
	}
	return docData.Data, nil
}

func GetDocBySlug(repoSlug string, docSlug string) (yuqueg.DocDetail, error) {
	d, err := myyu.GetDoc(repoSlug, docSlug)

	if err != nil {
		return d, err
	}

	return d, nil
}

func GetAllDoc() ([]yuqueg.DocBookDetail, error) {
	repoSlugs := strings.Split(setting.Settings.Blog.PublicRepos, ",")

	ret := []yuqueg.DocBookDetail{}

	for _, r := range repoSlugs {
		docData, err := myyu.GetDocList(r)
		if err != nil {
			return ret, err
		}
		ret = append(ret, docData.Data...)
	}

	return ret, nil
}