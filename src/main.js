import Vue from 'vue'

new Vue({
	el: '.vue-app',
	data: {
		message: "Hello, Vue!!"
	},
	template: '<h1>{{ message }}</h1>'
})
