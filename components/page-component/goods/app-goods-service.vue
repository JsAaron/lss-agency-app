<template>
    <view class="app-service dir-left-wrap" v-if="list.length > 0" :class="{'border-top': border}">
        <view class="goods-server-item cross-center dir-left-nowrap" v-for="(item, index) in list" :key="index">
            <view class="image cross-center main-center" :class="newTheme + '-background'">
                <image class="box-grow-0" src="../../../static/image/icon/icon-check.png" mode="aspectFill"></image>
            </view>
            <text class="box-grow-1">{{item}}</text>
        </view>
    </view>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        props: {
            list: Array,
	        border: {
                type: Boolean,
		        default() {
                    return true;
		        }
	        },
	        setTheme: String,
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme
            }),
	        newTheme() {
                if (this.setTheme) {
	                return this.setTheme;
                } else {
                    return this.theme;
                }
	        }
        }
    }
</script>

<style scoped lang="scss">
    .app-service {
        padding: #{24rpx};
        background-color: #fff;

        .goods-server-item {
            font-size: #{24rpx};
            margin-right: #{32rpx};
            color: $uni-general-color-one;

            .image {
                width: #{26rpx};
                height: #{26rpx};
                margin-right: #{8rpx};

                image {
                    width: #{30rpx};
                    height: #{30rpx};
                    display: block;
                }
            }
        }
    }
</style>