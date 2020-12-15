<template>
	<app-layout>
		<app-tab-nav :tabList="tabList" :activeItem="activeTab" @click="tabStatus" :theme="theme"></app-tab-nav>
		<view class="team-top">
			<view class="team-num cross-center">
				<view class="nav-left num-day">
					<view class="nav-title">
						<text v-if="teamnum.length == 0">0</text>
						<text v-else>
							{{ Number(teamnum.today_direct_people_num) + Number(teamnum.today_indirect_people_num) }}
						</text>
					</view>
					<view>当日新增</view>
					<view class="nav-end">
						<view>
							直推
							<text v-if="teamnum.length == 0">0</text>
							<text v-else>{{ teamnum.today_direct_people_num }}</text>
						</view>
						<view>
							间推
							<text v-if="teamnum.length == 0">0</text>
							<text v-else>{{ teamnum.today_indirect_people_num }}</text>
						</view>
					</view>
				</view>
				<view class="num-all">
					<view class="nav-title">
						<text v-if="teamnum.length == 0">0</text>
						<text v-else>{{ teamnum.indirect_people_num + teamnum.direct_people_num }}</text>
					</view>
					<view>累计客户</view>
					<view class="nav-end">
						<view>
							直推
							<text v-if="teamnum.length == 0">0</text>
							<text v-else>{{ teamnum.direct_people_num }}</text>
						</view>
						<view>
							间推
							<text v-if="teamnum.length == 0">0</text>
							<text v-else>{{ teamnum.indirect_people_num }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="team-num-h"></view>
		<view v-if="teamlist.length == 0" class="tip main-center cross-center">暂无相关团队</view>
		<view v-else class="list">
			<view class="team-item" v-for="(item, index) in teamlist" :key="index">
				<view class="team-info">
					<view class="info-img">
						<image class="user-avatar box-grow-0" :src="item.userInfo.avatar"></image>
						<view class="user-activation" v-if="item.status == 1">已激活</view>
						<view class="user-activation" v-else>未激活</view>
					</view>
					<view class="box-grow-1 dir-top-nowrap main-center info-r">
						<view class="agent-level t-omit" v-if="item.type == 1">服务商</view>
						<view class="agent-level t-omit" v-if="item.type == 2">社区服务商</view>
						<view class="agent-level t-omit" v-if="item.type == 3">商圈服务商</view>
						<view class="agent-level t-omit" v-if="item.type == 4">区县服务商</view>
						<view class="agent-level t-omit" v-if="item.type == 5">市级服务商</view>
						<view class="agent-phone mtb-10">
							手机号：
							<text>{{ item.mobile }}</text>
						</view>
					</view>
				</view>
				<view class="team-bd">
					<view class="bd-time">
						购买加入时间：
						<text>{{ item.activation_time }}</text>
					</view>
					<view class="bd-num cross-center">
						<view class="nav-left">
							<view class="nav-title" v-if="item.count">{{ item.count }}</view>
							<view class="nav-title" v-else>0</view>
							<view>直推数</view>
						</view>
						<view class="nav-left">
							<view class="nav-title" v-if="item.not_count">{{ item.not_count }}</view>
							<view class="nav-title" v-else>0</view>
							<view>未激活</view>
						</view>
						<view class="nav-left">
							<view class="nav-title" v-if="item.all_count">{{ item.all_count }}</view>
							<view class="nav-title" v-else>0</view>
							<view>团队推广</view>
						</view>
						<view class="num-all">
							<view class="nav-title" v-if="item.people_sum">{{ item.people_sum }}</view>
							<view class="nav-title" v-else>0</view>
							<view>团队人数</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</app-layout>
</template>

<script>
import appTabNav from '../../../components/basic-component/app-tab-nav/app-tab-nav.vue';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			teamnum: [],
			teamlist: [],
			iphone_x: false,
			tabList: [{ id: 3, name: '全部' }, { id: 1, name: '已激活' }, { id: 2, name: '未激活' }],
			activeTab: 3,
			first: false,
			page: 2
		};
	},
	components: {
		'app-tab-nav': appTabNav
	},
	computed: {
		...mapState({
			theme: state => state.mallConfig.theme,
			userInfo: state => state.user.info,
			custom_setting: state => state.mallConfig.share_setting_custom,
			share_setting: state => state.mallConfig.share_setting,
			mall: state => state.mallConfig.mall
		})
	},
	methods: {
		tabStatus(e) {
			this.teamlist = [];
			this.page = 2;
			this.activeTab = e.currentTarget.dataset.id;
			uni.showLoading({
				title: '加载中...'
			});
			this.getList();
		},

		getList() {
			let that = this;
			that.first = true;
			that
				.$request({
					url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/relation-list',
					data: {
						status: that.activeTab
					}
				})
				.then(response => {
					uni.hideLoading();
					that.$hideLoading();
					if (response.code == 0) {
						that.teamnum = response.data.detail;
						let tempList = response.data.list;
						if (that.activeTab == 3) {
							that.teamlist = tempList;
						} else if (that.activeTab == 1) {
							that.teamlist = tempList.filter(item => item.status == '1');
						} else {
							that.teamlist = tempList.filter(item => item.status != '1');
						}
						// that.teamlist = response.data.list;
						that.page = 2;
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none',
							duration: 1000
						});
					}
				})
				.catch(response => {
					uni.hideLoading();
					that.$hideLoading();
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
					url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/relation-list',
					data: {
						status: that.activeTab,
						page: that.page
					}
				})
				.then(response => {
					uni.hideLoading();
					if (response.code == 0) {
						if (response.data.list.length > 0) {
							let tempList = response.data.list;
							if (that.activeTab == 3) {
								that.teamlist = that.teamlist.concat(tempList);
							} else if (that.activeTab == 1) {
								that.teamlist = that.teamlist.concat(tempList.filter(item => item.status == '1'));
							} else {
								that.teamlist = that.teamlist.concat(tempList.filter(item => item.status != '1'));
							}
							// that.teamlist = that.teamlist.concat(response.data.list);
							that.page++;
						}
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none',
							duration: 1000
						});
					}
				})
				.catch(e => {
					uni.hideLoading();
				});
		}
	},
	onLoad() {
		let that = this;
		uni.getSystemInfo({
			success: function(res) {
				if (
					res.model.indexOf('iPhone X') > -1 ||
					res.model.indexOf('iPhone 11') > -1 ||
					res.model.indexOf('iPhone11') > -1 ||
					res.model.indexOf('iPhone12') > -1 ||
					res.model.indexOf('Unknown Device') > -1
				) {
					that.iphone_x = true;
				}
			}
		});
		that.$showLoading({
			text: '加载中...'
		});
		that.getList();
	},

	onShow() {
		if (this.first) {
			this.getList();
		}
	},
	onReachBottom() {
		this.getMore();
	},
	filters: {
		reservedNum(data) {
			return Number(data);
		}
	}
};
</script>

<style scoped lang="scss">
.tip {
	width: 100%;
	color: #999999;
	height: #{500rpx};
}
.team-item {
	width: #{702rpx};
	border-radius: #{16rpx};
	margin: #{16rpx} auto;
	box-shadow: 0 0 #{8rpx} rgba(0, 0, 0, 0.05);
	-webkit-box-shadow: 0 0 #{8rpx} rgba(0, 0, 0, 0.05);
	background-color: #ffffff;
	padding: 20rpx 25rpx;
	font-size: 28rpx;
	.team-bd {
		.bd-time {
			margin-bottom: #{20rpx};
		}
		.bd-num > view {
			width: 25%;
			text-align: center;
		}
	}
	.team-info {
		padding-bottom: #{20rpx};
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-align-items: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.info-img {
		.user-avatar {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			font-size: 26rpx;
			margin-right: 40rpx;
		}
		.user-activation {
			width: 100rpx;
			text-align: center;
			background-color: #002c7d;
			color: #fff;
			border-radius: #{12rpx};
			padding: #{6rpx} 0;
			font-size: 26rpx;
		}
	}
	.info-r {
		.agent-level {
			width: 160rpx;
			text-align: center;
			background-color: #dfeaff;
			border-radius: #{12rpx};
			padding: #{6rpx} 0;
			font-size: 26rpx;
		}
		.agent-phone {
		}
	}
	.mtb-10 {
		margin-top: #{10rpx};
	}
}
.team-num-h {
	height: 192rpx;
}
.team-top {
	position: fixed;
	width: 100%;
	-webkit-box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);
	background-color: #ffffff;
	padding: #{28rpx} #{16rpx};
	margin-bottom: #{28rpx};
	.team-num > view {
		width: 50%;
		text-align: center;
	}
}
.team-num {
	font-size: #{28rpx};
	.nav-end {
		margin-top: #{10rpx};
		display: flex;
		text {
			margin-left: 10rpx;
		}
	}
	.nav-end > view {
		width: 50%;
		text-align: center;
	}
}
.nav-left {
	margin-left: #{-1rpx};
	border-right: #{1rpx} solid #bbb;
}
.nav-title {
	font-size: #{36rpx};
	color: #ff8f17;
	margin-bottom: #{10rpx};
}
</style>
