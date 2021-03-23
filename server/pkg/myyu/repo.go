package myyu

import (
	"github.com/wujiyu115/yuqueg"
	"log"
)

func GetRepoList() (yuqueg.UserRepos, error)  {
	log.Println(yuConfig.User)
	list, err := yu.Repo.List(yuConfig.User, "", nil)

	if err != nil {
		return list, err
	}

	return list, nil
}