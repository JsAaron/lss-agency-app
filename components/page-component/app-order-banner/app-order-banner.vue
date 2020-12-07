<template>
    <view class="app-order-banner order-status-box cross-center">
        <img class='img' :src='newPicUrl'/>
        <view class='text'>{{title}}</view>
    </view>
</template>

<script>
    export default {
        name: 'app-order-banner',
        data() {
            return {
                newPicUrl: ''
            }
        },
        props: {
            title: {
                type: String,
                value: ''
            },
            picUrl: {
                type: String,
                value: ''
            },
        },
        created() {
            this.newPicUrl = this.$store.state.mallConfig.__wxapp_img.mall.order.status_bar;
        }
    }
</script>

<style scoped lang="scss">
    .order-status-box {
        width: 100%;
        height: 120#{rpx};
        position: relative;
    }

    .order-status-box .img {
        height: 100%;
        width: 100%;
    }

    .order-status-box .text {
        z-index: 1;
        position: absolute;
        top: 35#{rpx};
        left: 80#{rpx};
        color: #fff;
        font-size: $uni-font-size-import-two;
    }
</style>