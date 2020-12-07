<template>
    <view class='phone-modal main-center cross-center' :class="showPhone"
          v-if="_app_config.mall.setting.is_mobile_auth == 1">
        <view class='phone-modal-content'>
            <view class='phone-modal-header t-large'>授权获取手机号</view>
            <view class='phone-modal-body dir-top-nowrap cross-center'>
                <image :src="img" class="img"></image>
                <view class='main-center text'>申请获取您绑定的手机号</view>
                <view class='main-center'>
                    <view>
                        <!-- #ifndef MP-ALIPAY -->
                        <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="btn new-modal-btn"
                                hover-class="none">确认
                        </button>
                        <!-- #endif -->
                        <!-- #ifdef MP-ALIPAY -->
                        <button open-type="getAuthorize"
                                class="btn new-modal-btn"
                                @getAuthorize="onGetAuthorize"
                                scope='phoneNumber'
                        >点击授权</button>
                        <!-- #endif -->
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "app-user-phone",
        computed: {
            ...mapState({
                _app_config: state => state.mallConfig,
            }),
            showPhone() {
                let userInfo = this.$store.state.user.info;
                let showClass = '';
                // #ifndef MP_BAIDU
                if (userInfo && userInfo.mobile == '') {
                    showClass = 'showPhone';
                }
                // #endif
                return showClass;
            },
            img() {
                let img = '';
                if (this.$platform == 'wxapp') {
                    img = this._app_config.__wxapp_img.mall.icon_wechat;
                } else if (this.$platform == 'aliapp') {
                    img = this._app_config.__wxapp_img.mall.icon_alipay;
                } else if (this.$platform == 'ttapp') {
                    img = this._app_config.__wxapp_img.mall.icon_ttapp;
                }
                return img;
            }
        },
        data() {
            return {
                code: null,
            };
        },
        created() {
            // #ifndef MP-ALIPAY
            let _this= this;
            uni.login({
                scopes: 'auth_base',
                success(res) {
                    if (res.errMsg === 'login:ok') {
                        _this.code = res.code;
                    }
                }
            })
            // #endif
        },
        methods: {
            // #ifndef MP-ALIPAY
            getPhoneNumber(e) {
                if (e.detail.errMsg === 'getPhoneNumber:fail user deny') return;
                let _this = this;
                _this.$request({
                    method: 'post',
                    url: _this.$api.phone.binding,
                    data: {
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv,
                        code: _this.code,
                    }
                }).then(() => {
                    _this.$store.dispatch('user/refreshInfo');
                })
            },
            // #endif
            // #ifdef MP-ALIPAY
            onGetAuthorize() {
                let _this = this;
                my.getPhoneNumber({
                    success: (res) => {
                        this.$request({
                            method: 'post',
                            url: _this.$api.phone.binding,
                            data: {
                                data: JSON.parse(res.response).response,
                            }
                        }).then(() => {
                            _this.$store.dispatch('user/refreshInfo');
                        });
                    },
                    fail: () => {
                    }
                });
            },
            // #endif
        }
    }
</script>

<style scoped lang="scss">
    .phone-modal {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1601;
        visibility: hidden;

        .phone-modal-content {
            width: #{630rpx};
            height: auto;
            background-color: #ffffff;
            border-radius: #{16rpx};
            position: relative;
        }

        .phone-modal-header {
            text-align: center;
            padding: #{30rpx 0};
            line-height: #{60rpx};
            border-bottom: #{1rpx} solid #eeeefee;
        }

        .phone-modal-body {
            padding: #{0 24rpx};
            color: #666666;
            max-height: #{700rpx};
            overflow-y: auto;
            min-height: 0;
            margin-bottom: 0;

            .img {
                width: #{88rpx};
                height: #{88rpx};
                text-align: center;
                margin: #{32rpx 0 40rpx};
            }

            .text {
                margin-bottom: #{40rpx};
                font-size: $uni-font-size-general-two;
            }
        }

        &.showPhone {
            visibility: visible;
        }

        .new-modal-btn {
            background-color: #04be01;
            width: #{500rpx};
            height: #{80rpx};
            border-radius: #{80rpx};
            color: #ffffff;
            margin-bottom: #{40rpx};
            padding: 0;
            box-sizing: border-box;
            border: none;
        }
    }
</style>