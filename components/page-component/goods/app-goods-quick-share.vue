<template>
    <view class="app-goods-quick-share">
        <cover-view v-if="friendModel" class="friend-box">
            <cover-view class="info main-center cross-center dir-top-nowrap">
                <cover-view class="dir-left-nowrap cross-center">
                    <cover-image src="/static/image/icon/friend-v.png" class="icon"></cover-image>
                    <cover-view class="text">文本已复制到剪贴板</cover-view>
                </cover-view>
                <cover-view class="dir-left-nowrap cross-center" style="margin-top: 30rpx">
                    <cover-image src="/static/image/icon/friend-v.png" class="icon"></cover-image>
                    <cover-view class="text">图片已保存到相册</cover-view>
                </cover-view>
            </cover-view>
        </cover-view>

        <text id="opacity-hide" class="opacity-hide">
            第一行
            第二行
            第三行
            第四行
            第五行
        </text>
        <view v-if="value" class="box">
            <view v-if="posterShow">
                <app-goods-preview-poster
                        v-model="posterShow" @close="close" :url="posterUrl"
                ></app-goods-preview-poster>
            </view>
            <view v-else class="quick-center">
                <view class="head">
                    <view class="t-omit name">{{goods.extra_quick_share.mall_name}}</view>
                    <view class="time">{{goods.extra_quick_share.format_time}}</view>
                    <view class="close" @click.stop="close">
                        <icon></icon>
                    </view>
                </view>
                <scroll-view scroll-y class="scrollbar">
                    <view class="goods-text">
                        <text class="opacity-hide" space="nbsp" id="all_hide_text_0"
                              v-text="goods.extra_quick_share.share_text"></text>
                        <text class="share-text"
                              :class="{'limit': is_limit}" space="nbsp"
                              v-text="goods.extra_quick_share.share_text"></text>
                        <view v-if="is_all_btn" class="all" @click.stop="showText">
                            <block v-if="is_limit">全文</block>
                            <block v-else>收起</block>
                        </view>
                    </view>

                    <view class="goods-image dir-left-wrap">
                        <view v-for="(item,index) in goods.extra_quick_share.share_pic" :key="index">
                            <image @click.stop="previewImage(index)" :src="item.pic_url" lazy-load></image>
                        </view>
                    </view>
                </scroll-view>
                <view class="goods-set cross-center dir-left-nowrap">
                    <view class="box-grow-0" @click="copyText">复制文本</view>
                    <view class="box-grow-0 margin" @click="saveImage(false)">保存图片</view>
                    <view class="box-grow-0" @click="open">生成海报</view>
                    <view class="line"></view>
                    <view class="box-grow-0">分享到</view>
                    <image @click="batchCopy" class="friend box-grow-0"></image>
                    <app-jump-button open_type="share">
                        <image @click="shareCard" class="card"></image>
                    </app-jump-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import appGoodsPreviewPoster from '../goods/app-goods-preview-poster.vue';

    export default {
        name: 'app-goods-quick-share',
        components: {
            appGoodsPreviewPoster,
        },
        props: {
            goods: Object,
            value: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        data() {
            return {
                friendModel: false,
                posterUrl: '',
                is_all_btn: false,
                is_limit: true,
                shareData: null,
                posterShow: false,
            }
        },
        watch: {
            value(newInfo, oldInfo) {
                if (newInfo) {
                    let self = this;
                    const query = uni.createSelectorQuery().in(self);
                    query.select('#opacity-hide').boundingClientRect(item => {
                        const key = uni.createSelectorQuery().in(self);
                        key.select('#all_hide_text_0').boundingClientRect(item1 => {
                            self.is_all_btn = item1.height + 1 >= item.height;
                        }).exec();
                    }).exec();
                }
            }
        },
        methods: {
            showText() {
                this.is_limit = !this.is_limit;
            },
            close() {
                this.$emit('input', false);
                this.posterShow = false;
            },
            open() {
                this.posterUrl = this.$api.quick_share.poster + `&goods_id=` + this.goods.id;
                this.posterShow = true;
            },
            batchCopy() {
                this.copyText();
                this.saveImage(true);
            },
            copyText() {
                uni.setClipboardData({
                    data: this.goods.extra_quick_share.share_text,
                    success() {
                        //#ifndef MP-WEIXIN
                        uni.showToast({title: '复制成功'});
                        // #endif
                    },
                });
            },
            saveImage(customize_success = false) {
                let self = this;
                if (!self.goods.extra_quick_share.share_pic) {
                    return '';
                }
                uni.showLoading({title: `图片保存中`});
                self.$request({
                    url: self.$api.quick_share.poster_list,
                    data: {
                        goods_id: self.goods.id,
                    }
                }).then(info => {
                    if (info.code === 0) {
                        let urls = self.goods.extra_quick_share.share_pic.map(item => {
                            return item.pic_url;
                        });
                        urls.splice(-1, 1, info.data.pic_url);

                        self.$utils.batchSave(urls, 'image').then(result => {
                            const customize_a = function () {
                                uni.showToast({title: '保存成功'});
                            };
                            const customize_b = function () {
                                self.friendModel = true;
                                setTimeout(() => {
                                    self.friendModel = false;
                                }, 1500)
                            };
                            customize_success ? customize_b() : customize_a();
                        });
                    }
                }).catch(e => {
                    uni.hideLoading();
                });
            },
            shareCard() {
                const goods = this.goods;
                const title = goods.app_share_title ? goods.app_share_title : goods.extra_quick_share.share_text;
                let imageUrl = '';
                if (goods.extra_quick_share.share_pic[0].pic_url) {
                    imageUrl = goods.extra_quick_share.share_pic[0].pic_url;
                }
                if (goods.app_share_pic) {
                    imageUrl = goods.app_share_pic;
                }

                this.$emit('quickShare', {
                    title: title,
                    imageUrl: imageUrl,
                    path: goods.id === 0 ? '/pages/index/index' : '/pages/goods/goods',
                    params: goods.id === 0 ? {} : {id: goods.id},
                });
            },
            previewImage(index) {
                if (!this.goods.extra_quick_share.share_pic) {
                    return '';
                }
                const urls = this.goods.extra_quick_share.share_pic.map(item => {
                    return item.pic_url;
                });
                uni.previewImage({
                    urls: urls,
                    current: index
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .friend-box {
        position: fixed;
        top: #{563rpx};
        width: 100%;
        left: 0;
        z-index: 1701;

        .info > cover-view:first-child {
            margin-bottom: #{30rpx};
        }

        .info {
            width: #{413rpx};
            height: #{209rpx};
            color: #ffffff;
            font-size: #{28rpx};
            border-radius: #{16rpx};
            margin: 0 auto;
            background: rgba(0, 0, 0, 0.8);

            .text {
                padding-left: #{13rpx};
            }

            .icon {
                height: #{28rpx};
                width: #{28rpx};
            }
        }
    }
    .opacity-hide {
        position: fixed;
        top: 0;
        z-index: -10;
        opacity: 0;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        white-space: normal !important;
        -webkit-line-clamp: 5;
    }

    .share-text {
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        white-space: normal !important;
    }

    .share-text.limit {
        -webkit-line-clamp: 2;
    }

    .app-goods-quick-share {
        .box {
            position: fixed;
            z-index: 1700;
            left: 0;
            bottom: 0;
            width: #{750rpx};
            opacity: 1;
            visibility: visible;
            height: 100%;
            background-color: rgba(153, 153, 153, 0.5);
        }

        .quick-center {
            background: #ffffff;
            border-top-left-radius: #{16rpx};
            border-top-right-radius: #{16rpx};
            position: absolute;
            width: 100%;
            height: auto;
            left: 0;
            bottom: 0;
            z-index: 111;
        }
    }

    .app-center {
        width: calc(100% - #{80rpx});
        padding-top: #{100rpx};
        padding-bottom: #{77rpx};
        border-radius: #{8rpx};
        background-color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .app-close {
            width: #{30rpx};
            height: #{30rpx};
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url("../../../static/image/icon/close.png");
            position: absolute;
            top: #{28rpx};
            right: #{24rpx};

        }

        .app-image-iframe {
            width: #{440rpx};
            height: #{783rpx};
            position: relative;
            box-shadow: #{2rpx} #{2rpx} #{10rpx} #d9d9d9;

            .text {
                text-align: center;
                color: #888;
            }
        }

        .app-button {
            width: #{500rpx};
            height: #{80rpx};
            margin-top: #{38rpx};
            margin-bottom: #{24rpx};
        }

        .app-text {
            font-size: #{24rpx};
            color: #999999;
        }
    }

    .head {
        padding: 0 #{24rpx};

        .name {
            padding-top: #{30rpx};
            color: #212121;
            font-size: #{34rpx};
            max-width: 80%;
        }

        .time {
            font-size: #{24rpx};
            color: #a0a0a0;
            padding-top: #{10rpx};
            padding-bottom: #{20rpx};
        }

        .close {
            position: absolute;
            top: #{12rpx};
            right: #{12rpx};
            padding: #{12rpx};
            z-index: 111;
            icon {
                background-image: url("/plugins/quick_share/static/image/close.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                height: #{30rpx};
                width: #{30rpx};
            }
        }
    }

    .scrollbar {
        max-height: #{876rpx};
    }

    .goods-text {
        padding: 0 #{24rpx};
        font-size: #{32rpx};
        color: #212121;

        .share-text {
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            white-space: normal !important;
        }

        .share-text.limit {
            -webkit-line-clamp: 4;
        }

        .all {
            padding-top: #{10rpx};
            color: #5b6a91;
        }
    }

    .goods-image {
        padding: #{10rpx} #{24rpx - 6rpx} #{30rpx} #{24rpx - 6rpx};

        view {
            height: #{227rpx};
            width: #{227rpx};
            margin: #{6rpx};
        }

        image {
            height: 100%;
            width: 100%;
            display: block;
        }
    }

    .goods-set {
        color: #a0a0a0;
        font-size: #{28rpx};
        border-top: #{1rpx} solid #e2e2e2;
        padding: #{20rpx} #{24rpx} #{53rpx};

        .margin {
            margin: 0 auto;
        }

        .line {
            height: #{50rpx};
            width: #{1px};
            margin: 0 #{26rpx};
            background: #dcdfe6;
        }

        image {
            background-repeat: no-repeat;
            background-size: 100% 100%;
            height: #{50rpx};
            width: #{50rpx};
        }

        .friend {
            margin-right: #{15rpx};
            margin-left: #{20rpx};
            background-image: url("/plugins/quick_share/static/image/friend.png");
        }

        .card {
            background-image: url("/plugins/quick_share/static/image/wechat.png");
        }

    }
</style>