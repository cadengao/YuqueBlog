package utils

import "time"

func StrIncludes(value interface{}, arr []string) (bool) {
	for _, v := range arr {
		if v == value {
			return true
		}
	}
	return false
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