<template>
	<view class="news-item" @click="clickNews">
		<view class="pic">
			<image :src="item.picurl" mode="aspectFill"></image>
		</view>

		<view class="text">
			<view class="title">
				<text>{{item.title}}</text>
			</view>
			<view class="info" v-if="!item.looktime">
				<text>{{item.author}}</text>
				<text>{{item.hits}}浏览</text>
			</view>
			<view class="info" v-else>
				<text>浏览时间：{{item.looktime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "news-item",
		props: {
			item: {
				type: Object,
				default () {
					return {
						id: '',
						title: '这是默认标题这是默认标题',
						author: '张三',
						picurl: '../../static/images/nopic.jpg',
						hits: '',
						looktime: '2020-03-12 10:00:00'
					}
				}
			}
		},
		data() {
			return {
			
			};
		},
		methods: {
			clickNews() {
				uni.navigateTo({
					url: `/pages/detail/detail?classid=${this.item.classid}&id=${this.item.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.news-item {
		display: flex;

		.pic {
			width: 230rpx;
			height: 160rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.text {
			flex: 1;
			padding-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 38rpx;
				color: #333;

				text {
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					/* 这里是超出几行省略 */
					overflow: hidden;
				}
			}

			.info {
				font-size: 26rpx;
				color: #999;

				text {
					margin-right: 30rpx;
				}
			}
		}
	}
</style>