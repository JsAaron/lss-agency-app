<template>
    <view class="app-submit-goods">
        <view v-if="plugin == 'composition'" class="composition">
            <view class="composition-item" v-for="(compositionItem, compositionIndex) in list.composition_list" :key="compositionIndex">
                <view v-show="compositionItem.open || goodsIndex == 0" v-for="(goodsItem, goodsIndex) in compositionItem.goods_list" :key="goodsIndex" class="dir-left-nowrap goods-item">
                    <view class="box-grow-0">
                        <image class="goods-image"
                               :src="goodsItem.goods_attr.pic_url ? goodsItem.goods_attr.pic_url : goodsItem.cover_pic"></image>
                    </view>
                    <view class="box-grow-1">
                        <view class="goods-name">{{goodsItem.name}}</view>
                        <view class="dir-left-wrap attr-list">
                            <view v-for="(attrItem,attrIndex) in goodsItem.attr_list"
                                  :key="attrIndex"
                                  class="attr-item">
                                {{attrItem.attr_group_name}}:{{attrItem.attr_name}}
                            </view>
                        </view>
                        <view class="dir-left-nowrap goods-other">
                            <view class="box-grow-1 goods-num">×{{goodsItem.num}}</view>
                            <view v-if="compositionItem.type == 2" class="box-grow-0 goods-price-info" :class="[`${theme}-color`]">
                                <view>
                                    <text v-for="(customCurrency,customCurrencyIndex) in goodsItem.custom_currency"
                                          :key="customCurrencyIndex">
                                        {{customCurrency}}+
                                    </text>
                                    <text class="goods-price-unit">￥</text>
                                    <text>{{goodsItem.total_price}}</text>
                                </view>
                                <view v-for="(discount,discountIndex) in goodsItem.discounts"
                                      :key="discountIndex">
                                    {{discount.name}}: {{discount.value}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="composition-open main-center">
                    <view @click="toggle(compositionIndex)" class="composition-btn">
                        <text>{{compositionItem.open ? '点击收起套餐详情' : '点击展开套餐详情'}}</text>
                        <image v-if="!compositionItem.open" src="/static/image/icon/icon-down.png"></image>
                        <image v-else src="/static/image/icon/icon-up.png"></image>
                    </view>
                </view>
                <view class="composition-info">
                    <view>{{compositionItem.type == 1 ? '固定套餐' : '搭配套餐'}} ￥{{compositionItem.total_price}}</view>
                    <view class="composition-discount">已省 ￥{{compositionItem.composition_price}}</view>
                </view>
            </view>
        </view>
        <view v-else class="app-submit-goods-item">
            <view v-for="(goodsItem, goodsIndex) in list.goods_list" :key="goodsIndex" class="dir-left-nowrap goods-item">
                <view class="box-grow-0">
                    <image class="goods-image"
                           :src="goodsItem.goods_attr.pic_url ? goodsItem.goods_attr.pic_url : goodsItem.cover_pic"></image>
                </view>
                <view class="box-grow-1">
                    <view class="goods-name">{{goodsItem.name}}</view>
                    <view class="dir-left-wrap attr-list">
                        <view v-for="(attrItem,attrIndex) in goodsItem.attr_list"
                              :key="attrIndex"
                              class="attr-item">
                            {{attrItem.attr_group_name}}:{{attrItem.attr_name}}
                        </view>
                    </view>
                    <view class="dir-left-nowrap">
                        <view class="box-grow-1 goods-num">×{{goodsItem.num}}</view>
                        <view class="box-grow-0 goods-price-info" :class="[`${theme}-color`]">
                            <view>
                                <text v-for="(customCurrency,customCurrencyIndex) in goodsItem.custom_currency"
                                      :key="customCurrencyIndex">
                                    {{customCurrency}}+
                                </text>
                                <text class="goods-price-unit">￥</text>
                                <text>{{goodsItem.total_original_price}}</text>
                            </view>
                            <view v-for="(discount,discountIndex) in goodsItem.discounts"
                                  :key="discountIndex">
                                {{discount.name}}: {{discount.value}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>

	import {mapState} from 'vuex';
	
    export default {
        name: "app-submit-goods",
	    props: {
            list: {
                type: Object
            },
            plugin: {
                type: String
            },
            index: {
                type: Number
            },
	    },
        data() {
            return {
            }
        },
        created() {
            let that = this;
        },
        mounted() {
            let that = this;
            if(that.plugin == 'composition') {
                for(let i in that.list.composition_list) {
                    that.list.composition_list[i].open = false;
                }
                that.$forceUpdate();
                that.$emit("updateList",that.list,that.index);
            }
        },
        computed: {
            ...mapState({
                appImg: state => state.mallConfig.__wxapp_img,
            }),
            theme() {
                return this.userTheme ? this.userTheme : this.$store.state.mallConfig.theme;
            },
        },
        methods: {
            toggle(index) {
                this.list.composition_list[index].open = !this.list.composition_list[index].open;
                this.$forceUpdate();
                this.$emit("updateList",this.list,this.index);
            }
        }
    }
</script>

<style scoped lang="scss">
    $submitBarHeight: #{110rpx};
    $borderColor: $uni-weak-color-one;
    $xWidth: #{24rpx};
    $yWidth: #{24rpx};
    .app-submit-goods {
        .app-submit-goods-item {
            border-bottom: #{1rpx} solid $borderColor;
            border-top: #{1rpx} solid $borderColor;
        }
        .composition {
            margin-bottom: #{24rpx};
            .composition-item {
                margin-top: #{24rpx};
                .composition-open {
                    text-align: center;
                    background-color: #fff;
                    height: #{84rpx};
                    .composition-btn {
                        display: inline-block;
                        border: #{2rpx} solid #bbbbbb;
                        font-size: #{24rpx};
                        color: #999999;
                        padding: 0 #{24rpx};
                        margin: #{12rpx} 0 #{16rpx};
                        height: #{56rpx};
                        line-height: #{54rpx};
                        border-radius: #{28rpx};
                        image {
                            width: #{22rpx};
                            height: #{12rpx};
                            margin-left: #{16rpx};
                        }
                    }
                }
                .composition-info {
                    background-color: #fff;
                    font-size: #{28rpx};
                    border-top: #{2rpx} solid #e2e2e2;
                    color: #ff4544;
                    text-align: right;
                    padding: #{24rpx};
                    .composition-discount {
                        font-size: #{24rpx};
                        color: #f39800;
                    }
                }
            }
        }
        .goods-item {
            background: #fff;
            padding: #{24rpx};

            .goods-image {
                width: #{200rpx};
                height: #{200rpx};
                display: block;
                margin-right: #{24rpx};
            }

            .goods-name {
                height: #{84rpx};
                line-height: #{42rpx};
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                word-break: break-all;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: #{22rpx};
            }

            .attr-list, .goods-num {
                font-size: $uni-font-size-weak-one;
                color: $uni-general-color-one;
            }

            .goods-other {
                margin-top: #{16rpx};
            }

            .attr-item {
                margin-right: #{24rpx};
            }

            .attr-item:last-child {
                margin-right: 0;
            }

            .goods-price-info {
                text-align: right;
                font-size: $uni-font-size-general-one;
            }
        }
    }
</style>