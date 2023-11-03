<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="nav">
			<view class="flex between margin">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="task_navigation"> 
<!-- 			task Introduction -->
			{{t('movie.m_b4')}}
			</view>
		</view>
		<!-- <view class="main">
			<view class="main_box">
				<view class="header">
					
				</view>
				<view class="main_text">
					<view class="">
						Awards 1 nomination
					</view>
					<view class="">
						>
					</view>
				</view>
			</view>
		</view> -->
		<view class="main">
		     <view class="main_box"  >
		         <view class="main_box_Center">
<!-- 		             <view v-show='item.is_active==1' class="ply"> Current status </view> -->
		             <view class="mian_box1">
		                 <image style="width: 100rpx;height: 100rpx;" :src="movieList?movieList.pic:''" ></image>
		                 <view class='userName' >{{movieList?movieList.name:''}}</view>
		             </view>
		             <view class="mian_text">
		                 <view class="mian_text_c">
		                     <view>
<!-- 								 Unlocked amound -->
							{{t('movie.m_b5')}}
							 {{movieList.price}} {{unidad}}</view>
		                     <view>
<!-- 								 Daily number of orders -->
								{{t('movie.m_b6')}}
							 {{movieList.day_max}} </view>
							<view>
<!-- 								Daily income   -->
								{{t('movie.m_b7')}}
								{{movieList.daily_profit}} {{unidad}}</view>
							<view>
<!-- 								Eamings every 360 day -->
							{{t('movie.m_b8')}}
							{{movieList.show_day}}
							{{t('movie.m_b8d')}}
							{{movieList.show_day_profit}}
							{{unidad}}</view>
		                 </view>
		             </view>
								<view v-show='movieList.show_status' class="footer_text">
									<view class="submit" @click="getJion(movieList)" >
										<!-- participar -->
										{{t('movie.m_b9')}}
										</view>		
								</view>
		         </view>
		     </view>
		</view>
		<view class="introduce" v-html="movieList.des"></view>
			<view v-show="pop" class="Popup">
				<view class="boxs">
					<view class="header">
<!-- 						提示 -->
						{{t('movie.m_c1')}}
					</view>
					<view class="main_texted">
						{{movieList.msg}}
					</view>
					<view class="sub">
						<view class="canner" @click="canner">
							<view class="no">
<!-- 								取消 -->
								{{t('movie.m_c2')}}
							</view>
						</view>
						<view class="verify" @click="verify">
							<view class="yes">
<!-- 								确定 -->
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
		onMounted, ref
	} from 'vue';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		useI18n
	} from "vue-i18n";
	
	const {
		t
	} = useI18n();
	const store = userStore();
	
	const pop = ref(false)
	
	const canner = ()=>{
		pop.value = false
	}
	const verify = ()=>{
		uni.navigateTo({
			url:'./service'
		})
	}
	//等级列表
	const movieList = ref({})
	const taskList = () =>{

        let goGrade = uni.getStorageSync('goGrade')
		request({
			url:'home/vipDetail',
			methods:'get',
			data:{
				vipId:goGrade.id
			}
		}).then(res=>{
			movieList.value = res
			console.log(res,'我的数据')
		})
	}
	
	
	const methods = {
		back() {
			history.back()
		},
	};
	const getJion = (item) =>{
		if(item.button_type==1){
			uni.navigateTo({
				url:'./recharge'
			})
		}else{
			pop.value = true
		}
	}
	//货币单位
	const unidad = ref()
	onMounted(()=>{
		unidad.value = uni.getStorageSync('currency')
	})
	
	onLoad(()=>{
		taskList()
	})
</script>
<style lang="scss" scoped>
	.introduce{
		width: 75%;
		height: 70rpx;
		line-height: 70rpx;
		color:#fff;
		margin: 0 auto;
		word-break: break-all;
		word-wrap: break-word;
	
		
	}
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
				height: 80rpx;
				text-align: center;
				line-height:100rpx;
			}
			.main_texted{
				width: 86%;
				height: 90rpx;
				padding: 21px;
				text-align: center;
				
			}
			.sub{
				display: flex;
				.verify{
					width: 50%;
					height: 100%;
					.yes{
						width: 150rpx;
						height: 60rpx;
						background-color: orange;
						border-radius: 20rpx;
						margin: 0 auto;
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
	.userName{
		color:#fff;
		text-align: center;
	}
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
			margin-left: 30rpx;
			margin-right: 30rpx;
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
	// .main{
	// 	width: 90%;
	// 	height: 1000px;
	// 	margin: 70rpx 38rpx 0rpx 38rpx;
	// }
	// .main_box{
	// 	width: 100%;
	// 	height: 150rpx;
	// 	border:1px solid yellow;
	// 	border-radius: 15rpx;
	// 	.header{
	// 		width: 100%;
	// 		height: 50rpx;
	// 		border-radius: 15rpx 15rpx 0rpx 0rpx;
	// 		background-color: yellow;
	// 	}
	// 	.main_text{
	// 		width: 100%;
	// 		height: 100rpx;
	// 		font-size: 36rpx;
	// 		line-height: 100rpx;
	// 		color:#fff;
	// 		display: flex;
	// 		justify-content: space-around;
			
	// 	}
	// }
	.main{
	        width: 100%;
	        height: 100%;
	        margin-top: 50px;
	    }
	    .main_box{
	        /* background-color: #fff; */
	        display: flex;
	        padding: 10px;
	        height: 334rpx;
	        flex-direction: column;
	    }
	    .main_box_Center{
	        width: 100%;
	        height: 100%;
	        background: rgb(29, 29, 29);
	        border-radius: 5px;
	        box-shadow: 0 1px 2px rgba(0,0,0,.2);
	        position: relative;
	        display: flex;
	    }
	    .ply{
	        background-color: rgb(205, 18, 25);
	        color: rgb(255, 255, 255);
	        display: inline-block;
	        padding: 5px;
	        border-top-right-radius: 5px;
	        border-bottom-left-radius: 5px;
	        font-size: 12px;
	        position: absolute;
	        right: 0;
	    }
	    .mian_box1{
	        margin: 27px 10px;
	        width: 30%;
	        height: 144rpx;
	        display: flex;
	        flex-direction: column;
	        align-items: center;
	    }
	    .mian_box1>p{
	        font-size: 16px;
	        color: rgb(42, 42, 0);
	        font-weight: 600;
	        margin-top: 5px;
	    }
	    .mian_text{
	        width: 70%;
	        height: 77px;
	        font-size: 12px;
	        display: flex;
			color:#fff;
	        justify-content:space-around;
	    }
	    .mian_text_c{
	        width: 100%;
	        height: 77px;
	        margin: 19px 0px;
	       
	    }
	    .mian_text_c>p{
	        margin-bottom: 2px;
	    }
	    .mian_text_w{
	        width: 95px;
	        height: 77px;
	        margin: 27px 0px;
	       
	    }
	    .mian_text_w>p{
	        margin-bottom: 2px;
	    }
	    .weight{
	        font-weight: 600;
	    }
	    .mian_box_two{
	        height: 169px;
	        position: relative;
	    }
	
	    
	    .main_box_footer_bix1{
	        width: 83px;
	        height: 18px;
	        // background-color: #fff;
	        /* margin-left: 20px; */
	        font-size: 16px;
			color:#fff;
	        font-weight: 600;
	    }
	    .main_box_footer_bix2{
	        background: linear-gradient(80deg,#00ee43,#00ab36);
	        border-radius: 25px;
	        color: #fff;
	        font-weight: 600;
	        font-size: 16px;
	        width: 100px;
	        height: 28px;
	        text-align: center;
	        line-height: 28px;
	        margin-right: -20px;
	    }
	    .footer_text{
	        width: 100%;
	        height: 59px;
	        position: absolute;
	        top: 108px;
	        display: flex;
	        justify-content: space-around;
	        // align-items: center;
			color:#fff;
			
			.submit{
				width: 40%;
				height: 80rpx;
				line-height: 80rpx;
				background-color: rgb(234, 201, 117);;
				color:#fff;
				text-align: center;
				
				border-radius: 40rpx;

			}
	    }
</style>