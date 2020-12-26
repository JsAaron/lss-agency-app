<template>
	<app-layout>
		<view class="list">
			<view class="top-add">
				<app-button
					@click="createApply"
					margin="30"
					height="80"
					width="500"
					font-size="32"
					background="#ff4544"
					color="#FFFFFF"
					round
				>
					新增商户
				</app-button>
			</view>
			<!-- 筛选内容 -->
			<view class="no-content" v-if="!list.length">暂无记录</view>
			<view v-else class="account-list">
				<view class="account-list-item" v-for="(item, index) in list" :key="index">
					<view class="shopname">{{ item.name }}</view>
					<view class="user-info">
						<view>{{ item.realname }}</view>
						<view class="user-info-mobile">{{ item.mobile }}</view>
					</view>
					<view class="user-info">提交时间：{{ item.updated_time }}</view>
					<view class="address">{{ item.address }}</view>
					<view v-if="item.apply_status == 2" class="apply-fail">驳回原因：{{ item.reject_reason }}</view>
					<view v-if="item.apply_status == 4" class="apply-fail">实名失败原因：{{ item.wx_real_name_url }}</view>

					<view class="no-apply fixed" v-if="item.apply_status == 0">未申请进件</view>
					<view class="apply-success fixed" v-if="item.apply_status == 1">进件成功</view>
					<view class="apply-fail fixed" v-if="item.apply_status == 2">进件驳回</view>
					<view class="apply-fail fixed" v-if="item.apply_status == 3">实名中</view>
					<view class="apply-fail fixed" v-if="item.apply_status == 4">实名失败</view>
					<view class="apply-success fixed" v-if="item.apply_status == 5">实名成功</view>
					<view class="bottom-list">
						<app-button
							height="80"
							width="200"
							font-size="32"
							background="#ff4544"
							color="#FFFFFF"
							round
							@click="goApply(index)"
							v-if="item.apply_status != 1 && item.apply_status != 5"
						>
							编辑
						</app-button>

						<app-button
							@click="previewViewImage(item.wx_real_name_url)"
							height="80"
							width="300"
							font-size="32"
							background="#ff4544"
							color="#FFFFFF"
							round
							v-if="item.apply_status == 5"
						> 
							支付认证
						</app-button>
						<app-button
							height="80"
							width="200"
							font-size="32"
							background="#ff4544"
							color="#FFFFFF"
							round
							@click="submitApply(index)"
							v-if="item.apply_status == 0 || item.apply_status == 2"
						>
							提交进件
						</app-button>
					</view>
				</view>
			</view>
			<view class="tm-h"></view>
		</view>
	</app-layout>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'mckh-apply',
	data() {
		return {
			page: 1, //当前页
			total_page: 1,
			load: false,
			agent_id: 0,
			agent_name: '',
			list: [],
			panelTop: 0,
			themeColor: '#00a6ff',
			titleColor: '#666666'
		};
	},
	computed: {
		...mapState({
			theme: state => state.mallConfig.theme,
			applyApiUrl: state => state.user.applyApiUrl
		})
	},
	onLoad: function(options) {
		this.agent_id = options.agent_id;
		this.agent_name = options.agent_name;
	},
	onShow() {
		this.page = 1;
		this.getApplyList();
	},
	onPullDownRefresh() {
		this.page = 1;
		this.getApplyList();
		uni.stopPullDownRefresh();
	},
	onReachBottom: function() {
		const self = this;
		if (this.page < this.total_page || self.load) {
			return;
		}
		self.load = true;
		let page = self.page + 1;
		this.getApplyList();
	},
	methods: {
		previewViewImage(url) {
			uni.previewImage({
				urls: [url]
			});
		},
		submitApply(index) {
			const self = this;
			let item = this.list[index];
			uni.showModal({
				title: '提示',
				content: '确认提交该商户进件到通道吗？',
				success: function(res) {
					if (res.confirm) {
						self.$showLoading();
						uni.request({
							url: self.applyApiUrl + '/api/mch/apply/send',
							data: {
								agentId: self.agent_id,
								mchId: item.mch_id
							},
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							method: 'POST',
							success: res => {
								// console.log(res);
								if (res.data.code == 0) {
									uni.showModal({
										title: '提示',
										content: '提交成功，等待审核结果！'
									});
								} else {
									uni.showModal({
										title: '提示',
										content: res.data.msg
									});
								}
							},
							complete: () => {
								self.load = false;
								self.$hideLoading();
							}
						});
					}
				}
			});
		},
		createApply() {
			uni.navigateTo({ url: '/pages/agency/apply/apply?agent_id=' + this.agent_id + '&agent_name=' + this.agent_name });
		},
		goApply(index) {
			let item = this.list[index];
			uni.navigateTo({
				url:
					`/pages/agency/apply/apply?edit=1&agent_id=${this.agent_id}&agent_name=${this.agent_name}&data=` +
					encodeURIComponent(JSON.stringify(item))
			});
		},
		getApplyList: function() {
			const self = this;
			self.$showLoading();
			return uni.request({
				url: this.applyApiUrl + '/api/mch/apply/getMchApplyList',
				data: {
					agentId: this.agent_id,
					pageNumber: this.page,
					pageSize: 10
				},
				method: 'GET',
				success: res => {
					if (res.data.code == 0) {
						self.list = res.data.data.list;
						self.total_page = res.data.data.totalPage;
					}
				},
				complete: () => {
					self.load = false;
					self.$hideLoading();
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.top-add {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 30rpx;
}
.account-list {
	.account-list-item {
		position: relative;
		padding: 20rpx;
		background-color: white;
		margin-top: 10rpx;
		.shopname {
			font-size: 36rpx;
			color: black;
		}
		.user-info {
			margin-top: 10rpx;
			display: flex;
			flex-direction: row;
			font-size: 28rpx;
			color: black;
			.user-info-mobile {
				margin-left: 20rpx;
			}
		}
		.address {
			margin-top: 10rpx;
			font-size: 28rpx;
			color: gray;
		}

		.fixed {
			position: absolute;
			right: 0;
			top: 0;
			margin: 20rpx;
		}

		.no-apply {
			font-size: 30rpx;
			color: red;
			font-weight: bold;
		}
		.apply-fail {
			font-size: 30rpx;
			color: red;
			font-weight: bold;
		}
		.apply-success {
			font-size: 30rpx;
			color: green;
			font-weight: bold;
		}

		.bottom-list {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
		}
	}
}
</style>
