<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="content  pt23">
			<view class="flex between">
				<view class="f52  secondClo margintty" :style="{color:store.$state.secondColor}">
					<image :src="COUNTRY.icon" mode="widthFix" style="width: 70rpx;height: 70rpx;">
					</image>
				</view>
				<image :src="store.$state.imgObj.langSetting" mode="widthFix" style="width: 70rpx;height: 70rpx; margin-right: 15px; margin-left: 15px;"
					@click="changePage(3,'../mine/langSetting')">
				</image>
			</view>



			<!-- 轮播图 -->
			<view class="mt30 ">
				<!-- uni.getStorageSync("huobi") -->
				<swiper :indicator-dots="true" :indicator-active-color="store.$state.contentColor" :autoplay="true"
					:interval="3000" :duration="1000" next-margin="20" :circular="true" style="height: 410rpx;">
					<swiper-item v-for="(item, index) in list" @click="botHandle(2, item)" :key="index"
						>
						<image :src="item.banner_image" mode="scaleToFill"
							style=" width: 100%;height: 410rpx"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- <view class="notice margintty" style="background-color: #fff;" v-if="showBar" dir="ltr">
				<nut-noticebar :text="barText" :left-icon="store.$state.imgObj.labaIcon" :scrollable="true"
					background="#1D1D1D" color="#EAC975" style="border-radius: 20rpx;">
				</nut-noticebar>
			</view> -->
			<!-- bottom -->
			
			<view class="margintty" v-show='item.movies.length>0' v-for="(item, index) in rankListRef" :key="index">
				<view  class="mt60 secondClo f40 btn" :style="{color:store.$state.thirdColor}">
<!-- 					{{t('index.i_a5')}} -->
					<view class="">
						{{item.title}}
					</view>
					<nut-icon name="arrow-right" style="margin: 10rpx 0rpx 0rpx 20rpx;" color="#fff"></nut-icon>
				</view>
				<swiper  next-margin='30px'  :indicator-dots="false" :indicator-active-color="store.$state.contentColor" :autoplay="false"
					:interval="3000" :duration="1000"  :circular='false' style="height: 570rpx;">
					<swiper-item class='swiper-item_sty'  v-for="(item, index) in item.movies" :key="index">
						<view class="big_box">
							<view  class="movie_box">
								<view class="movie_img">
									<view class="movie_header">
										<nut-icon name="uploader" style="margin-left: 2px; margin-top: 3px;" color="#FFF"></nut-icon>
									</view>
									<image :src="item.cover" style="width: 306rpx;height: 454rpx;"></image>
								</view>
								<!-- <view class="rate">
									{{item.rate}}
								</view> -->
								<view class="movie_name">
									{{item.title}}
								</view>
								<!-- <view class="watch">
									<view class="add">
										<nut-icon name="uploader" style="margin-left: 2px; margin-top: 3px;" color="#5799ef"></nut-icon>
									</view>
									<text>关注列表</text>
								</view> -->
							</view>
						</view>
						
					</swiper-item>
				</swiper>
			</view>
			
			<view class="margintty" v-if="artclList.length >0">
							<view class="mt60 secondClo f40" :style="{color:store.$state.thirdColor}">
								{{t('index.i_a5')}}
							</view>
							<view class="mt40 bottom ">
								<view v-for="item in artclList" class="center botItem" @click="botHandle(3,item)">
									<image :src="item.full_cover" style="width: 100%;height: 100%;"></image>
								</view>
							</view>
						</view>

			<!-- 滚动数据 充值 -->
			<view class="margintty" v-if="rechargeList.length >0">
				<view class="mt30 secondClo f40" :style="{color:store.$state.thirdColor}">
					{{t('add1.a_d5')}}
				</view>
				<view class="mt40 withdrawEl">
					<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="2000" :duration="1000"
						display-multiple-items="4" style=" width: 100% !important;" :disable-touch="true"
						:vertical="true">
						<swiper-item v-for="(item, index) in rechargeList" style="width: 100%;" :key="index">
							<view class="honerItem ">
								<image :src="store.$state.imgObj.withdrawIcon" mode="widthFix"
									style="width: 46rpx;height: 40rpx;"></image>
								<view class=" mglr29 between" style="flex: 1;">
									<text>{{ item.phone }} </text>
									<text class="text_center">{{t('add1.a_d6')}}</text>
									<text style="padding-left: 10rpx;">{{ item.amount }} {{currency}}</text>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>

			<!-- 滚动数据 -->
			<view class="margintty" v-if="withdrawList.length >0">
				<view class="mt30 secondClo f40" :style="{color:store.$state.thirdColor}">
					{{t('index.i_a3')}}
				</view>
				<view class="mt40 withdrawEl">
					<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="2000" :duration="1000"
						display-multiple-items="4" style=" width: 100% !important;" :disable-touch="true"
						:vertical="true">
						<swiper-item v-for="(item, index) in withdrawList" style="width: 100%;" :key="index">
							<view class="honerItem ">
								<image :src="store.$state.imgObj.withdrawIcon" mode="widthFix"
									style="width: 46rpx;height: 40rpx;"></image>
								<view class=" mglr29 between" style="flex: 1;">
									<text>{{ item.phone }} </text>

									<text class="text_center">{{t('index.i_a4')}}</text>
									<text style="padding-left: 10rpx;">{{ item.amount }} {{currency}}</text>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>

			<view style="height: 40rpx;"></view>
			
		</view>

		<!-- 客服列表 -->
		<nut-drag class="margintty" :boundary="{ top:50, left: 30, bottom:50, right: 30 }" :attract="true" v-if="showService"
			:style="{ top: '1050rpx', right: '30px' }">
			<image  :src="COUNTRY.kefu?COUNTRY.kefu:store.$state.imgObj.kefuIcon" mode="widthFix"
				style="width: 80rpx;height: 80rpx;margin-top: 0; display: none;" @click="changePage(3,'../mine/service')"></image>
		</nut-drag>

		<FullMask  v-show="showMask" @confirm="methods.confirm" :maskList="maskContent"></FullMask>
		<Loading ref="showLoading"></Loading>
		<view style="width: 100%;height: 60px;">
			
		</view>
		<Tabbar :activeIndex="0"></Tabbar>
		
	</view>
</template>

<script setup>
	import Tabbar from '@/components/botTabbar/botTabbar.vue'
	
	import request from '../../../comm/request.ts';
	import FullMask from "@/components/fullMask/fullMask";
	import COUNTRY from "../../../setting.js"
	import {
		useI18n
	} from "vue-i18n";
	import {
		onMounted, ref
	} from 'vue';

	const {
		t
	} = useI18n();

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		userStore
	} from "@/store/themeNum.js";
	import WebsocketTask from '../../../comm/websocket.js'
	// 创建websocket
	// let websocket = new WebsocketTask('xxx', 5000)
	// // 挂载到全局 或者 定义一个全局变量然后进行赋值也可
	// console.log(websocket);
	//页面中调用方法

	// websocket.send(JSON.stringify(data))


	const store = userStore();
	const showService = ref(false)
	// 轮播图
	const list = ref([])
	// 滚动消息
	const barText = ref("")
	const showBar = ref(false)
	// wenzhang
	const artclList = ref([])
	// 金刚
	const commglrist = ref([{
			img: store.$state.imgObj.indexComm[0],
			name: t('index.i_a6'),
			url: './recharge'
		},
		{
			img: store.$state.imgObj.indexComm[1],
			name: t('index.i_a7'),
			url: '../mine/withdraw'
		},
		{
			img: store.$state.imgObj.indexComm[3],
			name: t('index.i_a9'),
			url: '../mine/share'
		},
		{
			name: t('mine.m_m5'),
			img: store.$state.imgObj.indexComm2[0],
			url: '../mine/accountDetails',
		},
	])

	// 金刚2
	const commglrist2 = ref([

		{
			name: t('mine.m_m8'),
			img: '/static/themeNum1/index/indexComm3.png',
			url: './team',
			openLink: false,
		},
		{
			name: t('add1.a_d7'),
			img: '/static/themeNum1/index/indexComm6.png',
			openLink: true,
			url: "../mine/article?id=" + 2
		},
		{
			name: t('add1.a_d1') + " APP",
			img: '/static/themeNum1/index/indexComm8.png',
			openLink: true,
			url: ""
		},

		{
			name: 'save bookmark',
			img: '/static/shuqian.png',
			openLink: true,
			url: "../mine/DownLoad"
		},
	])
	// 提现列表
	const withdrawList = ref([])
	// 充值列表
	const rechargeList = ref([])

	// 弹窗
	const showMask = ref(false)
	const maskContent = ref([])
	const changePage = (ind, url) => {
		uni.navigateTo({
			url
		})
	}
	// const changePage2 = (index, item.url) => {
	// 	if (index == 2 || index == 3) {
	// 		window.open(url)
	// 	} else {
	// 		uni.navigateTo({
	// 			url
	// 		})
	// 	}
	// }\
	
	//电影列表
	const rankListRef = ref()
	const rankList = () =>{
		request({
			url:'home/movieList',
			methods:'get'
		}).then(res=>{
			console.log(res,'滚动')
			rankListRef.value = res
			
		})
	}
	
	//详情
	const task = (item)=>{
		uni.setStorageSync('taskMove',item)
		uni.navigateTo({
			url:'./myTask',
		})
	}
	const changePage2 = (index, url) => {
		if (index == 2) {
			// 下载app
			// && COUNTRY.url == 'wyf666.com'
			var userAgent = navigator.userAgent; //获取userAgent信息  
			if (userAgent.includes('iPhone')) {
				// uni.navigateTo({
				// 	url: '../mine/DownLoad'
				// })
				return false
			}
			window.open(url)
			// window.open(url)
		} else {
			if (index == 0) {
				uni.navigateTo({
					url
				})
				return
			}
			uni.navigateTo({
				url
			})
		}
	}
	const methods = {
		open() {
			showMask.value = false;
		},
		confirm() {
			showMask.value = false;
		},
	}

	const currency = ref("")
	const getData = () => {
		// 获取app状态
		request({
			url: 'setting/app',
			methods: 'get',
		}).then(res => {
			if (res.download_status == 1) {

				commglrist2.value[2].url = res.url
			}
		})

		// 货币
		request({
			url: 'setting/currency',
			methods: 'get'
		}).then(res => {
			currency.value = res.currency
			uni.setStorageSync('currency', res.currency)
		})
		// 利息宝
		request({
			url: 'setting/lixibao',
			methods: 'get'
		}).then(res => {
			if (res.status == 0) {
				commglrist.value.splice(2, 1)
			}
		})
		// 获取客服状态
		request({
			url: 'setting/customerService',
			methods: 'get',
		}).then(res => {
			// console.log(res);
			res.status == 1 ? showService.value = true : showService.value = false
		})
		// 轮播图
		request({
			url: 'home/banner',
			methods: 'get'
		}).then(res => {
			list.value = res
		})

		// 公告
		request({
			url: 'home/marquee',
			methods: 'get'
		}).then(res => {
			res.status == 1 ? showBar.value = true : showBar.value = false
			barText.value = res.content
		})
		// 文章
		request({
			url: 'home/article',
			methods: 'get'
		}).then(res => {
			artclList.value = res
		})

		// 弹窗 未完成
		request({
			url: 'home/alert',
			methods: 'get'
		}).then(res => {
			maskContent.value = res
			if (maskContent.value.length > 0) {
				showMask.value = true
			}
		})

		// 提现假数据
		request({
			url: 'home/deposit',
			methods: 'get'
		}).then(res => {
			withdrawList.value = res
		})

		// 充值假数据
		request({
			url: 'home/depositRecharge ',
			methods: 'get'
		}).then(res => {
			rechargeList.value = res
		})


	}

	const botHandle = (type, item) => {
		
		// 轮播图
		if (type == 2) {
			if (item.turn_type == 0) {
				return false
			}
			if (item.turn_type == 2) {
				window.open(item.link)
				return false
			}

			if (item.turn_type == 1) {
				// 文章详情
				uni.navigateTo({
					url: "../mine/article?id=" + item.article_id
				})
			}

		} else if (type == 3) {
			uni.navigateTo({
				url: "../mine/article?id=" + item.id
			})
		}
	}
	// 终于可以用了
	onLoad((e) => {
		rankList()
		if (e.code) {
			uni.navigateTo({
				url: '../login/register?code=' + e.code
			})
			return false
		}
		if (!uni.getStorageSync('setLang')) {
			request({
				url: 'setting/lang',
				methods: 'get',
			}).then(res => {
				uni.setStorageSync('lang', res[0].lang)
				uni.setStorageSync('setLang', true)
				window.location.reload()
			})
			return false
		}

		if (e.code && e.country) {
			uni.navigateTo({
				url: "../login/register?code=" + e
					.code + "&country=" + e.country
			})
		}
		getData()
	})
	const showLoading = ref(null)
	onMounted(() => {
		showLoading.value.loading = true
		setTimeout(() => {
			showLoading.value.loading = false
		}, 2000)
	})
</script>

<style lang="scss">
		
	.margintty{
		width: 94%;
		margin-left: 12px;
	}
	.movie_img{
		position: relative;
		.movie_header{
			background-image: url('../static/movie_start.png');
			background-size: 100%;
			z-index:999;
			position: absolute;
			background-repeat: no-repeat;
			width: 50rpx;
			height: 75rpx;
		}
	}
	.swiper-item_sty{
		width: 326rpx !important;
		height: 100%;
		.big_box{
			width: 326rpx;
			height: 100%;
			.rate{
				width: 100%;
				height: 72rpx;
				color:#fff;
			}
			.movie_name{
				width: 100%;
				height: 80rpx;
				color:#fff;
				text-indent:0.5em;
				
			}
			.watch{
				width:286rpx;
				height: 72rpx;
				color:#fff;
				line-height: 72rpx;
				color:#5799ef;
				margin: 0 auto;
				display: flex;
				justify-content: center;
				background-color: #121212;
				.add{
					width: 40rpx;
					height: 40rpx;
					margin: 8rpx 20rpx 0rpx 0rpx;
				}
			}
		}
		
	}
	.btn{
		margin-bottom: 20rpx;
		display: flex;
	}
	.movie_box{
		width: 306rpx;
		height: 100%;
		background-color: #1a1a1a;
	}
	.type{
		position: absolute;
		color: #fff;
		bottom: 16rpx;
		left: 16rpx;
		z-index: 999;
	}
	.withdrawEl {
		background-color: #1D1D1D;
		color: #fff;
		border-radius: 30rpx;
		padding: 47rpx 24rpx 0 24rpx;

		.honerItem {
			display: flex;
			align-items: center;
			font-size: 22rpx;
		}
	}

	.bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.botItem {
			background-color: #fff;
			border-radius: 20rpx;
			width: 48%;
			overflow: hidden;
			height: 166rpx;
			margin-bottom: 30rpx;
		}
	}

	.notice {
		// padding: 10rpx 0;
		// background-color: #fff;
		border-radius: 20rpx;
		margin-top: 34rpx;
		font-size: 28rpx;

	}

	.mt123 {
		margin-top: 100rpx;
	}

	.goodsItem {
		padding: 30rpx;
		border-radius: 30rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 25rpx;
		position: relative;
	}

	.goodsMask {
		position: absolute;
		left: 0;
		right: 0;
		height: 100%;
		border-radius: 30rpx;
		background: rgba(0, 0, 0, 0.5);
	}

	.wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;

		.content {
			margin-top: 300rpx;
			display: flex;
			width: 100%;
			background: #fff;
			border-radius: 8px;
			align-items: center;
			height: 600rpx;
			padding: 30rpx;
			position: relative;

			.closeBtn {
				position: absolute;
				bottom: -100rpx;
				left: 0;
				right: 0;
				margin: 0 auto;
			}
		}

		.maskItem {
			// height: 100%;
			height: 100% !important;
			overflow: hidden;
			background-color: aquamarine;

			// display: flex;
			// align-items: center;
			// justify-content: center;
			// overflow: scroll;
			img {
				width: 100% !important;
				height: 100% !important;
			}
		}

	}
</style>
