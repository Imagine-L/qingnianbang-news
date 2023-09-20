const envStr = "dev"

const url = require(`@/env/${envStr}.json`)

const defaults = {
	url: '',
	method: 'GET',
	data: {},
	loading: true
}

// 全局请求封装
export default (config = defaults) => {

	if (config.loading !== false) {
		uni.showLoading({
			title: "加载中",
			mask: true
		});
	};

	return new Promise((resolve, reject) => {
		uni.request({
			url: url.BASE_URL + config.url,
			method: config.method,
			data: config.data,
			success(response) {
				// 成功响应拦截
				resolve(response);
			},
			fail(err) {
				// 失败响应拦截
				uni.showToast({
					icon: "none",
					title: '服务响应失败'
				});
				console.error(err);
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
};