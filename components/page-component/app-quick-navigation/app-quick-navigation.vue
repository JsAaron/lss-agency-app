<template>
    <view class="app-quick" v-if="newData.navSwitch == 1" :style="{bottom: getBoolEmpty.XBoolean ? '260rpx' : '210rpx'}">
        <view class="app-content" :class="[`${(collapse === false && newData.navStyle == 1) ? 'app-height' : ''}`]">
            <view class="app-view-navigation" v-if="newData.home.opened">
                <app-jump-button form :open_type="newData.home.open_type" :url="newData.home.link_url">
                    <icon class="app-icon" :style="{backgroundImage: `url(${newData.home.picUrl})`}"></icon>
                </app-jump-button>
            </view>
            <!-- #ifndef MP-TOUTIAO -->
            <view class="app-view-navigation" v-if="newData.customerService.opened">
                <app-jump-button form :open_type="newData.customerService.open_type">
                    <icon class="app-icon" :style="{backgroundImage: `url(${newData.customerService.picUrl})`}"></icon>
                </app-jump-button>
            </view>
            <!-- #endif -->
            <view class="app-view-navigation" v-if="newData.tel.opened">
                <app-jump-button form :open_type="newData.tel.open_type" :number="newData.tel.number">
                    <icon class="app-icon" :style="{backgroundImage: `url(${newData.tel.picUrl})`}"></icon>
                </app-jump-button>
            </view>
            <view class="app-view-navigation" v-if="newData.web.opened">
                <app-jump-button form :open_type="newData.web.open_type" :url="newData.web.url">
                    <icon class="app-icon" :style="{backgroundImage: `url(${newData.web.picUrl})`}"></icon>
                </app-jump-button>
            </view>
            <!-- #ifndef MP-TOUTIAO -->
            <view class="app-view-navigation" v-if="newData.mApp.opened">
                <app-jump-button form :open_type="newData.mApp.open_type" :app-id="newData.mApp.appId" :path="newData.mApp.page">
                    <icon class="app-icon" :style="{backgroundImage: `url(${newData.mApp.picUrl})`}"></icon>
                </app-jump-button>
            </view>
            <!-- #endif -->
            <view class="app-view-navigation" v-if="newData.mapNav.opened">
                <app-jump-button
                        form
                        :open_type="newData.mapNav.open_type"
                        :latitude="newData.mapNav.latitude"
                        :longitude="newData.mapNav.longitude"
                        :address="newData.mapNav.address"
                >
                    <icon class="app-icon" :style="{backgroundImage: `url(${newData.mapNav.picUrl})`}"></icon>
                </app-jump-button>
            </view>

            <view class="app-view-navigation" v-if="newData.customize.opened">
                <app-jump-button form :open_type="newData.customize.open_type" :url="newData.customize.link_url"
                                 :params="newData.customize.params">
                    <icon class="app-icon" :style="{backgroundImage: `url(${newData.customize.picUrl})`}"></icon>
                </app-jump-button>
            </view>
        </view>
        <view class="app-navigation" v-if="newData.navStyle == 1"
              :style="{backgroundImage: `url(${!collapse ? newData.openedPicUrl : newData.closedPicUrl})`}"
              :class="{'app-quick-navigation': !collapse, 'app-collapse': collapse}"
              @click="collapse = !collapse"></view>
    </view>
</template>

<script>
    import {mapGetters, mapState} from "vuex";

    export default {
        name: `app-quick-navigation`,
        props: {
            value: {
                type: Object,
                default: function () {
                    return {
                        closedPicUrl: 'http://www.bangdian.net/web/uploads/mall51/20190724/3d3abd2944d5d32b9a9780fd3525bb50.jpg',
                        customerService: {
                            opened: false,
                            picUrl: 'http://www.bangdian.net/web/uploads/mall51/20190724/3d3abd2944d5d32b9a9780fd3525bb50.jpg',
                        },
                        home: {
                            opened: false,
                            picUrl: 'http://www.bangdian.net/web/uploads/mall51/20190724/3d3abd2944d5d32b9a9780fd3525bb50.jpg',
                        },
                        mApp: {
                            appId: '',
                            opened: false,
                            page: '',
                            picUrl: '',
                        },
                        mapNav: {
                            address: '南湖',
                            latitude: '30.762457',
                            location: '',
                            longitude: '120.763779',
                            opened: false,
                            picUrl: 'http://www.bangdian.net/web/uploads/mall51/20190724/3d3abd2944d5d32b9a9780fd3525bb50.jpg'
                        },
                        navStyle: 1,
                        navSwitch: 1,
                        openedPicUrl: 'http://www.bangdian.net/web/uploads/mall51/20190724/3d3abd2944d5d32b9a9780fd3525bb50.jpg',
                        tel: {
                            number: '1885813481',
                            opened: false,
                            picUrl: 'http://www.bangdian.net/web/uploads/mall51/20190724/3d3abd2944d5d32b9a9780fd3525bb50.jpg',
                        },
                        useMallConfig: false,
                        web: {
                            opened: true,
                            picUrl: 'http://www.bangdian.net/web/uploads/mall51/20190724/3d3abd2944d5d32b9a9780fd3525bb50.jpg',
                            url: 'www.baidu.com',
                        },
                        customize: {},
                    }
                }
            },
            useMallConfig: {
                type: Boolean,
                default() {
                    return true;
                }
            }
        },
        data() {
            return {
                collapse: false,
                oldData: this.value,
            }
        },
	    
        computed: {
            newData: function () {
                let item = {};
                if (!this.useMallConfig) {
                    item = {
                        customerService: {
                            open_type: 'contact'
                        },
                        home: {
                            open_type: 'redirect',
                            link_url: '/pages/index/index'
                        },
                        mApp: {
                            open_type: 'app'
                        },
                        mapNav: {
                            open_type: 'map'
                        },
                        tel: {
                            open_type: 'tel'
                        },
                        web: {
                            open_type: 'web'
                        },
                        customize: {
                            open_type: '',
                        },
                    };
                    for (let key in this.oldData) {
                        if (key === 'customerService' || key === 'home' || key === 'mApp' || key === 'mapNav' || key === 'tel') {
                            item[key] = {...item[key], ...this.oldData[key]}
                        } else if (key === 'web') {
                            let url = `../web/web?url=${this.oldData[key].url}`;
                            item.web = {...item.web, ...this.oldData[key], url}
                        } else {
                            item[key] = this.oldData[key];
                        }
                    }
                } else {
                    let setting = this.mall.setting;
                    item = {
                        closedPicUrl: setting.quick_navigation_closed_pic,
                        openedPicUrl: setting.quick_navigation_opened_pic,
                        customerService: {
                            opened: setting.is_customer_services == 1,
                            picUrl: setting.customer_services_pic,
                            open_type: 'contact',
                        },
                        home: {
                            opened: setting.is_quick_home == 1 ? this.oldData.home.opened : false,
                            picUrl: setting.quick_home_pic,
                            open_type: 'redirect',
                            link_url: '/pages/index/index',
                        },
                        mApp: {
                            appId: setting.small_app_id,
                            opened: setting.is_small_app == 1,
                            page: setting.small_app_url,
                            picUrl: setting.small_app_pic,
                            open_type: 'app',
                        },
                        mapNav: {
                            opened: setting.is_quick_map == 1,
                            address: setting.quick_map_address,
                            latitude: setting.latitude,
                            longitude: setting.longitude,
                            picUrl: setting.quick_map_pic,
                            open_type: 'map',
                        },
                        tel: {
                            opened: setting.is_dial == 1,
                            number: setting.contact_tel,
                            picUrl: setting.dial_pic,
                            open_type: 'tel',
                        },
                        web: {
                            opened: setting.is_web_service == 1,
                            url: '/pages/web/web?url=' + setting.web_service_url,
                            picUrl: setting.web_service_pic,
                            open_type: 'web',
                        },
                        customize: {
                            opened: setting.is_quick_customize == 1,
                            picUrl: setting.quick_customize_pic,
                            link_url: setting.quick_customize_link_url,
                            params: setting.quick_customize_new_params,
                            open_type: setting.quick_customize_open_type,
                        },
                        navStyle: setting.quick_navigation_style,
                        navSwitch: setting.is_quick_navigation,
                    }
                }
                return item;
            },
            ...mapState({
                mall: state => state.mallConfig.mall,
            }),
            ...mapGetters('iPhoneX', {
                getBoolEmpty: 'getBoolEmpty'
            }),
        },
        watch: {
            oldData: {
                handler: function () {
                    let pages = getCurrentPages();
                    let currPage = null;
                    if (pages.length) {
                        currPage = pages[pages.length - 1];
                    }
                    // #ifndef MP-TOUTIAO
                    this.currentRoute = `/${currPage.route.split('?')[0]}`;
                    // #endif

                    // #ifdef MP-TOUTIAO
                    this.currentRoute = `/${currPage.__route__.split('?')[0]}`;
                    // #endif
                    if (this.currentRoute === '/pages/index/index') {
                        this.oldData.home.opened = false;
                        // this.$emit('input', this.oldData);
                    } else {
                        this.oldData.home.opened = true;
                    }
                },
                immediate: true,
            }
        }
    }
</script>

<style scoped lang="scss">
    .app-quick {
        width: #{80rpx};
        min-height: #{80rpx};
        position: fixed;
        bottom: #{210rpx};
        right: #{50rpx};
        z-index: 1600;
    }

    .app-content {
        transition: height 2s;
        overflow: hidden;
        /*position: absolute;*/
        /*top: 0;*/
        width: #{80rpx};
    }

    .app-height {
        height: 0;
    }

    .app-view-navigation {
        width: #{80rpx};
        height: #{80rpx};
        margin-bottom: #{24rpx};
    }

    .app-navigation {
        width: #{80rpx};
        height: #{80rpx};
        background-size: 99% 99%;
        background-repeat: no-repeat;
        border-radius: 50%;
    }

    .app-quick-navigation {
        background-image: url("../../../static/image/icon/quick-navigation.png");
    }

    .app-collapse {
        background-image: url("../../../static/image/icon/collapse.png");
    }

    .app-icon {
        width: #{80rpx};
        height: #{80rpx};
        border-radius: 50%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>