<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt53">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.thirdColor}"> {{t('all.a_c3')}}</view>

			<view class="mt80 pb50">
				<view class="kefuItem flex col_center" v-for="(item,index) in langList" @click="setHandle(index)"
					:style="langInd == index?choStyle:''">
					<image :src="`/static/lang/${item.lang}.png`" mode="widthFix" style="width: 60rpx;height: 60rpx;">
					</image>
					<view class="mglr40 f40">
						{{item.name}}
					</view>
				</view>

				<!-- 	<view class="btns f40" :style="{background:store.$state.contentColor}" >
					{{t('all.a_c1')}}
				</view> -->
			</view>
		</view>
	</view>
</template>

<script setup>
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	// import {
	// 	Toast
	// } from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
import i18n from 'i18n/i18n';
	const store = userStore();
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const methods = {
		back() {
			history.back()
		},

	};
	const choStyle = {
		background: store.$state.contentColor,
		color: '#000'
	}
	const langList = ref([])
	const langInd = ref(0)
	const getData = () => {

		request({
			url: 'setting/lang',
			methods: 'get',
		}).then(res => {
			let langVal = uni.getStorageSync('lang')
			langList.value = res
			langList.value.forEach((item, index) => {
				if (langVal == item.lang) {
					langInd.value = index
				}
			})
		})
	}
	const setHandle = (index) => {
		uni.setStorageSync('lang', langList.value[index].lang)
		
		i18n.locale = langList.value[index].lang
		window.location.reload()
		// uni.redirectTo({
		// 	url:'./langSetting'
		// })
		// history.go(0)
		// window.history.pushState(null, null, "/pages/mine/langSetting");
		// window.open(item.contact_link)
	}
	// 终于可以用了
	onShow(() => {
		getData();
	})
</script>

<style lang="scss">
	.kefuItem {
		background-color: #1D1D1D;
		border-radius: 30rpx;
		margin-bottom: 40rpx;
		padding: 35rpx 30rpx;
		transition: .3s linear all;
		color: #fff;
	}

	.btns {
		margin-top: 200rpx;
		text-align: center;
		height: 120rpx;
		box-shadow: 0px 11rpx 47rpx 4rpx rgba(247, 175, 64, 0.35);
		border-radius: 35rpx;
		color: #fff;
		line-height: 120rpx;
	}
</style>
