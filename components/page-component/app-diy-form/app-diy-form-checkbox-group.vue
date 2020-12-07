<template>
    <view class="app-diy-form-checkbox-group">
        <view class="list">
            <view v-for="(item, index) in model"
                  :key="index"
                  @click="handleClick(index)" class="out-of-item">
                <view class="item"
                      :class="[
                        `white-background`,
                        item.value?`${theme}-background`:``,
                        `${theme}-border`,
                        `${theme}-color`,
                        ]">{{item.label}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'app-diy-form-checkbox-group',
        props: {
            sign: {
                default: null,
            },
            value: {
                type: Array,
                default: [],
            },
            list: {
                type: Array,
                default: [],
            }
        },
        data() {
            const model = this.list;
            for (let i in model) {
                let inArray = false;
                for (let j in this.value) {
                    if (model[i].label === this.value[j]) {
                        inArray = true;
                        break;
                    }
                }
                if (inArray) {
                    model[i].value = true;
                }
            }
            return {
                model: model,
            };
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme,
            }),
        },
        methods: {
            handleClick(index) {
                this.model[index].value = !this.model[index].value;
                this.outputData();
            },
            outputData() {
                const value = [];
                for (let i in this.model) {
                    if (this.model[i].value === true) {
                        value.push(this.model[i].label);
                    }
                }
                this.$emit('change', value, this.sign);
                this.$emit('input', value, this.sign);
            },
        },
    }
</script>

<style scoped lang="scss">
    .app-diy-form-checkbox-group {
        width: 100%;
        overflow-x: hidden;
    }

    .list {
        margin: 0 -#{6rpx};
    }

    .out-of-item {
        padding: #{8rpx};
        display: inline-block;
    }

    .item {
        display: inline-block;
        height: #{56rpx};
        line-height: #{54rpx};
        border: #{1rpx} solid;
        padding: 0 #{28rpx};
        border-radius: #{1000rpx};
        font-size: $uni-font-size-general-one;
    }
</style>
