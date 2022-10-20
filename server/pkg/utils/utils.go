package utils

import (
	"github.com/wujiyu115/yuqueg"
	"sort"
	"time"
)

func StrIncludes(value interface{}, arr []string) (bool) {
	for _, v := range arr {
		if v == value {
			return true
		}
	}
	return false
}

// DocBookDetail 排序 接口 实现

// 排序 interface 实现
type DocBookDetailSlice []yuqueg.DocBookDetail
func (p DocBookDetailSlice) Len() int { return len(p) }
func (p DocBookDetailSlice) Swap(i, j int) { p[i], p[j] = p[j], p[i] }
func SortDocBookDetail(slice []yuqueg.DocBookDetail, less func (i, j int) bool) {
	sort.Slice(slice, less)
}

func TimeStr2Timestamp(timeStr string) int64 {
	Loc, err := time.LoadLocation("Asia/ShangHai")

	if err != nil {
		return -1
	}

	t, err  := time.ParseInLocation("2022-03-19T08:03:59Z", timeStr, Loc)
	if err != nil {
		return -1
	}
	return t.Unix()
}

func FilterDocBookDetailSlice(slice []yuqueg.DocBookDetail, fn func (d yuqueg.DocBookDetail) bool) []yuqueg.DocBookDetail {
	var match []yuqueg.DocBookDetail
	for _, d := range slice {
		if fn(d) {
			match = append(match, d)
		}
	}

	return match
}