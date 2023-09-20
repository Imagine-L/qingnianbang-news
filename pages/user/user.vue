<template>
	<view>
		<view class="top">
			<image src="../../static/images/history.png"></image>
			<view class="history-text">浏览历史</view>
		</view>
		
		<view class="content">
			<view class="row" v-for="news in histories">
				<news-item :item="news"></news-item>
			</view>
		</view>
		
		<view class="nohistory" v-if="!histories.length">
			<image src="../../static/images/nohis.png" mode="widthFix"></image>
			<view class="text">暂无浏览记录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				histories: []
			};
		},
		onShow() {
			// 获取已有的历史记录
			this.histories = uni.getStorageSync('histories') || []
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 50rpx;
		background-color: #f8f8f8;
		color: #666;
		image {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 20rpx;
		}
		
		.history-text {
			font-size: 38rpx;
		}
	}
	
	
	.content {
		padding: 30rpx;
		.row {
			border-bottom: 2rpx dashed #efefef;
			padding: 15rpx 0;
		}
	}
	
	.nohistory {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image {
			width: 400rpx;
		}
		
		.text {
			font-size: 26rpx;
			color: #888;
		}
	}
</style>
