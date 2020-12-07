<template>
    <view class="app-goods-price">
        <view class="top dir-left-nowrap">
            <view class="box-grow-1 cross-center negotiable"
                  :class="theme + '-color'"
                  v-if="goods.is_negotiable && goods.is_negotiable === 1"
            >价格面议
            </view>
            <view class="box-grow-1" v-else>
                <view v-if="goods.level_show === 1">
                    <view class="dir-left-nowrap cross-bottom">
                        <view class="price box-grow-0" style="color: #f39800;font-family: DIN;">
                            <app-price :max="`${goodsPrice.max}`" :min="`${goodsPrice.min}`"
                                       :default-price="`${goodsPrice.price}`"></app-price>
                        </view>
                        <view class="app-member-mark" v-if="is_show_member">
                            <app-member-mark></app-member-mark>
                        </view>
                        <app-sup-vip :is_vip_card_user="is_vip_card_user" margin="0 0 0 13rpx" v-if="discount > 0" :discount="discount"></app-sup-vip>
                    </view>
                    <view class="dir-left-nowrap cross-bottom">
                        <view :class="theme + '-color'" class="box-grow-0 member-price" v-if="isUnderlinePrice == 1">
                            <app-price :price="`${goodsPrice.original_price}`" type="text-price-all"></app-price>
                        </view>
                        <view class="sales" v-if="goods.is_sales === 1">销量{{goods.sales}}{{goods.unit}}</view>
                    </view>
                </view>
                <view v-else>
                    <view class="dir-left-nowrap cross-bottom">
                        <view :class="theme + '-color'" class="price" style="font-family: DIN;">
                            <app-price :max="`${goodsPrice.max}`" :min="`${goodsPrice.min}`"
                                       :default-price="`${goodsPrice.defaultPrice}`"></app-price>
                        </view>
                        <app-sup-vip :is_vip_card_user="is_vip_card_user" margin="0 0 0 13rpx" v-if="discount > 0" :discount="discount"></app-sup-vip>
                    </view>
                    <view class="dir-left-nowrap cross-bottom">
                        <view class="origin-price sales" v-if="isUnderlinePrice == 1">
                            <app-price :price="`${goodsPrice.original_price}`" type="text-price-all"></app-price>
                        </view>
                        <view class="sales" v-if="goods.is_sales === 1">销量{{goods.sales}}{{goods.unit}}</view>
                    </view>
                </view>
            </view>
            <view class="box-grow-0 share" @click="shareClick">
                <image src="../../../static/image/icon/icon-share.png"></image>
                <view>分享</view>
            </view>
            <view>
                <app-goods-quick-share v-model="quickShareShow" @quickShare="quickShare"
                                       :goods="goods"></app-goods-quick-share>
            </view>
            <view>
                <app-share-qr-code v-model="shareShow" :url="newShareUrl"></app-share-qr-code>
            </view>
        </view>
        <view v-if="goods.level_show === 2 && goods.is_negotiable === 0">
            <app-join-member :member-max-price="`${goods.price_member_max}`" :member-min-price="`${goods.price_member_min}`"
                                   :price="`${goods.price}`"></app-join-member>
        </view>
    </view>
</template>

<script>
    import {mapState} from 'vuex';
    import appPrice from '../goods/app-price.vue';
    import appMemberMark from '../../page-component/app-member-mark/app-member-mark.vue';
    import appShareQrCode from '../../page-component/app-share-qr-code-poster/app-share-qr-code-poster.vue';
    import appJoinMember from "../../page-component/app-join-member/app-join-member.vue";
    import appGoodsQuickShare from '../goods/app-goods-quick-share.vue';
    import appSupVip from "../../page-component/app-sup-vip/app-sup-vip.vue";

    export default {
        components: {
            'app-price': appPrice,
            'app-member-mark': appMemberMark,
            'app-share-qr-code': appShareQrCode,
            'app-join-member': appJoinMember,
            'app-sup-vip': appSupVip,
            appGoodsQuickShare
        },
        props: {
            goods: Object,
            is_vip_goods:  {
                type: Number,
                default() {
                    return 0;
                }
            },
            discount: {
                type: String,
                default() {
                    return null;
                }
            },
            selectAttr: {
                type: Object,
                default() {
                    return {};
                }
            },
            shareUrl: {
                type: String,
                default() {
                    return '';
                }
            },
            is_vip_card_user: {
                type: Number,
                default() {
                    return 0
                }
            },
            is_show_member: {
                type: Boolean,
                default() {
                    return true;
                }
            }
        },
        data() {
            return {
                quickShareShow: false,
                shareShow: false,
            };
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme,
                isUnderlinePrice: state => state.mallConfig.mall.setting.is_underline_price,
            }),
            goodsPrice() {
                if (!this.goods) return {};
                let {price_member_max, price_member_min, price, price_max, price_min, original_price} = this.goods;
                let data = {};
                if (this.goods.level_show === 1) {
                    data = {
                        max: price_member_max,
                        min: price_member_min,
                        defaultPrice: price,
                        original_price: price,
                    };
                } else {
                    data = {
                        max: price_max,
                        min: price_min,
                        defaultPrice: price,
                        original_price: original_price,
                    }
                }
                return data;
            },
            newShareUrl() {
                if (this.shareUrl) {
                    return this.shareUrl;
                } else {
                    if (this.goods) {
                        return this.$api.poster.goods + '&goods_id=' + this.goods.id;
                    } else {
                        return ``;
                    }
                }
            }
        },
        methods: {
            quickShare(e) {
                this.$emit('quickShare', e);
            },
            shareClick() {
                // 判断登入
                if (!this.$user.isLogin()) {
                    this.$user.getInfo().then(() => {
                    });
                } else {
                    if (this.goods.extra_quick_share) {
                        this.quickShareShow = true;
                    } else {
                        this.shareShow = true;
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .vip-price {
        width: #{148upx};
        height: #{27upx};
        margin-left: #{13rpx};
        .item {
            height: #{27upx};
            width: 50%;
        }
        .left {
            border-top-left-radius: #{13upx};
            border-bottom-left-radius: #{13upx};
            background-color: #4e4040;
            position: relative;
        }
        .right {
            border-top-right-radius: #{13upx};
            border-bottom-right-radius: #{13upx};
            background: linear-gradient(45deg, #edc9a8, #fdebde);
            font-size: #{18upx};
            line-height: #{27upx};
            text-align: center;
            color: #4e4040;
        }
        .vip-icon {
            width: #{51upx};
            height: #{14upx};
            position:absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .app-goods-price {
        padding: 0 #{24rpx};
        background-color: #ffffff;

        .top {
            padding-bottom: #{24rpx};

            .price {
                font-size: #{56rpx};
                line-height: 1;
            }

            .member-img {
                width: #{94rpx};
                height: #{40rpx};
                margin-left: #{16rpx};
            }

            .origin-price {
                text-decoration: line-through;
                margin-right: #{24rpx};
                color: $uni-general-color-two;
                font-size: $uni-font-size-general-one;
            }

            .sales {
                color: $uni-general-color-two;
                font-size: $uni-font-size-weak-one;
                margin-top: #{22rpx};
            }

            .app-member-mark {
                margin-left: #{12rpx};
            }

            .member-price {
                font-size: $uni-font-size-import-two;
                margin-right: #{20rpx};
                line-height: 1;
            }

            .negotiable {
                font-size: #{48rpx};
            }
        }

        .share {
            margin-top: #{16rpx};
            font-size: $uni-font-size-weak-two;
            color: $uni-general-color-one;

            image {
                width: #{40rpx};
                height: #{40rpx};
                margin-bottom: #{10rpx};
            }
        }
    }
</style>