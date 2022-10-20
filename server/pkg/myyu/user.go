package myyu

import (
	"github.com/wujiyu115/yuqueg"
)

/**
	获取语雀用户信息
 */
func GetUserInfo() (userInfo yuqueg.User, err error)  {
	user, err := yu.User.Get(yuConfig.User)
	if err != nil {
		return user.Data, err
	}
	return user.Data, nil
}