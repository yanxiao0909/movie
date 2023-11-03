<template>
	<view :style="store.$state.imgObj.loginBg" >
		<view class="pdlr48 pt40">

			<!-- head -->
			<view class="between ">
				<view class="secondClo" style="font-weight: normal;" :style="{color:store.$state.secondColor}">
					<view class="f32 text_bold">
						{{pageData.phone}}
					</view>
					<view class="f22 mt10">
						{{t('act.m_m1')}}: <text class="pl10">{{pageData.invite_code}}</text>
						<image class="mglr10" :src="store.$state.my.copy" mode="widthFix"
							style="width: 22rpx;height: 22rpx;" @click="copyHandle(pageData.invite_code)"></image>
					</view>
				</view>

				<nut-badge dot v-if="showBadge" right="10" top="5" size>
					<image :src="store.$state.my.notice" mode="widthFix" style="width: 70rpx;height: 70rpx;"
						@click="changePage('./notice')"></image>
				</nut-badge>
				<!-- <image :src="store.$state.my.notice" mode="widthFix" style="width: 70rpx;height: 70rpx;"
					@click="changePage('./notice')" v-else></image> -->
			</view>

			<!-- box -->
			<view class="mt20 bBox" :style="store.$state.my.topBox" style="color: #000;">

				<view class="f24 mt20">{{t('mine.m_t4')}}</view>
				<view style="font-size: 48rpx;" class="mt20 f70 ">{{pageData.balance?(pageData.balance/1).toFixed(2):0}} {{currency}}</view>
				<view class="mt26 boxItemBox ">
					<view class="boxItem" v-for="(item,index) in boxItem" >
						<image :src="item.img" mode="widthFix" style="width: 35rpx;height: 35rpx;"></image>
						<view class="title mgtb10  f20">{{item.name}}</view>
						<view class="f24  secondClo" :style="{color:store.$state.secondColor}">
							{{item.value?(item.value/1).toFixed(2):0}}
						</view>
					</view>
				</view>
			</view>

			<!-- withdraw -->
			<view class="between mt40">
				<view @click="myTask"  class="bItem" :style="{background:store.$state.contentColor}"
					>
					<view class="mglr27" style="color: #000;">
<!-- 						More task -->
						{{t('movie.m_b1')}}
					</view>
				</view>
				<view @click="goTask" class="bItem" style="background:#1D1D1D" >
					<view class="mglr27">
<!-- 				 My Task -->
				 {{t('movie.m_b2')}}
					</view>
				</view>
			</view>
			

			<view class="mt60 myEl">
				<view class="myItem" v-for="(item,index) in myList" @click="changePage(item.url)"
					v-show="item.showFlag">
					<view class="flex col_center">
						<image :src="item.img" mode="widthFix" style="width: 65rpx;height: 65rpx;"></image>
						<view class="mglr15  textHidden " style="flex: 1;">{{item.name}}</view>
					</view>
					<nut-icon name="arrow-right" color="#fff"></nut-icon>
				</view>
			</view>
			
		</view>
		
		

		<div class="drag-boundary"></div>
			
		<view style="height: 50rpx;"></view>

		<!-- v-if="showAllAct v-if="showSign"" -->
		<view style="width: 100%;height: 60px;"></view>
		<Tabbar :activeIndex="4"></Tabbar>
		
		
	</view>
</template>

<script setup>
	import Tabbar from '@/components/botTabbar/botTabbar.vue'
	import COUNTRY from "../../../setting.js"
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import useClipboard from 'vue-clipboard3'
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();
	const {
		toClipboard
	} = useClipboard()
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const showBadge = ref(false)
	const showAllAct = ref(true)
	const showSign = ref(false)
	const showDraw = ref(false)
	const showHong = ref(false)
	const showEgg = ref(false)
	const eggId = ref(0)
	
	//跳转task页面
	const goTask = () =>{
		uni.navigateTo({
			url:'./task'
		})
	}
	
	//跳转myTask页面
	const myTask = () =>{
		uni.navigateTo({
			url:'./myTask'
		})
	}
	
	const getAct = () => {
		// 获取签到
		request({
			url: 'activity/status',
			methods: 'get',
		}).then(res => {
			try {
				res.lottery.status == 1 ? showDraw.value = true : ''
				res.signIn.status == 1 ? showSign.value = true : ''
				res.prizePackage.status == 1 ? showHong.value = true : ''
				res.goldenEgg.status == 1 ? showEgg.value = true : ''
				eggId.value = res.goldenEgg.id
			} catch (e) {
				//TODO handle the exception
			}
		})
	}

	const boxItem = ref([{
			name: t('add1.a_d8'),
			value: '0',
			img: store.$state.my.boxItem[1]
		},
		{
			name: t('add1.a_d9'),
			value: '0',
			img: store.$state.my.boxItem[2]
		},
	])
	// myList
	const myList = ref([
		{
			name: t('mine.m_m5'),
			img: store.$state.my.myList[0],
			url: '../mine/accountDetails',
			showFlag: true,
		},
		
		{
			name: 'Recharge',
			img: '/static/themeNum1/icon/ll2.png',
			url: './recharge',
			showFlag: true,
		},	{
			name: 'Withdraw',
			img: '/static/themeNum1/icon/ll3.png',
			url: '../mine/withdraw',
			showFlag: true,
		},
		{
			name: t('mine.m_m10'),
			img: store.$state.my.myList[7],
			url: '../setting/setUp',
			showFlag: true,
		},
		
{
			name: 'Service Center',
			img: '/static/themeNum1/icon/ll1.png',
			url: './service',
			showFlag: true,
		},
		{
			name: t('mine.m_m7'),
			img: store.$state.my.myList[2],
			url: '../record/rechargeRecord',
			showFlag: true,
		},

		{
			name: t('mine.m_m6'),
			img: store.$state.my.myList[3],
			url: '../record/withdrawRecord',
			showFlag: true,
		},
		{
			name: t('mine.m_m9'),
			img: store.$state.my.myList[4],
			url: '../mine/share',
			showFlag: true,
		},
		{
			name: t('mine.m_m8'),
			img: store.$state.my.myList[1],
			url: '../mine/team',
			showFlag: true,
		},

		{
			name: t('add1.a_d1') + " APP",
			img: '/static/themeNum1/index/indexComm8.png',
			showFlag: true,
			url:'down'
			// url:"https://www.binance.com/en"
		},

		{
			name: t('movie.m_d5'),
			img: '/static/themeNum1/icon/ll4.png',
			showFlag: true,
			url:"../mine/article?id=" + 18
		},


	])


	const changePage = (url) => {
	console.log(url)
		if (url == 'down') {
			var userAgent = navigator.userAgent; //获取userAgent信息
			if (userAgent.includes('iPhone')) {
				uni.navigateTo({
					url: '../mine/iosIntro'
				})
				return false
			}
			window.open(appData.value.url)
		} else {
			if ( url == './notice' || url == './service') {
				uni.navigateTo({
					url
				})
			}else {
				uni.navigateTo({
						url
					})
			}

		}
	}

	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			Toast.text(t('all.a_d1') + " " + t('all.a_c9'))
		} catch (e) {
			console.error(e)
		}
	}
	const goRecharge = (url) => {
		uni.navigateTo({
			url: './recharge'
		})
	}
	const pageData = ref({
		balance: '0'
	})
	const appData = ref({})
	const getData = () => {
		request({
			url: 'user/index',
			methods: 'get',
		}).then(res => {
			res.phone = res.phone.substring(0,1)+"****"+res.phone.substr(res.phone.length-4),
			
			pageData.value = res
			boxItem.value[0].value = res.lock_balance
			boxItem.value[1].value = res.withdraw_balance
		})
	
		// 获取app状态
		request({
			url: 'setting/app',
			methods: 'get',
		}).then(res => {
			if (res.download_status == 1) {
				myList.value.forEach(item=>{
					if(item.url == 'down'){
						item.showFlag = true
					}
				})
				appData.value = res
			}
		})
		// 获取app状态
		request({
			url: 'user/unreadNoticeNum',
			methods: 'get',
		}).then(res => {
			res > 0 ? showBadge.value = true : showBadge.value = false
		})
		request({
			url: 'setting/currency',
			methods: 'get'
		}).then(res => {
			currency.value = res.currency ? res.currency : 'USDT'
		})
	}
	const currency = ref("")
	// 终于可以用了
	onShow(() => {
		getData()
		getAct()
	})
</script>

<style lang="scss">
	.bBox {
		// height: 389rpx;
		height: 451rpx;
		display: flex;
		align-items: center;
		// justify-content: center;
		flex-direction: column;
		padding: 0 80rpx;
		color: #fff;

		.boxItemBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: rgba(0, 0, 0, 0.6);
			padding: 29rpx 27rpx;
			width: 100%;
			border-radius: 30rpx;
			color: #000;

			.title {
				color: #AFAFAF;
				width: 90%;
				text-align: center;
				height: 50rpx;
				display: flex;
				align-items: center;

				justify-content: center;
			}

			.boxItem {
				display: flex;
				align-items: center;
				flex-direction: column;
				width: 48%;
			}
		}
	}

	.bItem {
		width: 48%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		// padding: 41rpx 35rpx;
		border-radius: 25rpx;
		height: 125rpx;

	}

	.myEl {
		
		width: 100%;

		.myItem {
			padding:12rpx 32rpx;
			background-color: #1D1D1D;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			// width: 100%;
			text-align: center;
			font-size: 26rpx;
			color: #fff;
			margin-top: 20rpx;
		}
	}



	.rightIcon {
		top: 40%;
		right: 45rpx;
		display: flex;
		align-items: center;
		flex-direction: column;

		image {
			margin-top: 50rpx;
		}
	}

	.openBg {
		background-color: rgba(25, 25, 25, 0.3);
		padding: 30rpx 30rpx 30rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-content: space-between;
		position: relative;
		overflow: hidden;

		.closeIcon {
			position: absolute;
			right: 10rpx;
			top: 10rpx;
		}

	}

	.actItem {
		animation: fadeInDown;
		/* referring directly to the animation's @keyframe declaration */
		animation-duration: 1s;
	}
</style>
