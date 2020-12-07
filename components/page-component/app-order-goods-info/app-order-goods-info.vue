<template>
    <view class="app-order-goods-info">
        <view class='dir-left-nowrap item-box'>
            <image class='img box-grow-0' mode='aspectFill' :src='goods.pic_url'></image>
            <view class='box-grow-1'>
                <view class='goods-name'>{{goods.name}}</view>
                <view class='attr'>规格：
                    <text v-for='item in goods.attr_list' :key='item.id'>{{item.attr_name}}</text>
                </view>
                <view class='dir-left-nowrap'>
                    <view class='box-grow-1 goods-num'>x{{goods.num}}</view>
                    <view class='box-grow-0' v-if="plugin == 'composition'">
                        <view class='main-right price delete-price'>￥{{goods.total_original_price}}</view>
                    </view>
                    <view class='box-grow-0' v-else>
                        <view class='main-right price'>￥{{goods.total_original_price}}</view>
                    </view>
                </view>
                <view class="composition-price" v-if="plugin == 'composition'">
                    搭配套餐价<text>￥{{goods.total_price}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'app-order-goods-info',
        data() {
            return {}
        },
        props: {
            goods: {
                type: Object,
                default: {}
            },
            plugin: {
                type: String,
                default: ''
            },
        },
    }
</script>

<style scoped lang="scss">
    .app-order-goods-info {
        font-size: 24#{rpx};
        width: 100%;
        .img {
            width: 160#{rpx};
            height: 160#{rpx};
            margin-right: 20#{rpx};
        }

        .item-box {
            width: 100%;
            margin-bottom: 24#{rpx};
        }

        .label {
            color: $uni-general-color-two;
        }
        .price {
            color: $uni-important-color-black;
            &.delete-price {
                text-decoration: line-through;
            }   
        }

        .composition-price {
            text-align: right;
            font-size: #{22rpx};
            color: #999999;
            text {
                font-size: #{28rpx};
                color: #353535;
                margin-left: #{8rpx};
            }
        }

        .goods-num {
            font-size: $uni-font-size-weak-one;
            color: $uni-general-color-two;
        }

        .attr {
            margin: 10#{rpx} 0;
            color: $uni-general-color-two;
            font-size: $uni-font-size-weak-one;
            display: inline-block;
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            text {
                margin-right: 10#{rpx};
            }
        }

        .goods-name {
            color: $uni-important-color-black;
            font-size: $uni-font-size-weak-one;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            height: 64#{rpx};
        }
    }
</style>