<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="pdlr30 pt23" >
			<view class="task_navigation"> {{t('movie.m_a6')}} </view>
			<view class="Historical" @click="historical">
				{{t('movie.m_a1')}}
			</view>
					<view class="mian_top">
									<view class="mian_top_box">
										<view class="">
											{{t('movie.m_a2')}}({{unidad}})
										</view>
										<view class="weight">
											{{income?income.month:''}}
										</view>
									</view>
									<view class="mian_top_box">
										<view class="">
											{{t('movie.m_a3')}}({{unidad}})

										</view>
										<view class="weight">
											{{income?income.total:''}}
										</view>
									</view>
									<view class="mian_top_box">
										<view class="">
											{{t('movie.m_a4')}}
											
										</view>
										<view class="weight">
											{{totle?totle.done:''}}/{{totle?totle.total:''}}
										</view>
									</view>
								</view>
			
					<view class="mian" >
							<view class="main_movie"  v-for="(item,index) in rankListRef">
								<view class="movie_cover">
			<!-- 						<view class='movie_text'></image> -->
			                        <view class="movie_header">
			                        	
										<nut-icon  name="uploader" style="margin-left: 2px; margin-top: 3px;" color="#FFF"></nut-icon>
										
			                        </view>
									<image  :src="item.cover" mode="scaleToFill"
										style=" width: 100%;height: 500rpx;">
									</image>
								</view>
								<view class="movie_introduce">
									<view class="movie_text">
										{{item.title}}
									</view>
									<view class="movie_task">
										<nut-icon v-if='item.state==2' class='yes'  name="Check" style="margin-top: 20rpx;margin-left: 28rpx; color:rgb(234, 201, 117);" ></nut-icon>
										<nut-icon v-else name="uploader"  style="margin-top: 20rpx;margin-left: 28rpx;"  color="#ccc"></nut-icon>
										
										<button class='btn'  v-show='item.state==2'  @click="details(item)">complete</button>
										<button class='btn2' v-show='item.state==1||item.state==3'   @click="details(item)">initiate</button>
										
									</view>
								</view>
							</view>
							
						
					<!-- 	<view class="main_movie">
							<view class="">
								
							</view>
							<view class="">
								
							</view>
						</view> -->
					</view>
		</view>
		
		<Loading ref="showLoading"></Loading>
		<view style="width: 100%;height: 60px;"></view>
		
		<Tabbar :activeIndex="1"></Tabbar>
		
	</view>
</template>

<script setup>
	import Tabbar from '@/components/botTabbar/botTabbar.vue'
	import request from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	// import {
	// 	Toast
	// } from '@nutui/nutui';
	import {
		onShow,
		onLoad,
		onPageScroll,
		onHide
	} from "@dcloudio/uni-app";
	import {
		Toast
	} from '@nutui/nutui';
import { onMounted } from 'vue';
	const store = userStore();
	
	import {
		useI18n
	} from "vue-i18n";
	
	const {
		t
	} = useI18n();
	
	//收入
	const income = ref()
	const totle = ref()
	const getIncome = () =>{
		request({
			url:'task/index',
			methods:'get'
		}).then(res=>{
			income.value = res.income
			totle.value = res.task
			
		})
	}
	const historical = () =>{
		uni.navigateTo({
			url:'./historical'
		})
	}
	
	const showLoading = ref(null)
	//详情
	const details = (item) =>{
		uni.setStorageSync("item",item)
		uni.setStorageSync("newsTop",item)
		uni.navigateTo({
			url:'./details'
		})
	}
	
	const rankListRef = ref()
	const rankList = () =>{
		
		request({
			url:'task/list',
			methods:'get'
		}).then(res=>{
			showLoading.value.loading = false
			
			console.log(res,'wode')
			rankListRef.value = res.data
			
		})
	}
	
	
	
	onLoad(()=>{
		getIncome()
		rankList()
		
	})
	const datass = ref()
	onPageScroll((e)=>{
		datass.value = e.scrollTop;
		uni.setStorage({
			key:"newsTop",
			data:datass.value
		})
	})
	//货币单位
	const unidad = ref()
	onMounted(()=>{
		unidad.value = uni.getStorageSync('currency')
	})

	onShow(()=>{
		rankList()
		getIncome()
		uni.getStorage({
			key:"newsTop",
			success:(res)=> {
				//在onshow中如果要使用uni.pageScrollTo方法让页面滚动到指定位置，需要使用定时器才可以
				var timer = setTimeout(()=>{
					uni.pageScrollTo({
						scrollTop: res.data,  //距离页面顶部的距离
						duration: 0
					});
					clearTimeout(timer);
				},10)
			}
		});
	})
	
	// onBackPress((e)=>{
	// 	if(e.from == "backbutton"){
	// 		uni.setStorage({
	// 			key:"newsTop",
	// 			data:0
	// 		})
	// 		uni.navigateBack();
	// 		return true;
	// 	}
	// })
	
</script>

<style lang="scss" scoped>e
	.yes{
		color:rgb(234, 201, 117);
	}
	.Historical{
		position: fixed;
		top: 13px;
		color: #fff;
		z-index: 9999;
		right: 15px;
		background: rgb(29, 29, 29);
	}
		.mian_top{
				width: 100%;
				height: 150rpx;
				display: flex;
				overflow: hidden;
				justify-content: space-around;
				margin-top:100rpx;
				color:#fff;
				font-size: 24rpx;
				.mian_top_box{
					width: 190rpx;
					padding: 10rpx;
					height: 110rpx;
					background: rgb(29, 29, 29);
					border-radius: 8px;
					.weight{
						font-weight: 600;
						margin-top: 12px;
					}
				}
			}
	.movie_header{
		background-image: url('../static/movie_start.png');
		background-size: 100%;
		z-index:999;
		position: absolute;
		background-repeat: no-repeat;
		width: 50rpx;
		height: 75rpx;
		
	}
	.task_navigation{
	
		color:#fff;
		text-align:left;
		font-size: 1.125rem;
		position: fixed;
		top:0;
		width: 100%;
		height: 92rpx;
		line-height:92rpx;
		background: #000;
		z-index: 1000;
		text-indent: 1em;
	}
	.userName{
		color:#fff;
		text-align: center;
		font-size: 30rpx;
	}
	.nav{
		display: flex;
	}
	.margin	{
		// margin-left: 52rpx;
		z-index: 1000;
		position: fixed;
		left: 60rpx;
	}
	    .task_navigation{
			left: 10px;
	    	color:#fff;
	    	// text-align:center;
	    	font-size: 1.125rem;
	    	position: fixed;
	    	top:0;
	    	width: 100%;
	    	height: 92rpx;
	    	line-height:92rpx;
	    	background: #000;
			z-index: 1000;
	    }
	.mian{
		width: 95%;
		padding: 20rpx;
		display: flex;
		justify-content: space-around;
		margin-top: 50rpx;
		flex-wrap: wrap;
		.main_movie{
			width:46%;
			height:700rpx;
			margin-bottom: 40rpx;
			.movie_cover{
				width: 100%;
				height: 500rpx;
			}
			.movie_introduce{
				width: 100%;
				height: 200rpx;
				background-color: #1D1D1D;
				.movie_text{
					width: 90%;
					height: 80rpx;
					padding: 10rpx;
					text-align: center;
					color:#fff;
					overflow:hidden;
					text-overflow:ellipsis;
					display:-webkit-box;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2;
				// 	line-height: 80rpx;
				}
				.movie_task{
					width: 90%;
					height: 80rpx;
					margin: 0 auto;
					display: flex;
					background-color:#121212 ;
					
					.btn{
						width:70%;
						height: 80rpx;
						text-align: left;
						line-height:80rpx;
						background-color:#121212 ;
						margin-left: 30rpx;
						color:rgb(234, 201, 117);;
						padding-left: 0px
						
					}
					.btn2{
						width:70%;
						height: 80rpx;
						text-align: left;
						line-height:80rpx;
						background-color:#121212 ;
						margin-left: 30rpx;
						color:#ccc;
						padding-left: 0px
					}
				}
			}
		}
	}

</style>
