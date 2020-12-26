<template>
	<app-layout>
		<!-- <app-tab-nav :tabList="tabList" :shadow="noBorder" background="#f7f7f7" padding="0" :border="noBorder" :activeItem="activeTab" @click="tabStatus" :theme="theme"></app-tab-nav> -->
		<view v-if="list.length == 0" class="tip main-center cross-center">暂无数据</view>
		<view v-else class="list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="type" v-if="item.status == 0"><text :class="[`status`, `${theme}-color`]">审核中</text></view>
				<view class="type" v-if="item.status == 1"><text :class="[`status`, `${theme}-color`]">审核成功</text></view>
				<view class="type" v-if="item.status == 2"><text :class="[`status`, `${theme}-color`]">审核拒绝</text></view>
				<view>订单号：{{ item.order_no }}</view>
				<view>提现时间：{{ item.created_at }}</view>
				<view class="cash">
					<view class="cash-price">-{{ item.money }}元</view>
					<view class="cash-type" v-if="item.type == 'wx'">金额发放至微信</view>
					<view class="cash-type" v-if="item.type == 'alipay'">金额发放至支付宝</view>
					<view class="cash-type" v-if="item.type == 'bank'">金额发放至银行卡</view>
					<view class="cash-type" v-if="item.type == 'balance'">金额发放至余额</view>
				</view>
			</view>
		</view>
	</app-layout>
</template>

<script>
import { mapState } from 'vuex';
import appTabNav from '../../../components/basic-component/app-tab-nav/app-tab-nav.vue';

export default {
	data() {
		return {
			tabList: [
				{ id: -1, name: '全部' },
				{ id: 0, name: '审核中' },
				{ id: 1, name: '审核成功' },
				{ id: 2, name: '审核失败' }
			],
			loading: null,
			list: [],
			activeTab: -1,
			noBorder: false,
			id: null,
			page: 2
		};
	},
	components: {
		'app-tab-nav': appTabNav
	},
	computed: {
		...mapState({
			theme: state => state.mallConfig.theme,
			mall: state => state.mallConfig.mall,
			custom_setting: state => state.mallConfig.share_setting_custom,
			share_setting: state => state.mallConfig.share_setting
		})
	},
	methods: {
		open(e) {
			this.id = e;
		},

		tabStatus(e) {
			this.list = [];
			this.page = 2;
			this.activeTab = e.currentTarget.dataset.id;
			uni.showLoading({
				title: '加载中...'
			});
			console.log(this.activeTab);
			this.getList();
		},
		getList() {
			let that = this;
			that
				.$request({
					url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/cash-list',
					data: {
						status: that.activeTab
					}
				})
				.then(response => {
					that.$hideLoading();
					uni.hideLoading();
					if (response.code === 0) {
						that.list = response.data.list;
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none',
							duration: 1000
						});
					}
				})
				.catch(() => {
					that.$hideLoading();
					uni.hideLoading();
					that.$event.on(that.$const.EVENT_USER_LOGIN).then(() => {
						that.getList();
					});
				});
		},
		getMore() {
			let that = this;
			uni.showLoading({
				title: '加载中...'
			});
			that
				.$request({
					url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/cash-list',
					data: {
						// status: that.activeTab,
						page: that.page
					}
				})
				.then(response => {
					uni.hideLoading();
					if (response.code == 0) {
						that.loading = null;
						for (let i in response.data.list) {
							for (let index in that.list) {
								if (i == index) {
									that.list[index].list = that.list[index].list.concat(response.data.list[index].list);
								}
							}
						}
						that.page++;
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none',
							duration: 1000
						});
					}
				})
				.catch(() => {
					uni.hideLoading();
				});
		},
		toGoods(id) {
			uni.navigateTo({
				url: `/pages/goods/goods?id=${id}`
			});
		}
	},

	onLoad() {
		let that = this;
		uni.setNavigationBarTitle({
			title: that.custom_setting.menus.cash.name
		});
		that.$showLoading({
			type: 'global',
			text: '加载中...'
		});
		that.getList();
	},
	onReachBottom() {
		this.getMore();
	}
};
</script>

<style scoped lang="scss">
.list {
	background-color: #fff;
	margin: #{24rpx} #{24rpx} 0;
	border-radius: #{8rpx};
	box-shadow: rgba(0, 0, 0, 0.1) 0 0 #{20rpx};
}

.item-header {
	color: #999999;
	font-size: #{32rpx};
	height: #{96rpx};
	line-height: #{96rpx};
	padding: 0 #{32rpx};
}

.list .item {
	padding: #{32rpx};
	font-size: #{24rpx};
	color: #999999;
	border-top: 1px solid #e2e2e2;
	position: relative;
}

.type {
	font-size: #{32rpx};
	color: #353535;
	margin-bottom: #{8rpx};
}

.status {
	font-size: #{24rpx};
	padding: 0 #{10rpx};
	border-radius: #{16rpx};
	border: 1px solid #ff4544;
}

.cash {
	position: absolute;
	top: #{50rpx};
	right: #{32rpx};
	text-align: right;
}

.cash-price {
	font-size: #{40rpx};
	color: #353535;
}
.cash-type {
	margin-top: 10rpx;
}
.tip {
	width: 100%;
	color: #999999;
	height: #{500rpx};
}
</style>
