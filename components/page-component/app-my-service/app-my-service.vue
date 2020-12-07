<template>
    <view class="app-view">

        <view class="app-my-service" :class="[!margin?'no-margin':'', !round?'no-round':'',]">
            <view class="title" v-if="title">{{title}}</view>
            <view class="list" :class="[listStyle]">
                <view class="item" v-for="(item, index) in menus" :key="index">
                    <app-jump-button form
                                     :url="item.link_url"
                                     :open_type="item.open_type"
                                     :item="item"
                                     :arrangement="`${menu_style === '1' ? 'row' : menu_style === '2' ? 'column' : ''}`">
                        <view style="width: 100%"
                              class="item-container"
                              :class="[
                              menu_style=='1'?'dir-left-nowrap cross-center':'',
                              menu_style=='2'?'dir-top-nowrap cross-center':'',
                              ]">
                            <view class="box-grow-0">
                                <image :src="item.icon_url" class="icon"></image>
                            </view>
                            <view class="box-grow-1" style="max-width: 100%">
                                <view class="name">{{item.name}}</view>
                            </view>
                            <view class="box-grow-0" v-if="menu_style=='1'">
                                <image src="/static/image/icon/arrow-right.png" class="arrow"></image>
                            </view>
                        </view>
                    </app-jump-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>

    export default {
        name: "app-my-service",
        props: {
            title: {
                default: null,
            },
            menus: Array,
            menu_style: String,
            margin: {
                type: Boolean,
                default: false,
            },
            round: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            listStyle() {
                if (this.menu_style == 1) return 'row';
                if (this.menu_style == 2) return 'grid dir-left-wrap';
                return '';
            },
        },
    }
</script>

<style scoped lang="scss">

    .app-my-service.no-margin {
        width: 100%;
        margin: 0 auto;
        box-shadow: none;
    }

    .app-my-service.no-round {
        border-radius: 0;
    }

    .app-my-service {
        width: #{702rpx};
        border-radius: #{16rpx};
        margin: #{24rpx} auto;
        box-shadow: 0 0 #{8rpx} rgba(0, 0, 0, .05);
        background: #fff;

        .title {
            padding: #{32rpx} #{32rpx} #{16rpx};
        }

        .list {
            .item {
                .icon {
                    width: #{50rpx};
                    height: #{50rpx};
                    display: block;
                }

                .arrow {
                    width: #{12rpx};
                    height: #{22rpx};
                }
            }
        }

        .list.row {
            .item-container {
                padding: #{20rpx} #{32rpx};
            }

            .icon {
                margin-right: #{16rpx};
            }
        }

        .list.grid {
            .item {
                width: 25%;

                .icon {
                    margin-bottom: #{28rpx};
                }

                .name {
                    padding: 0 #{12rpx};
                    font-size: $uni-font-size-weak-one;
                    color: $uni-general-color-one;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1;
                }
            }

            .item-container {
                padding: #{24rpx} 0;
            }
        }
    }

</style>
