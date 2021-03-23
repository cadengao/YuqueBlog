package service

import (
	"YuqueBlogServer/pkg/myyu"
	"YuqueBlogServer/pkg/setting"
	"YuqueBlogServer/pkg/utils"
	"github.com/wujiyu115/yuqueg"
	"strings"
	"time"
)

type Data []struct {
	ID               int       `json:"id"`
	Type             string    `json:"type"`
	Slug             string    `json:"slug"`
	Name             string    `json:"name"`
	UserID           int       `json:"user_id"`
	Description      string    `json:"description"`
	CreatorID        int       `json:"creator_id"`
	Public           int       `json:"public"`
	ItemsCount       int       `json:"items_count"`
	LikesCount       int       `json:"likes_count"`
	WatchesCount     int       `json:"watches_count"`
	ContentUpdatedAt time.Time `json:"content_updated_at"`
	UpdatedAt        time.Time `json:"updated_at"`
	CreatedAt        time.Time `json:"created_at"`
	Namespace        string    `json:"namespace"`
	User             yuqueg.RepoUser  `json:"user"`
	Serializer       string    `json:"_serializer"`
}

func GetPublicRepos() (Data, error) {
	repos, err := myyu.GetRepoList()

	if err != nil {
		return repos.Data, err
	}

	publicRepos := strings.Split(setting.Settings.Blog.PublicRepos, ",")
	ret := Data{}
	list := repos.Data

	// 筛出开放的repo
	for _, value := range list {
		if utils.StrIncludes(publicRepos, value.Slug) {
			ret = append(ret, value)
		}
	}
	return ret, nil
}
