package service

import (
	"YuqueBlogServer/pkg/myyu"
	"YuqueBlogServer/pkg/setting"
	"github.com/wujiyu115/yuqueg"
	"sort"
	"strings"
	"time"
)

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
	Docs []DocDetail `json:"docs"`
}

// DocBookDetail 排序 接口 实现

// 排序 interface 实现
type DocBookDetailSlice []DocDetail
func (p DocBookDetailSlice) Len() int { return len(p) }
func (p DocBookDetailSlice) Swap(i, j int) { p[i], p[j] = p[j], p[i] }
func sortDocBookDetail(slice []DocDetail, less func (i, j int) bool) {
	sort.Slice(slice, less)
}

func filterDocBookDetailSlice(slice []DocDetail, fn func (d DocDetail) bool) []DocDetail {
	var match []DocDetail
	for _, d := range slice {
		if fn(d) {
			match = append(match, d)
		}
	}

	return match
}

func GetDocListBySlug(slug string) ([]DocDetail, error) {
	docData, err := myyu.GetDocList(slug)
	var ret []DocDetail
	if err != nil {
		return ret, err
	}
	for _, d := range docData.Data {
		docDetail := DocDetail{
			DocBookDetail: d,
			Repo: slug,
		}
		ret = append(ret, docDetail)
	}
	return filterDocBookDetailSlice(ret, func (d DocDetail) bool {
		return d.Status == 1
	}), nil
}

func GetDocDetailBySlug(repoSlug string, docSlug string) (yuqueg.DocDetail, error) {
	d, err := myyu.GetDocDetail(repoSlug, docSlug)

	if err != nil {
		return d, err
	}

	return d, nil
}





func GetAllDoc() ([]DocDetail, error) {
	repoSlugs := strings.Split(setting.Settings.Blog.PublicRepos, ",")

	var ret []DocDetail

	for _, r := range repoSlugs {
		doc, err := myyu.GetDocList(r)
		if err != nil {
			return ret, err
		}
		// 添加repo
		var docs []DocDetail
		for _, d := range doc.Data {
			docDetail := DocDetail{
				DocBookDetail: d,
				Repo: r,
			}
			docs = append(docs, docDetail)
		}
		// 过滤未发布的
		ret = append(ret, filterDocBookDetailSlice(docs, func (d DocDetail) bool {
			return d.Status == 1
		})...)
	}
	// 按照发布时间排序
	sortDocBookDetail(ret, func (i, j int) bool {
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
		// 添加repo
		var docs []DocDetail
		for _, d := range docData.Data {
			docDetail := DocDetail{
				DocBookDetail: d,
				Repo: r,
			}
			docs = append(docs, docDetail)
		}
		// 过滤未发布的
		rr.Docs = filterDocBookDetailSlice(docs, func (d DocDetail) bool {
			return d.Status == 1
		})
		sortDocBookDetail(rr.Docs, func (i, j int) bool {
			// 先发布的在后
			return rr.Docs[i].FirstPublishedAt.Unix() > rr.Docs[j].FirstPublishedAt.Unix()
		})
		ret = append(ret, rr)
	}
	return ret, nil
}