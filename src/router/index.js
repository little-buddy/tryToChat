import Vue from "vue";
import VueRouter from "vue-router";
import Login, { ForgetPassword, Account, Qrcode, Signup } from "@/pages/Login";
import ChatRoom from "@/pages/ChatRoom";

Vue.use(VueRouter);

export default new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/",
			component: Login,
			children: [
				{ path: "/account", component: Account, alias: "/" },
				{ path: "/qrcode", component: Qrcode },
				{ path: "/signup", component: Signup },
				{ path: "/forgetpassword", component: ForgetPassword }
			]
		},
		{ path: "/chatroom", component: ChatRoom }
	]
});
