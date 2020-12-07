<template>
	<view class="login dir-left-nowrap main-center cross-center" :class="showLoginModal ? 'show' : ''">
		<view class="login-content">
			<image :src="auth_page.pic_url" class="login-img"></image>
			<view>
				<app-hotspot :hotspot="auth_page.hotspot_cancel">
					<button class="login-btn" @click="cancel"></button>
				</app-hotspot>
			</view>
			<view>
				<app-hotspot :hotspot="auth_page.hotspot">
					<button
						class="login-btn"
						:open-type="openType"
						scope="userInfo"
						@getAuthorize="getUserInfo"
						@getuserinfo="getUserInfo"
						@click="getUserInfoClick"
					></button>
				</app-hotspot>
			</view>
		</view>
	</view>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import appHotspot from '../../../basic-component/app-hotspot/app-hotspot.vue';

export default {
	name: 'app-user-login',
	components: {
		appHotspot
	},
	data() {
		return {};
	},
	computed: {
		openType() {
			// #ifdef MP-ALIPAY
			return 'getAuthorize';
			// #endif
			return 'getUserInfo';
		},
		...mapState('mallConfig', {
			auth_page: state => state.auth_page
		}),
		...mapState({
			showLoginModal: state => state.user.showLoginModal
		})
	},
	created() {
		const vm = this;
		Vue.use({
			install(Vue, options) {
				Vue.prototype.$layout = {
					getUserInfo() {
						vm.showLoginModal = true;
						return new Promise((resolve, reject) => {
							vm.getUserInfo = e => {};
						});
					}
				};
			}
		});
	},
	methods: {
		cancel() {
			this.$store.commit('user/showLoginModal', false);
			this.$user.getUserInfoReject('getUserInfo fail: cancel.');
			let pages = getCurrentPages();
			let list = ['/pages/index/index', '/pages/user-center/user-center'];
			let url = this.$platDiff.route();
			if (list.includes(url)) {
				url = this.$platDiff.routeWithOption();
				uni.redirectTo({
					url: url
				});
			} else if (pages.length >= 2) {
				uni.navigateBack({
					delta: 1
				});
			} else {
				uni.redirectTo({
					url: '/pages/index/index'
				});
			}
		},
		getUserInfoClick(e) {
			// #ifdef MP-TOUTIAO
			this.getUserInfo(e);
			// #endif
		},
		getUserInfo(e) {
			this.$store.commit('user/showLoginModal', false);
			const resolve = this.$user.getUserInfoResolve;
			const reject = this.$user.getUserInfoReject;
			this.$event.on(this.$const.EVENT_USER_LOGIN, true).then(() => {
				this.$jump({
					open_type: 'reload'
				});
			});

			// #ifdef MP-WEIXIN
			if (e.detail.errMsg !== 'getUserInfo:ok') {
				return reject(e.detail.errMsg);
			} else {
				return resolve(e);
			}
			// #endif
			// #ifdef MP-ALIPAY
			my.getOpenUserInfo({
				success(openUserInfo) {
					const response = JSON.parse(openUserInfo.response);
					e.detail = {
						rawData: JSON.stringify(response.response),
						encryptedData: '',
						iv: '',
						signature: ''
					};
					return resolve(e);
				},
				fail(failE) {
					console.log('getOpenUserInfo:', failE);
				}
			});
			// #endif
			// #ifdef MP-BAIDU
			e.detail.rawData = JSON.stringify(e.detail.userInfo);
			e.detail.encryptedData = '';
			e.detail.iv = '';
			e.detail.signature = '';
			return resolve(e);
			// #endif
			// #ifdef MP-TOUTIAO
			uni.login({
				success() {
					uni.getUserInfo({
						success(result) {
							e.detail = {
								rawData: result.rawData,
								encryptedData: '',
								iv: '',
								signature: ''
							};
							return resolve(e);
						},
						fail(e) {
							console.log('getUserInfo fail:', e);
						}
					});
				},
				fail(e) {
					console.log('login fail:', e);
				}
			});
			// #endif
		}
	}
};
</script>

<style scoped lang="scss">
$login-padding: #{200rpx} #{50rpx};

.login {
	box-sizing: border-box;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1502;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	padding: $login-padding;
	visibility: hidden;
	opacity: 0;
	transition: opacity 200ms;

	.login-btn {
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0;
		padding: 0;
	}

	.login-content {
		position: relative;
		width: #{650rpx};
		height: #{700rpx};
	}

	.login-img {
		width: #{650rpx};
		height: #{700rpx};
	}
}

.login.show {
	visibility: visible;
	opacity: 1;
}
</style>
