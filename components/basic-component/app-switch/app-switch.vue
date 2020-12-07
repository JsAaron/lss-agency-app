<template>
    <view class="app-view app-background" @click.stop="switchChange" >
        <view :class="[themeColor]" class="app" :style="{'width': `${x}rpx`,'opacity': `${x === 0? '0':'1'}`,'transition': 'all .3s'}"></view>
        <view class="app-tab" @click.stop="switchChange" :style="{'transform': `translateX(${x}%)`, 'transition': 'all .5s'}"></view>
    </view>
</template>

<script>

    export default {
        name: 'app-switch',
        data() {
            return {
                x: 0,
                switch: this.value,
            }
        },
        props: {
            theme: String,
            value: {
                default: false,
            }
        },
        methods: {
            switchChange() {
                
                this.switch = !this.switch;
                this.$emit('input', this.switch);
            }
        },
        computed: {
            themeColor: function() {
                if (this.x === 88) {
                    return `${this.theme}-background`;
                } else {
                    return '';
                }
            }
        },
       watch: {
            value: {
                handler: function(res) {
                    if (res === false) {
                        this.x = 0;
                    } else if (res === true){
                        this.x = 88;
                    }
                },
                immediate: true
            }
       }
    }
</script>

<style lang="scss">
    .app {
        width: 0;
        height: #{48rpx};
        border-radius: #{50rpx};
        position: absolute;
        top: 0;
        left: 0;
    }
    .app-view {
        width: #{88rpx};
        height: #{48rpx};
        border-radius: #{50rpx};
        border: #{1rpx} solid $uni-general-color-three;
        position: relative;
    }
    .app-tab {
        width: #{50rpx};
        height: #{50rpx};
        background-color:white;
        border-radius: 50%;
        border: #{1rpx} solid $uni-general-color-three;
        position: absolute;
        top: 0;
        left: 0;
    }
    .app-background {
        background-color: #ffffff;
    }
</style>