package myyu

import (
	"github.com/wujiyu115/yuqueg"
)

func GetDocList(repoSlug string) (yuqueg.BookDetail, error) {
	docData, err := yu.Doc.List(yuConfig.User + "/" + repoSlug)

	if err != nil {
		return docData, err
	}

	return docData, nil
}

func GetDoc(repoSlug string, docSlug string) (yuqueg.DocDetail, error) {
	d, err := yu.Doc.Get(yuConfig.User + "/" + repoSlug, docSlug, &yuqueg.DocGet{Raw: 1})

	if err != nil {
		return d, err
	}

	return d, nil

}
