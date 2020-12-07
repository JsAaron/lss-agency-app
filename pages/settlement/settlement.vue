<template>
	<app-layout>
		<view class="settlement-content">
			<view class="myshop-header">
				<view class="dir-left-nowrap">
					<view class="box-grow-1 data-col">
						<view>总订单金额</view>
						<view>{{ mathnum(totprice.totalPrice) }}</view>
					</view>
					<view class="box-grow-1 data-col">
						<view>总结算金额</view>
						<view>{{ mathnum(totprice.price) }}</view>
					</view>
				</view>
			</view>

			<view class="settlement-item" v-for="(item, index) in list" :key="index">
				<view class="item-time pad-10">{{ item.time }}</view>
				<view class="member pad-10">
					<icon class="icon-sett-mem"></icon>
					会员订单 {{ mathnum(item.user_total_amount || 0.0) }}
					<view class="item-account">结算金额：{{ mathnum(item.user_price || 0.0) }}</view>
				</view>
				<view class="non-member pad-10">
					<icon class="icon-sett-nomem"></icon>
					非会员订单 {{ mathnum(item.not_user_total_amount || 0.0) }}
					<view class="item-account">结算金额：{{ mathnum(item.not_user_price || 0.0) }}</view>
				</view>
				<view
					class="total pad-10"
					v-if="(!item.user_price || item.user_price == null) && (!item.not_user_price || item.not_user_price == null)"
				>
					合计：0.00
				</view>
				<view
					class="total pad-10"
					v-if="(!item.user_price || item.user_price == null) && (item.not_user_price && item.not_user_price !== null)"
				>
					合计：{{ mathnum(item.not_user_price) }}
				</view>
				<view
					class="total pad-10"
					v-if="item.user_price && item.user_price !== null && (!item.not_user_price || item.not_user_price == null)"
				>
					合计：{{ mathnum(item.user_price) }}
				</view>
				<view
					class="total pad-10"
					v-if="item.user_price && item.user_price !== null && (item.not_user_price && item.not_user_price !== null)"
				>
					合计：{{ mathnum(Number(item.user_price) + Number(item.not_user_price)) }}
				</view>
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
			totprice: [],
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
		console.log(options);
		this.getLog();
	},
	methods: {
		mathnum(num) {
			var num = Number(num) / 100;
			var n = num.toFixed(2);
			return n;
		},
		getLog: function() {
			const self = this;
			self.$showLoading();
			self
				.$request({
					url: self.$api.mch.settlement,
					data: {
						mch_id: self.mch_id
					}
				})
				.then(info => {
					self.$hideLoading();
					console.log(info);
					self.list = info.data.list;
					self.totprice = info.data.price;
					console.log(self.list);
				})
				.catch(e => {
					self.$hideLoading();
				});
		}
	}
};
</script>

<style scoped lang="scss">
//结算金额数据
.myshop-header {
	background: #26a5ef;
	color: #fff;
	background: -webkit-gradient(linear, 0 0, 0 bottom, from(#44b9fe), to(#028dde));
	padding: #{48rpx} 0 #{32rpx};
	overflow: hidden;

	.data-col {
		text-align: center;
		border-right: #{1rpx} solid rgba(255, 255, 255, 0.35);
	}
}
//结算item
.settlement-item {
	background: #ffffff;
	padding: 10rpx 24rpx;
	margin: 4rpx;
	font-size: #{28rpx};
	margin-top: 12rpx;
	.item-time {
		font-size: #{30rpx};
	}
	.member {
		color: #ff0024;
		border-bottom: 1rpx solid #e2e2e2;
	}

	.total {
		float: right;
		color: #ff0024;
	}
	.item-account {
		float: right;
	}
	.pad-10 {
		padding: 10rpx 0;
	}
}
.settlement-item::after {
	clear: both;
	content: '';
	display: block;
}

.icon-sett-mem {
	width: #{28rpx};
	height: #{28rpx};
	margin-right: #{12rpx};
	background-image: url('../../static/image/myshop/sett-mem.png');
	background-repeat: no-repeat;
	background-size: 100% auto;
}
.icon-sett-nomem {
	width: #{28rpx};
	height: #{28rpx};
	margin-right: #{12rpx};
	background-image: url('../../static/image/myshop/sett-nomem.png');
	background-repeat: no-repeat;
	background-size: 100% auto;
}
</style>
