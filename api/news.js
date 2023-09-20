import request from '../utils/request.js'

export default {
	getNavList() {
		return request({
			url: '/news/navlist.php',
			method: 'GET'
		})
	},
	getNewsList(data) {
		return request({
			url: '/news/newslist.php',
			method: 'GET',
			data
		})
	},
	getDetailById(data) {
		return request({
			url: '/news/detail.php',
			method: 'GET',
			data
		})
	}
}