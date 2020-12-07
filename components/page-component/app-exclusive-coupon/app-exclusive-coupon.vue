<template>
	<view class="app-exclusive-coupon" :style="{'background-color': `${noneColor ? '' : background}`}">
		<view class="app-top dir-left-nowrap main-between" v-if="showTop">
			<view class="app-left dir-left-nowrap main-between cross-center">
				<icon class="app-icon"></icon>
				<text class="app-title">专享优惠券</text>
			</view>
			<view class="app-right dir-left-nowrap main-between cross-center">
				<app-jump-button form url="/pages/coupon/list/list" open_type="navigate">
					<text class="app-text">更多</text>
					<icon class="app-icon"></icon>
				</app-jump-button>
			</view>
		</view>
		<view class="app-bottom">
			<scroll-view scroll-x class="app-scroll dir-left-nowrap">
				<view v-for="(item, index) in coupon_list"
				      :key="index"
				      class="app-item"
				      :style="{backgroundImage: `url(${item.is_receive === '0' ? unclaimedBg : item.is_receive === '1' ? receiveBg : ''})`}"
				>
					<app-form-id @click="receive(index)">
						<view class="dir-left-nowrap main-left">
							<view class="app-text-left">
								<view class="app-text-top">
									<template v-if="item.type === '1'">
										<text class="app-number discount" :style="{color: textColor}">{{item.discount}}</text>
									</template>
									<template v-else>
										<text class="app-symbol" :style="{color: textColor}">￥</text>
										<text class="app-number" :style="{color: textColor}">{{item.sub_price}}</text>
									</template>
								</view>
								<text class="app-text-bottom" :style="{color: textColor}">满{{item.min_price}}元可用</text>
							</view>
							<view class="app-text-right">
								<text :style="{color: textColor}">{{item.is_receive === '0' ? receiveTip : item.is_receive > '0' ? '已领取' : ''}}</text>
							</view>
						</view>
					</app-form-id>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
    export default {
        name: 'app-exclusive-coupon',
	    props: {
            receiveBg: {
                type: String,
	            default: function() {
	                return '';
	            }
            },
            textColor: {
                type: String,
	            default: function() {
	                return  "#ffffff";
	            }
            },
            unclaimedBg: {
                type: String,
	            default: function() {
	                return ''
	            }
            },
            index: {
                type: Number,
            },
            sign: {
                type: String,
            },
		    coupon_list: {
                type: Array,
			    default: function() {
			        return [
			        ]
			    }
		    },
			showTop: {
                type: Boolean,
				default() {
                    return true;
				}
			},
			noneColor: {
                type: Boolean,
				default() {
                    return false;
				}
			}
	    },
        data() {
            return {
                list: []
            };
        },
        watch: {
            coupon_list: {
                handler() {
                    // this.list = this.coupon_list;
                },
                immediate: true
            }
        },
		computed: {
          	receiveTip() {
                let receiveTip = '立即领取';
          	    if (this.sign === 'integral-mall') {
                    receiveTip = '立即兑换';
				}
          	    return receiveTip;
			}
		},
	    methods: {
            receive(index) {
                let list = this.coupon_list;
                if (this.sign == 'integral-mall') {
                    this.$jump({
						url: list[index].page_url,
						open_type: 'navigate'
					});
                    return ;
				}
                if (list[index].is_receive == 1) {
                    uni.showToast({
                        mask: true,
                        title: '已领取',
                        icon: 'none'
                    });
                    return true;
                }
                uni.showLoading({
                    mask: true,
                    title: '领取中'
                });
                this.$request({
                    url: this.$api.coupon.receive,
                    data: {
                        coupon_id: list[index].id
                    }
                }).then(e => {
                    uni.hideLoading();
                    if (e.code === 0) {
                        list[index].is_receive = '1';
                        this.$store.dispatch('page/actionSetCoupon', {
                            list: [list[index]],
							type: 'receive'
						});
                        this.list = list;
                    }
                }).catch(() => {
                    uni.hideLoading();
                });
            }
	    }
    }
</script>

<style scoped lang="scss">
	.app-exclusive-coupon {
		width: #{750rpx};
		.app-top {
			width: #{750rpx};
			height: #{80rpx};
			border-bottom: #{1rpx} solid #e2e2e2;
			.app-icon {
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			.app-left {
				width: #{215rpx};
				height: #{80rpx};
				margin-left: #{24rpx};
				.app-icon {
					width: #{46rpx};
					height: #{46rpx};
					background-image: url("../../../static/image/icon/coupon-icon.png");
				}
				.app-title {
					font-size: #{28rpx};
					color: #ff8831;
				}
			}
			.app-right {
				height: #{80rpx};
				width: #{75rpx};
				margin-right: #{24rpx};
				.app-icon {
					width: #{12rpx};
					height: #{22rpx};
					background-image: url("../../../static/image/icon/arrow-right.png");
				}
				.app-text {
					font-size: #{26rpx};
					color: #999999;
				}
			}
		}
		.app-bottom {
			padding-top: #{16rpx};
			padding-left: #{8rpx};
			padding-bottom: #{16rpx};
			height: #{130+16+16rpx};
			width: #{750rpx};
			.app-scroll {
				height: #{130+16+16rpx};
				width: #{750-24rpx};
				white-space: nowrap;
			}
			.app-item {
				width: #{256rpx};
				height: #{130rpx};
				display: inline-block;
				margin-left: #{16rpx};
				background-repeat: no-repeat;
				background-size: 100% 100%;
				>view {
					width: #{256rpx};
					height: #{130rpx};
				}
				.app-text-left {
					width: #{199rpx};
					height: #{130rpx};
					.app-text-top {
						height: #{78rpx};
						padding-top: #{1rpx};
						overflow: hidden;
						text-align: center;
						.app-symbol {
							display: inline-block;
							height: #{78rpx};
							font-size: #{20rpx};
						}
						.app-number {
							display: inline-block;
							height: #{78rpx};
							padding-top: #{26rpx};
							font-size: #{40rpx};
							width: #{159rpx};
						}

						.discount:after {
							content: '折';
							font-size: 75%;
						}
					}
					.app-text-bottom {
						height: #{50rpx};
						width: #{199rpx};
						text-align: center;
						font-size: #{20rpx};
						display: inline-block;
					}
				}
				.app-text-right {
					width: #{50rpx};
					height: #{130rpx};
					text {
						height: #{130rpx};
						width: #{50rpx};
						display: inline-block;
						text-align: center;
						line-height: #{50rpx};
						font-size: #{20rpx};
						margin-left: #{2rpx};
						writing-mode: vertical-rl;
						letter-spacing: #{5rpx};
					}
				}
			}
		}
	}
</style>