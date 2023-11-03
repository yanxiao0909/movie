<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt53 pb50 ">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="goBack"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.thirdColor}">{{t('wr.r_r1')}}</view>
			<view class="mt38">
				<!-- top4 -->
				<view class="mt30 top_box">
					<view class="f26 flex  col_center">
						{{t('wr.r_r4')}}: <text class="pl10 f34"
							:style="{'color':store.$state.thirdColor}">{{showTime}}</text>
					</view>
					<view class="mt34  flex-wrap between">
						<view class="items ">
							<view class="iTitle">{{t('wr.r_r5')}}</view>
							<view :style="topItemStyle">{{pageData.order_no}}</view>
						</view>
						<view class="items ">
							<view class="iTitle">{{t('wr.r_r6')}}</view>
							<view :style="topItemStyle">{{pageData.amount}}</view>
						</view>
						<view class="items topLine ">
							<view class="iTitle">{{t('wr.r_r10')}}</view>
							<view :style="topItemStyle">
								{{t('wr.r_r7')}}
							</view>
						</view>
						<view class="items topLine">
							<view class="iTitle">USDT</view>
							<view :style="topItemStyle">{{pageData.amount ?((pageData.amount) * rate).toFixed(2):0 }}
							</view>
						</view>
					</view>
				</view>

				<view class="addressBox">
					<view class="typeList center mb30">
						<view class="mglr20 typeItem" v-for="(item,index) in typeList"
							:style="typeInd== index?choStyle:''" @click="changeCode(index)">{{item.name}}</view>
					</view>
					<qrcode-vue :value="addresData" v-if="addresData" :size="163" level="H" />

					<view class="mt35 f26">
						{{t('wr.r_r8')}}
					</view>
					<view class="mt23 f22 addCopyEl " @click="copyHandle(addresData)">
						<view class="addEl">
							{{addresData}}

						</view>
						<view class="copy" @click="copyHandle(addresData)" :style="choStyle">copy</view>
					</view>

					<view class="copyBtn">
						<view>1,Please transfer money to this address to recharge through the trc20 wallet. After
							completing the recharge, you can upgrade and do tasks to earn commissions.</view>
						<view class="mt20">
							2,Please refresh the page after recharging.
						</view>
					</view>
				</view>

				<view class="btns mt78 center" :style="noStyle" style="box-shadow: none;background-color: #1D1D1D;"
					@click="cancleOrder">
					<view>
						{{t('wr.r_r9')}}
					</view>
				</view>
				<view class="btns mt22 center" :style="choStyle" @click="methods.back">
					{{t('wr.r_r3')}}
				</view>



			</view>
		</view>

		<nut-overlay v-model:visible="cancleHandlemMask">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">{{t('wr.r_r12')}}</view>
					<view class="f30 mt40">
						{{t('wr.r_r11')}}
					</view>
					<view class="between">
						<view :style="{border:'1rpx solid #ccc'}">{{ t('all.a_c2')}}</view>
						<view :style="{background:store.$state.contentColor}" @click="confirmHandle"
							style="color: #000;"> {{t('all.a_c1')}}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import QrcodeVue from 'qrcode.vue'
	import useClipboard from 'vue-clipboard3'
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad,
		onHide
	} from "@dcloudio/uni-app";
	import {
		onMounted
	} from 'vue';
	const store = userStore();
	const {
		toClipboard
	} = useClipboard()
	const modal_qr = ref(false)
	import {
		useI18n
	} from "vue-i18n";
	const {
		t
	} = useI18n();
	const methods = {
		back() {
			if (!uploadTxid.value) {
				uni.showModal({
					title: 'Tips',
					content: 'Please transfer money from the trc20 wallet to the receiving address as soon as possible!',
					confirmText: 'Confirm',
					cancelText: 'Cancel',
					success: e => {
						if (e.confirm) {
							uni.switchTab({
								url: "../tabbar/index"
							})
						} else {

						}
					}
				});
			} else {
				uni.navigateTo({
					url: "./usdtTxid"
				})
			}
		},
	};

	const typeList = [{
			name: 'TRC20'
		},
		// {
		// 	name:'USDT'
		// }
	]
	const typeInd = ref(0)

	const choStyle = {
		background: store.$state.contentColor,
		color: '#000',
		border: 'none'
	}
	const noStyle = {
		color: store.$state.contentColor,
	}
	const topItemStyle = {
		color: store.$state.thirdColor,
		marginTop: '10rpx'
	}
	const changeCode = (ind) => {
		typeInd.value = ind
		// if (typeInd.value == 0) {
		// 	codeUrl.value = "https://www.baidu.com"
		// } else if (typeInd.value == 1) {
		// 	codeUrl.value = "https://www.bilibili.com/"
		// }
	}
	const pageData = ref({})
	const addresData = ref("")

	const timer = ref(null)
	const showTime = ref(0)
	const rate = ref(0)
	const times = ref(0)

	const uploadTxid = ref(null)
	const getData = () => {
		request({
			url: 'finance/usdt/recharge/index',
			methods: 'get'
		}).then(res => {
			if (!res.order) {
				Toast.text('Order completed')
				uni.navigateTo({
					url: '/'
				})
				return false
			}
			addresData.value = res.address
			pageData.value = res.order

			try {
				if (res.type) {

					res.type == 1 ? uploadTxid.value = false : uploadTxid.value = true
				}
			} catch (e) {
				//TODO handle the exception
			}

			rate.value = res.rate
			if (timer.value) {
				clearInterval(timer.value)
			}
			times.value = res.order.expire_time
			startTimer()
		})
	}
	const changePage = () => {
		uni.navigateTo({
			url: "./usdtTxid"
		})
	}
	const goBack = () => {
		uni.switchTab({
			url: '../tabbar/index'
		})
	}
	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			Toast.text(t('all.a_d1') + " " + t('all.a_c9'))
		} catch (e) {
			console.error(e)
		}
	}
	const cancleHandlemMask = ref(false)
	const cancleOrder = () => {
		cancleHandlemMask.value = true
	}
	const confirmHandle = () => {
		request({
			url: 'finance/usdt/recharge/cancel',
			methods: 'post',
			data: {
				order_no: pageData.value.order_no
			}
		}).then(res => {
			Toast.text(t('wr.r_r13'))
			uni.navigateTo({
				url: '/'
			})
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	const changeTime = (num) => {
		let minute = parseInt(num / 60)
		let second = num % 60
		showTime.value = (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' + second : second)
	}
	// 开始时间减减

	const startTimer = () => {
		const that = this
		timer.value = setInterval(() => {
			if (times.value == 0) {
				clearTimeout(timer.value)
				Toast.text('Order completed')
				methods.back()
			} else {
				times.value--;
				changeTime(times.value)
			}
		}, 1000)
	}
	// 终于可以用了
	onMounted(() => {
		getData()
	})
	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
</script>

<style lang="scss">
	.copyBtn {
		font-size: 24rpx;
		margin-top: 20rpx;
		width: 100%;
		color: #EAC975;
	}

	.btns {
		height: 120rpx;
		// line-height: 120rpx;
		border-radius: 35rpx;
		color: #fff;
		overflow-scrolling: touch;
		-webkit-overflow-scrolling: touch !important;
	}

	.top_box {
		padding: 35rpx 40rpx;
		background-color: #1D1D1D;
		border-radius: 30rpx;
		color: #fff;

		.items {
			width: 48%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			height: 140rpx;
			font-size: 24rpx;
			background-color: #333;
			margin-bottom: 24rpx;
			border-radius: 20rpx;
		}

		.flex-wrap {
			flex-wrap: wrap;
		}
	}

	.addressBox {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 35rpx 25rpx 35rpx 35rpx;
		border-radius: 30rpx;
		background-color: #1D1D1D;
		color: #fff;

		.typeItem {
			padding: 14rpx 32rpx;
			border-radius: 10rpx;
			border: 1rpx solid #eee;
		}

		.addCopyEl {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.addEl {
			color: #EAC975;
			height: 60rpx;
			background: #333;
			border-radius: 10rpx;
			// padding: 0 30rpx;
			text-align: center;
			line-height: 60rpx;
			padding: 0 20rpx;
			flex: 1;
			margin-right: 20rpx;
		}

		.copy {
			padding: 0 20rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 10rpx;
		}
	}

	.wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;

		.content {
			margin-top: 400rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 350rpx;
			background: #1D1D1D;
			color: #fff;
			border-radius: 30rpx;
			// justify-content: center;
			padding-top: 50rpx;
			position: relative;
			overflow: hidden;

			.between {
				position: absolute;
				bottom: 0;
				width: calc(100% - 80rpx);
				padding: 0 30rpx 40rpx;

				view {
					width: 48%;
					height: 100rpx;
					color: #fff;
					text-align: center;
					line-height: 100rpx;
					font-size: 30rpx;
					border-radius: 50rpx
				}
			}
		}
	}
</style>
