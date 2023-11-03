<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr50 pt53">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{t('add1.a_d1')}}</view>

			<view class="mt90">
				<view class="center flex_col">
					<image src="../../static/titleIcon/wyf.png" mode="widthFix" style="width: 300rpx; height: 300rpx;">
					</image>

					<view class="mt40 f40 downloadBtn" :style="{background:store.$state.contentColor}">
						<a class="blink ios" href="itms-services://?action=download-manifest&url=https://ios.wyfapp.com/info.plist">{{t('add1.a_d1') +" APP"}}</a>
						</view>

					<view class="mt80">
						<qrcode-vue :value="codeUrl" :size="100" level="H" />
					</view>
				</view>
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
	import QrcodeVue from 'qrcode.vue'
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
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
	const codeUrl = ref("itms-services://?action=download-manifest&url=https://ios.wyfapp.com/info.plist")
	// 终于可以用了
	onShow(() => {
		console.log();
	})
</script>

<style lang="scss">
	.downloadBtn {
		margin-top: 80rpx;
		width: 100%;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
		height: 100rpx;
		border-radius: 20rpx;
	}
	
	a{
		text-decoration: none;
		color: #fff;
		width: 100%;
		height: 100%;
	}
</style>
