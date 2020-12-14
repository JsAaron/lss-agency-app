<template>
	<app-layout>
		<view class="shoppay-content">
			<view class="shop-data">
				<view class="data-top">当月店铺数据</view>
				<view class="total-money">
					<view class="tm-top">月营业总额</view>
					<view class="tm-bd">{{ mathnum(list.price_month) }}元</view>
				</view>
				<view class="day-money today">
					<view class="dm-f">
						<view class="day-title">今日实收金额</view>
						<view class="day-c">{{ mathnum(list.price_today) }}元</view>
					</view>
					<view class="dm-f">
						<view class="day-title">今日交易笔数</view>
						<view class="day-c">{{ list.count_today }}笔</view>
					</view>
				</view>
				<view class="day-money yesterday">
					<view class="dm-f">
						<view class="day-title">昨日实收金额</view>
						<view class="day-c">{{ mathnum(list.price_yesterday) }}元</view>
					</view>
					<view class="dm-f">
						<view class="day-title">昨日交易笔数</view>
						<view class="day-c">{{ list.count_yesterday }}笔</view>
					</view>
				</view>
			</view>
			<view class="shop-item">
				<app-form-id @click="toflow">
					<view class="menu-item flex dir-left-nowrap">
						<view class="box-grow-1 cross-center">
							<icon class="icon-flow"></icon>
							设备流水订单
						</view>
						<view class="box-grow-0 cross-center"><icon class="icon-arrow-right"></icon></view>
					</view>
				</app-form-id>
				<app-form-id @click="tocodeflow">
					<view class="menu-item flex dir-left-nowrap">
						<view class="box-grow-1 cross-center">
							<icon class="icon-code"></icon>
							会员码支付订单
						</view>
						<view class="box-grow-0 cross-center"><icon class="icon-arrow-right"></icon></view>
					</view>
				</app-form-id>
			</view>
		</view>
	</app-layout>
</template>

<script>
import { mapState } from 'vuex';
export default {
	components: {},
	data() {
		return {
			mch_id: 0,
			list: []
		};
	},
	computed: {
		...mapState({
			theme: state => state.mallConfig.theme
		})
	},
	onLoad: function(options) {
		this.mch_id = options.mch_id;
		this.getLog();
	},
	methods: {
		mathnum: function(num) {
			num = Number(num);
			var n = num.toFixed(2);
			return n;
		},
		toflow: function() {
			uni.navigateTo({ url: `/pages/admin/flow/flow?mch_id=` + this.mch_id });
		},
		tocodeflow: function() {
			uni.navigateTo({ url: `/pages/admin/flow-code/flow-code?mch_id=` + this.mch_id });
		},
		getLog: function() {
			const self = this;
			self.$showLoading();
			self
				.$request({
					url: self.$api.mch.shop_consume,
					data: {
						mch_id: self.mch_id
					}
				})
				.then(info => {
					self.$hideLoading();
					self.list = info.data.data;
				})
				.catch(err => {
					console.log(err);
					self.$hideLoading();
				});
		}
	}
};
</script>

<style scoped lang="scss">
//店铺数据
.shop-data {
	margin-top: 16rpx;
	position: relative;
	color: #fff;
	z-index: 10;
	background-color: #fff;
	padding: 19rpx 30rpx;
	.data-top {
		color: #000000;
		font-size: 30rpx;
	}
	.total-money {
		color: #fff;
		background: linear-gradient(to right, #50b0fd, #4b94fd);
		height: 198rpx;
		border-radius: 12rpx;
		padding: 19rpx 29rpx;
		margin-top: 20rpx;
		.tm-top {
			font-size: 28rpx;
			letter-spacing: 4rpx;
		}
		.tm-bd {
			text-align: center;
			font-size: 42rpx;
			letter-spacing: 6rpx;
			margin-top: 28rpx;
			font-weight: bold;
		}
	}
	.day-money {
		display: flex;
		margin-top: 28rpx;
		.dm-f {
			flex: 1;
			text-align: center;
		}
		.day-title {
			color: #808080;
			font-size: 24rpx;
			letter-spacing: 3rpx;
		}
		.day-c {
			color: #000000;
			font-size: 26rpx;
			font-weight: bold;
			margin-top: 8rpx;
		}
	}
	.yesterday {
		margin-bottom: 20rpx;
	}
}
//店铺item
.icon-arrow-right {
	width: #{12rpx};
	height: #{22rpx};
	margin-left: #{12rpx};
	background-image: url('../../../static/image/icon/arrow-right.png');
	background-repeat: no-repeat;
	background-size: 100% auto;
}
.icon-flow {
	width: #{32rpx};
	height: #{32rpx};
	margin-right: #{12rpx}; 
	background-image: url('../../../static/image/icon/myshop-flow-icon.png');
	background-repeat: no-repeat;
	background-size: 100% auto;
}
.icon-code {
	width: #{32rpx};
	height: #{32rpx};
	margin-right: #{12rpx};
	background-image: url('../../../static/image/icon/myshop-code-icon.png');
	background-repeat: no-repeat;
	background-size: 100% auto;
}
.shop-item {
	font-size: #{28rpx};
	color: #353535;
	margin: #{16rpx} 0;
	.menu-item {
		background: #fff;
		height: #{88rpx};
		border-bottom: #{1rpx} solid #eee;
		padding: 0 #{24rpx};
	}
}
</style>
