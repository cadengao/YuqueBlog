package utils

func StrIncludes(value interface{}, arr []string) (bool) {
	for _, v := range arr {
		if v == value {
			return true
		}
	}
	return false
}