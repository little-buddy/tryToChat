import Vue from "vue";
import router from "./router";
import App from "./App";

new Vue({
	render: h => h(App),
	router
}).$mount("#chat");

// 所以 Vue 有2 种挂载方式喽
// 一种挂载到子级组件的最上层，通过显示调用
// 一种就是这样的，通过 render JSX 并且 $mount去挂载
// 单文件组件必须使用 vue-loader拆解，也就意味着鼻血配合 webpack使用
