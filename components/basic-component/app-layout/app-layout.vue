<template>
	<view class="app-layout" :class="haveBackground ? 'app-layout-background' : ''">
		<app-prompt-box v-if="promptBox.show" :text="promptBox.text" @click="confirmNegative"></app-prompt-box>
		<app-user-login v-if="isGuest"></app-user-login>
		<app-user-phone v-else></app-user-phone>
		<app-payment></app-payment>
		<app-report-error :content="reportAndError.content" v-if="reportAndError.boolean"></app-report-error>
		<app-coupon-modal></app-coupon-modal>
		<view><slot></slot></view>
		<app-loading
			:type="loadingType"
			:text="loadingText" 
			:color="loadingColor"
			v-if="loadingIsShow"
			:backgroundImage="loadingBackgroundImage"
		></app-loading>
		<template v-if="tabbarbool">
			<view
				:style="{ height: BotHeight + 'rpx' }"
				class="nav-margin"
				:class="haveBackground ? 'app-layout-background' : ''"
			></view>
			<app-iphone-x :backgroundColor="bottom_background_color">
				<view slot="empty-area"><app-tab-bar :page-count="page_count"></app-tab-bar></view>
			</app-iphone-x>
		</template>
	</view>   
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import appTabBar from '../../../components/basic-component/app-tab-bar/app-tab-bar.vue';
import AppPayment from './app-payment/app-payment';
import tabBar from '../../../core/tabbar.js';
import AppUserLogin from './app-user-login/app-user-login';
import appLoading from '../app-loading/app-loading.vue';
import appRepeatError from '../app-report-error/app-report-error.vue';
import appPromptBox from '../app-prompt-box/app-prompt-box.vue';
import appCouponModal from './app-coupon-modal/app-coupon-modal.vue';
import appIphoneX from '../../../components/basic-component/app-iphone-x/app-iphone-x.vue';
import appUserPhone from './app-user-phone/app-user-phone';

export default {
	name: 'app-layout',
	data() {
		return {
			currentRoute: '',
			tabbarbool: true,
			navigationBarTitle: '',
			page_count: getCurrentPages().length
		};
	},
	components: {
		'app-tab-bar': appTabBar,
		'app-payment': AppPayment,
		'app-user-login': AppUserLogin,
		'app-loading': appLoading,
		'app-report-error': appRepeatError,
		'app-prompt-box': appPromptBox,
		'app-coupon-modal': appCouponModal,
		'app-iphone-x': appIphoneX,
		'app-user-phone': appUserPhone
	},

	props: {
		haveBackground: {
			type: Boolean,
			default() {
				return true;
			}
		},
		//外部修改支持
		support: {
			type: Object,
			default() {
				return {
					top_background_color: ''
				};
			}
		}
	},
	computed: {
		...mapState('mallConfig', {
			tabBarNavs: state => state.navbar.navs,
			bar_title: state => state.bar_title,
			top_background_color: state => state.navbar.top_background_color,
			top_text_color: state => state.navbar.top_text_color,
			bottom_background_color: state => {
				return state.navbar.bottom_background_color;
			}
		}),
		...mapState('user', {
			accessToken: state => state.accessToken
		}),
		...mapState('gConfig', {
			reportAndError: state => state.reportAndError,
			promptBox: state => state.promptBox,
			iphone: data => {
				return data.iphone;
			}
		}),
		isGuest() {
			return this.$store.state.user.accessToken === '' || this.$store.state.user.accessToken === null;
		},
		...mapState('loading', {
			loadingType: state => state.type,
			loadingText: state => state.text,
			loadingColor: state => state.color,
			loadingBackgroundImage: state => state.backgroundImage,
			loadingIsShow: state => state.isShow
		}),
		...mapGetters('iPhoneX', {
			BotHeight: 'getBotHeight'
		})
	},
	watch: {
		tabBarNavs: {
			handler: function() {
				this.setTabbar();
				// #ifndef MP-TOUTIAO
				if (this.support.top_background_color) {
					uni.setNavigationBarColor({
						backgroundColor: this.support.top_background_color
					});
				} else {
					if (this.top_background_color !== undefined) {
						uni.setNavigationBarColor({
							backgroundColor: this.top_background_color,
							// #ifndef MP-ALIPAY
							frontColor: this.top_text_color
							// #endif
						});
					}
				}
				// #endif
			},
			immediate: true
		}
	},
	created() {
		this.$store.dispatch('mallConfig/actionGetConfig');
		this.$nextTick(() => {
			let currentRoute = this.$platDiff.route();
			tabBar.setNavigationBarTitle(this.bar_title, currentRoute).then(res => {
				this.navigationBarTitle = res;
			});
		});
		if (this.$user.isLogin() && this.$platDiff.route() != '/pages/disabled/disabled') {
			this.$store.dispatch('user/info');
		}
		this.$hideLoading();
	},
	mounted() {
		// #ifdef MP-WEIXIN
		// 直播转发绑定分销关系
		try {
			let pages = getCurrentPages();
			if (pages.length) {
				let page = pages[pages.length - 1];
				let options = page.options;
				let customParams = {};
				if (typeof options.custom_params !== 'undefined') {
					customParams = JSON.parse(decodeURIComponent(options.custom_params));
				}
				if (typeof options.user_id !== 'undefined') {
					this.$store.dispatch('user/setTempParentId', options.user_id);
				} else if (typeof customParams.user_id !== 'undefined') {
					this.$store.dispatch('user/setTempParentId', customParams.user_id);
				}
			}
		} catch (e) {
			console.log(e);
		}
		// #endif
		this.currentRoute = this.$platDiff.tabBarUrl(null, this.page_count);
		this.setTabbar();
		// #ifndef MP-TOUTIAO
		if (this.support.top_background_color) {
			uni.setNavigationBarColor({
				backgroundColor: this.support.top_background_color
			});
		} else {
			if (this.top_background_color !== undefined) {
				uni.setNavigationBarColor({
					backgroundColor: this.top_background_color,
					// #ifndef MP-ALIPAY
					frontColor: this.top_text_color
					// #endif
				});
			}
		}

		// #endif
	},
	beforeDestroy() {
		this.$hideLoading();
	},
	methods: {
		setTabbar() {
			let currentRoute = this.currentRoute;
			const specialScene = [1001, 1045, 1046, 1058, 1067, 1084, 1091]; // 小程序特殊场景列表
			if (
				this.$appScene &&
				specialScene.indexOf(this.$appScene) > -1 &&
				(currentRoute.indexOf('appid') > -1 || currentRoute.indexOf('appmsg_compact_url') > -1)
			) {
				// console.log('deleteUrlParam-->', currentRoute);
				currentRoute = this.$utils.deleteUrlParam(currentRoute, ['appid', 'appmsg_compact_url'], true);
			}
			// console.log('setTabbar $appScene-->', this.$appScene);
			// console.log('setTabbar currentRoute-->', currentRoute);

			// console.log('this.tabBarNavs', this.tabBarNavs);
			for (let i = 0; i < this.tabBarNavs.length; i++) {
				if (currentRoute == this.tabBarNavs[i].url) {
					return (this.tabbarbool = true);
				}
			}
			return (this.tabbarbool = false);
		}
	}
};
</script>
<style scoped lang="scss">
.app-layout {
	max-width: 100%;
	overflow: hidden;
}

.app-layout-background {
	background-color: #f7f7f7;
}

.app-scroll-y {
	width: 100%;
	height: 100%;
}

.app-bottom {
	height: #{160rpx};
}

.nav-margin {
	width: #{750rpx};
}

.app-tabbar {
	height: #{110rpx};
}

.model {
	position: fixed;
	bottom: 0;
	left: 0;
	width: #{750rpx};
	height: #{50rpx};
	z-index: 1600;
}
</style>
