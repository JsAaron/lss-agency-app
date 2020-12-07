<template>
	<view class="app-user-upgradeck-con" @click="nav">
		<image  class="banner-image" mode="aspectFit" :src="src"></image>
	</view>
</template>

<script>
	export default {
		name:"appUserCkupgrade",
		data(){
			return {
				src:'/static/upgradeck.jpg'
			}
		},
		methods:{
			nav(){
				uni.navigateTo({
					url:"/pages/member/upgradeck/upgradeck"
				})
			}
		}
	}
</script>

	
	
	
<style lang="scss" scoped>

.app-user-upgradeck-con {
	width: 702rpx;
	display: flex;
	flex-direction: column;
	background: #fff;
	border-radius: #{16rpx};
	margin: #{24rpx} auto;
	box-shadow: 0 0 #{8rpx} rgba(0, 0, 0, 0.05);
}
.banner-image{
	width: 702rpx;
	height: 240rpx;
	border-radius: 16rpx;
}	
	
</style>
