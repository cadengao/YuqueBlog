package myyu

import (
	"github.com/wujiyu115/yuqueg"
)

func GetDoc(repoSlug string) (yuqueg.BookDetail, error) {
	docData, err := yu.Doc.List(yuConfig.User + "/" + repoSlug)

	if err != nil {
		return docData, err
	}

	return docData, nil
}
