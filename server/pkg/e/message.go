package e

var msgFlags = map[int]string{
	SUCCESS: "ok",
	ERROR: "internal error",
	INVALID_PARAMS: "params invalid",
	NOT_FOUND: "not found",
}

func GetMsg(code int) string {
	msg, ok := msgFlags[code]

	if ok {
		return msg
	}

	return msgFlags[ERROR]
}
