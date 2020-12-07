<template>
    <view class="app-pt-attr dir-top-nowrap">
        <text class="app-title">拼团人数</text>
        <view class="app-content dir-left-wrap">
            <text class="app-item" v-for="(item, index) in pintuan_groups" :class="{'app-active-item': selectGroupAttrId == item.id}" @click="active(item.id)" :key="index">{{item.people_num}}人团</text>
        </view>
    </view>
</template>

<script>

    export default {
        name: "app-pt-attr",
        props: {
            pintuan_groups: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectGroupAttrId: String,
        },
        data() {
            return {
            }
        },
        methods: {
            active: function(id) {
                this.$emit('click', id);
            }
        }
    }
</script>

<style scoped lang="scss">
    .app-pt-attr {
        width: 100%;
        .app-title {
            color: #666666;
            margin-bottom: #{20rpx};
        }
        .app-item {
            display: inline-block;
            background-color: #f2f2f2;
            margin-right: #{20rpx};
            margin-bottom: #{20rpx};
            padding: #{15upx 24upx};
            border-radius: #{8rpx};
            color: #353535;
        }
        .app-active-item {
            background-color: #ff4544;
            color: #ffffff;
        }
    }
</style>