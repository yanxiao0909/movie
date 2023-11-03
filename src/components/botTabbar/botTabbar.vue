<!--
 * @Description: 自定义 悬浮异形 tabbar 
-->
<template>
	<view class="tqb-tabbar ">
		<view class="tqb-tabbar-body animate__fadeInUp animate__animated" style="animation-duration:.3s">
			<view class="tqb-tabbar-item" v-for="(item, index) in tabBarList" :key="index"
				@click="switchClick(item, index)">
				<view v-if="index !== 3" class="tabbar-item-body">
					<view class="tabbar-item-icon">
						<image :src="index===activeIndex ?item.selectPath:item.iconPath"
							style="width:45rpx; height: 45rpx;"></image>
					</view>
					<view class='tab-bar-text' :class="index===activeIndex ? 'actCho': ''">{{ item.text }}
					</view>

				</view>

				<view v-else  class="tabbar-item-body">
					<view class="tabbar-item-icon">
						 <nut-badge top='0' right="5" :value="number">
						     <image :src="index===activeIndex ?item.selectPath:item.iconPath"
						     	style="width:45rpx; height: 45rpx;"></image>
						</nut-badge>
					</view>
					<view class='tab-bar-text' :class="index===activeIndex ? 'actCho': ''">{{ item.text }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		defineComponent
	} from 'vue';
	import request from '../../../comm/request.ts';
	import {
		ref,
	} from "vue";
	import {
		useI18n
	} from "vue-i18n";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	
	
	export default defineComponent({
		props: ["activeIndex"],
		setup(props, {
			emit
		}) {
			const {
				t
			} = useI18n();
			const activeIndex = ref(props.activeIndex)
			const tabBarList = ref([{
				text: 'Home',
				iconPath: "/static/themeNum1/tabbar/home.png",
				selectPath: "/static/themeNum1/tabbar/home1.png",
				pagePath: "/pages/tabbar/index",
			}, {
				pagePath: "/pages/tabbar/task",
				iconPath: "/static/themeNum1/tabbar/task.png",
				selectPath : "/static/themeNum1/tabbar/task1.png",
				text: "Task"
			},
			{
				pagePath: "/pages/tabbar/service",
				iconPath: "/static/themeNum1/tabbar/service.png",
				selectPath: "/static/themeNum1/tabbar/service1.png",
				text: "Service"
			},
			{
				pagePath: "/pages/tabbar/notice",
				iconPath: "/static/themeNum1/tabbar/notice.png",
				selectPath: "/static/themeNum1/tabbar/notice1.png",
				text: "Notice"
			},
			{
				pagePath: "/pages/tabbar/my",
				iconPath: "/static/themeNum1/tabbar/my.png",
				selectPath: "/static/themeNum1/tabbar/my1.png",
				text: "My"

			}])

		//未读数据
			const number = ref()
			const unread = () =>{
				request({
				   url: 'user/unreadNoticeNum',
				   methods: 'get',
				  }).then(res => {
					  number.value = res
				  })
			}
			const showMore = ref(false)


			const switchClick = (data, index) => {
				
				if (index == activeIndex.value) {
					return;
				}
				activeIndex.value == index;
				uni.navigateTo({
					url: data.pagePath
				});
			}
			onLoad(()=>{
				unread()
			})

			return {
				tabBarList,
				showMore,
				switchClick,
				activeIndex,
				unread,
				number
			}
		},
	})
	
</script>


<style lang="scss" scoped>
	.tqb-tabbar-body {
		// border-top: 1px solid #e1e1e1;
		background: #1A1A1A;
		height: 76rpx;
		display: flex;
		position: fixed;
		bottom: 0 !important;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 10000;
		padding: 22rpx 0;
		transition: bottom 0s ease-in-out;

		.tqb-tabbar-item {
			flex: 1;
			display: flex;
			justify-content: center;
			text-align: center;
			align-items: center;
			position: relative;

			// width: 18%;
			.tabbar-item-body {}

			.tabbar-item-icon {
				display: flex;
				justify-content: center;
				transition: all 0.6s ease;

			}

			.tab-bar-text {
				font-size: 20rpx;
				font-weight: 400;
				margin-top: 10rpx;
				color: #dddddd;
			}


			.add-icon {
				// width: 230rpx;
				// height: 230rpx;
				position: relative;
			// 	top: -35rpx;
			}


		}
	}

	.actCho {
		color: #3E70E1 !important;
	}

	.redDor {
		position: absolute;
		width: 15rpx;
		height: 15rpx;
		background-color: red;
		border-radius: 50%;
		top: -10rpx;
		right: 30%;
	}

	// .tqb-tabbar-popup {
	// 	position: fixed;
	// 	bottom: 0;
	// 	left: 0;
	// 	width: 100%;
	// 	background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.49) 32%, rgba(0, 0, 0, 0.66) 100%);
	// 	height: 660rpx;

	// 	.mask-close {
	// 		position: absolute;
	// 		top: 32rpx;
	// 		right: 32rpx;
	// 	}

	// 	.popup-body {
	// 		display: flex;
	// 		flex-wrap: wrap;
	// 		position: absolute;
	// 		top: 142rpx;
	// 		width: 100%;

	// 		.popup-item {
	// 			width: 20%;
	// 			margin-bottom: 20rpx;
	// 			text-align: center;

	// 			.popup-item-icon {
	// 				display: flex;
	// 				justify-content: center;
	// 			}

	// 			.popup-item-text {
	// 				font-size: 24rpx;
	// 				color: #fff;
	// 			}
	// 		}
	// 	}
	// }
</style>
