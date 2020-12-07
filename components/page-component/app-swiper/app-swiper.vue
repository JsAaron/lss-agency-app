<template>
    <view class="swiper">
        <swiper v-if="mode === 'card'" :style="{height: `${height - 30}rpx`}" class="app-swiper-tall"
                indicator-dots :previous-margin="previousMargin"
                :next-margin="nextMargin" circular autoplay @change="change" :current="swiperCurrentIndex">
            <swiper-item class="app-swiper-container" v-for="(item,index) in list" :key="index"
                         :item-id="index" :data-year="index">
                <view class="app-sw">
                    <app-jump-button height="100" width="100" :open_type="item.open_type" :url="item.url" form>
                        <view class="app-swiper-item"
                              :style="{background:item.pic_url?('url('+ item.pic_url +') center no-repeat'):'',height: `${height}rpx`, backgroundSize: `${fill === 0 ? 'contain' : fill === 1 ? 'cover' : 'cover'}`}"
                              :animation="animationData[index]">
                        </view>
                    </app-jump-button>
                </view>
            </swiper-item>
        </swiper>
        <swiper v-else-if="mode === 'screen'" :style="{height: `${height}rpx`}" autoplay indicator-dots circular>
            <swiper-item v-for="(item, index) in list" :key="index">
                <view class="app-swiper-image">
                    <app-jump-button height="100" width="100" :open_type="item.open_type" :url="item.page_url" form>
                        <view class="app-swiper-item-w"
                              :style="{background:item?('url('+ item.pic_url +') center no-repeat'):'', backgroundSize: `${fill === 0 ? 'contain' : fill === 1 ? 'cover' : 'cover'}`}"></view>
                    </app-jump-button>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import appJumpButton from '../../basic-component/app-jump-button/app-jump-button.vue';

    export default {
        components: {
            'app-jump-button': appJumpButton,
        },
        props: {
            mode: {
                type: String,
                default: 'screen',
            },
            list: {
                type: Array,
                default() {
                    return [];
                }
            },
            height: {
                type: Number,
                default() {
                    return 350;
                }
            },
            fill: {
                type: Number,
                default() {
                    return 1;
                }
            },
        },
        data() {
            return {
                animationData: {
                    0: {},
                    1: {},
                    2: {},
                    3: {},
                },
                previousMargin: uni.upx2px(80) + 'px',
                nextMargin: uni.upx2px(80) + 'px',
                zoomParam: 1.10,
                swiperCurrentIndex: 0,
                imgs: [
                    'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                    'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                    'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                    'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                ]
            }
        },
        created() {
            this.animation = uni.createAnimation();
            this.animation.scale(this.zoomParam).step();
            this.animationData[0] = this.animation.export();
        },
        methods: {
            change(e) {
                this.swiperCurrentIndex = e.detail.current;
                for (let key in this.animationData) {
                    if (e.detail.currentItemId == key) {
                        this.animation.scale(this.zoomParam).step();
                        this.animationData[key] = this.animation.export();
                    } else {
                        this.animation.scale(1.0).step();
                        this.animationData[key] = this.animation.export();
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app-swiper-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .app-swiper-item {
        width: #{530rpx};
        text-align: center;
        border-radius: #{6rpx};
    }

    .app-swiper-item-w {
        height: 100%;
        width: 100%;
    }

    .app-sw {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        text-align: center;
    }

    .app-swiper-tall {
        display: flex;
        align-items: center;
    }

    .app-swiper-image {
        width: 100%;
        height: 100%;
    }
</style>
