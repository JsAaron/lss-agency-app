<template>
	<view class="app-recommended-product-list dir-left-nowrap">
		<scroll-view scroll-y class="app-classification" :style="{height: `${height - 110}rpx`}">
			<text class="app-class-item"
			      v-for="(item, index) in catList" :key="index"
			      :class="{'app-class-item-active': activeIndex === index}"
			      @click="goClass(index)"
			>{{item.menuName}}</text>
		</scroll-view>
		<view class="app-product">
			<scroll-view class="app-product-scroll" :scroll-into-view="`scroll-${activeIndex}`" :style="{height: `${height - 110}rpx`}" scroll-y>
				<block v-for="(page, number) in catList" :key="number">
					<view class="app-product-class-item">
						<text class="app-class-name" :id="`scroll-${number}`">{{page.menuName}}</text>
						<view class="app-product-item"
						      v-for="(item, index) in page.goodsList"
						      :key="index"
						      :class="{'app-product-border': index !== getLength(page.goodsList), 'app-margin-top': index !== 0,'have-bg': goodsStyle < 3}"
						>
							<view class="app-product-border-all"
								:class="{'app-product-border-all-item': goodsStyle === 2}"
							>
								<view @click="jump_router(item)" >
									<view class="out-dialog" v-if="item.goods_stock == 0  && appSetting.is_show_stock == '1'">
				                        <image :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
				                    </view>
									<view class="dir-left-nowrap main-between cross-top">
										<image lazy-load="true" class="app-tag-icon" :src="goodsTagPicUrl" v-if="showGoodsTag"></image>
											<view style="border-radius: 16rpx;">
												<app-image borderRadius="16rpx" :img-src="item.cover_pic" width="160rpx" height="160rpx"
												           :mode="fill === 1 ? 'aspectFill' : 'aspectFit'"></app-image>
											</view>
											<view class="app-product-content dir-top-nowrap main-between"
											      :class="{'dir-top-nowrap': !showGoodsName, 'main-right': !showGoodsName}"
											>
												<text class="app-product-name" v-if="showGoodsName">{{item.name}}</text>
												<view class="app-price-buttons  main-between cross-bottom" :class="{'dir-right-nowrap': !showGoodsPrice , 'dir-left-nowrap': showGoodsPrice}">
													<view class="price">
														
														<view v-if="item.is_level == 1 && item.is_negotiable != 1" style="height: 32rpx;margin-bottom: 8rpx;">
															<app-member-price :price="item.level_price"></app-member-price>
														</view>
														<app-sup-vip :is_vip_card_user="item.vip_card_appoint.is_vip_card_user" v-if="item.vip_card_appoint.discount > 0" :discount="item.vip_card_appoint.discount"></app-sup-vip>
														<text class="app-price" v-if="showGoodsPrice">{{item.price_content}}</text>
													</view>
													<template v-if="showBuyBtn && item.price_content !== '面议'">
														<button class="app-product-button"
														        @click.stop="buyProduct(item)"
														        v-if="buyBtn === 'text'" :style="btnStyle"
														        :class="{
															'app-button-filling': buyBtnStyle === 1,
															'app-button-line' : buyBtnStyle === 2 ,
															'app-button-fillet' : buyBtnStyle === 3,
															'app-button-rounded-lines': buyBtnStyle === 4,
														}"
														>{{buyBtnText}}</button>
														<icon @click.stop="buyProduct(item)"
														      class="app-button-icon app-product-button-cart"
														      v-if="buyBtn === 'cart' && item.goods_stock != 0"
														></icon>
														<icon @click.stop="buyProduct(item)"
														      class="app-button-icon app-product-button-add"
														      v-if="buyBtn === 'add' && item.goods_stock != 0"
														></icon>
													</template>
												</view>
											</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<view>
			<app-attr
				:goods="goods"
				:attrGroupList="goods.attr_groups"
				:show="show"
				:selectAttr="selectAttr"
				@attr="attr"
			></app-attr>
		</view>
	</view>
</template>

<script>
    import { mapState, mapGetters } from "vuex";
	import appAttr from '../../../components/page-component/app-attr/app-attr.vue';
	import appMemberPrice from "../app-member-mark/app-member-price.vue";
	import appSupVip from '../app-sup-vip/app-sup-vip.vue';
	
    export default {
        name: 'app-recommended-product-list',
	    data() {
            return {
                scrollIndex: 0,
	            height: 0,
                activeIndex: 0,
	            cartIndex: -1,
                show: false,
                selectAttr: {},
	            goods: {},
            }
	    },
	    props: {
            catList: {
                type: Array,
	            default: function() {
	                return [
	                ]
	            }
            },
            fill: {
                type: Number,
	            default: function() {
	                return 1;
	            }
            },
            buyBtnText: {
                type: String,
                default: function() {
                    return '购买放电';
                }
            },
            buyBtnStyle: {
                type: Number,
                default: function() {
                    return 4;
                }
            },
            showBuyBtn: {
                type: Boolean,
	            default: function() {
	                return true;
	            }
            },
            showGoodsPrice: {
                type: Boolean,
                default: function() {
                    return true;
                }
            },
            buyBtn: {
                type: String,
                default: function() {
                    return 'cart';
                }
            },
            goodsStyle: {
                type: Number,
                default: function() {
                    return 1;
                }
            },
            goodsTagPicUrl: {
                type: String,
                default: function() {
                    return 'https://www.bangdian.net/plugins/diy/assets/images/goods-tag-rx.png';
                }
            },
            showGoodsTag: {
                type: Boolean,
                default: function() {
                    return true;
                }
            },
            showGoodsName: {
                type: Boolean,
                default: function() {
                    return true;
                }
            },
            buttonColor: {
                type: String,
                default() {
                    return '#ff4544';
                }
            },
	    },
        computed: {
            ...mapState({
                appImg: state => state.mallConfig.__wxapp_img.mall,
                appSetting: state => state.mallConfig.mall.setting,
            }),
			...mapGetters('mallConfig',{
				getVideo: 'getVideo'
			}),
            btnStyle() {
                let btnStyle = ``;
                if (this.buyBtnStyle === 1 || this.buyBtnStyle === 3) {
                    btnStyle += `background-color: ${this.buttonColor};color: #ffffff;`;
                } else {
                    btnStyle += `border-color: ${this.buttonColor};color: ${this.buttonColor};`;
                }
                return btnStyle;
            },
        },
	    created() {
            let _this = this;
            wx.getSystemInfo({
                success: function(res) {
                    _this.height = (750/res.windowWidth) * res.windowHeight;
                }
            })
	    },
	    methods: {
            getLength(data) {
                return data.length -1;
            },
            buyProduct(data) {
                if (data.mch_id === 0) {
                    this.$request({
                        url: this.$api.goods.detail,
                        data: {
                            id: data.id,
                        }
                    }).then(res => {
                        if (res.code === 0) {
                            this.goods = res.data.goods;
                            this.show = Math.random();
                        }
                    })
                } else {
                    this.$request({
                        url: this.$api.mch.goods_detail,
                        data: {
                            mch_id: data.mch_id,
                            id: data.id,
                        }
                    }).then(res => {
                        if (res.code === 0) {
                            this.goods = res.data.goods;
                            this.show = Math.random();
                        }
                    })
                }
            },
            goClass(index) {
                this.activeIndex = index;
            },
            attr(data) {
            },
			jump_router(data) {
				// #ifndef MP-BAIDU
				if (data.video_url && this.getVideo == 1) {
					uni.navigateTo({
						url: `/pages/goods/video?goods_id=${data.id}&sign=${data.sign}`
					});
				} else {
					uni.navigateTo({
						url: data.page_url
					});
				}
				// #endif

				// #ifdef MP-BAIDU
				uni.navigateTo({
					url: data.page_url
				});
				// #endif
			}
	    },
	    components: {
            'app-attr': appAttr,
			'app-member-price': appMemberPrice,
	        'app-sup-vip': appSupVip,
	    }
    }
</script>

<style scoped lang="scss">
	.app-recommended-product-list {
		width: #{750rpx};
		height: #{100%};
		.app-classification {
			width: #{160rpx};
			height: #{100%};
			// background-color: #f7f7f7;
			.app-class-item {
				display: inline-block;
				width: #{158rpx};
				line-height: #{104rpx};
				font-size: #{26rpx};
				text-align: center;
				color: #353535;
				border-left: #{2rpx} solid transparent;
			}
			.app-class-item-active {
				border-color: #ff4544;
				color: #ff4544;
				// background-color: #ffffff;
			}
		}
		.app-product {
			height: #{100%};
			padding-left: #{24rpx};
			padding-top: #{4rpx};
			// background-color: #ffffff;
			.app-product-class-item {
				width: #{750-160-24rpx};
				.app-class-name {
					display: inline-block;
					width: #{750-160-24rpx};
					padding-top: #{40rpx};
					padding-bottom: #{36rpx};
					font-size: #{24rpx};
					color: #666666;
				}
				.app-product-item {
					width: #{750-160-24-12rpx};
					border-radius: #{16rpx};
					&.have-bg {
						background-color: #fff;
					}
					position: relative;
					.app-tag-icon {
						position: absolute;
						top: 0;
						left: 0;
						width: #{55rpx};
						height: #{55rpx};
						z-index: 1000;
					}
				    .out-dialog {
				        width: #{160rpx};
				        height: #{160rpx};
				        position: absolute;
				        z-index: 10;
				        background-color: rgba(0,0,0,.5);
				        image {
				            width: #{160rpx};
				            height: #{160rpx};
				            border-radius: #{16rpx};
				        }
				    }
					.app-product-image {
						/* #ifndef MP-ALIPAY */
						width: #{150rpx};
						/* #endif */
						/* #ifdef MP-ALIPAY */
						width: #{136rpx};
						/* #endif */
						/* #ifndef MP-ALIPAY */
						height: #{150rpx};
						/* #endif */
						/* #ifdef MP-ALIPAY */
						height: #{136rpx};
						/* #endif */
					}
					.app-product-content {
						width: #{750-160-24-152-20rpx};
						height: #{160upx};
						padding: 0 #{21rpx} #{23rpx};
						.app-product-name {
							font-size: #{28rpx};
							color: #353535;
							padding-top: #{15rpx};
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							width: #{750-160-24-152-20-24rpx};
							/* #ifndef MP-ALIPAY */
							height: #{75rpx};
							line-height: #{30rpx};
							/* #endif */
							/* #ifdef MP-ALIPAY */
							height: #{75rpx};
							line-height: #{35rpx};
							/* #endif */
							margin-bottom: #{10rpx};
						}
						.app-price-buttons {
							
							width: #{750-160-24-152-20-24-24rpx};
							.app-price {
								font-size: #{28rpx};
								color: #ff4544;
							}
							.app-product-button {
								display: inline-block;
								padding: 0 #{20rpx};
								height: #{48rpx};
								font-size: #{28rpx};
								color: #ffffff;
								line-height: #{48rpx};
								border-radius: 0;
								margin: 0;
							}
							.app-button-filling {
							}
							.app-button-fillet {
								border-radius: #{20rpx} !important;
							}
							.app-button-line {
							}
							.app-button-rounded-lines {
								border-radius: #{20rpx} !important;
							}
							.app-product-button-cart {
								background-image: url("../../../static/image/icon/shopping-cart.png");
							}
							.app-product-button-add {
								background-image: url("../../../static/image/icon/add-to.png");
							}
						}
					}
					.app-product-border-all {
						width: #{750-160-24-12rpx};
						border-radius: #{10rpx};
					}
					.app-product-border-all-item {
						border: #{1rpx} solid #e2e2e2;
					}
					.app-button-icon {
						background-repeat: no-repeat;
						background-size: 100% 100%;
						width: #{36rpx};
						height: #{36rpx};
					}
				}
				.app-product-border {
					border-bottom-color: #e2e2e2;
				}
				.app-margin-top {
					margin-top: #{24rpx};
				}
			}
		}
	}
	.app-volume {
		margin: #{8rpx 0};
		font-size: #{22rpx};
		color: #666666;
	}
</style>
