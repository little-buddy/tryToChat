export const localCache = {
	// 本地缓存登录哦过的人员账号
	users: [
		{
			account: "12354361",
			nickname: "test1",
			avatar: require("@/assets/img/avatar1.jpg"),
			// null undefined 为不记住密码，当选择记住，临时的变量会变true
			token: null,
			autoLogin: false,
			loginStatus: true
		},
		{
			account: "9435813414",
			nickname: "test2",
			avatar: require("@/assets/img/avatar2.jpg"),
			token: null,
			autoLogin: true,
			loginStatus: true
		},
		{
			account: "26234028243",
			nickname: "test3",
			avatar: require("@/assets/img/avatar3.jpg"),
			token: null,
			autoLogin: false,
			loginStatus: true
		}
	]
};
