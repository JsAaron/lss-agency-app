<template>
    <view v-if="vip_card.permission == 1" :style="[{'background-color': `${vip_card.setting.form.background}`,'height': `${vip_card.setting.form.top_bottom_padding*2 + 120 + 'rpx'}`,'padding': `${vip_card.setting.form.top_bottom_padding + 'rpx 0'}`}]">
        <view v-if="!userInfo.is_vip_card_user" class="app-vip-card cross-center dir-left-nowrap" :style="[{'background-image': 'url(' + `${vip_card.setting.form.buy_bg != 'statics/img/app/vip_card/buy_bg.png' ? vip_card.setting.form.buy_bg : svipImg.buy_bg}` + ')','background-color': `${background}`,'margin-top': `${top}`}]">
            <image class="app-vip-logo" :src="svipImg.logo"></image>
            <view>
                <view class="buy-big-text" :style="[{'color': `${vip_card.setting.form.buy_big_color}`}]">{{vip_card.setting.form.buy_big}}</view>
                <view class="buy-small-text" :style="[{'color': `${vip_card.setting.form.buy_small_color}`}]">{{vip_card.setting.form.buy_small}}</view>
            </view>
            <view @click="toSvip" class="app-vip-btn" :style="[{'color': `${vip_card.setting.form.buy_btn_color}`,'background':`${vip_card.setting.form.buy_btn_bg_color}`}]">{{vip_card.setting.form.buy_btn_text}}</view>
        </view>
        <view v-else-if="userInfo.is_vip_card_user" class="app-vip-card cross-center dir-left-nowrap" :style="[{'background-image': 'url(' + `${vip_card.setting.form.renew_bg != 'statics/img/app/vip_card/buy_bg.png' ? vip_card.setting.form.renew_bg : svipImg.buy_bg}` + ')','background-color': `${background}`,'margin-top': `${top}`}]">
            <image class="app-vip-logo" :src="svipImg.logo"></image>
            <view>
                <view class="buy-big-text" :style="[{'color': `${vip_card.setting.form.renew_text_color}`}]">{{vip_card.setting.form.renew_text}}</view>
            </view>
            <view @click="toSvip" class="app-vip-btn app-renew-btn cross-center main-center" :style="[{'background':`${vip_card.setting.form.renew_btn_bg_color}`}]">
                <text>详情</text>
                <image class="right-icon" src="/static/image/icon/right.png"></image>
            </view>
        </view>
    </view>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'app-vip-card',

        props: {
            background: {
                type: String,
                default() {
                    return `#f7f7f7`;
                }
            },
            top: {
                type: String,
                default() {
                    return `20rpx`;
                }
            },
            value: Object
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme,
                userInfo: state => state.user.info,
                vip_card: state => state.mallConfig.plugin.vip_card,
                svipImg: state => state.mallConfig.__wxapp_img.vip_card
            }),
        },
        watch: {
            value: {
                handler(data) {
                    if (data) {
                        this.vip_card.setting.form = this.value;
                    }
                },
                immediate: true,
            }
        },
        created() {
            // let that = this;
            // that.$request({
            //     url: that.$api.index.config,
            // }).then(response=>{
            //     that.$hideLoading();
            //     if(response.code == 0) {
            //         that.vip_card = response.data.plugin.vip_card;
            //         that.svipImg = response.data.__wxapp_img.vip_card;
            //         if(that.value) {
            //             that.vip_card.setting.form = that.value;
            //         }
            //     }
            // })
        },
        methods: {
            toSvip() {
                uni.navigateTo({
                    url: '/plugins/vip_card/index/index'
                });
            },
        },
    }
</script>

<style scoped lang="scss">
    .app-vip-card {
        height: #{120rpx};
        width: 100%;
        padding: 0 #{24rpx};
        border-radius: #{15rpx};
        position: relative;
        background-size:#{702rpx} #{120rpx};
        background-repeat:no-repeat;
        background-position: center bottom;
        .app-vip-logo {
            height: #{54rpx};
            width: #{60rpx};
            margin: 0 #{30rpx} 0 #{25rpx};
        }
        .buy-big-text {
            font-size: #{28rpx};
            margin-bottom: #{4rpx};
        }
        .buy-small-text {
            font-size: #{22rpx};
        }
        .app-vip-btn {
            position: absolute;
            right: #{45rpx};
            top: #{36rpx};
            font-size: #{25rpx};
            width: #{140rpx};
            height: #{48rpx};
            line-height: #{48rpx};
            text-align: center;
            border-radius: #{24rpx};
            background: -webkit-linear-gradient(left, #fbdec7, #f3bf95);
            background: -o-linear-gradient(left, #fbdec7, #f3bf95);
            background: linear-gradient(to right, #fbdec7, #f3bf95);
        }
        .app-vip-btn.app-renew-btn {
            width: #{89rpx};
            height: #{35rpx};
            line-height: #{35rpx};
            border-radius: #{18rpx};
            top: #{42.5rpx};
            .right-icon {
                height: #{22rpx};
                width: #{12rpx};
                margin-left: #{8rpx};
            }
        }
    }
</style>