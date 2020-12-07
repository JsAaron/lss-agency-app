<template>
    <view class="app-default" :style="{'width': `${width}rpx`, 'height': `${height}rpx`}" @click.stop="radioSelection">
        <view
                v-if="value"
                class="app-default-active"
                :class="[
		        {'round-active' : type === 'round'},
		        `${theme}-background`
	           ]"
            
        ></view>
        <view v-if="!value" class="app-default-border"
              :class="{'round-border' : type === 'round'}"></view>
    </view>
</template>

<script>
    export default {
        name: 'app-radio',
        props: {
            type: String,
            theme: {
                type: String,
                default: 'classic-red',
            },
            value: {
                default: false,
                type: Boolean,
            },
            width: {
                type: String,
                default: '40'
            },
            height: {
                type: String,
                default: '40'
            },
            item: {
                type: Object,
                default() {
                    return {}
                }
            },
            sign: {
                default: null,
            },
        },
        data() {
            return {
                active: this.value,
            }
        },
        methods: {
            radioSelection() {
                this.active = !this.active;
                this.$emit('input', this.active, this.sign);
                this.$emit('click', this.active, this.item);
            }
        },
        watch: {
            value: {
                handler(value) {
                    this.active = value;
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .round-active {
        border-radius: 50%;
    }

    .round-border {
        border-radius: 50%;
    }

    .app-default {
        position: relative;
    }

    .app-default-active {
        position: absolute;
        background-image: url("../../../static/image/icon/yes-radio.png");
        background-size: 100% 100%;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
        background-repeat: no-repeat;
	    background-color: transparent !important;
	    width: #{40rpx};
	    height: #{40rpx};
    }

    .app-default-border {
	    position: absolute;
        border: #{1rpx} solid #dddddd;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
	    width: #{40rpx};
	    height: #{40rpx};
    }

</style>