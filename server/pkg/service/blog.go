package service

import "YuqueBlogServer/pkg/setting"

func BlogInfo() setting.Blog  {
	info := setting.Settings.Blog

	return info
}
