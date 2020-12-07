<template>
	<view class="page-width product-list dir-top-nowrap">
		<view class="page-width row dir-left-nowrap main-between box-grow-1" v-for="(row, key) in goods_list" :key="key">
			<view @click="routeGo(item)"
					class="goods box-grow-0 dir-top-nowrap main-between"
					v-for="(item, index) in row"
					:key="index">
				<view class="image-name dir-top-nowrap main-left" >
					<view class="out-dialog" v-if="item.goods_stock == 0 && appSetting.is_show_stock == '1'">
                        <image :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
                    </view>
					<image class="image" :src="item.cover_pic" :lazy-load="true" mode="aspectFill"></image>
					<view class="name t-omit-two" v-if="is_name && isShowGoodsName == 1">{{item.name}}</view>
				</view>
				<view class="content dir-top-nowrap main-right" :style="{height: is_name ? 'calc(100% - #{426rpx})': 'height: calc(100% - #{384rpx});'}" >
					
					<!-- 会员价 -->
					<view class="member-price" v-if="item.is_level == 1 && item.is_negotiable != 1">
						<app-member-price
								:price="item.level_price"
						></app-member-price>
					</view>
					
					<!-- 超级会员卡 -->
					<view class="app-sup-vip" v-if="item.vip_card_appoint.discount > 0">
						<app-sup-vip
								:discount="item.vip_card_appoint.discount"
								:is_vip_card_user="item.vip_card_appoint.is_vip_card_user"
						></app-sup-vip>
					</view>
					
					<!-- 价格 销量 -->
					<view
						class="price-total page-width dir-left-nowrap main-between cross-center"
					>
						<text :class="[`${theme}-color`, 'price']">
							{{item.price_content}}
						</text>
						<template v-if="sign === 'gift'">
							<text v-if="item.is_negotiable != 1" class="gray sales">{{item.sales}}</text>
						</template>
						<template v-else>
							<text v-if="item.is_negotiable != 1 && isShowSalesNum == 1" class="gray sales">{{item.sales}}</text>
							<div v-if="item.is_negotiable != 1 && isShowCart == 1 && item.goods_stock > 0" class="box-grow-1 cart-box">
								<!--  #ifdef  MP-ALIPAY -->
								<img style="-webkit-background-origin: content-box;background-origin: content-box;"
									 @click.stop="specification(item)"
									 class="goods-cart"
									 src="/static/image/icon/goods-cart.png">
								<!--  #endif -->
								<!-- #ifndef MP-ALIPAY -->
								<img @click.stop="specification(item)"
									 class="goods-cart"
									 src="/static/image/icon/goods-cart.png">
								<!-- #endif -->
							</div>
						</template>
					</view>
				</view>
			</view>
		</view>
		<app-attr ref="attr" :goods="item" :select-attr="selectAttr" :attr-group-list="attrGroup" :show="show"
				  @attrtap="onAttr"></app-attr>
	</view>
</template>

<script>
    import { mapState, mapGetters } from "vuex";
    import appMemberPrice from '../../../components/page-component/app-member-mark/app-member-price.vue';
    import appSupVip from '../../../components/page-component/app-sup-vip/app-sup-vip.vue';
    import appAttr from '../../../components/page-component/app-attr/app-attr.vue';

    export default {
        name: 'product-list',

        props: {
            goods_list: Array,
            theme: String,
            is_name: {
                type: Boolean,
	            default: true,
            },
			sign: String,
        },
        computed: {
            ...mapState({
                appImg: state => state.mallConfig.__wxapp_img.mall,
                isShowCart: state => state.mallConfig.mall.setting.is_show_cart,
                isShowGoodsName: state => state.mallConfig.mall.setting.is_show_goods_name,
                isShowSalesNum: state => state.mallConfig.mall.setting.is_show_sales_num,
                appSetting: state => state.mallConfig.mall.setting,
            }),
        },

        methods: {
            routeGo(data) {
                this.$emit('routeGo', data);
            },
            specification(goods) {
                this.attrGroup = goods.attr_groups;
                this.item = goods;
                this.show = Math.random();
            },
            onAttr(data) {
                this.selectAttr = data;
            },
        },
        data() {
            return {
                show: 0,
                item: null,
                selectAttr: {},
                attrGroup: [],
            }
        },
	    
        components: {
            'app-member-price': appMemberPrice,
            'app-sup-vip': appSupVip,
            'app-attr': appAttr,
        },
    }
</script>

<style scoped  lang="scss">
	.product-list {
		padding: #{0 20upx};
		position: relative;
		
		.row {
			margin-top: #{15upx};
			.goods {
				background-color: #ffffff;
				width: #{344upx};
				border-radius: #{15upx};
			}
		}
	}
	/*图片名字*/
	.image-name {
		width: 100%;
		border-top-left-radius: #{15upx};
		border-top-right-radius: #{15upx};
		position: relative;
	    .out-dialog {
			border-top-left-radius: #{15upx};
			border-top-right-radius: #{15upx};
	        width: #{344upx};
	        height: #{344upx};
	        position: absolute;
	        top: 0;
	        z-index: 10;
	        left: 0;
	        background-color: rgba(0,0,0,.5);
	        image {
	            width: #{344upx};
	            height: #{344upx};
	        }
	    }
		.image {
			width: 100%;
			height: #{344upx};
			border-top-left-radius: #{15upx};
			border-top-right-radius: #{15upx};
		}
		.name {
			font-size: #{26upx};
			color: #353535;
			padding: #{0 24upx};
			margin-top: #{20upx};
			line-height: #{31upx};
			height: #{62upx};
		}
	}
	
	.content-name {
		height: calc(100% - #{426upx});
	}
	
	.content-no {
		height: calc(100% - #{384upx});
	}
	/*复杂内容*/
	.content {
		padding: #{0 24upx};
		
		.price-total {
			margin: #{16upx 0 30upx 0};
			.sales {
				font-size: #{20rpx};
				margin-left:#{12rpx};
			}
			.price {
				font-size: #{28rpx};
			}
		}
		/*会员价组件*/
		.member-price {
			margin-top: #{12upx};
		}
		
		/*超级会员卡组件*/
		.app-sup-vip {
			margin-top: #{9upx};
		}
		
	}
	
	/*默认文字颜色*/
	.default-color {
		color: #ff4544;
	}

	.cart-box {
		position: relative;
	}
	.goods-cart {
		width: #{92rpx};
		height: #{92rpx};
		position: absolute;
		padding: #{32rpx};
		right: #{-24rpx};
		top: #{-50rpx};
	}
</style>