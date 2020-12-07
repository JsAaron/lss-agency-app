<template>
    <view>
        <ad v-if="type=== ``"
            :unit-id="unitId"
            @load="onAdLoad"
            @error="onAdError"
            @close="onAdClose"
            ad-intervals="0"
        />
        <ad v-if="type === `video`"
            :unit-id="unitId"
            :ad-type="type"
            :ad-theme="theme"
            @load="onAdLoad"
            @error="onAdError"
            @close="onAdClose"
        />
        <ad v-if="type === `grid`"
            :unit-id="unitId"
            :ad-theme="theme"
            :ad-type="type"
            @load="onAdLoad"
            @error="onAdError"
            @close="onAdClose"
            grid-opacity="0.8"
            grid-count="5"
        />
        <img v-if="type === `rewarded-video`"
             class="ad-img"
             @click="showRewardedVideoAd"
             :src="picUrl"
        />
        <img
                v-if="type === `interstitial`"
                class="ad-img"
                @click="showInterstitialAd"
                :src="picUrl"
        />
        <view v-if="type ===`before-video`" class="ad-video">
            <video :src="videoUrl"
                   :ad-unit-id="unitId"
                   :poster="picUrl"
                   @adplay="onAdPlay"
                   @adload="onAdLoad"
                   @adclose="onAdClose"
                   @aderror="onAdError"
            />
        </view>
    </view>
</template>

<script>
    export default {
        name: "app-ad",
        props: {
            type: String,
            unitId: String,
            picUrl: String,
            videoUrl: String,
            theme: {
                type: String,
                default() {
                    return 'white';
                }
            },
            couponUrl: String,
            couponParams: Object,
        },
        data() {
            return {
                //单屏问题
                rewardedVideoAd: null,
                createInterstitialAd: null,
            }
        },
        created: function () {
            this.init();
        },
        methods: {
            onAdLoad(e) {
                console.log(e);
            },
            onAdPlay(e) {
                console.log(e);
            },
            onAdClose(e) {
                console.log(e);
            },
            onAdError(e) {
                console.error(e);
            },
            init: function () {
                const self = this;
                switch (this.type) {
                    case '':
                        break;
                    case 'rewarded-video':
                        self.initRewardedVideoAd();
                        break;
                    case 'interstitial':
                        self.initInterstitialAd();
                        break;
                    case 'video':
                        break;
                    case 'before-video':
                        break;
                    case 'grid':
                        break;
                }
            },
            initRewardedVideoAd: function () {
                //ifdef MP-WEIXIN
                if (wx.createRewardedVideoAd) {
                    this.rewardedVideoAd = wx.createRewardedVideoAd({adUnitId: this.unitId})
                    this.rewardedVideoAd.onLoad(() => {
                        console.log('rewardedVideoAd load')
                    })
                    this.rewardedVideoAd.onError((err) => {
                        console.error('rewardedVideoAd error', err)
                    })
                    this.rewardedVideoAd.onClose((res) => {
                        if (res && res.isEnded) {
                            console.log('领取');
                            this.getUserCoupon();
                        } else {
                            console.log('rewardedVideoAd emit', res)
                        }
                    })
                }
                //endif
            },
            initInterstitialAd: function () {
                //ifdef MP-WEIXIN
                if (wx.createInterstitialAd) {
                    this.interstitialAd = wx.createInterstitialAd({adUnitId: this.unitId})
                    this.interstitialAd.onLoad(() => {
                        console.log('interstitialAd load')
                    })
                    this.interstitialAd.onError((err) => {
                        console.error('interstitialAd error', err)
                    })
                    this.interstitialAd.onClose((res) => {
                        console.log('interstitialAd close', res)
                    })
                }
                //endif
            },
            showRewardedVideoAd: function () {
                this.rewardedVideoAd.show().catch((err) => {
                    this.rewardedVideoAd.load().then(() => this.rewardedVideoAd.show()).catch(err => {
                        uni.showToast({title: err.errMsg, icon: 'none'});
                    })
                });
            },
            showInterstitialAd: function () {
                this.interstitialAd.show().catch((err) => {
                    uni.showToast({title: err.errMsg, icon: 'none'});
                });
            },
            getUserCoupon() {
                console.log(Object.assign({}, this.couponParams));
                const self = this;
                self.$request({
                    url: self.couponUrl,
                    method: 'POST',
                    data: Object.assign({}, this.couponParams)
                }).then(info => {
                    if (info.code === 0) {
                        self.$store.dispatch('page/actionSetCoupon', {
                            list: info.data.list,
                            type: 'award'
                        })
                    } else {
                        uni.showToast({title: info.msg, icon: 'none'});
                    }
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .ad-img {
        display: block;
        height: 139px;
        width: 100vw;
    }

    .ad-video {
        height: 230px;
        width: 100vw;

        video {
            height: 100%;
            width: 100%;
        }
    }
</style>