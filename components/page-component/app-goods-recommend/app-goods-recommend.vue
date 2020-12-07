<template>
    <view class="app-goods-recommend" v-if="goodsList && goodsList.length > 0">
        <view class="recommend-title dir-left-nowrap main-center">
            <view class="dir-left-nowrap cross-center">
                <view class="border"></view>
                <image src="../../../static/image/icon/icon-favorite.png"></image>
                <view class="text">您或许喜欢</view>
                <view class="border"></view>
            </view>
        </view>
        <view class="recommend-list">
            <app-goods-list :is_show_member="is_show_member" :activity="activity" :list="goodsList" :sureCart="sureCart"></app-goods-list>
        </view>
    </view>
</template>

<script>
    import appGoodsList from "../../page-component/app-goods-list/app-goods-list.vue";

    export default {
        name: "app-goods-recommend",
        components: {
            'app-goods-list': appGoodsList,
        },
        props: {
            goodsList: Array,
            sureCart: Boolean,
            activity: Object,
            is_show_member: {
                type: Boolean,
                default() {
                    return true;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .app-goods-recommend {
        .recommend-title {
            margin: #{40rpx} 0 #{32rpx} 0;
            font-size: $uni-font-size-weak-one;
            color: $uni-general-color-two;

            .border {
                border-top: #{1rpx} solid #bbbbbb;
                height: 0;
                width: #{40rpx};
                margin: 0 #{24rpx};
            }

            image {
                width: #{24rpx};
                height: #{24rpx};
                display: block;
                margin-right: #{12rpx};
            }
        }
    }
</style>