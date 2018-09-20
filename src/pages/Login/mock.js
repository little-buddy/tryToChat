export const localCache = {
	localUsersInfo: {
		// 最后一次登录人的 index
		lastUser: 0,
		// 本地缓存登录哦过的人员账号
		users: [
			{
				account: "001",
				username: "test1",
				avater: require("@/assets/img/avater1.jpg"),
				// null undefined 为不记住密码，当选择记住，临时的变量会变true
				token: null,
				autoLogin: false,
				loginStatus: true
			},
			{
				account: "002",
				username: "test2",
				avater: require("@/assets/img/avater2.jpg"),
				token: null,
				autoLogin: true,
				loginStatus: true
			},
			{
				account: "003",
				username: "test3",
				avater: require("@/assets/img/avater3.jpg"),
				token: null,
				autoLogin: false,
				loginStatus: true
			}
		]
	}
};
