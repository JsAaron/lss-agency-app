<template>
    <view class="app-index-cat">
        <view class="dir-left-nowrap cross-center cat-top">
            <view class="box-grow-1 main-center">
                <view class="cat-pic-url" v-if="catPicUrl">
                    <app-image :img-src="catPicUrl" width="40rpx" height="40rpx"></app-image>
                </view>
                <view>{{name}}</view>
            </view>
            <view class="dir-left-nowrap cross-center more" @click="jump">
                <view>更多</view>
                <image class="arrow-right" src="../../../static/image/icon/arrow-right.png"></image>
            </view>
        </view>
        <view class="list">
            <app-goods-list :list="list" :list-style="listStyle"></app-goods-list>
        </view>
    </view>
</template>

<script>
    import appGoodsList from '../../page-component/app-goods-list/app-goods-list.vue';
    import routeJump from '../../../core/routeJump.js';

    export default {
        name: "app-index-cat",
        components: {
            'app-goods-list': appGoodsList,
        },
        props: {
            catPicUrl: String,
            name: String,
            listStyle: {
                type: String,
                default() {
                    return 1;
                }
            },
            list: Array,
            catId: Number
        },
        methods: {
            jump() {
                routeJump({
                    open_type: 'navigate',
                    page_url: '/pages/goods/list',
                    params: [
                        {
                            key: 'cat_id',
                            value: this.catId
                        }
                    ]
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .app-index-cat {

        .cat-top {
            height: #{80rpx};
            padding: 0 #{24rpx};
            font-size: #{$uni-font-size-general-one};
            background-color: #ffffff;
            position: relative;

            .cat-pic-url {
                width: #{40rpx};
                height: #{40rpx};
                margin-right: #{24rpx};
            }

            .more {
                font-size: $uni-font-size-general-two;
                color: $uni-general-color-two;
                position: absolute;
                right: #{24rpx};
                top: 0;
                z-index: 10;
                height: 100%;

                .arrow-right {
                    width: #{12rpx};
                    height: #{24rpx};
                    display: block;
                    margin-left: #{12rpx};
                }
            }
        }
    }
</style>