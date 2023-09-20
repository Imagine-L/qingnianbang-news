<template>
	<view class="home">
		<scroll-view class="scroll-box" scroll-x>
			<view 
			class="scroll-item" 
			:class="{active: activeIndex === index}" 
			v-for="(item, index) in navList" 
			:key="item.id"
			@click="clickScrollItem(index, item.id)"
			>
				{{item.classname}}
			</view>
		</scroll-view>
		
		<view class="content">
			<view class="row" v-for="news in newsList">
				<news-item :item="news"></news-item>
			</view>
		</view>
		
		<view class="no-data" v-if="!newsList.length">
			<image src="../../static/images/nodata.png" mode="aspectFill"></image>
		</view>
		
		<view class="prompt-box" v-if="newsList.length">
			<view class="prompt" v-if="loadStatus === 'loading'">数据加载中...</view>
			<view class="prompt" v-else-if="loadStatus === 'finish'">页面到底了~</view>
		</view>
	</view>
</template>

<script>
	import newsApi from '../../api/news.js'
	
	export default {
		data() {
			return {
				title: 'Hello',
				navList: [
					{ id: '', classname: '全部'},
				],
				newsList: [],
				activeIndex: 0,
				currentPage: 1,
				loadStatus: 'unload' // unload: 未加载 | loading 正在加载 | finish 加载完成
			}
		},
		onLoad() {
			this.loadStatus = 'unload'
			this.getNavList()
			this.getNewsList()
		},
		// 监听用户下拉动作
		onPullDownRefresh() {
			this.currentPage = 1
			this.newsList = []
			this.loadStatus = 'unload'
			// this.navList[this.activeIndex].id 表示的是当前激活nav的id
			this.getNewsList(this.navList[this.activeIndex].id)
		},
		// 页面滚动到底部的事件
		onReachBottom() {
			if (this.loadStatus === 'finish') return
			this.currentPage++
			this.loadStatus = 'loading'
			// this.navList[this.activeIndex].id 表示的是当前激活nav的id
			this.getNewsList(this.navList[this.activeIndex].id)
		},
		methods: {
			clickScrollItem(index, id) {
				this.loadStatus = 'unload'
				this.activeIndex = index
				this.currentPage = 1
				this.newsList = []
				this.getNewsList(id)
			},
			getNavList() {
				newsApi.getNavList().then(resp => {
					this.navList = this.navList.concat(resp.data)
				})
			},
			getNewsList(id = '') {
				let data = {
					cid: id,
					page: this.currentPage
				}
				newsApi.getNewsList(data).then(resp => {
					this.newsList = this.newsList.concat(resp.data)
					uni.stopPullDownRefresh();
					if (!resp.data.length) {
						this.loadStatus = 'finish'
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-box {
		width: 750rpx;
		height: 100rpx;
		line-height: 100rpx;
		white-space: nowrap;
		background-color: #F7F8FA;
		position: fixed;
		top: var(--window-top);
		left: 0;
		z-index: 10;
		/deep/ ::-webkit-scrollbar {
			display: none !important;  
			width: 0 !important;  
			height: 0 !important;  
			-webkit-appearance: none;  
			background: transparent;  
		}
		.scroll-item {
			font-size: 40rpx;
			display: inline-block;
			padding: 0 30rpx;
			color: #333;
			
			&.active {
				color: #61BF82;
			}
		}
	}
	
	.content {
		padding: 30rpx;
		padding-top: 130rpx;
		.row {
			border-bottom: 2rpx dashed #efefef;
			padding: 15rpx 0;
		}
	}
	
	.no-data {
		display: flex;
		justify-content: center;
		image {
			width: 360rpx;
		}
	}
	
	.prompt-box {
		width: 750rpx;
		text-align: center;
		.prompt {
			font-size: 17rpx;
			color: #999;
			margin: 20rpx 0;
		}
	}
</style>
