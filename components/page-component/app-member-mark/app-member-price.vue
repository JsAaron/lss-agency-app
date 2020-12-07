<template>
    <view v-if="price >= 0">
        <view class="app-member-price dir-left-nowrap cross-center">
            <view class="box-grow-0">
                <app-member-mark></app-member-mark>
            </view>
            <view class="box-grow-1 price">
                <app-price :price="price" type="text-price-all"></app-price>
            </view>
        </view>
    </view>
</template>

<script>
    import appMemberMark from "./app-member-mark.vue";
    import appPrice from "../goods/app-price.vue";
    export default {
        name: "app-member-price",
        components: {
            'app-member-mark': appMemberMark,
            'app-price': appPrice,
        },
        props: {
            price: Number,
        },
    }
</script>

<style scoped lang="scss">
    .price {
        color: #f39800;
        margin-left: #{10rpx};
        font-size: $uni-font-size-weak-one;
    }
</style>