<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="pdlr35 pt53">
			<view class="nav">
				<view class="flex between margin">
					<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
						@click="methods.back"></image>
				</view>
				<view class="task_navigation"> 
					{{t('movie.m_a5')}}
				</view>
			</view>
			
			<view class="mian">
							<view class="main_movie"  v-for="(item,index) in rankListRef">
								<view class="movie_cover">
									<view class="header">
<!-- 										task time -->
										 {{t('movie.m_a7')}}：{{item.create_time_format}}
									</view>
									<view class="number">
<!-- 										task number -->
										
										{{t('movie.m_a8')}}: {{item.createTime}}
									</view>
									<view class="movie_img">
										<view class="">
											<image :src="item.movie.cover" mode="" style="width: 175rpx;height: 175rpx;"></image>
										</view>
										<view class="text">
											{{item.movie.title}}
										</view>
									</view>
									<view class="footer">
										<view class="">
											{{t('movie.m_a9')}}
<!-- 											commission -->
										</view>
										<view class="">
											{{item.commission}}
										</view>
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
		onLoad,
		onReachBottom
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
	const methods = {
		back() {
			history.back()
		},
	};
	let page = ref(1)
	const rankListRef = ref()
	const rankList = () =>{
		request({
			url:'task/record',
			methods:'get',
			data:{
				page:page.value,
				size:10
			}
		}).then(res=>{
			console.log(page.value)
			if(page.value == 1){
				rankListRef.value = res.data
			}else{
				const data = rankListRef.value
				let newData = rankListRef.value.concat(res.data)
				rankListRef.value = newData
				
			}
		})
	}
	onLoad(()=>{
		rankList()
		
	})
	onReachBottom(()=>{
		page.value = page.value+1
		
		rankList()
		
	})
	
</script>
<style lang="scss" scoped>
	.nav{
		position: fixed;
		top:0;
		width: 100%;
		color:#fff;
		height: 92rpx;
		background: #000;
		z-index: 999;
		display: flex;
		.margin{
			// margin-left: 90rpx;
			position: absolute;
			margin-top: 17px;
		}
		.task_navigation{
			text-align:center;
			font-size: 1.125rem;
			line-height:92rpx;
			width: 100%;
		
		}
	}
	
	.mian{
		width: 95%;
		padding: 20rpx;
		display: flex;
		justify-content: space-around;
		margin-top: 50rpx;
		flex-wrap: wrap;
		.main_movie{
			width:100%;
			height:400rpx;
			background-color: #1D1D1D;
			margin-bottom: 40rpx;
			padding: 10rpx;
			.movie_cover{
				color:#fff;
				width: 90%;
				height: 90%;
				margin: auto;
				.header{
					margin-bottom: 5px;
				}
				.number{
					margin-bottom: 5px;
				}
				.movie_img{
					margin-bottom: 40rpx;
					display: flex;
					height: 170rpx;
					.text{
						padding: 10px;
						width: 350rpx;
						height: 100%;
					}
				}
				.footer{
					display: flex;
					justify-content: space-between;
				}
			}
			.movie_introduce{
				width: 100%;
				height: 100rpx;
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
						color:yellow;
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