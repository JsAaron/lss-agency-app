<template>
	<app-layout>
		<view v-if="list.length == 0 || list == null" class="tip main-center cross-center">暂无数据</view>
		<view v-else class="list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="" @click="toDetail(item.id)">
					<view class="type">
						<text class="status" v-if="item.type == 1">代理升级费</text>
						<text class="status" v-if="item.type == 2">升级分润</text>
						<text class="status" v-if="item.type == 3">管理津贴</text>
						<text class="status" v-if="item.type == 4">分润扣款</text>
						<text class="status" v-if="item.type == 5">刷脸支付佣金营收</text>
						<text class="status" v-if="item.type == 6">刷脸佣金分润</text>
						<text class="status" v-if="item.type == 7">商品消费佣金营收</text>
						<text class="status" v-if="item.type == 8">商品消费佣金</text>
						<text class="status" v-if="item.type == 9">提现</text>
					</view>
					<view>交易时间：{{ item.created_at }}</view>
					<view class="cash">
						<view class="cash-price" v-if="item.income_price == null || item.income_price == 0">0.00元</view>
						<view class="cash-price" v-else>{{ item.income_price / 100 }}元</view>
					</view>
				</view>
			</view>
		</view>
	</app-layout>
</template>

<script>
export default {
	data() {
		return {
			loading: null,
			list: [],
			id: null,
			page: 2
		};
	},
	methods: {
		getList() {
			let that = this;
			that
				.$request({
					url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/all-list',
					data: {
						type: 1
					}
				})
				.then(response => {
					that.$hideLoading();
					uni.hideLoading();
					if (response.code === 0) {
						that.list = response.data.list;
						console.log(response.data.list);
						for (let i in that.list) {
							console.log(i);
						}
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
					url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/all-list',
					data: {
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
		toDetail(id) {
			uni.navigateTo({
				url: '/pages/agency/promote-be/details?id=' + id
			});
		}
	},

	onLoad() {
		let that = this;
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
.tip {
	width: 100%;
	color: #999999;
	height: #{500rpx};
}
.list {
	background-color: #fff;
	margin: #{24rpx} #{24rpx} 0;
	border-radius: #{8rpx};
	box-shadow: rgba(0, 0, 0, 0.1) 0 0 #{20rpx};
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
	font-size: #{28rpx};
}

.cash {
	position: absolute;
	top: #{50rpx};
	right: #{32rpx};
	text-align: right;
}

.cash-price {
	font-size: #{36rpx};
	color: #353535;
}
</style>
