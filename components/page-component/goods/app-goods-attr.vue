<template>
    <view>
        <view class="dir-left-nowrap cross-center app-goods-attr">
            <view class="box-grow-0">选择</view>
            <view class="box-grow-1 attr" v-if="selectAttr">
                <text v-for="(item, index) in selectAttr.attr_list" :key="index">
                    {{item.attr_group_name}}:{{item.attr_name}}
                </text>
            </view>
            <view class="box-grow-1 attr" v-else>
                <view>请选择规格</view>
            </view>
            <image src="../../../static/image/icon/arrow-right.png"></image>
        </view>
        <view v-if="newAttrGroups.length > 0 && attrCount > 1" class="goods-attr-box dir-left-nowrap">
            <div class="attr-list dir-left-wrap cross-center">
                <template v-if="pictureList.length > 0">
                    <image class="attr-img" v-for="(picture, index) in pictureList" :key="index" :src="picture"></image>
                </template>
                <template v-else>
                    <view v-for="attrItem in newAttrGroups" :key="attrItem.attr_name"
                          class="attr-btn t-omit main-center cross-center">
                        {{attrItem.attr_name}}
                    </view>
                </template>
            </div>
            <view v-if="attrCount > 0" class="attr-btn cross-center t-omit">
                共{{attrCount}}个{{attrName}}可选
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'app-goods-attr',
        props: {
            selectAttr: {
                type: Object,
                default() {
                    return {};
                }
            },
            attrGroups: {
                type: Array,
                default() {
                    return [];
                }
            },
            attr: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                newAttrGroups: [],
                pictureList: [],
                attrCount: 0,
                attrName: '',
            }
        },
        watch: {
            attrGroups() {
                this.getData();
            }
        },
        methods: {
            getData() {
                let self = this;
                self.newAttrGroups = [];
                self.pictureList = [];
                self.attrCount = 0;
                self.attrName = '';
                self.attrGroups.forEach((item, index) => {
                    if (!self.attrName) {
                        self.attrName = item.attr_group_name;
                        item.attr_list.forEach( item2 => {
                            self.attrCount += 1;
                        })
                    }
                    if (index === 0) {
                        item.attr_list.forEach( item2 => {
                            if (self.newAttrGroups.length < 3) {
                                self.newAttrGroups.push(item2)
                            }

                            if (item2.pic_url && self.pictureList.length < 5) {
                                self.pictureList.push(item2.pic_url);
                            }
                        })
                    }
                });
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style scoped lang="scss">
    .app-goods-attr {
        background-color: #ffffff;
        padding: 0 #{24rpx};
        height: #{100rpx};

        .attr {
            margin: 0 #{40rpx};
            color: $uni-general-color-two;
            font-size: $uni-font-size-weak-one;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            text {
                margin-right: #{10rpx};
            }
        }

        image {
            width: #{12rpx};
            height: #{22rpx};
            display: block;
        }
    }

    .goods-attr-box {
        background-color: #ffffff;
        padding: 0 #{24rpx} #{24rpx} #{130rpx};

        .attr-list {
            overflow: hidden;

            .attr-btn {
                width: #{100rpx};
                text-align: center;
            }
            .attr-img {
                width: #{56rpx};
                height: #{56rpx};
                margin-right: #{8rpx};
            }
        }

        .attr-btn {
            max-width: #{200rpx};
            background: #f7f7f7;
            color: #999999;
            font-size: #{24rpx};
            padding: 0 #{20rpx};
            margin-right: #{8rpx};
            -webkit-border-radius: #{8rpx};
            -moz-border-radius: #{8rpx};
            border-radius: #{8rpx};
            height: #{56rpx};
            line-height: #{56rpx};
        }
    }
</style>