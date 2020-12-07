<template>
    <view class="app-index-booking">
        <view class="top dir-left-nowrap cross-center">
            <image class="box-grow-0" src="../../../static/image/icon/icon-home-booking.png"></image>
            <view class="box-grow-1">预约</view>
            <app-form-id @click="jump(`/plugins/book/index/index`)">
                <view class="dir-left-nowrap cross-center">
                    <view class="box-grow-0 more">更多</view>
                    <image class="box-grow-0 icon" src="../../../static/image/icon/arrow-right.png"></image>
                </view>
            </app-form-id>
        </view>
        <view class="dir-left-nowrap list">
            <block v-for="(book, key) in newData" :key="key">
                <app-form-id @click="router_jump(book)">
                    <view class="box-grow-0 dir-top-nowrap item">
                        <view class="box-grow-0 cover-pic">
                            <view class="out-dialog" v-if="book.goods_stock == 0 && appSetting.is_show_stock == '1'">
                                <image :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
                            </view>
                            <app-image :img-src="book.cover_pic" width="224rpx" height="224rpx"></app-image>
                        </view>
                        <view class="box-grow-0 title t-omit-two">{{book.name}}</view>
                        <view class="box-grow-1 dir-top-nowrap main-right price">
                            <view v-if="book.is_level == 1">
                                <app-member-price :price="book.level_price"></app-member-price>
                            </view>
                            <app-sup-vip :is_vip_card_user="book.vip_card_appoint.is_vip_card_user" margin="4rpx 0 0" v-if="book.vip_card_appoint.discount > 0" :discount="book.vip_card_appoint.discount"></app-sup-vip>
                            <view :class="theme + '-color'">{{book.price_content}}</view>
                        </view>
                    </view>
                </app-form-id>
            </block>
        </view>
    </view>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import appSupVip from '../app-sup-vip/app-sup-vip.vue';
    import appMemberPrice from "../app-member-mark/app-member-price.vue";

    export default {
        name: "app-index-booking",
        components: {
            'app-member-price': appMemberPrice,
            'app-sup-vip': appSupVip,
        },
        props: {
            value: {
                type: Array,
                default() {
                    return [];
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
                appImg: state => state.mallConfig.__wxapp_img.mall,
                appSetting: state => state.mallConfig.mall.setting,
                theme: state => state.mallConfig.theme
            }),
            ...mapGetters('mallConfig', {
                getVideo: 'getVideo'
            }),
        },
        methods: {
            jump(url) {
                this.$jump({
                    url: url,
                    open_type: 'navigate'
                })
            },
            router_jump(data) {
                // #ifndef MP-BAIDU
                if (data.video_url && this.getVideo == 1) {
                    uni.navigateTo({
                        url: `/pages/goods/video?goods_id=${data.id}&sign=booking`
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
        }
    }
</script>

<style scoped lang="scss">
    .vip-price {
        width: #{148upx};
        height: #{27upx};
        margin-top: #{4upx};
        .vip-item {
            height: #{27upx};
            width: 50%;
        }
        .vip-left {
            border-top-left-radius: #{13upx};
            border-bottom-left-radius: #{13upx};
            background-color: #4e4040;
            position: relative;
        }
        .vip-right {
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
    .app-index-booking {
        padding: #{24rpx};
        background-color: #ffffff;

        .top {
            color: #ff8831;
            font-size: $uni-font-size-general-one;
            height: #{80rpx};
            margin-bottom: #{16prx};

            image {
                width: #{46rpx};
                height: #{46rpx};
                display: block;
                margin-right: #{16rpx};
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

            .item {
                margin-right: #{16rpx};
                font-size: $uni-font-size-general-one;
                height: 100%;

                .cover-pic {
                    width: #{224rpx};
                    height: #{224rpx};
                    display: block;
                    margin-bottom: #{16rpx};
                    position: relative;
                    .out-dialog {
                        width: #{224rpx};
                        height: #{224rpx};
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 10;
                        background-color: rgba(0,0,0,.5);
                        image {
                            width: #{224rpx};
                            height: #{224rpx};
                        }
                    }
                }

                .title {
                    width: #{224rpx};
                    color: $uni-important-color-black;
                }

                .price {
                    margin-bottom: #{8rpx};
                }
            }
        }
    }
</style>