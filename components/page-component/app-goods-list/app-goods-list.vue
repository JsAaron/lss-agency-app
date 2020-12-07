<template>
    <view class="app-goods-list" :class="listClass">
        <block v-for="(goods, index) in list" :key="index">
            <!-- 列表模式 -->
            <template v-if="listStyle == 1">
                <view class="dir-left-nowrap goods-item-1" @click="jump(goods)">
                    <view class="box-grow-0 cover-pic">
                        <view class="out-dialog" v-if="goods.goods_stock == 0 && appSetting.is_show_stock == '1'">
                            <image :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
                        </view>
                        <app-image :img-src="goods.cover_pic" borderRadius="16rpx" width="200rpx"
                                   height="200rpx"></app-image>
                    </view>
                    <view class="box-grow-1 dir-top-nowrap content main-between">
                        <view class="box-grow-0 t-omit-two goods-name" v-if="isShowGoodsName == 1">{{goods.name}}</view>
                        <view class="dir-top-nowrap" :class="isShowGoodsName == 1 ? 'box-grow-0' : 'box-grow-1'">
                            <view class="box-grow-0 cross-bottom"
                                  v-if="goods.is_level == 1 && goods.is_negotiable != 1 && is_show_member">
                                <app-member-price :price="goods.level_price"></app-member-price>
                            </view>
                            <app-sup-vip :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user"
                                         v-if="goods.vip_card_appoint.discount > 0"
                                         :discount="goods.vip_card_appoint.discount">
                            </app-sup-vip>
                            <view :class="isShowCart == 0 || goods.is_negotiable == 1 ? 'dir-left-nowrap' : 'dir-top-nowrap'"
                                  class="box-grow-1">
                                <view class="box-grow-1" :class="theme">
                                    <template v-if="goods.is_negotiable == 1">
                                        <view>价格面议</view>
                                    </template>
                                    <template v-else>
                                        <app-price :price="`${goods.price}`" type="text-price-all"></app-price>
                                    </template>
                                </view>
                                <view class="dir-left-nowrap cross-center sales-box">
                                    <view v-if="goods.sales && goods.is_negotiable != 1" class="box-grow-1 sales">{{goods.sales}}</view>
                                    <view @click.stop="specification(goods)" class="box-grow-0 cross-center main-center cart-box"
                                         v-if="goods.is_negotiable != 1 && isShowCart == 1 && goods.goods_stock > 0">
                                        <img class="goods-cart" src="/static/image/icon/goods-cart.png">
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </template>
            <!-- 一行两个 -->
            <template v-if="listStyle == 2">
                <view class="box-grow-0 goods-item-2 dir-top-nowrap" @click="jump(goods)"
                      :class="index%2 === 0 ? 'mr-14' : ''">
                    <view class="box-grow-0">
                        <view class="out-dialog" v-if="goods.goods_stock == 0 && appSetting.is_show_stock == '1'">
                            <image :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
                        </view>
                        <app-image :img-src="goods.cover_pic" width="344rpx" height="344rpx"
                                   :border-radius="`16rpx 16rpx 0 0`"></app-image>
                    </view>
                    <view class="box-grow-0 goods-name t-omit-two padding" v-if="isShowGoodsName == 1">{{goods.name}}</view>
                    <view class="box-grow-1 dir-top-nowrap main-right">
                        <view class="box-grow-0 cross-bottom padding"
                              v-if="goods.is_level == 1 && goods.is_negotiable != 1 && is_show_member">
                            <app-member-price :price="goods.level_price"></app-member-price>
                        </view>
                        <app-sup-vip :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user" margin="4rpx 24rpx 0"
                                     v-if="goods.vip_card_appoint.discount > 0"
                                     :discount="goods.vip_card_appoint.discount"></app-sup-vip>
                        <view class="box-grow-0 dir-left-nowrap content padding">
                            <view :class="theme" class="box-grow-0">
                                <template v-if="goods.is_negotiable == 1">
                                    <view>价格面议</view>
                                </template>
                                <template v-else>
                                    <app-price :price="`${goods.price}`" type="text-price-all"></app-price>
                                </template>
                            </view>
                            <template v-if="goods.is_negotiable != 1">
                                <view class="dir-left-nowrap cross-center sales-box box-grow-1"
                                      :class="[isShowCart == 1 ? '' : 'main-right']"
                                      v-if="goods.sales">
                                    <view class="sales">{{goods.sales}}</view>
                                </view>
                                <view v-if="isShowCart == 1 && goods.goods_stock > 0" :class="[goods.sales ? 'box-grow-0' : 'box-grow-1 main-right']">
                                    <img @click.stop="specification(goods)" class="goods-cart"
                                         src="/static/image/icon/goods-cart.png">
                                </view>
                            </template>
                        </view>
                    </view>
                </view>
            </template>
            <!-- 一行三个 -->
            <template v-if="listStyle == 3">
                <view class="box-grow-0 goods-item-3 dir-top-nowrap" @click="jump(goods)"
                      :class="index%3 === 2 ? '' : 'mr-8'">
                    <view class="box-grow-0">
                        <view class="out-dialog" v-if="goods.goods_stock == 0 && appSetting.is_show_stock == '1'">
                            <image :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
                        </view>
                        <app-image :img-src="goods.cover_pic" width="238rpx" height="238rpx"
                                   :border-radius="`16rpx 16rpx 0 0`"></app-image>
                    </view>
                    <view class="box-grow-0 goods-name t-omit-two padding" v-if="isShowGoodsName == 1">{{goods.name}}</view>
                    <view class="box-grow-1 dir-top-nowrap main-right">
                        <view class="box-grow-0 cross-bottom padding"
                              v-if="goods.is_level == 1 && goods.is_negotiable != 1 && is_show_member">
                            <app-member-price :price="goods.level_price"></app-member-price>
                        </view>
                        <app-sup-vip :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user" margin="4rpx 20rpx 0"
                                     v-if="goods.vip_card_appoint.discount > 0"
                                     :discount="goods.vip_card_appoint.discount"></app-sup-vip>
                        <view :class="theme" class="padding box-grow-0">
                            <template v-if="goods.is_negotiable == 1">
                                <view>价格面议</view>
                            </template>
                            <template v-else>
                                <app-price :price="`${goods.price}`" type="text-price-all"></app-price>
                            </template>
                        </view>
                        <view class="sales-box cross-bottom box-grow-1">
                            <view v-if="goods.sales && goods.is_negotiable != 1" class="box-grow-1 sales">{{goods.sales}}</view>
                            <view v-if="goods.is_negotiable != 1 && isShowCart == 1 && goods.goods_stock > 0" class="box-grow-0">
                                <img @click.stop="specification(goods)" class="goods-cart cross-bottom"
                                     src="/static/image/icon/goods-cart.png">
                            </view>
                        </view>
                    </view>
                </view>
            </template>
        </block>
<!--         <app-attr ref="attr" :goods="item" :select-attr="selectAttr" :attr-group-list="attrGroup" :show="show"
                  @attrtap="onAttr" :previewUrl="previewUrl" :submitUrl="submitUrl"></app-attr> -->
        <view class="attr">
            <app-attr ref="attr"
                      :goods="item"
                      :select-attr="selectAttr"
                      :attr-group-list="attrGroup"
                      :show="show"
                      :cartShow="cartShow"
                      :buyText="buyText"
                      :buyClick="buyBool"
                      :plugin="plugin"
                      :previewUrl="previewUrl"
                      :submitUrl="submitUrl"
                      @buyClick="buyClick"
                      @attrtap="onAttr"
                      @attr="attr"
            >
                <view slot="extra" v-if="sign === 'pintuan'">
                    <app-pt-attr
                            v-if="pt"
                            :pintuan_groups="item.pintuan_groups"
                            :selectGroupAttrId="selectGroupAttrId"
                            @click="setGroupAttrID"
                    ></app-pt-attr>
                </view>
            </app-attr>
        </view>
        <view v-if="sign === 'pintuan' && show_pt">
            <app-iphone-x>
                <view class="pintuan dir-left-nowrap" slot="empty-area">
                    <view class="single box-grow-1 dir-top-nowrap" @click="individual" v-if="item">
                        <text class="app-text">单独购买</text>
                    </view>
                    <view class="tuan box-grow-1 dir-top-nowrap" @click="multiplayer">
                        <text class="app-text">拼团</text>
                    </view>
                </view>
            </app-iphone-x>
        </view>
    </view>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    import appPrice from '../../page-component/goods/app-price.vue';
    import appAttr from '../app-attr/app-attr.vue';
    import appPtAttr from '../app-pt-attr/app-pt-attr.vue';
    import appMemberPrice from "../app-member-mark/app-member-price.vue";
    import appSupVip from '../app-sup-vip/app-sup-vip.vue';
    import appIphoneX from '../../basic-component/app-iphone-x/app-iphone-x.vue';
    import allPay from '../../../pages/goods/all-pay.js';

    export default {
        name: "app-goods-list",
        components: {
            'app-price': appPrice,
            'app-attr': appAttr,
            'app-pt-attr': appPtAttr,
            'app-member-price': appMemberPrice,
            'app-sup-vip': appSupVip,
            'app-iphone-x': appIphoneX,
        },
        props: {
            listStyle: {
                type: String,
                default() {
                    return '2';
                }
            },
            list: Array,
            previewUrl: String,
            submitUrl: String,
            is_show_member: {
                type: Boolean,
                default() {
                    return true;
                }
            }
        },
        data() {
            return {
                show: 0,
                buyText: '立即购买',
                sign: '',
                goods_id: '',
                cartShow: 1,
                plugin: '',
                goods_list: [],
                buyBool: false,
                cur_index: 0,
                item: null,
                show_pt: false,
                pt: true,
                selectAttr: {},
                appAttr: {},
                attrGroup: [],
                selectGroupAttrId: -1,
            }
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme + '-color',
                appImg: state => state.mallConfig.__wxapp_img.mall,
                appSetting: state => state.mallConfig.mall.setting,
                isShowCart: state => state.mallConfig.mall.setting.is_show_cart,
                isShowGoodsName: state => state.mallConfig.mall.setting.is_show_goods_name,
            }),
            ...mapGetters('mallConfig', {
                getVideo: 'getVideo'
            }),
            listClass() {
                if (this.listStyle == 3) {
                    return `list-style-3 dir-left-wrap`;
                } else if (this.listStyle == 2) {
                    return `list-style-2 dir-left-wrap`;
                } else {
                    return ``;
                }
            }
        },
        watch: {
            appAttr: {
                handler(data) {
                    if (data.display === 'none') {
                        this.show_pt = false;
                        // this.selectAttr = {};
                    }
                }
            }
        },
        methods: {
            setGroupAttrID(id) {
                this.selectGroupAttrId = id;
                this.selectAttr = {};
                this.request_pt(id);
            },
            multiplayer() {
                if (this.pt) {
                    if (this.selectAttr && Object.keys(this.selectAttr).length === 0) {
                        uni.showToast({
                            title: '请选择规格',
                            icon: "none"
                        })
                    } else if (this.selectAttr &&  Object.keys(this.selectAttr).length > 0) {
                        let mch_id = this.item.mch_id;
                        let mch_list = [];
                        let goods = {
                            id: this.item.id,
                            attr: [],
                            num: this.appAttr.number,
                            goods_attr_id: this.selectAttr.id,
                            cart_id: 0,
                        };
                        for (let i = 0; i < this.selectAttr.attr_list.length; i++) {
                            let attr = {
                                attr_id: this.selectAttr.attr_list[i].attr_id,
                                attr_group_id: this.selectAttr.attr_list[i].attr_group_id,
                            };
                            goods.attr.push(attr);
                        }
                        mch_list.push({
                            mch_id: mch_id,
                            pintuan_order_id: 0,
                            pintuan_group_id: this.selectGroupAttrId,
                            goods_list: [goods],
                        });
                        uni.navigateTo({
                            url: `/pages/order-submit/order-submit?mch_list=${JSON.stringify(mch_list)}&preview_url=${encodeURIComponent(this.$api.pt.order_preview)}&submit_url=${encodeURIComponent(this.$api.pt.order_submit)}&order_page_url=/plugins/pt/order/order&plugin=pt`
                        });

                    }
                } else {
                    this.selectAttr = {};
                    this.pt = true;
                    this.request_pt(this.selectGroupAttrId);
                }

            },
            buyClick(data) {
                allPay(data, this.sign, this, this.goods_list[this.cur_index]);
            },
            attr(data) {
                this.appAttr = data;
            },
            specification(goods) {
                this.goods_id = goods.id;
                this.sign = goods.sign;
                if(this.sign != 'pintuan') {
                    this.item = goods;
                    this.attrGroup = goods.attr_groups;
                    this.show = Math.random();
                }
                switch (this.sign) {
                    case "advance":
                        this.cartShow = 0;
                        this.buyText = '支付定金';
                        this.buyBool = true;
                        break;
                    case "booking":
                        this.cartShow = 0;
                        this.buyText = '立即预约';
                        this.plugin = 'booking';
                        break;
                    case "pintuan":
                        this.$request({
                            url: this.$api.pt.detail,
                            data: {
                                id: this.goods_id,
                                group_id: 0,
                            }
                        }).then((res) => {
                            this.item = res.data.detail;
                            this.selectGroupAttrId = this.item.pintuan_groups[0].id;
                            this.attrGroup = this.item.attr_groups;
                            this.show = Math.random();
                            this.show_pt = true;
                            this.request_pt(this.selectGroupAttrId);
                        });
                        break;
                    case "integral_mall":
                        this.cartShow = 0;
                        this.buyText = '立即兑换';
                        break;
                    case "step":
                        this.cartShow = 0;
                        this.buyText = '立即兑换';
                        break;
                    case "gift":
                        this.cartShow = 0;
                        this.buyBool = true;
                        this.buyText = '加入礼包';
                        break;
                    default:
                        break;
                }
            },
            async request_pt(group_id) {
                try {
                    const response = await this.$request({
                        url: this.$api.pt.detail,
                        data: {
                            id: this.goods_id,
                            group_id: group_id,
                        }
                    });
                    if (response.code === 0) {
                        this.item = response.data.detail;
                    }
                } catch(e) {
                    throw new Error(e);
                }
            },
            buy() {
                if (!this.submit()) {
                    return false;
                }
                let goods = this.item;
                let number = this.appAttr.number;
                let select_attr = this.selectAttr;
                let goods_attr_id = select_attr.id;
                let attr = [];
                for (let i in select_attr.attr_list) {
                    attr.push({
                        attr_id: select_attr.attr_list[i].attr_id,
                        attr_group_id: select_attr.attr_list[i].attr_group_id,
                    });
                }
                let mch_list = [];
                let mch = {
                    mch_id: goods.mch_id ? goods.mch_id : 0,
                    goods_list: []
                };
                mch.goods_list.push({
                    id: goods.id,
                    attr: attr,
                    num: number,
                    cat_id: 0,
                    goods_attr_id: goods_attr_id
                });
                mch_list.push(mch);
                uni.navigateTo({
                    url: '/pages/order-submit/order-submit?mch_list=' + JSON.stringify(mch_list),
                })
            },
            individual() {
                if (this.pt) {
                    this.pt = false;
                    this.selectAttr = {};
                    this.request_pt(0);
                } else {
                    if (Object.keys(this.selectAttr).length === 0) {
                        uni.showToast({
                            title: '请选择规格',
                            icon: "none"
                        })
                    } else {
                        this.buy();

                    }
                }

            },
            jump(data) {
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
            },
            onAttr(data) {
                this.selectAttr = data;
            },
        },
        created() {
        }
    }
</script>

<style scoped lang="scss">
    .attr {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1503;
    }
    .pintuan {
        width: #{750upx};
        height: #{110upx};
        color: #ffffff;
        .single {
            background-color: #f39800;
            text-align: center;
            line-height: #{110upx};
        }
        .tuan {
            background-color: #ff4544;
            text-align: center;
            line-height: #{110upx};
        }
    }
    .app-goods-list {
        font-size: $uni-font-size-general-one;
        color: $uni-important-color-black;

        .sales {
            color: $uni-general-color-two;
        }

        .goods-item-1 {
            padding: #{16rpx} #{24rpx};
            background-color: #ffffff;
            border-top: #{1rpx} solid #e2e2e2;

            .cover-pic {
                border-radius: #{16rpx};
                margin-right: #{24rpx};
                position: relative;
                .out-dialog {
                    width: #{200rpx};
                    height: #{200rpx};
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 10;
                    background-color: rgba(0,0,0,.5);
                    image {
                        width: #{200rpx};
                        height: #{200rpx};
                    }
                }
            }

            .content {
                padding: #{8rpx} 0;

                .sales {
                    font-size: #{20rpx};
                }
            }

            .cart {
                width: #{50rpx};
                height: #{50rpx};
                display: block;
            }
            .sales-box {
                position: relative;
            }
            .cart-box {
                position: absolute;
                width:#{56rpx};
                height:#{56rpx};
                border-radius: 50%;
                border: 1px solid #ff4544;
                right: #{10rpx};
                bottom:#{5rpx};
            }
        }

        &.list-style-2 {
            padding: 0 #{24rpx};
        }

        .goods-item-2 {
            width: #{344rpx};
            margin-top: #{14rpx};
            background-color: #ffffff;
            border-radius: #{16rpx};
            overflow: hidden;
            position: relative;
            .out-dialog {
                border-top-left-radius: #{16rpx};
                border-top-right-radius: #{16rpx};
                width: #{344rpx};
                height: #{344rpx};
                position: absolute;
                top: 0;
                left: 0;
                z-index: 10;
                background-color: rgba(0,0,0,.5);
                image {
                    width: #{344rpx};
                    height: #{344rpx};
                }
            }
            &.mr-14 {
                margin-right: #{14rpx};
            }

            .goods-name {
                padding-top: #{20rpx};
                line-height: 1.4;
                margin-bottom: #{8rpx};
            }

            .content {
                margin-bottom: #{14rpx};
            }

            .padding {
                padding-left: #{24rpx};
                padding-right: #{24rpx};
            }

            .sales {
                font-size: #{20rpx};
            }
            .sales-box {
                margin-left: #{12rpx};
            }
        }

        &.list-style-3 {
            padding: 0 #{10rpx};
        }

        .goods-item-3 {
            width: #{238rpx};
            margin-top: #{8rpx};
            background-color: #ffffff;
            border-radius: #{16rpx};
            overflow: hidden;
            position: relative;
            .out-dialog {
                border-top-left-radius: #{16rpx};
                border-top-right-radius: #{16rpx};
                width: #{238rpx};
                height: #{238rpx};
                position: absolute;
                top: 0;
                left: 0;
                z-index: 10;
                background-color: rgba(0,0,0,.5);
                image {
                    width: #{238rpx};
                    height: #{238rpx};
                }
            }
            &.mr-8 {
                margin-right: #{8rpx};
            }

            .goods-name {
                line-height: 1.4;
            }

            .padding {
                padding-left: #{20rpx};
                padding-right: #{20rpx};
            }

            .sales {
                font-size: #{20rpx};
                padding-top: #{6rpx};
            }

            & > view:last-child {
                padding-bottom: #{20rpx};
            }
            .sales-box {
                padding: 0 #{20rpx};
            }

        }

        .goods-cart {
            width: #{36rpx};
            height: #{36rpx};
        }

        .goods-price {
            font-size: #{32rpx};
        }

        .sales-box {
            /*position: relative;*/
        }
    }
</style>