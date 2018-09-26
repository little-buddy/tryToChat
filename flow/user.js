declare type User = {
	account: string,
	password?: string, // 密码会通过某种加密的方式发送到服务端，最终变成一个token
	nickname: string,
	avater: string,
	token: string, // 来证明自己是否登陆过，比如记住密码就是保存这个token，需要手动发送；自动登录就是主动发送
	// 用来控制UI显示的,但也会影响到token的生成
	isAutoLogin?: boolean, // 自动登录只有logout才有机会更改
	isRemember?: boolean,
	loginStatus?: boolean
};

// 用户与个人信息重叠的部分该怎么处理啊，目前声明的时候会写2遍
// 而typescript的优势就出来了，是有一个继承机制的，声明之间的关系会更清晰
// 登陆成功，User内的信息就会合并到这个profile里面就不存在维护2分数据的情况
// 之间是通过 account 关联的

declare type profile = {
	account: string,
	nickname: string,
	email: string,
	personMessage: string,
	loc: string,
	gender: "male" | "female",
	age: number,
	animalSymbol:
		| "rat"
		| "ox"
		| "tiger"
		| "rabbit"
		| "dragon"
		| "snake"
		| "horse"
		| "goat"
		| "monkey"
		| "rooster"
		| "dog"
		| "pig",
	aries:
		| "aries" // 白羊座
		| "taurus" // 金牛座
		| "gemini" // 双子座
		| "cancer" // 巨蟹座
		| "leo" // 狮子座
		| "virgo" // 处女座
		| "libra" // 天秤座
		| "scorpio" // 天蝎座
		| "sagittarius" // 射手座
		| "capricornus" // 摩羯座
		| "aquarius" // 水瓶座
		| "pisces" // 双鱼座
};
