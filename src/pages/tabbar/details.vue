<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="pdlr35 pt53">
			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.secondColor}">{{movieData.desc}}</view>
			<video id="myVideo" :src="movieData?movieData.video:''"
			   @timeupdate='videoTime($event)' :controls="true" @error="videoErrorCallback"   controls>
			</video>
			
			<view  class='movieInformation'>
				<view style='font-weight: 600;'>
<!-- 					Movie introduction -->
					{{t('movie.m_c4')}}
				</view>
				<view class="introduction">
					{{movieData.producer}}
				</view>
				<view class="time">
					<view class="time_1">
						<view style='font-weight: 600;'>
<!-- 							Task requirements -->
							{{t('movie.m_c5')}}
							
						</view>
						<view class="">
<!-- 							Watch for -->
							{{t('movie.m_c6')}}
							{{time?time.detail.currentTime:0}} 
							{{t('movie.m_c7')}}
<!-- 							seconds -->
						</view>
						
						<view class="Rate" @click="Rate">
							<image :src="rating?'../../static/star1.png':'../../static/star.png'" mode="widthFix" style="width: 35rpx;height: 35rpx;"></image>
							{{rating?rating+'/10':t('movie.m_d1')}}
						</view>
						<view class="tatol_Rate">
<!-- 							评分 -->
							{{t('movie.m_c8')}}
							{{result}}
						</view>
					</view>
					<!-- <view class="tim_2">
						<view style='font-weight: 600;'>
							ReWard Price
						</view>
						<view style='color:linear-gradient(90deg,#fd4f19,#ffc265);' class="EUR">
							{{movieData.vip?movieData.vip.bonus:''}} EUR
						</view>
					</view> -->
				</view>
			</view>
<!-- 			 v-show="movieData.state" -->
			<view  class="btn" v-show="movieData.state">
<!-- 				<button  class="page-body-button" @click="storp(movieData,2)">Give up the task</button> -->
				  <button :disabled="disabledflag"  class="page-body-button1" :style="'background-color:'+color"  @click="storp(movieData,1)">{{t('movie.m_d6')}}</button>
			</view>
		</view>
		<view v-show='RateShow' class="popUp">
			<view  class="RateBtn">
				<view class="Cancel" @click="Cancel">
					x
				</view>
				<view class="wujiao">
					{{rating?rating:'?'}}
				</view>
				<view class="rate">
<!-- 					RATE THIS -->
						{{t('movie.m_c9')}}
				</view>
				<view class="desc">
					{{movieData.desc}}
				</view>
				<view class="tes">
					<image v-for="(item,index) in 10" :key='index' class="xin" @click="change(item,index)" :src="grade>=item?'../../static/star1.png':'../../static/star.png'" mode="widthFix" style="width: 45rpx;height: 45rpx;"></image>
					
				</view>index
				<button class='btnRate' :style="grade?'background-color: #f5c518':'background-color: #rgb(234, 201, 117);'" @click="submitScore(grade)">
<!-- 					Rate -->
					{{t('movie.m_d1')}}
				</button>
				
			</view>
		</view>
		<view v-show="pop" class="Popup">
			<view class="boxs">
				<view class="header">
<!-- 					提示 -->
					{{t('movie.m_c1')}}
					
				</view>
				<view class="main_texted">
					{{popText}}
				</view>
				<view class="sub">
					<!-- <view class="canner" @click="canner">
						<view class="no">
							取消
						</view>
					</view> -->
					<view class="verify" @click="verify">
						<view class="yes">
<!-- 							确定 -->
							{{t('movie.m_c3')}}
							
						</view>
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
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		Toast
	} from '@nutui/nutui';
	import { onMounted, ref } from 'vue';
	const store = userStore();
	
	import {
		useI18n
	} from "vue-i18n";
	
	const {
		t
	} = useI18n();
	
	const pop = ref(false)
	const popText = ref()
	const color = ref('#ccc')
	const rating = ref()
	//获取电影详情
	const movieData = ref({})
	const movieDetails = (id) =>{
		request({
			url:'task/detail',
			methods:'get',
			data:{movieId:id}
		}).then(res=>{
			console.log(res,'详情')
			movieData.value = res
			result.value = res.rate
		})
	}
	const methods = {
		back() {
			history.back()
		},
	
	};
	const time = ref()
	const videoTime = (e) =>{
		e.detail.currentTime = parseInt(e.detail.currentTime)
		time.value = e
	}
	
	const back = ref(0)
	const disabledflag = ref(false)
	const storp = (item,state) =>{
		
		if(time._rawValue.detail.currentTime>10 && rating.value>0){
			disabledflag.value = true
			request({
				url:'task/grab',
				methods:'post',
				data:{
					movieId:item.id,
					status:state,
					rate:result
				}
			}).then(res=>{
				popText.value = t('movie.m_d4')
				disabledflag.value = true
				pop.value = true
				back.value = 1
				
			})
		}else{
			popText.value =t('movie.m_d3')
			pop.value = true
		}
			
	}
	const grade = ref()
	const change = (item)=>{
		console.log(item)
		grade.value = item
		rating.value = item
	}
	
	//提交评分
	const result = ref({})
	const submitScore = (index) =>{
		if(index){
			rating.value = index
			RateShow.value = false
			color.value = 'orange'
		}else{
			return
			
		}
	}
	//取消
	const Cancel = () =>{
		RateShow.value = false
	}
	const verify = () =>{
		if(back.value == 1){
			methods.back()
		}
		pop.value = false
		
	}

	
	//评分
	const RateShow = ref(false)
	const Rate = () =>{
		
		if(time._rawValue.detail.currentTime>10){
			RateShow.value = true
			color.value = 'orange'
		}else{
			popText.value = t('movie.m_d2')
			pop.value = true
			
		}
	}
	watch(time,(newTime, oldTime)=>{
		if(parseInt(newTime.detail.currentTime)==10){
			RateShow.value = true
		}
		
	})
	// 终于可以用了
	onLoad(()=>{
		let data = uni.getStorageSync('item')
		movieDetails(data.id)
		
	})
	// created((){
	// 	console.log('sss')
	// })
	
</script>

<style lang="scss" scoped>
	.Popup{
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		top: 0px;
		z-index: 10000;
		.boxs{
			width: 600rpx;
			height: 350rpx;
			position: absolute;
			top:0;
			left: 0;
			right: 0;
			bottom:0;
			margin: auto;
			background-color: #ccc;
			color:#fff;
			border-radius: 3px;
			.header{
				width: 100%;
				height: 60rpx;
				text-align: center;
				line-height:100rpx;
			}
			.main_texted{
				width: 86%;
				height: 80rpx;
				padding: 15px;
				text-align: center;
				
			}
			.sub{
				display: flex;
				.verify{
					width: 100%;
					height: 100%;
					.yes{
						width: 150rpx;
						height: 60rpx;
						background-color: rgb(234, 201, 117);
						border-radius: 20rpx;
						margin: 34px auto;
						text-align: center;
						line-height: 60rpx;
						
					}
				}
				.canner{
					width: 50%;
					height: 100%;
					.no{
						width: 150rpx;
						height: 60rpx;
						background-color: #1D1D1D;
						border-radius: 20rpx;
						margin: 0 auto;
						text-align: center;
						line-height: 60rpx;
						
					}
				}
			}
		}
	}
	.Cancel{
		color: #fff;
		font-size: 1.5rem;
		display: inline-block;
		position: absolute;
		top: -27px;
		right: 24px;
	}
	.popUp{
		 position: fixed;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  background-color: rgba(0, 0, 0, 0.5);
		  justify-content: center;
		  align-items: center;
		  z-index:999;
	}
	.xin{
		margin: 0 8rpx;
	}
	.btnRate{
		// background-color: #f5c518;
		width: 640rpx;
		height: 72rpx;
		line-height: 72rpx;
	}
	.tes{
		width: 80%;
		// height: 200px;
		margin:10rpx auto;
		display: flex;
	}
	.desc{
		width: 93%;
		color: #fff;
		padding: 14px;
		height: 60rpx;
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.rate{
		color: rgb(234, 201, 117);;
		text-align: center;
		margin-top: 50px;
		font-size: 24rpx;
	}
	.shul{
		color: #fff;
		    font-size: 24px;
		    text-align: center;
		    width: 50rpx;
		    height: 50rpx;
		    line-height: 50rpx;
		    background: #5799ef;
			margin: 0 8rpx;
			// position: absolute;
			// top:-120rpx;
			// left:50%;
			// margin-left: -100rpx;
		    /* 绘制路径 */
		    clip-path:polygon(50% 0,65% 40%, 100% 40%,72% 60%,85% 100%,50% 75%,15% 100%,28% 60%,0 40%,35% 40%);
	}
	.wujiao{
		text-align: center;
		font-size: 48rpx;
		color: #fff;
		    width: 200rpx;
		    height: 200rpx;
		    line-height: 200rpx;
		    background-image: url('../../static/star1.png') ;
			background-size: 200rpx;
			background-repeat: no-repeat;
			position: absolute;
			top:-120rpx;
			left:50%;
			margin-left: -100rpx;
		    /* 绘制路径 */
	
	}
	.RateBtn{
		width: 100%;
		height: 600rpx;
		position: absolute;
		background-color: #121212;
		bottom: 0;
	}
	.Rate{
		color:#5799ef;
		margin-left: 10px;
		font-size: 36rpx;
		display: inline-block;
		margin-right: 10px;
	}
	.tatol_Rate{
		display: inline-block;
		
	}
	#myVideo{
		width: 99% !important;
	}
	.introduction{
		width: 100%;
		height: 100%;
		display: flex;
	}
	.movieInformation{
		background: #1D1D1D;
		color:#fff;
		padding: 10px;
		font-size: 28rpx;
		line-height: 40rpx;
	}
	.time{
		display: flex;
		.time_1{
			width: 70%;
		}
		.time_2{
			width: 30%;
			.EUR{
				color:red
			}
		}
	}
		
	.btn{
		display: flex;
		margin-top: 30rpx;
	}
	.page-body-button{
		width: 330rpx;
		height: 100rpx;
		color:#fff;
		font-size: 24rpx;
		text-align: center;
		line-height: 100rpx;
		
		
	}
	.page-body-button1{
		width: 410rpx;
		height: 110rpx;
		color:#fff;
		font-size: 30rpx;
		text-align: center;
		line-height: 110rpx;
		
		
	}
</style>