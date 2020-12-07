<!-- 全局支付组件 -->
<template>
    <view class="app-payment main-center cross-center" :class="showPayment?'show':''">
        <view class="modal" v-if="payData">
            <view class="title">
                <view>支付方式</view>
                <view class="cancel" @click="cancel">
                    <image src="/static/image/icon/close.png"></image>
                </view>
            </view>
            <view class="pay-amount">支付金额 {{payData.amount}} 元</view>
            <view class="pay-type-list">
                <view v-for="(item, index) in payData.list"
                      @click="checkPayType(index)"
                      :key="index"
                      class="pay-type-item cross-center">
                    <view class="box-grow-0">
                        <image class="pay-type-icon" :src="item.icon"></image>
                    </view>
                    <view class="box-grow-1">
                        <view class="pay-type-name">{{item.name}}</view>
                        <view class="pay-type-desc" v-if="item.desc">{{item.desc}}</view>
                    </view>
                    <view class="box-grow-0">
                        <app-radio v-if="item.checked" :theme="theme" v-model="item.checked" type="round"></app-radio>
                    </view>
                </view>
            </view>
            <view class="footer">
                <app-button type="important" :theme="theme" @click="confirm" round>立即支付</app-button>
            </view>
        </view>
    </view>
</template>

<script>
    import Vue from 'vue';
    import {mapState} from 'vuex';
    import AppRadio from '@/components/basic-component/app-radio/app-radio';

    export default {
        name: 'app-payment',
        components: {AppRadio},
        data() {
            return {};
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme,
                showPayment: state => state.payment.showPayment,
                payData: state => state.payment.payData,
            }),
        },
        created() {
            this.setPayment();
        },
        methods: {
            setPayment() {
                const vm = this;
                Vue.use({
                    install(Vue, options) {
                        Vue.prototype.$payment = {
                            pay: vm.pay,
                        };
                    },
                });
            },
            pay(id) {
                return new Promise((resolve, reject) => {
                    this.$store.commit('payment/setAll', {
                        showPayment: false,
                        payData: null,
                        payType: null,

                        id: id,
                        resolve: resolve,
                        reject: reject,
                    });
                    console.log('debug payment, setAll ok, id:', this.$store.state.payment.id);
                    console.log('debug payment, setAll ok, resolve:', this.$store.state.payment.resolve);
                    console.log('debug payment, setAll ok, reject:', this.$store.state.payment.reject);
                    uni.showLoading({
                        mask: true,
                        title: '请求支付...',
                    });
                    this.$request({
                        url: this.$api.payment.get_payments,
                        data: {
                            id: id,
                        }
                    }).then(response => {
                        uni.hideLoading();
                        console.log('debug 1--->', response);
                        if (response.code === 0) {
                            console.log('debug payment, set resolve 2,', this.$store.state.payment.resolve);
                            return this.showPaymentModal(response.data);
                        } else {
                            response.errMsg = response.msg || '';
                            return this.$store.state.payment.reject(response.msg);
                        }
                    }).catch(e => {
                        uni.hideLoading();
                        e.errMsg = e.msg || '';
                        return this.$store.state.payment.reject(e);
                    });
                });
            },
            showPaymentModal(data) {
                console.log('debug 2--->', data);
                for (let i in data.list) {
                    if (typeof data.list[i].checked === 'undefined') {
                        data.list[i].checked = false;
                    }
                }
                this.$store.commit('payment/payData', data);
                if (data.amount === 0 || data.amount === 0.00 || data.amount === '0' || data.amount === '0.00') {
                    this.$store.commit('payment/payType', 'balance');
                    for (let i in this.$store.state.payment.payData.list) {
                        if (this.$store.state.payment.payData.list[i].key === 'balance') {
                            this.$store.state.payment.payData.list[i].checked = true;
                        } else {
                            this.$store.state.payment.payData.list[i].checked = false;
                        }
                    }
                    this.confirm();
                    return;
                }
                this.$store.commit('payment/showPayment', true);
            },
            confirm() {
                console.log('payment confirm 1:');
                console.log('debug payment, confirm 1,', this.$store.state.payment.resolve);
                for (let i in this.$store.state.payment.payData.list) {
                    if (this.$store.state.payment.payData.list[i].checked) {
                        this.$store.commit('payment/payType', this.$store.state.payment.payData.list[i].key);
                    }
                }
                if (!this.$store.state.payment.payType) {
                    uni.showModal({
                        title: '提示',
                        content: '请选择支付方式',
                        showCancel: false,
                    });
                    return;
                }
                this.$store.commit('payment/showPayment', false);
                console.log('payment confirm 2:', this.$store.state.payment.payType);
                console.log('debug payment, confirm 2,', this.$store.state.payment.resolve);
				
                return this.getPayData();
            },
            cancel() {
                this.$store.commit('payment/showPayment', false);
                return this.$store.state.payment.reject({
                    errMsg: '支付取消',
                });
            },
            checkPayType(index) {
                if (this.$store.state.payment.payData.list[index].disabled || this.$store.state.payment.payData.list[index].checked) {
                    return false;
                }
                const payData = this.$store.state.payment.payData;
                for (let i in payData.list) {
                    if (i == index) {
                        payData.list[i].checked = true;
						payData.typename = payData.list[i].key;
						
                    } else {
                        payData.list[i].checked = false;
                    }
                }
				
                this.$store.commit('payment/payData', payData);
            },
            getPayData() {
                console.log('debug payment, getPayData 1,', this.$store.state.payment.resolve);
				
				if(this.$store.state.payment.payType === 'wechat'){
					//选择了微信支付
					const payData = this.$store.state.payment.payData;
					payData.typename = this.$store.state.payment.payType;
					this.$store.commit('payment/payData', payData);
					this.$store.state.payment.resolve(this.$store.state.payment.payData);
					return;
				}
				
                uni.showLoading({
                    mask: true,
                    title: '请求支付...',
                });
                this.$request({
                    url: this.$api.payment.pay_data,
                    data: {
                        id: this.$store.state.payment.id,
                        pay_type: this.$store.state.payment.payType,
                    }
                }).then(response => {
                    uni.hideLoading();
                    if (response.code === 0) {
                        switch (this.$store.state.payment.payType) {
                            case 'balance':
                                this.callBranch(response.data);
                                break;
                            case 'huodao':
                                this.callHuodao(response.data);
                                break;
                            default:
                                console.log('debug payment, getPayData 2,', this.$store.state.payment.resolve);
                                this.callPlatformPayment(response.data);
                                break;
                        }
                    } else {
                        return this.$store.state.payment.reject(response.msg);
                    }
                }).catch(e => {
                    uni.hideLoading();
                    e.errMsg = e.msg || '';
                    return this.$store.state.payment.reject(e);
                });
            },
            callBranch(data) {
                if (data.order_amount === 0 || data.order_amount === 0.00 || data.order_amount === '0' || data.order_amount === '0.00') {
                    this.payByBalance();
                } else {
                    uni.showModal({
                        title: '余额支付确认',
                        content: `账户余额：${data.balance_amount}，支付金额：${data.order_amount}`,
                        success: (e) => {
                            if (e.confirm) {
                                this.payByBalance();
                            } else {
                                return this.$store.state.payment.reject({
                                    errMsg: '支付取消.',
                                });
                            }
                        }
                    });
                }
            },
            payByBalance() {
                uni.showLoading({
                    mask: true,
                    title: '支付中...',
                });
                this.$request({
                    url: this.$api.payment.pay_buy_balance,
                    data: {
                        id: this.$store.state.payment.id,
                    }
                }).then(response => {
                    uni.hideLoading();
                    if (response.code === 0) {
                        return this.$store.state.payment.resolve({
                            errMsg: '支付成功',
                        });
                    } else {
                        return this.$store.state.payment.reject({
                            errMsg: response.msg,
                        });
                    }
                }).catch(e => {
                    e.errMsg = e.msg || '';
                    return this.$store.state.payment.reject(e);
                });
            },
            callHuodao(data) {
                uni.showLoading({
                    mask: true,
                    title: '提交中...',
                });
                this.$request({
                    url: this.$api.payment.pay_buy_huodao,
                    data: {
                        id: this.$store.state.payment.id,
                    },
                }).then(response => {
                    uni.hideLoading();
                    if (response.code === 0) {
                        return this.$store.state.payment.resolve({
                            errMsg: '支付成功',
                        });
                    } else {
                        return this.$store.state.payment.reject({
                            errMsg: response.msg,
                        });
                    }
                }).catch(e => {
                    uni.hideLoading();
                    e.errMsg = e.msg || '';
                    return this.$store.state.payment.reject(e);
                });
            },
            callPlatformPayment(data) {
                console.log('debug payment, callPlatformPayment 1,', this.$store.state.payment.resolve);
                let paymentProvider = null;
                // #ifdef MP-WEIXIN
                paymentProvider = ['wxpay'];
                // #endif
                // #ifdef MP-ALIPAY
                paymentProvider = ['alipay'];
                // #endif
                // #ifdef MP-BAIDU
                paymentProvider = ['baidu'];
                // #endif
                // #ifdef MP-TOUTIAO
                paymentProvider = ['toutiao'];
                // #endif
                uni.requestPayment({
                    provider: paymentProvider,
                    success: (e) => {
                        console.log('debug payment, callPlatformPayment 3,', this.$store.state.payment.resolve);
                        console.log('success:', e);
                        // #ifndef MP-ALIPAY
                        return this.$store.state.payment.resolve(e);
                        // #endif
                        // #ifdef MP-ALIPAY
                        if (e.resultCode === 9000 || e.resultCode === '9000') {
                            return this.$store.state.payment.resolve(e);
                        } else {
                            return this.$store.state.payment.reject({
                                errMsg: e.memo,
                      
							});
                        }
                        // #endif
                    },
                    fail: (e) => {
                        const cancelMsgList = [
                            'requestPayment:fail cancel',
                        ];
                        if (e.errMsg && cancelMsgList.indexOf(e.errMsg) >= 0) {
                            e.errMsg = '取消支付';
                        }
                        console.log('debug payment, callPlatformPayment 4,', this.$store.state.payment.resolve);
                        console.log('fail:', e);
                        return this.$store.state.payment.reject(e);
                    },
                    ...data
                });
            },
        },
    }
</script>

<style scoped lang="scss">
    $bigPadding: #{50rpx};
    $smallPadding: #{25rpx};
    $middlePadding: #{30rpx};
    $smallFont: #{24rpx};
    $lineWidth: #{1rpx};
    $modalWidth: #{600rpx};
    $iconWidth: #{60rpx};

    .app-payment {
        background: rgba(0, 0, 0, .5);
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        visibility: hidden;
        opacity: 0;
        transition: 150ms;

        .modal {
            background: #fff;
            width: $modalWidth;
            border-radius: #{15rpx};

            .title {
                text-align: center;
                padding: $middlePadding;
                border-bottom: $lineWidth solid #e2e2e2;
                position: relative;
            }

            .cancel {
                position: absolute;
                right: 0;
                top: 0;
                padding: $middlePadding;

                image {
                    width: #{36rpx};
                    height: #{36rpx};
                }
            }

            .pay-amount {
                text-align: center;
                padding: $bigPadding;
                font-weight: bolder;
            }

            .pay-type-list {
                padding: 0 $bigPadding;
            }

            .pay-type-item {
                border-bottom: $lineWidth solid #e2e2e2;
                padding: $smallPadding 0;

                .pay-type-icon {
                    width: $iconWidth;
                    height: $iconWidth;
                    margin-right: $smallPadding;
                }

                .pay-type-desc {
                    color: #909090;
                    font-size: $smallFont;
                }
            }

            .pay-type-item:last-child {
                border-bottom: none;
            }

            .footer {
                padding: $bigPadding;
            }
        }
    }

    .app-payment.show {
        visibility: visible;
        opacity: 1;
    }
</style>
