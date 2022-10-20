package myyu

import (
	"github.com/wujiyu115/yuqueg"
)

func GetRepoList() (yuqueg.UserRepos, error)  {
	list, err := yu.Repo.List(yuConfig.User, "", nil)

	if err != nil {
		return list, err
	}

	return list, nil
}

func GetRepo(slug string) (yuqueg.CreateUserRepo, error) {
	repo, err := yu.Repo.Get(yuConfig.User + "/" + slug, "Book")

	if err != nil {
		return repo, err
	}

	return repo, nil
}