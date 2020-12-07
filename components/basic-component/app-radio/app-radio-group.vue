<template>
    <view class="app-radio-group">
        <view class="dir-left-wrap">
            <template v-for="(item, index) in model">
                <view :key="index" class="item cross-center dir-left-nowrap" :style="{height: `${height}rpx`,}">
                    <template v-if="type==='round'">
                        <view class="item-round"
                              :class="[
                                `white-background`,
                                item.value?`${theme}-background`:``,
                                `${theme}-border`,
                                `${theme}-color`,
                                ]" @click="handleClick(index)">{{item.label}}
                        </view>
                    </template>
                    <template v-else>
                        <view class="checker">
                            <app-radio v-model="item.value" type="round" @input="handleInput" :sign="index"></app-radio>
                        </view>
                        <view class="label">{{item.label}}</view>
                    </template>
                </view>
            </template>
        </view>
    </view>
</template>

<script>
    import AppRadio from "./app-radio";
    import {mapState} from 'vuex';

    export default {
        name: 'app-radio-group',
        components: {AppRadio},
        props: {
            type: {
                default: 'default',
            },
            value: {
                default: null,
            },
            list: {
                type: Array,
                default: [],
            },
            height: {
                type: Number,
                default: 88,
            },
            sign: {
                default: null,
            },
        },
        data() {
            const list = this.list;
            for (let i in list) {
                if (list[i].label === this.value) {
                    list[i].value = true;
                }
            }
            return {
                model: this.list,
            };
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme,
            }),
        },
        methods: {
            handleInput(e, index) {
                if (e === false) {
                    this.model[index].value = true;
                    return;
                }
                for (let i in this.model) {
                    if (index != i) {
                        this.model[i].value = false;
                    }
                }
                this.$emit('input', this.model[index].label, this.sign);
                this.$emit('change', this.model, this.sign);
            },
            handleClick(index) {
                for (let i in this.model) {
                    if (i == index) {
                        if (!this.model[i].value) {
                            this.model[i].value = true;
                            this.$emit('input', this.model[index].label, this.sign);
                            this.$emit('change', this.model, this.sign);
                        }
                    } else {
                        this.model[i].value = false;
                    }
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .label {
        color: #666666;
    }

    .item {
        margin-right: #{36rpx};
    }

    .item:last-child {
        margin-right: 0;
    }

    .checker {
        margin-right: #{16rpx};
    }

    .item-round {
        display: inline-block;
        height: #{56rpx};
        line-height: #{54rpx};
        border: #{1rpx} solid;
        padding: 0 #{28rpx};
        border-radius: #{1000rpx};
        font-size: $uni-font-size-general-one;
    }
</style>
