<template>
    <view class="app-datetime-picker" @click="handleClick">
        <picker :mode="mode"
                :value="value"
                :start="start"
                :end="end"
                :fields="fields"
                @change="handleChange"
                @cancel="handleCancel">
            <view class="dir-left-nowrap cross-center" :style="{
                'background': `${background}`,
                'border': showBorder? `1rpx solid ${borderColor}` : 'none',
                'height': `${height}rpx`,
                'border-radius': `${radius}rpx`,
                'text-color': `${textColor}`,
            }">
                <view class="box-grow-1" :class="[`text-align-${textPosition}`]">
                    <!-- #ifdef MP-TOUTIAO -->
                    <slot></slot>
                    <!-- #endif -->
                    <!-- #ifndef MP-TOUTIAO -->
                    {{text}}
                    <!-- #endif -->
                </view>
                <view class="box-grow-0" v-if="showArrow" style="padding: 0 24rpx">
                    <image class="arrow" src="/static/image/icon/arrow-right.png"
                           style="width: 12rpx;height: 22rpx;"></image>
                </view>
            </view>
        </picker>
    </view>
</template>

<script>
    export default {
        name: 'app-datetime-picker',
        props: {
            value: {
                type: String,
                default: '0',
            },
            text: null,
            mode: {
                type: String,
                default: 'date',
            },
            start: {
                type: String,
                default: '',
            },
            end: {
                type: String,
                default: '',
            },
            fields: {
                type: String,
                default: 'day',
            },
            disabled: false,
            showArrow: {
                type: Boolean,
                default: true,
            },
            sign: {
                default: null,
            },
            background: {
                default: 'transparent',
            },
            showBorder: {
                default: false,
            },
            borderColor: {
                default: 'transparent',
            },
            height: {
                default: 80,
            },
            radius: {
                default: 0,
            },
            textColor: {
                default: '#666666',
            },
            textPosition: {
                default: 'right',
            },
        },
        methods: {
            handleChange(e) {
                this.$emit('input', e.detail.value, this.sign);
                this.$emit('change', e, this.sign);
            },
            handleCancel(e) {
                this.$emit('cancel', e.detail.value, this.sign);
            },
            handleClick(e) {
                // #ifdef MP-ALIPAY
                my.datePicker({
                    format: this.mode === 'date' ? 'yyyy-MM-dd' : 'HH:mm',
                    success: (e) => {
                        this.handleChange({
                            detail: {
                                value: e.date,
                            },
                        });
                    },
                    fail: this.handleCancel,
                });
                // #endif
            },
        },
    }
</script>
<style lang="scss" scoped>
    .text-align-left {
        text-align: left;
    }

    .text-align-right {
        text-align: right;
    }
</style>