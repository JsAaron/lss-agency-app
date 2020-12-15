<template>
	<app-layout>
		<view v-if="indexlist.length !== 0">
			<!-- 用户信息开始 -->
			<view
				class="info"
				:style="{
					'background-image': 'url(' + share_setting.pic_url_home_head + ')'
				}"
			>
				<view class="user-info dir-left-nowrap cross-center">
					<image class="user-avatar box-grow-0" :src="userInfo.avatar"></image>
					<view class="box-grow-1 dir-top-nowrap main-center">
						<view class="user-name t-omit">
							<text>{{ indexlist.name }}</text>
							<view class="agent-level">
								<image src="/static/image/agency/aglevel-icon.png"></image>
								<text v-if="indexlist.type == 1">服务商</text>
								<text v-if="indexlist.type == 2">社区服务商</text>
								<text v-if="indexlist.type == 3">商圈服务商</text>
								<text v-if="indexlist.type == 4">区县服务商</text>
								<text v-if="indexlist.type == 5">市级服务商</text>
							</view>
						</view>
						<view class="mtb-10">手机号：{{ indexlist.mobile }}</view>
						<view class="t-omit agent-recom" v-if="indexlist.agentUser.name">
							推荐人：{{ indexlist.agentUser.name }}
							<text>{{ indexlist.agentUser.mobile }}</text>
						</view>
						<view class="t-omit agent-recom" v-else>推荐人：脸刷刷公司</view>
					</view>
				</view>
			</view>
			<!-- 余额情况开始 -->
			<view class="nav main-balance">
				<view class="balance-top main-between cross-center">
					<view class="nav-left">
						<view>账户余额（元）</view>
						<view class="money" v-if="indexlist.balance == 0 || indexlist.balance == null">0.00</view>
						<view class="money" v-else>{{ mathnum(indexlist.balance * 0.01) }}</view>
					</view>
					<view class="nav-right">
						<view class="cash-btn" @click="toCash">提现</view>
						<view class="box-grow-0 cash-detail" @click="toCashDetail">
							<text>提现记录</text>
							<image class="box-grow-0 arrow-right" src="/static/image/icon/arrow-right.png"></image>
						</view>
					</view>
				</view>
				<view class="balance-mid cross-center">
					<view class="nav-left mid-ytx">
						<view class="nav-title">已提现（元）</view>
						<view v-if="indexlist.cash_money == null || indexlist.cash_money == 0">0.00</view>
						<view v-else>{{ indexlist.cash_money }}</view>
					</view>
					<view class="nav-left mid-drz">
						<view class="nav-title">待入账（元）</view>
						<view v-if="indexlist.no_entry == null || indexlist.no_entry == 0">0.00</view>
						<view v-else>{{ mathnum(indexlist.no_entry / 100) }}</view>
					</view>
					<view class="mid-zsy">
						<view class="nav-title">总收益（元）</view>
						<view v-if="indexlist.total_amt == null || indexlist.total_amt == 0">0.00</view>
						<view v-else>{{ mathnum(indexlist.total_amt / 100) }}</view>
					</view>
				</view>
			</view>
			<!-- 功能菜单开始 -->
			<view class="list dir-left-wrap">
				<view class="list-item">
					<view @click="toPromoteBe">
						<image src="/static/image/agency/agency-tgsy.png"></image>
						<view>推广收益</view>
						<view v-if="indexbelist.income_price_up == null || indexbelist.income_price_up == 0">0.00元</view>
						<view v-else>{{ mathnum(indexbelist.income_price_up / 100) }}元</view>
					</view>
				</view>
				<view class="list-item">
					<view @click="toConsumerBe">
						<image src="/static/image/agency/agency-xfsy.png"></image>
						<view>商家佣金</view>
						<view v-if="indexbelist.income_price_shopping == null || indexbelist.income_price_shopping == 0">
							0.00元
						</view>
						<view v-else>{{ mathnum(indexbelist.income_price_shopping / 100) }}元</view>
					</view>
				</view>
				<!--  <view class="list-item">
                    <view @click="toPayBe">
                        <image src="/static/image/agency/agency-zfsy.png"></image>
						<view>支付收益</view>
						<view v-if="indexbelist.pay_price_face == null || indexbelist.pay_price_face == 0">0.00元</view>
						<view v-else>{{mathnum(indexbelist.pay_price_face/100)}}元</view>
                    </view>
                </view> -->
				<view class="list-item">
					<view @click="toAdvertBe">
						<image src="/static/image/agency/agency-ggsy.png"></image>
						<view>广告收益</view>
						<view>0.00元</view>
					</view>
				</view>
				<view class="list-item">
					<view @click="toMyTeam">
						<image src="/static/image/agency/agency-wdtd.png"></image>
						<view>我的团队</view>
					</view>
				</view>
				<view class="list-item">
					<view @click="choiseShareMethod">
						<image src="/static/image/agency/agency-fx.png"></image>
						<view>我要分享</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 弹窗 -->
		<my-pop :show="shareShow" @mask="closeView">
			<view class="choiseView">
				<view class="choiseItem">
					<image
						class="choiseImg"
						src="/static/image/agency/share-shop.png"
						mode="scaleToFill"
						@click="toQrcode(2)"
					></image>
					<view>推广商家入驻</view>
				</view>
				<view class="choiseItem">
					<image
						class="choiseImg"
						src="/static/image/agency/share-agent.png"
						mode="scaleToFill"
						@click="toQrcode(1)"
					></image>
					<view>推广代理</view>
				</view>
			</view>
			<view class="closeBtn" @click="closeView">X</view>
		</my-pop>
	</app-layout>
</template>

<script> 
import { mapState } from 'vuex';
import myPop from './myPop';
export default {
	components: { myPop },
	data() {
		return {
			indexlist: [], //获取列表
			name: null,
			first: false,
			page_loading: true,
			agent_parent_id: '',
			shareShow: false,
			indexbelist: [] //收益列表
		};
	},
	computed: {
		...mapState({
			theme: state => state.mallConfig.theme,
			userInfo: state => state.user.info,
			custom_setting: state => state.mallConfig.share_setting_custom,
			mall: state => state.mallConfig.mall
		})
	},
	methods: {
		mathnum(num) {
			if (num) {
				var n = num.toFixed(2);
				return n;
			}
		},
		// 菜单跳转
		toPromoteBe() {
			uni.navigateTo({
				url: '/pages/agency/promote-be/promote-be'
			});
		},
		toConsumerBe() {
			uni.navigateTo({
				url: '/pages/agency/consumer-be/consumer-be'
			});
		},
		toAdvertBe() {
			uni.navigateTo({
				url: '/pages/agency/advert-be/advert-be'
			});
		},
		toPayBe() {
			uni.navigateTo({
				url: '/pages/agency/pay-be/pay-be'
			});
		},
		toMyTeam() {
			uni.navigateTo({
				url: '/pages/agency/myteam/myteam'
			});
		},
		choiseShareMethod() { 
			this.shareShow = true;
		},
		closeView() {
			this.shareShow = false;
		},
		toQrcode(type) {
			uni.navigateTo({
				url: `/pages/agency/qrcode/qrcode?type=${type}`
			});
			this.shareShow = false;
		},
		//功能跳转
		toUp() {
			uni.navigateTo({
				url: `/pages/agency/indexup/indexup?agent_parent_id=${this.agent_parent_id}`
			});
		},
		toCash() {
			uni.navigateTo({
				url: '/pages/agency/cash/cash?money=' + this.indexlist.balance * 0.01
			});
		},
		toCashDetail() {
			uni.navigateTo({
				url: '/pages/agency/ag-cash-detail/ag-cash-detail'
			});
		},

		//获取代理数据
		getList() {
			let that = this;
			that
				.$request({
					url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/list',
					method: 'GET'
				})
				.then(response => {
					that.$hideLoading();
					if (response.code == 0) {
						that.indexlist = response.data.list;
					} else {
					}
				})
				.catch(response => {
					that.$hideLoading();
				});
		},
		//获取收益数据
		getBeList() {
			let that = this;
			that
				.$request({
					url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/all-list',
					method: 'GET'
				})
				.then(response => {
					that.$hideLoading();
					if (response.code == 0) {
						console.log(response.data.data);
						that.indexbelist = response.data.data;
					} else {
					}
				})
				.catch(response => {
					that.$hideLoading();
				});
		}
	},

	onLoad(options) {
		this.$store.dispatch('user/info');
		this.$showLoading({
			type: 'global',
			text: '加载中...'
		});
		if (options.agent_parent_id) {
			this.agent_parent_id = options.agent_parent_id;
		}
		this.getList();
		this.getBeList();
	},
	onShow() {
		let that = this;
		if (that.first) {
			that.getList();
			that.getBeList();
		}
	}
};
</script>

<style scoped lang="scss">
//推广弹出层
.choiseView {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 90%;
	height: 300upx;
	font-size: 26rpx;
	color: #666;
	.choiseItem {
		display: inline-block;
		text-align: center;
		width: 50%;
	}
}
.choiseImg {
	width: 110upx;
	height: 110upx;
}
.closeBtn {
	position: absolute;
	top: 8rpx;
	right: 16rpx;
	z-index: 100;
}
.info {
	background-color: #ff4544;
	width: 100%;
	padding: #{38rpx} #{25rpx};
	color: #fff;
	font-size: #{28rpx};
	background-repeat: no-repeat;
	background-size: #{750rpx} #{312rpx};
}

.user-info {
	.arrow-right {
		width: #{12rpx};
		height: #{22rpx};
		margin-left: #{12rpx};
		display: block;
	}
	.user-name {
		text {
			font-size: #{36rpx};
			vertical-align: middle;
		}
	}
	.agent-level {
		font-size: 30rpx;
		color: #ff4544;
		display: inline-block;
		background-color: black;
		white-space: nowrap;
		overflow: hidden;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		border-radius: 27rpx;
		padding: 0rpx 28rpx 5rpx;
		margin-left: 18rpx;
		vertical-align: middle;
		image {
			width: #{30rpx};
			height: #{30rpx};
			margin-right: 6rpx;
			vertical-align: middle;
		}
		text {
			font-size: 30rpx;
			vertical-align: middle;
		}
	}
	.agent-recom {
		text {
			margin-left: 16rpx;
		}
	}
}
.user-avatar {
	width: #{120rpx};
	height: #{120rpx};
	border-radius: 50%;
	font-size: #{26rpx};
	margin-right: #{40rpx};
}
.mtb-10 {
	margin: #{10rpx 0};
}
//账户余额
.nav {
	background-color: #fff;
	padding: #{40rpx} 0;
	text-align: center;
	font-size: #{30rpx};
	color: #666;
	width: #{702rpx};
	margin: #{16rpx} auto 0;
	border-radius: #{10rpx};
}
.balance-mid > view {
	width: 50%;
	text-align: center;
}
.balance-top {
	margin: 0 #{30rpx} #{30rpx};
	.nav-left {
		border-right: 0px;
		text-align: left;
		.money {
			margin-top: #{8rpx};
			font-size: #{38rpx};
		}
	}
	.nav-right {
		width: auto;
		height: #{112rpx};
	}

	.nav-right {
		.cash-btn {
			background-color: #ff4544;
			color: #fff;
			border: #{2rpx} solid #fff;
			padding: 0 #{32rpx};
			height: #{62rpx};
			line-height: #{58rpx};
			border-radius: #{27rpx};
			font-size: #{30rpx};
		}
		.cash-detail {
			margin-top: 10rpx;
			text {
				font-size: 26rpx;
				color: #9a9a9a;
			}
			image {
				width: 12rpx;
				height: 22rpx;
				margin-left: 12rpx;
			}
		}
	}
	.nav-right button::after {
		border: 0;
	}
}
.nav-left {
	margin-left: #{-1rpx};
	border-right: #{1rpx} solid #bbb;
}
.nav-title {
	font-size: #{26rpx};
	color: #ff8f17;
	margin-bottom: #{10rpx};
}

.nav-left .nav-title {
	color: #22af19;
}

.list {
	margin: #{16rpx} auto 0;
	background-color: #fff;
	width: #{702rpx};
	border-radius: #{10rpx};
}

.list-item {
	height: #{220rpx};
	width: #{234rpx};
	text-align: center;
	padding-top: #{57rpx};
	font-size: #{24rpx};
	color: #666;
}

.list-item image {
	height: #{61rpx};
	width: #{61rpx};
	vertical-align: top;
	margin-top: #{-10rpx};
	margin-bottom: #{10rpx};
}

.list-item text {
	color: #ff6868;
}

.list-item.no-border {
	border-bottom: 0;
}
//升级代理
.no-pass {
	height: 100%;
	width: 100%;
	.agency-bg {
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		width: 100%;
		height: 100%;
		z-index: -999;
	}
	.no-pass-btn {
		position: absolute;
		z-index: 1;
		left: 50%;
		transform: translateX(-50%);
		bottom: 80rpx;
		background-color: #e7b394;
		background: linear-gradient(to right, #faeadd 0%, #e7b394 100%);
		height: #{88rpx};
		width: #{560rpx};
		border-radius: #{40rpx};
		margin: #{88rpx} auto 0;
		color: #32303a;
		font-size: #{36rpx};
		line-height: #{88rpx};
	}
}
//弹窗
.agency-share-code {
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: #f2f2f2;
}
</style>
