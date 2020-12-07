<template>
    <view class="index-advance">
        <view class="top dir-left-nowrap cross-center">
            <image class="box-grow-0" src="../../../static/image/icon/pick.png"></image>
            <view class="box-grow-1">N元任选</view>
            <app-form-id @click="jump(`/plugins/pick/index/index`)">
                <view class="dir-left-nowrap cross-center">
                    <view class="box-grow-0 more">更多</view>
                    <image class="box-grow-0 icon" src="../../../static/image/icon/arrow-right.png"></image>
                </view>
            </app-form-id>
        </view>
        <view class="dir-left-nowrap list">
            <block v-for="(advance, key) in newDate" :key="key">
                <view class="box-grow-0 item" @click="jump_router(advance)">
                    <view class="cover-pic">
                        <app-image :img-src="advance.goodsWarehouse.cover_pic" width="220rpx" height="220rpx"></app-image>
                        <view class="out-dialog" v-if="advance.goods_stock == 0 && appSetting.is_show_stock == '1'">
                            <image :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
                        </view>
                        <view class="title  t-omit-two">
                            {{advance.name}}
                        </view>
                        <view class="des-price" v-if="advance.use_attr == 0">
                            {{activity.rule_price}}元任选{{activity.rule_num}}件
                        </view>
                        <view class="des-price" v-else-if="advance.use_attr == 1">
                            {{activity.rule_price}}元任选{{activity.rule_num}}件
                        </view>
                    </view>
                    <view class="content dir-top-nowrap main-right">
<!--                        <view class="member-price" v-if="advance.is_level == 1">-->
<!--                            <app-member-price :price="advance.level_price"></app-member-price>-->
<!--                        </view>-->
<!--                        <app-sup-vip :is_vip_card_user="advance.vip_card_appoint.is_vip_card_user" margin="4rpx 0 8rpx" v-if="advance.vip_card_appoint.discount > 0" :discount="advance.vip_card_appoint.discount"></app-sup-vip>-->
                        <view  class="price">
                            <text class="text"  style="font-size: 28rpx;">￥{{advance.price}}</text>
                        </view>
                        <view class="old-price">
                            ￥{{advance.original_price}}
                        </view>
                    </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import appMemberPrice from '../app-member-mark/app-member-price.vue';
    import appSupVip from '../app-sup-vip/app-sup-vip.vue';

    export default {
        name: "app-index-pick",
        props: {
            value: {
                type: Array,
                default() {
                    return [];
                }
            },
            activity: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                newData: this.value
            };
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme,
                appImg: state => state.mallConfig.__wxapp_img.mall,
                appSetting: state => state.mallConfig.mall.setting,
                mall: state => state.mallConfig.mall,
            }),
            ...mapGetters('mallConfig',{
                vip: 'getVip'
            }),
            ...mapGetters('mallConfig', {
                getVideo: 'getVideo'
            }),
            newDate() {
                console.log(this.value);
                for (let i = 0; i < this.value.length; i++) {
                    let attr = this.value[i].attr;
                    let compare = function (obj1, obj2) {
                        let val1 = Number(obj1.deposit);
                        let val2 = Number(obj2.deposit);
                        if (val1 < val2) {
                            return -1;
                        } else if (val1 > val2) {
                            return 1;
                        } else {
                            return 0;
                        }
                    };
                    this.value[i].attr = attr.sort(compare);
                }
                return this.value;
            },
        },
        methods: {
            jump(url) {
                this.$jump({
                    url: url,
                    open_type: 'navigate'
                })
            },
            jump_router(data) {
                // #ifndef MP-BAIDU
                if (data.goodsWarehouse.video_url && this.getVideo == 1) {
                    uni.navigateTo({
                        url: `/pages/goods/video?goods_id=${data.id}&sign=pick`
                    });
                } else {
                    uni.navigateTo({
                        url: `/plugins/pick/detail/detail?goods_id=${data.id}`
                    })
                }
                // #endif

                // #ifdef MP-BAIDU
                uni.navigateTo({
                    url: `/plugins/pick/detail/detail?goods_id=${data.id}`
                })
                // #endif
            }
        },
        components: {
            'app-member-price': appMemberPrice,
            'app-sup-vip': appSupVip,
        }
    }
</script>

<style scoped lang="scss">
    .index-advance {
        background-color: #f7f7f7;
        margin-bottom: #{20upx};
        .top {
            padding: #{0 24rpx};
            color: #ff4544;
            font-size: $uni-font-size-general-one;
            height: #{72rpx};
            background-color: white;
            image {
                width: #{46rpx};
                height: #{46rpx};
                display: block;
                margin-right: #{8rpx};
            }

            .more {
                font-size: $uni-font-size-general-two;
                margin-right: #{12rpx};
                color: $uni-general-color-two;
            }

            .icon {
                width: #{12rpx};
                height: #{22rpx};
                display: block;
            }
        }

        .list {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            background-color: #f7f7f7;
            margin-top: #{4rpx};
            .item {
                margin-right: #{4rpx};
                font-size: $uni-font-size-general-one;
                width: #{260rpx};
                padding:  #{0 20rpx 20upx 20rpx};
                background-color: white;
                overflow: hidden;
                .cover-pic {
                    width: #{220rpx};
                    height: #{331upx};
                    display: block;
                    margin-top: #{20rpx};
                    position: relative;
                    .out-dialog {
                        width: #{220rpx};
                        height: #{220rpx};
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 10;
                        will-change: transform;
                        background-color: rgba(0,0,0,.5);
                        image {
                            width: #{220rpx};
                            height: #{220rpx};
                        }
                    }
                }

                .title {
                    width: #{224rpx};
                    height: #{64rpx};
                    font-size: #{25rpx};
                    line-height: #{32upx};
                    margin-top: #{10upx};
                    color: $uni-important-color-black;
                }
                .content {
                    height: calc(100% - #{331upx});
                }
                .member-price {
                    height: #{28upx};
                    margin-bottom: #{8upx};
                    margin-top: #{4upx};
                }
                .price {
                    color: #ff4544;
                    .text {
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        line-height: 1;
                        vertical-align: sub;
                    }
                }
                .old-price {
                    font-size: #{21upx};
                    line-height: 1;
                    color: #999999;
                    text-decoration:line-through;
                    margin: #{5upx 0 20upx 0};
                }
                .des-price {
                    display: inline-block;
                    font-size: #{19rpx};
                    color: #ffffff;
                    line-height: 1;
                    background-color: #ff4544;
                    border-radius: #{7rpx};
                    padding: #{5rpx 5rpx};
                    word-break: break-all;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    margin: #{4upx 0};
                }
            }
        }
    }
</style>