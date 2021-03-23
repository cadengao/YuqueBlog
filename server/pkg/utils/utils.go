package utils

func StrIncludes(arr []string, value interface{}) (bool) {
	for _, v := range arr {
		if v == value {
			return true
		}
	}
	return false
}