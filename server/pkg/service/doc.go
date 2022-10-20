package service

import (
	"YuqueBlogServer/pkg/myyu"
	"YuqueBlogServer/pkg/setting"
	"YuqueBlogServer/pkg/utils"
	"github.com/wujiyu115/yuqueg"
	"strings"
	"time"
)

func GetDocListBySlug(slug string) ([]yuqueg.DocBookDetail, error) {
	docData, err := myyu.GetDocList(slug)

	if err != nil {
		return docData.Data, err
	}
	return docData.Data, nil
}

func GetDocDetailBySlug(repoSlug string, docSlug string) (yuqueg.DocDetail, error) {
	d, err := myyu.GetDocDetail(repoSlug, docSlug)

	if err != nil {
		return d, err
	}

	return d, nil
}

type RepoDocs struct {
	Repo struct {
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
		TocYml           string    `json:"toc_yml"`
		Serializer       string    `json:"_serializer"`
	} `json:"repo"`
	Docs []yuqueg.DocBookDetail `json:"docs"`
}



func GetAllDoc() ([]yuqueg.DocBookDetail, error) {
	repoSlugs := strings.Split(setting.Settings.Blog.PublicRepos, ",")

	var ret []yuqueg.DocBookDetail

	for _, r := range repoSlugs {
		doc, err := myyu.GetDocList(r)
		if err != nil {
			return ret, err
		}
		ret = append(ret, utils.FilterDocBookDetailSlice(doc.Data, func (d yuqueg.DocBookDetail) bool {
			return d.Status == 1
		})...)
	}
	// 按照发布时间排序
	utils.SortDocBookDetail(ret, func (i, j int) bool {
		// 先发布的在后
		return ret[i].FirstPublishedAt.Unix() > ret[j].FirstPublishedAt.Unix()
	})
	return ret, nil
}

func GetAllDocsGroupByRepo() ([]RepoDocs, error) {
	repoSlugs := strings.Split(setting.Settings.Blog.PublicRepos, ",")

	var ret []RepoDocs

	for _, r := range repoSlugs {
		docData, err := myyu.GetDocList(r)
		if err != nil {
			return ret, err
		}
		repoData, err := myyu.GetRepo(r)
		if err != nil {
			return ret, err
		}
		rr := RepoDocs{}
		rr.Repo = repoData.Data
		rr.Docs = docData.Data
		ret = append(ret, rr)
	}
	return ret, nil
}