<template>
    <view class="member dir-left-nowrap cross-center main-center" :style="{width: width,height: height,lineHeight: height}">会员价</view>
</template>

<script>
    export default {
        name: "app-member-mark",
        props: {
            width: {
                type: String,
                default() {
                    return `68rpx`;
                }
            },
            height: {
                type: String,
                default() {
                    return `28rpx`;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .member {
        border: #{1rpx} solid #f39800;
        border-radius: #{8rpx};
        font-size: #{20rpx};
        background-color: rgba(243, 152, 0, 0.1);
        color: #f39800;
    }
</style>