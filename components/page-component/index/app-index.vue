<template>
    <view class="app-index">
	    
        <!-- #ifdef MP-WEIXIN -->
        <template v-if="mall.setting.is_official_account == 1">
            <official-account></official-account>
        </template>
        <!-- #endif -->
        <view class="page-width">
            <app-quick-navigation></app-quick-navigation>
        </view>
	    
        <block v-for="(item, index) in newPage" :key="index">
            <template v-if="item.key === 'search'">
                <view class="page-width">
                    <app-search-for></app-search-for>
                </view>
            </template>
	        
            <template v-else-if="item.key === 'banner'">
                <view v-if="item.banners.length > 0">
                    <app-swiper
	                    imageKey="pic_url"
	                    :swiperHeight=350
                        :swiperList="item.banners"
                    ></app-swiper>
                </view>
            </template>
	
	        <template v-else-if="item.key === 'cat'">
		        <view class="cat mt-20">
			        <app-index-cat
					        :cat-pic-url="item.cat_pic_url"
					        :name="item.name"
					        :list-style="item.list_style"
					        :list="item.goods"
					        :cat-id="item.relation_id"
			        ></app-index-cat>
		        </view>
	        </template>
	        
            <template v-else-if="item.key === 'home_nav'">
                <view>

                    <app-navigation-icon
                        :navs="item.home_navs"
                        :columns="Number(item.row_num)"
                        :rows="-1"
                    ></app-navigation-icon>
                </view>
            </template>
	        
            <template v-else-if="item.key === 'notice'">
                <view>
                    <app-announcement
		                    :name="item.notice_name"
                                      :content="item.notice_content"
                                      :icon="item.notice_url"
                                      :background="item.notice_bg_color"
                                      :text-color="item.notice_text_color"
                    ></app-announcement>
                </view>
            </template>
	        
            <template v-else-if="item.key === 'video'">
                <view class="mt-20">

                    <app-video :pic-url="item.video_pic_url"
                               :url="item.video_url"
                    ></app-video>
                </view>
            </template>
	        
            <template v-else-if="item.key === 'topic'">
                <view class="mt-20">

                    <app-topic :topic_list="item.topics"
                               :count="Number(item.topic_num)"
                               :icon="item.label_url"
                               :logo_2="item.topic_url_2"
                               :logo_1="item.topic_url"
                    ></app-topic>
                </view>
            </template>
	        
            <template v-else-if="item.key === 'coupon'">
                <view class="mt-20">
                    <app-exclusive-coupon :coupon_list="item.coupons"
                                          :receive-bg="item.coupon_url"
                                          :unclaimed-bg="item.coupon_not_url"
                                          :index="index"
                                          @click="changeCoupon"
                    ></app-exclusive-coupon>
                </view>
            </template>
	
	        <template v-else-if="item.key === 'block'">
		        <view>
			        <app-image-ad :image-style="item.block.status" :list="item.block.value"></app-image-ad>
		        </view>
	        </template>
	
	        <template v-else-if="item.key === 'miaosha'">
		        <view class="miaosha mt-20">
			        <app-index-miaosha :page-hide="pageHide" :value="item.miaosha"></app-index-miaosha>
		        </view>
	        </template>
	
	        <template v-else-if="item.key === 'fxhb'">
		        <view>
			        <app-popup-ad :opened="true" :is_storage="is_storage" :list="item.fxhb"></app-popup-ad>
		        </view>
	        </template>
	        
            <template v-else-if="item.key === 'pintuan'">
                <view class="pintuan mt-20">
                    <app-index-pintuan :value="item.pintuan"></app-index-pintuan>
                </view>
            </template>
	        
            <template v-else-if="item.key === 'booking'">
                <view class="booking mt-20">
                    <app-index-booking :value="item.booking"></app-index-booking>
                </view>
            </template>
	        
            <template v-else-if="item.key === 'mch'">
                <view class="mch mt-20">
                    <app-good-shop-recommendation :list="item.mch"></app-good-shop-recommendation>
                </view>
            </template>
	
	        <template v-else-if="item.key === 'advance'">
		        <view class="advance mt-20">
			        <app-index-advance :value="item.advance.data.list"></app-index-advance>
		        </view>
	        </template>

            <template v-else-if="item.key === 'pick'">
                <view class="advance mt-20">
                    <app-index-pick :value="item.pick.list" :activity="item.pick.activity"></app-index-pick>
                </view>
            </template>
	        
        </block>
    </view>
</template>

<script>
    import { mapState } from 'vuex';
    import appSearchFor from '../../page-component/app-search-for/app-search-for.vue';
    import appSwiper from '../../page-component/app-swiper/swiper.vue';
    import appNavigationIcon from '../../page-component/app-navigation-icon/app-navigation-icon.vue';
    import appAnnouncement from '../../page-component/app-announcement/app-announcement.vue';
    import appVideo from '../../page-component/app-video/app-video.vue';
    import appTopic from '../../page-component/app-special-topic/app-special-topic-normal.vue';
    import appExclusiveCoupon from '../../page-component/app-exclusive-coupon/app-exclusive-coupon.vue';
    import appImageAd from '../../page-component/app-image-ad/app-image-ad.vue';
    import appReservation from '../../page-component/app-reservation/app-reservation.vue';
    import appJumpButton from "../../basic-component/app-jump-button/app-jump-button.vue";
    import appGoodShopRecommendation
        from "../../page-component/app-good-shop-recommendation/app-good-shop-recommendation.vue";
    import appTimer from "../../basic-component/app-timer/app-timer.vue";
    import appQuickNavigation from "../../page-component/app-quick-navigation/app-quick-navigation.vue";
    import appPopupAd from "../../page-component/app-popup-ad/app-popup-ad.vue";
    import appIndexMiaosha from "../../page-component/app-index-miaosha/app-index-miaosha.vue";
    import appIndexPintuan from "../../page-component/app-index-pintuan/app-index-pintuan.vue";
    import appIndexBooking from "../../page-component/app-index-booking/app-index-booking.vue";
    import appIndexCat from "../../page-component/app-index-cat/app-index-cat.vue";
    import appIndexAdvance from '../../page-component/app-index-advance/app-index-advance.vue';
    import appIndexPick from '../../page-component/app-index-pick/app-index-pick.vue';

    export default {
        name: 'app-index',
	    
	    data() {
            return {
                newPage: [],
                time: -1,
            }
	    },
	    
        props: {
            homePages: {
                type: Array,
                default() {
                    return [];
                }
            },
            is_storage: Boolean,
            pageHide: Boolean,
        },
	    
        computed: {
            ...mapState('mallConfig', {
                mall: state => state.mall,
                theme: state => state.theme
            }),
            newData() {
                uni.setNavigationBarTitle({
                    title: this.mall.name
                });
                
            },
        },
	    
	    watch: {
            homePages: {
                handler: function(data) {
                    this.newPage = [];
                    let start = -1;
                    let num = 0;
                    clearInterval(this.time);
                    if (data.length> 0) {
                        this.time = setInterval(() => {
                            start++;
                            num++;
                            this.newPage.push(...data.slice(start, num));
                            if (num === data.length) {
                                clearInterval(this.time);
                            }
                        }, 100);
                    }
                },
	            immediate: true,
            }
	    },
	    
	    methods: {
            changeCoupon(data, index) {
                this.newPage[index].coupons[data].is_receive = '1';
            }
	    },
	    
        components: {
            'app-search-for': appSearchFor,
            'app-swiper': appSwiper,
            'app-navigation-icon': appNavigationIcon,
            'app-announcement': appAnnouncement,
            'app-video': appVideo,
            'app-topic': appTopic,
            'app-exclusive-coupon': appExclusiveCoupon,
            'app-image-ad': appImageAd,
            'app-reservation': appReservation,
            'app-good-shop-recommendation': appGoodShopRecommendation,
            'app-jump-button': appJumpButton,
            'app-timer': appTimer,
            'app-quick-navigation': appQuickNavigation,
            'app-popup-ad': appPopupAd,
            'app-index-miaosha': appIndexMiaosha,
            'app-index-pintuan': appIndexPintuan,
            'app-index-booking': appIndexBooking,
            'app-index-cat': appIndexCat,
	        'app-index-advance': appIndexAdvance,
            appIndexPick,
        },
    }
</script>

<style scoped lang="scss">
    .mch {
        background-color: #ffffff;
    }

    .mt-20 {
        margin-top: #{20rpx};
    }
</style>
