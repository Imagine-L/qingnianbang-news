<template>
	<view class="detail">
		<view class="title">{{detail.title}}</view>
		<view class="info">
			<view class="author">编辑：{{detail.author}}</view>
			<view class="time">发布时间：{{posttime}}</view>
		</view>
		<view class="content">
			<!-- 为了适配性更强，本来是应该使用rich-text标签处理html元素的 -->
			<!-- 但是此接口返回的html元素使用rich-text解析后会报错，而v-html不会，因此选择v-html进行解析 -->
			<!-- <rich-text :nodes="detail.content"></rich-text> -->
			<!-- 仅适用于 H5/apk/微信小程序 -->
			<view v-html="detail.content"></view>
		</view>
		<view class="description">
			声明：本站的内容均采集与腾讯新闻，如果侵权请联系管理（513894357@qq.com）进行整改删除，本站进行了内容采集不代表本站及作者观点，若有侵犯请及时联系管理员，谢谢您的支持。
		</view>
	</view>
</template>

<script>
	import newsApi from '../../api/news.js'
	
	export default {
		data() {
			return {
				options: {
					// 分类id
					classid: '',
					// 新闻ID
					id: ''
				},
				detail: {}
			};
		},
		onLoad(options) {
			if (!options.classid || !options.id) {
				uni.switchTab({
					url: '/pages/index/index'
				})
				return
			}
			this.options = options
			this.getDetail()
		},
		computed: {
			posttime() {
				// 因为detail中的时间戳是以秒为单位的，因此这里转换为毫秒
				let timestamp = parseInt(this.detail.posttime) * 1000
				let date = new Date(timestamp)
				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
			}
		},
		methods: {
			// 获取新闻详情
			getDetail() {
				newsApi.getDetailById(this.options).then(resp => {
					this.detail = resp.data
					this.detail.content = this.detail.content.replace(/<img/gi, '<img style="max-width: 100%"')
					uni.setNavigationBarTitle({
						title: this.detail.title
					})
					
					// 保存数据到缓存中
					this.saveHistory()
				})
			},
			saveHistory() {
				// 获取已有的历史记录
				let histories = uni.getStorageSync('histories') || []
				let date = new Date()
				// 生成新的历史记录
				let item = {
					classid: this.detail.classid,
					id: this.detail.id,
					title: this.detail.title,
					author: this.detail.author,
					picurl: this.detail.picurl,
					looktime: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
				}
				// 判断之前是否有相同的历史记录条目，删除旧的历史记录条目
				let index = histories.findIndex(oldItem => oldItem.id === item.id)
				if (index !== -1) {
					histories.splice(index, 1)
				}
				// 添加新的一条历史记录
				histories.unshift(item)
				// 保持20条历史记录
				histories = histories.slice(0, 20)
				uni.setStorageSync('histories', histories)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 30rpx;
		.title {
			font-size: 46rpx;
			color: #494949;
			font-weight: bold;
		}
		
		.info {
			background-color: #f6f6f6;
			padding: 20rpx;
			font-size: 25rpx;
			color: #666;
			display: flex;
			justify-content: space-between;
			margin: 40rpx 0;
			border-radius: 10rpx;
			font-family: '宋体';
		}
		
		.description{
			margin-top: 50rpx;
			background: #FEF0F0;
			font-size: 26rpx;
			padding:20rpx;
			color:#F89898;
			line-height: 1.8em;
		}
	}
</style>
