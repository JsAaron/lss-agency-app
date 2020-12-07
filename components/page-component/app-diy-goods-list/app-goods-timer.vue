<template>
    <view class="dir-left-nowrap app-goods-timer cross-center" :class="listClass">
        <template v-if="listStyle === -1">
            <!-- 列表模式 -->
            <image class="box-grow-0 img" src="../../../static/image/icon/time.png"></image>
            <view class="box-grow-0 timer-1">{{timer}}</view>
            <view class="box-grow-1" :class="theme + '-color'" v-if="timerStr">&nbsp;&nbsp;&nbsp;{{timerStr}}</view>
        </template>
        <template v-if="listStyle === 1">
            <!-- 一行一个 -->
            <view class="dir-left-nowrap app-column-1">
                <view class="box-grow-1 sign-name">{{signName}}</view>
                <view class="box-grow-0 timer-1">{{timer}}</view>
                <view class="box-grow-0" v-if="timerStr">&nbsp;&nbsp;&nbsp;{{timerStr}}</view>
            </view>
        </template>
        <template v-if="listStyle === 2">
            <!-- 一行一个 -->
            <view class="box-grow-0 dir-left-nowrap app-column-2">
                <view class="box-grow-0 timer-1">{{timer}}</view>
                <view class="box-grow-1" v-if="timerStr">&nbsp;&nbsp;&nbsp;{{timerStr}}</view>
            </view>
        </template>
    </view>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "app-goods-timer",
        props: {
            startDateTime: String,
            endDateTime: String,
            listStyle: {
                type: Number,
                default() {
                    return -1;
                }
            },
            sign: String,
            pageHide: Boolean,
        },
        data() {
            return {
                timeInterval: null,
                timer: null,
                timerStr: null
            };
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme,
            }),
            time() {
                return {
                    startDateTime: this.startDateTime,
                    endDateTime: this.endDateTime,
                    pageHide: this.pageHide,
                };
            },
            listClass() {
                if (this.listStyle === 1) {
                    return `background`
                } else if (this.listStyle === 2) {
                    return `background main-center`;
                } else {
                    return ``;
                }
            },
            signName() {
                let name = '';
                if (this.sign === 'miaosha') {
                    name = '秒杀';
                } else if (this.sign === 'bargain') {
                    name = '砍价';
                } else if (this.sign === 'lottery') {
                    name = '抽奖';
                } else if (this.sign === 'advance') {
                    name = '预售';
                }
                return name;
            }
        },
        watch: {
            time: {
                handler(v) {
                    if (this.pageHide) {
                        clearInterval(this.timeInterval);
                        return ;
                    }
                    let startDateTime = this.startDateTime;
                    let endDateTime = this.endDateTime;
                    
                    startDateTime = startDateTime.replace(/-/g, '/');
                    endDateTime = endDateTime.replace(/-/g, '/');
                    
                    let timerStr = null;
                    let startTime = this.$utils.timeDifference(new Date().getTime(), new Date(startDateTime).getTime());
                    if (startTime) {
                        this.timer = '距开始 ';
                        timerStr = (startTime['d'] > 0 ? startTime['d'] + '天' : '') + startTime['h'] + ':' + startTime['m'] + ':' + startTime['s'];
                    }
                    let endTime = null;
                    if (!timerStr) {
                        endTime = this.$utils.timeDifference(new Date().getTime(), new Date(endDateTime).getTime());
                        if (endTime) {
                            this.timer = '距结束 ';
                            timerStr = (endTime['d'] > 0 ? endTime['d'] + '天' : '') + endTime['h'] + ':' + endTime['m'] + ':' + endTime['s'];
                        }
                    }
                    if (!timerStr) {
                        this.timer = '活动已结束';
                    }
                    this.timerStr = timerStr;
                    this.timeInterval = setInterval(() => {
                        let timerStr = null;
                        let startTime = this.$utils.timeDifference(new Date().getTime(), new Date(startDateTime).getTime());
                        if (startTime) {
                            this.timer = '距开始 ';
                            timerStr = (startTime['d'] > 0 ? startTime['d'] + '天' : '') + startTime['h'] + ':' + startTime['m'] + ':' + startTime['s'];
                        }
                        let endTime = null;
                        if (!timerStr) {
                            endTime = this.$utils.timeDifference(new Date().getTime(), new Date(endDateTime).getTime());
                            if (endTime) {
                                this.timer = '距结束 ';
                                timerStr = (endTime['d'] > 0 ? endTime['d'] + '天' : '') + endTime['h'] + ':' + endTime['m'] + ':' + endTime['s'];
                            }
                        }
                        if (!timerStr) {
                            this.timer = '活动已结束';
                            clearInterval(this.timeInterval);
                        }
                        this.timerStr = timerStr;
                    }, 1000);
                },
                immediate: true
            }
        },
        beforeDestroy() {
            clearInterval(this.timeInterval);
        }
    }
</script>

<style scoped lang="scss">
    .app-goods-timer {
        font-size: $uni-font-size-weak-one;
        color: #ffffff;

        .img {
            width: #{24rpx};
            height: #{24rpx};
            display: block;
            margin-right: #{12rpx};
        }
        
        .timer-1 {
            color: $uni-general-color-two;
        }

        &.background  {
            background: linear-gradient(left, #ff4544, #ff8b8b);
        }

        .app-column-1 {
            padding: 0 #{24rpx};
            height: #{80rpx};
            line-height: #{80rpx};
            width: 100%;

            .timer-1 {
                color: #ffffff;
            }

            .sign-name {
                font-size: $uni-font-size-import-two;
            }
        }

        .app-column-2 {
            height: #{44rpx};
            line-height: #{44rpx};

            .timer-1 {
                color: #ffffff;
            }
        }
    }
</style>