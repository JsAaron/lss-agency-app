import request from './request.js';
import api from './appOnLaunch.js';
import {
	getStorageSync,
	setStorageSync
} from './cache.js';
import event from './event.js';
import $const from './const.js';
import $store from '../store/index.js';

const storageKey = '_USER_ACCESS_TOKEN';

let userInfo = null;

export default {
	getUserInfoResolve: null,
	getUserInfoReject: null,
	getAccessToken(options) {
		options = options || {};
		if (typeof options.cacheOnly === 'undefined') {
			options.cacheOnly = false;
		}
		return new Promise((resolve, reject) => {
			let accessToken = getStorageSync(storageKey);
			if (accessToken) {
				return resolve(accessToken);
			}
			if (options.cacheOnly) {
				return resolve(accessToken);
			}
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			currentPage.$vm.$store.commit('user/showLoginModal', true);
			this.getUserInfoResolve = (userInfoResult) => {
				console.log('getUserInfoResolve->', userInfoResult);
				uni.showLoading({
					mask: true,
					title: '正在登录',
				});
				uni.login({
					scopes: 'auth_base',
					success(loginResult) {
						const data = {
							encryptedData: userInfoResult.detail.encryptedData,
							iv: userInfoResult.detail.iv,
							rawData: userInfoResult.detail.rawData,
							signature: userInfoResult.detail.signature,
							code: loginResult.code,
						};
						console.log('请求',data,api.passport.login)
						request({
							url: api.passport.login,
							method: 'post',
							data: data,
						}).then(response => {
							console.log('登录成功', response)
							uni.hideLoading();
							if (response.code === 0) {
								event.trigger($const.EVENT_USER_LOGIN);
								setStorageSync(storageKey, response.data.access_token);
								return resolve(response.data.access_token);
							} else {
								return reject(response.msg);
							}
						}).catch(e => {
							console.log('登录失败', e)
							uni.hideLoading();
							reject(e);
						});
					},
				});
			};
			this.getUserInfoReject = (e) => {
				reject(e);
			};
		});
	},
	getInfo(options) {
		options = options || {};
		if (typeof options.refresh === 'undefined') {
			options.refresh = false;
		}
		return new Promise((resolve, reject) => {
			if (options.refresh) {
				userInfo = null;
			}
			if (userInfo) {
				return resolve(userInfo);
			}
			this.getAccessToken().then(accessToken => {
				uni.showNavigationBarLoading();
				request({
					url: api.user.user_info,
				}).then(response => {
					uni.hideNavigationBarLoading();
					if (response.code === 0) {
						userInfo = response.data;
						event.trigger($const.EVENT_USER_REGISTER, userInfo);
						if (typeof userInfo.register !== 'undefined') {
							let register = userInfo.register;
							if (register.coupon_list) {
								let coupon = {
									list: register.coupon_list,
									type: 'register'
								};
								$store.dispatch('page/actionSetCoupon', coupon);
							}
						}
						return resolve(userInfo);
					} else {
						return reject(response.msg);
					}
				}).catch(e => {
					uni.hideNavigationBarLoading();
					return reject(e);
				});
			}).catch(e => {
				return reject(e);
			});
		});
	},
	isLogin() {
		if ($store && $store.state.user && $store.state.user.accessToken) return true;
		return !!getStorageSync(storageKey);
	},
	loginByToken(token) {
		setStorageSync(storageKey, token);
	},
}
