<template>
    <view class="app-foot-list main-center">
        <view @click="toNext(item.name)" class="app-foot-item main-center" v-for="(item, key) in foot_bar" :key="key">
            <image :src="item.icon_url"></image>
            <view class="app-foot-info">
                <view class="app-foot-num" v-if="key == 0">{{userInfo.favorite ? userInfo.favorite : 0}}</view>
                <view class="app-foot-num" v-if="key == 1 ">{{userInfo.footprint ? userInfo.footprint : 0}}</view>
                <view>{{item.name}}</view>
            </view>
        </view>
        <view class="app-foot-line"></view>
    </view>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';

    export default {
        name: 'app-foot-box',

        data() {
            return {
            }
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme,
                userInfo: state => state.user.info,
            }),
            ...mapGetters('userCenter', {
                foot_bar: 'foot_bar'
            })
        },
        created() {
            let that = this;
            console.log('foot_bar=============='+JSON.stringify(this.foot_bar));
        },
        methods: {
            toNext(name) {
                if(name == '我的收藏') {
                    uni.navigateTo({
                        url: `/pages/favorite/favorite`,
                    });
                }else {
                    uni.navigateTo({
                        url: `/pages/foot/index/index`,
                    });
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .app-foot-list {
		width:  #{750rpx};;
        height: #{104rpx};
        position: relative;
		background-color: red;
        .app-foot-item {
            font-size: #{26rpx};
            color: #666666;
            padding-top: #{14rpx};
            width: 50%;
            image {
                margin-top: #{44rpx};
                width: #{40rpx};
                height: #{40rpx};
                margin-right: #{17rpx};
            }
            .app-foot-info {
                text-align: center;
                .app-foot-num {
                    font-size: #{32rpx};
                    margin-bottom: #{10rpx};
                }
            }
        }
        .app-foot-line {
            height: #{40rpx};
            width: #{2rpx};
            background-color: #666666;
            position: absolute;
            top: #{45rpx};
            left: 50%;
            margin-left: #{-2rpx};
        }
    }
</style>