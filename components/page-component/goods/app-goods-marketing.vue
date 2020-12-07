<template>
    <view class="app-goods-marketing">
        <view class="marketing">
            <view class="block dir-left-nowrap cross-center" v-if="integral && integral.title">
                <view class="box-grow-0">活动</view>
                <view class="give box-grow-0 main-center cross-center" :class="theme + '-border ' + theme + '-color'">
                    送积分
                </view>
                <view class="content box-grow-1">{{integral.title}}</view>
            </view>
            <view class="block dir-left-nowrap cross-center" v-if="card && card.list.length > 0" @click="change('cardShow')">
                <view class="box-grow-0">促销</view>
                <view class="give box-grow-0 main-center cross-center" :class="theme + '-border ' + theme + '-color'">
                    赠卡券
                </view>
                <view class="content box-grow-1">{{card.title}}</view>
                <image class="box-grow-0" src="../../../static/image/icon/arrow-right.png"></image>
            </view>
        </view>
        <view class="marketing">
            <view class="block dir-left-nowrap cross-center" v-if="express">
                <view class="box-grow-0">快递</view>
                <view class="content box-grow-1">{{express}}</view>
            </view>
            <view class="block dir-left-nowrap cross-center" v-if="shipping">
                <view class="box-grow-0">包邮</view>
                <view class="content box-grow-1">{{shipping}}</view>
            </view>
            <view class="block dir-left-nowrap cross-center" v-if="limit">
                <view class="box-grow-0">限购</view>
                <view class="content box-grow-1">{{limit}}</view>
            </view>
            <view class="block dir-left-nowrap cross-center" v-if="pickup" @click="change('pickupShow')">
                <view class="box-grow-0">起送</view>
                <view class="content box-grow-1">{{pickup}}</view>
                <image class="box-grow-0" src="../../../static/image/icon/arrow-right.png"></image>
            </view>
        </view>
        <view class="marketing">
        </view>
        <view class="card-modal">
            <app-model v-model="cardShow" type="1" :height="840">
                <view slot="title" class="title">赠卡券</view>
                <view slot="content" class="content">
                    <view class="card dir-left-nowrap cross-center" v-for="(item, index) in card.list" :key="index">
                        <image :src="item.pic_url"></image>
                        <view class="box-grow-1 dir-top-nowrap">
                            <text class="name">{{item.name}}</text>
                            <text class="number">赠送{{item.number}}张</text>
                        </view>
                    </view>
                </view>
            </app-model>
        </view>
        <view class="pickup-modal">
            <app-model v-model="pickupShow" type="2">
                <view slot="title" class="title">起送</view>
                <view slot="content" class="content">
                    <view>{{pickup}}</view>
                </view>
            </app-model>
        </view>
    </view>
</template>

<script>
    import { mapState } from 'vuex';
    import appModel from '../../../components/basic-component/app-model/app-model.vue';

    export default {
        name: "app-goods-marketing",
        components: {
            'app-model': appModel,
        },
        props: {
            limit: {
                type: String,
                default() {
                    return '';
                }
            },
            pickup: {
                type: String,
                default() {
                    return '';
                }
            },
            shipping: {
                type: String,
                default() {
                    return '';
                }
            },
            card: {
                type: Object,
                default() {
                    return {};
                }
            },
            integral: {
                type: Object,
                default() {
                    return {};
                }
            },
            express: {
                type: String,
                default() {
                    return '';
                }
            },
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme,
            }),
        },
        data() {
            return {
                cardShow: false,
                pickupShow: false
            };
        },
        methods: {
	        change(item) {
                this[item] = true;
	        }
        }
    }
</script>

<style scoped lang="scss">
    .marketing {
        margin-bottom: #{20rpx};

        & .block:first-child {
            padding-top: #{32rpx};
            padding-bottom: #{28rpx};
        }

        & .block:last-child {
            padding-bottom: #{32rpx};
        }

        &:empty {
            margin: 0;
        }

        .block {
            background-color: #ffffff;
            font-size: $uni-font-size-general-one;
            color: $uni-general-color-two;
            padding: 0 #{24rpx} #{28rpx} #{24rpx};

            & view:first-child {
                margin-right: #{30rpx};
            }

            .give {
                padding: #{2rpx} #{4rpx};
                border: #{1rpx} solid;
                border-radius: #{4rpx};
                font-size: $uni-font-size-weak-two;
                margin-right: #{12rpx};
            }

            .content {
                color: $uni-important-color-black;
                display: inline-block;
                white-space: nowrap;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            image {
                width: #{12rpx};
                height: #{22rpx};
                display: block;
                margin-left: #{24rpx};
            }
        }
    }

    .card-modal {
        .title {
            font-size: $uni-font-size-general-one;
            padding: #{40rpx} 0;
            text-align: center;
        }

        .content {
            width: 100%;
            padding: 0 #{24rpx} #{40rpx} #{24rpx};
            max-height: #{800rpx};
            overflow-y: auto;

            .card {
                width: 100%;
                height: #{160rpx};
                background-image: url('../../../static/image/icon/goods-card.png');
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                padding: 0 #{32rpx} 0 #{36rpx};
                margin-bottom: #{20rpx};

                image {
                    width: #{88rpx};
                    height: #{88rpx};
                    display: block;
                    margin-right: #{68rpx};
                    border-radius: #{88rpx};
                }

                .name {
                    width: 478#{rpx};
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    font-size: 28#{rpx};
                    color: #353535;
                }

                .number {
                    font-size:24#{rpx};
                    color: #999999;
                    margin-top:10#{rpx};
                }
            }
        }
    }

    .pickup-modal {
        .title {
            font-size: $uni-font-size-general-one;
            padding: #{40rpx} 0;
            text-align: center;
        }

        .content {
            padding: 0 #{40rpx} #{48rpx};
            font-size: $uni-font-size-general-one;
        }
    }
</style>