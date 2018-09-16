import Vue from "vue";
import VueRouter from "vue-router";
import { ChatRoom, ForgetPassword, Signin, Signup } from "@/pages";

Vue.use(VueRouter);

export default new VueRouter({
	mode: "history",
	routes: [
		{ path: "/", component: Signin },
		{ path: "/signup", component: Signup },
		{ path: "/chatroom", component: ChatRoom },
		{ path: "/forgetpassword", component: ForgetPassword }
	]
});
