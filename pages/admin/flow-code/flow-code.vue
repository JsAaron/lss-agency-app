<template>
	<app-layout>
		<view class="list">
			<view class="sl-filter">
				<sl-filter
					:independence="true"
					:color="titleColor"
					:themeColor="themeColor"
					:menuList.sync="menuList"
					:topFixed="true"
					@result="onFilter"
				></sl-filter>
			</view>
			<!-- 筛选内容 -->
			<view class="no-content" v-if="!list.length">暂无记录</view>
			<view v-else class="account-list">
				<view v-for="(item, index) in list" :key="index">
					<view class="account-item item flow-flex">
						<view class="flex-item flow-left">
							<view class="flow-img" v-if="item.pay_way == 1"><image src="/static/image/myshop/flow-wx.png"></image></view>
							<view class="flow-img" v-else-if="item.pay_way == 2"><image src="/static/image/myshop/flow-zfb.png"></image></view>
							<view class="flow-img" v-else-if="item.pay_way == 3"><image src="/static/image/myshop/flow-yl.png"></image></view>
							<view class="flow-img" v-else><image src="/static/image/myshop/flow-not.png"></image></view>
						</view>
						<view class="flex-item flow-bd">
							<!--  sj_real_amount real_amount-->
							<view class="bd-name">实收金额：{{ numUtils(item.sj_real_amount * 0.01) }}元</view>
							<view class="bd-num">{{ item.order_no }}</view>
							<view class="bd-time" v-if="item.created_at">{{ item.created_at }}</view>
						</view>
						<view class="flex-item flow-right">
							<text v-if="item.pay_status == 0" style="color: #ffcc02;">创建订单</text>
							<text v-if="item.pay_status == 1" style="color: #24af41;">支付成功</text>
							<text v-if="item.pay_status == 2" style="color: #808080;">支付失败</text>
							<text v-if="item.pay_status == 3" style="color: #ffa92d;">部分退款</text>
							<text v-if="item.pay_status == 4" style="color: #ff3318;">全部退款</text>
						</view>
					</view>
				</view>
			</view>
			<view class="totle-money">
				合计：
				<text class="tm-price">{{ mathnum(price) }}元</text>
			</view>
			<view class="tm-h"></view>
		</view>
	</app-layout>
</template>

<script>
import slFilter from '../sl-filter/sl-filter.vue';
import numUtils from '../../../mathnum.js';
import { mapState } from 'vuex';
export default {
	name: 'flowcode',
	components: {
		slFilter
	},
	data() {
		return {
			price: 0,
			numUtils: numUtils,
			page: 1, //当前页
			args: false,
			load: false,
			mch_id: 0,
			list: [],
			List: [],
			pay_way: '',
			panelTop: 0,
			dateRange: {},
			themeColor: '#00a6ff',
			titleColor: '#666666',
			menuList: [
				{
					title: '支付日期',
					key: 'filter_date',
					detailTitle: '请选择支付时间段',
					isMutiple: false,
					reflexTitle: true,
					detailList: []
				},
				{
					title: '支付方式',
					key: 'filter_type',
					isMutiple: false,
					detailTitle: '请选择支付方式（单选）',
					reflexTitle: true,
					detailList: [
						{
							title: '全部',
							value: ''
						},
						{
							title: '微信支付',
							value: '1'
						},
						{
							title: '支付宝支付',
							value: '2'
						},
						{
							title: '银联支付',
							value: '3'
						}
					]
				}
			],
			date_a: '',
			data: '',
			keyword: '',
			toSearch: false,
			id: null
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
	onReachBottom: function() {
		const self = this;
		if (self.args || self.load) {
			console.log('11111111111111', self.args, self.load);
			return;
		}

		self.load = true;
		let page = self.page + 1;
		let reqData = {
			mch_id: self.mch_id,
			keyword: self.keyword,
			pay_way: self.pay_way,
			page: page
		};
		if (self.dateRange.start && self.dateRange.end) {
			reqData.date_start = self.dateRange.start + ' 00:00:00';
			reqData.date_end = self.dateRange.end + ' 23:59:59';
		}
		self
			.$request({
				url: self.$api.mch.flow_code,
				data: reqData
			})
			.then(info => {
				if (info.code === 0) {
					[self.page, self.args, self.list] = [page, info.data.list.length === 0, self.list.concat(info.data.list)];
				}
				self.load = false;
			});
	},
	methods: {
		mathnum(num) {
			var num = Number(num) / 100;
			var n = num.toFixed(2);
			return n;
		},
		onFilter(data) {
			if (data.hasOwnProperty('filter_date')) {
				if (data.filter_date) {
					this.dateRange = data.filter_date;
				}
			}
			if (data.hasOwnProperty('filter_type')) {
				this.pay_way = data.filter_type;
			}
			this.args = false;
			this.page = 1;
			this.getLog();
		},
		getLog: function() {
			const self = this;
			self.$showLoading();
			let reqData = {
				mch_id: self.mch_id,
				keyword: self.keyword,
				pay_way: self.pay_way
			};
			if (self.dateRange.start && self.dateRange.end) {
				reqData.date_start = self.dateRange.start + ' 00:00:00';
				reqData.date_end = self.dateRange.end + ' 23:59:59';
			}
			self
				.$request({
					url: self.$api.mch.flow_code,
					data: reqData
				})
				.then(info => {
					self.$hideLoading();
					self.list = info.data.list;
					self.price = info.data.price;
					console.log(self.list);
					console.log(info.data);
				})
				.catch(e => {
					self.$hideLoading();
				});
		}
	}
};
</script>

<style scoped lang="scss">
.totle-money {
	padding: 18rpx 28rpx 18rpx 48rpx;
	position: fixed;
	bottom: 0;
	background-color: #fff;
	color: #333;
	width: 100%;
	.tm-price {
		float: right;
		// color: #ff3318;
	}
}
.tm-h {
	height: 86rpx;
}
.top-place {
	height: #{88rpx};
}
// 搜索
.search {
	z-index: 30;
	height: #{88rpx};
	padding: #{16rpx} #{35rpx};
	background-color: #efeff4;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	.dir-left-nowrap {
		width: 100%;
	}
}

.search input {
	padding: 0 #{30rpx};
}

.search-content {
	background-color: #fff;
	height: #{56rpx};
	border-radius: #{28rpx};
	width: 100%;
}

input.search-content {
	width: 100%;
	font-size: #{26rpx};
}
.search-icon {
	height: #{24rpx};
	width: #{24rpx};
}
.search-text {
	color: #b2b2b2;
	font-size: #{24rpx};
	margin: 0 #{5rpx};
}
//日期
.account-date {
	position: fixed;
	top: 38px;
	width: #{100%};
	height: #{80rpx};
	background: #ffffff;
	color: #353535;

	.account-icon {
		height: #{20rpx};
		width: #{12rpx};
		margin: auto #{84rpx};
	}
}

.no-content {
	color: #888;
	padding: #{200rpx} 0 0 0;
	text-align: center;
}

.account-list {
	.flow-flex {
		height: 160rpx;
		display: flex;
		.flex-item {
			font-size: 28rpx;
			line-height: 1.8;
		}
		.flow-left {
			width: 140rpx;
			image {
				width: #{58rpx};
				height: #{58rpx};
			}
			.flow-img {
				text-align: center;
				line-height: 160rpx;
			}
		}
		.flow-bd {
			flex: 1 1 0%;
			.bd-name {
				font-size: 32rpx;
				text {
					margin-left: 18rpx;
				}
			}
			.bd-money {
				font-size: 26rpx;
				color: #ccc;
			}
			.bd-num {
				font-size: 26rpx;
				color: #ccc;
			}
			.bd-time {
				font-size: 26rpx;
				color: #ccc;
			}
		}
		.flow-right {
			line-height: 56px;
			width: 200rpx;
			text-align: right;
		}
	}

	.account-item {
		background: #ffffff;
		border-bottom: #{1rpx} solid #e2e2e2;
		padding: #{10rpx} #{24rpx};
		margin: 4rpx;
		position: relative;
	}

	.account-item:last-child {
		border-bottom: none;
	}
}
</style>
