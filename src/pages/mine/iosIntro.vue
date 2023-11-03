<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr30 pt53">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.thirdColor}">{{t('add1.a_d1') + " APP"}}</view>
			
			
			<view class="flex mt20" style="justify-content: space-between; flex-wrap: wrap;">
				<view v-for="(item,index) in list" style="width: 48%;" class="mgtb40">
					<view class="text_bold f40">{{index+1}}</view>
					<image :src="item" mode="" style="width: 100%; height: 800rpx;"></image>
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
	import {
		Toast
	} from '@nutui/nutui';
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
const list = ref([
		'/static/download/1.png',
		'/static/download/2.png',
		'/static/download/3.png',
		'/static/download/4.png',
	])
	// 终于可以用了
	onLoad(() => {

	})
</script>

<style lang="scss">
	page {
		font-family: PingFangSC;
	}


</style>
