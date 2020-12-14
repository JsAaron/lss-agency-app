<template>
	<form v-if="form" report-submit @submit="jumpLogic">
		<!-- #ifndef MP-ALIPAY -->
		<button
			:open-type="open_type === 'contact' ? 'contact' : open_type === 'share' ? 'share' : ''"
			hover-class="none"
			:style="{
				'background-color': `${backgroundColor ? backgroundColor : ''}`,
				height: `${height}%`,
				width: `${width}%`
			}"
			:class="[
				`${
					arrangement === 'column'
						? 'app-button-column'
						: arrangement === 'row'
						? 'app-button-row'
						: arrangement === 'left'
						? 'app-button-left'
						: arrangement === 'topCenter'
						? 'app-button-top-cross-center'
						: arrangement === 'a'
						? 'app-left'
						: arrangement === 'b'
						? 'app-left-between'
						: ''
				}`
			]"
			formType="submit"
		>
			<slot></slot>
		</button>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<template v-if="open_type === 'contact'">
			<view style="width: 100%;height: 100%;padding: 24rpx 0;" class="dir-top-nowrap cross-center main-between">
				<contact-button tnt-inst-id="" scene="" />
				<view style="font-size: 24rpx; color: #666666;">客服</view>
			</view>
		</template>
		<template v-if="open_type !== 'contact'">
			<button
				:open-type="open_type === 'share' ? 'share' : ''"
				hover-class="none"
				:style="{
					'background-color': `${backgroundColor ? backgroundColor : ''}`,
					height: `${height}%`,
					width: `${width}%`
				}"
				:class="[
					`${
						arrangement === 'column'
							? 'app-button-column'
							: arrangement === 'row'
							? 'app-button-row'
							: arrangement === 'left'
							? 'app-button-left'
							: arrangement === 'topCenter'
							? 'app-button-top-cross-center'
							: arrangement === 'a'
							? 'app-left'
							: arrangement === 'b'
							? 'app-left-between'
							: ''
					}`
				]"
				formType="submit"
			>
				<slot></slot>
			</button>
		</template>
		<!-- #endif -->
	</form>
	<button
		v-else
		:open-type="open_type === 'contact' ? 'contact' : ''"
		hover-class="none"
		:style="{
			'background-color': `${backgroundColor ? backgroundColor : ''}`,
			height: `${height}%`,
			width: `${width}%`
		}"
		:class="[
			`${
				arrangement === 'column'
					? 'app-button-column'
					: arrangement === 'row'
					? 'app-button-row'
					: arrangement === 'left'
					? 'app-button-left'
					: arrangement === 'topCenter'
					? 'app-button-top-cross-center'
					: arrangement === 'a'
					? 'app-left'
					: arrangement === 'b'
					? 'app-left-between'
					: ''
			}`
		]"
		@click="jumpLogic"
	>
		<slot></slot>
	</button>
</template>

<script>
import { push } from '../../../core/formId.js';
import { clearStorage } from '../../../core/cache.js';

export default {
	name: 'app-jump-button',
	props: {
		item: Object,
		arrangement: {
			type: String,
			default: function() {
				return 'row';
			}
		},
		backgroundColor: String,
		form: {
			type: Boolean,
			default: function() {
				return true;
			}
		},
		height: {
			type: String,
			default: function() {
				return '100';
			}
		},
		width: {
			type: String,
			default: function() {
				return '100';
			}
		},
		open_type: {
			type: String,
			default: function() {
				return 'navigate';
			}
		},
		url: {
			type: String,
			default: function() {
				return '';
			}
		},
		params: {
			type: Array,
			default: function() {
				return [];
			}
		},
		number: {
			type: String,
			default: function() {
				return '';
			}
		},
		appId: {
			type: String,
			default: function() {
				return '';
			}
		},
		path: {
			type: String,
			default: function() {
				return '';
			}
		},
		latitude: {
			type: String,
			default: function() {
				return '0';
			}
		},
		longitude: {
			type: String,
			default: function() {
				return '0';
			}
		},
		address: {
			type: String,
			default: function() {
				return '';
			}
		}
	},
	methods: {
		jumpLogic(e) {
			if (this.form) push(e.detail.formId);
			switch (this.open_type) {
				case 'reLaunch':
					uni.reLaunch({
						url: this.url
					});
					break;
				case 'redirect':
					uni.redirectTo({
						url: this.url
					});
					break;
				case 'navigate':
					if (this.url) {
						let url = this.url;
						if (this.params.length > 0) {
							let p = `?`;
							for (let i = 0; i < this.params.length; i++) {
								p += `${this.params[i].key}=${this.params[i].value}&`;
							}
							url += p.slice(0, p.length - 1);
						}
						/* #ifdef MP-BAIDU || MP-TOUTIAO */
						if (this.url !== '/plugins/step/index/index') {
							uni.navigateTo({
								url: url
							});
						}
						/* #endif */

						/* #ifdef MP-WEIXIN || MP-ALIPAY || APP-PLUS */
						uni.navigateTo({
							url: url
						});
						/* #endif */
					}

					break;
				case 'app_admin':
					if (this.$store.state.user.info.identity.is_admin == 1) {
						uni.navigateTo({
							url: this.url
						});
					}
					break;
				case 'back':
					uni.navigateBack({});
					break;
				case 'tel':
					if (this.params.length === 1) {
						uni.makePhoneCall({
							phoneNumber: this.params[0].value
						});
					} else if (this.number) {
						uni.makePhoneCall({
							phoneNumber: this.number
						});
					} else {
						uni.makePhoneCall({
							phoneNumber: this.url.split('?')[1].split('=')[1]
						});
					}
					break;
				case 'web':
					if (this.params.length > 0) {
						uni.navigateTo({
							url: `${this.url}?url=${encodeURIComponent(this.params[0].value)}`
						});
					} else {
						uni.navigateTo({
							url: this.url
						});
					}
					break;
				case 'app':
					if (this.url) {
						let originalPath = '';
						if (this.url !== 'app') {
							originalPath = this.url.split('app?')[1];
						} else {
							for (let i = 0; i < this.params.length; i++) {
								originalPath += `${this.params[i].key}=${this.params[i].value}&`;
							}
						}
						if (typeof originalPath !== 'string') return;
						let groups = originalPath.split('&');
						let obj = {};
						for (let i in groups) {
							if (typeof groups[i] !== 'string') continue;
							if (!groups[i].length) continue;
							let kvs = groups[i].split('=');
							if (kvs.length !== 2) {
								let s = '';
								for (let i = 1; i < kvs.length; i++) {
									if (i + 1 === kvs.length) {
										continue;
									} else {
										s += `${kvs[i]}=${kvs[i + 1]}`;
									}
								}
								obj[kvs[0]] = s;
							} else {
								obj[kvs[0]] = kvs[1];
							}
						}
						let params = obj;
						console.log(params);
						let appId = '';
						let path = '';
						// #ifdef MP-WEIXIN
						appId = params.app_id || '';
						path = params.path || '';
						// #endif
						// #ifdef MP-ALIPAY
						appId = params.ali_app_id || '';
						path = params.ali_path || '';
						// #endif
						// #ifdef MP-TOUTIAO
						appId = params.tt_app_id || '';
						path = params.tt_path || '';
						// #endif
						// #ifdef MP-BAIDU
						appId = params.bd_app_key || '';
						path = params.bd_path || '';
						// #endif
						console.log(path);
						uni.navigateToMiniProgram({
							appId: appId,
							path: path,
							success(e) {
								console.log('打开小程序成功', e);
							},
							fail(e) {
								console.log('打开小程序失败', e);
							}
						});
					} else if (this.appId) {
						uni.navigateToMiniProgram({
							appId: this.appId,
							path: this.path ? this.path : '',
							success(res) {},
							fail(res) {}
						});
					}
					break;
				case 'clear_cache':
					uni.showModal({
						title: '清理缓存',
						content: '确定要清理缓存？',
						cancelText: '取消',
						confirmText: '确认',
						success: e => {
							if (e.confirm) {
								// uni.showLoading({
								//     title: '清理缓存...',
								// });
								clearStorage();
								if (this.$user && this.$store && this.$store.state.user.accessToken) {
									this.$user.loginByToken(this.$store.state.user.accessToken);
								}
								this.$store.dispatch('mallConfig/actionResetConfig');
								// uni.hideLoading();
								uni.showToast({
									title: '清理完成',
									duration: 1000,
									icon: 'none'
								});
							}
						}
					});
					break;
				case 'map':
					uni.openLocation({
						latitude: Number(this.latitude),
						longitude: Number(this.longitude),
						name: this.address,
						address: this.address,
						success: function() {},
						fail: function(res) {}
					});
					break;
				case 'share':
				// uni.share({
				//     provider: 'weixin',
				//     type: 5,
				//     imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png',
				//     title: '欢迎体验uniapp',
				//     miniProgram: {
				//         id: 'gh_abcdefg',
				//         path: 'pages/index/index',
				//         type: 0,
				//         webUrl: 'http://uniapp.dcloud.io'
				//     },
				//     success: ret => {
				//     }
				// });
			}
		}
	}
};
</script>

<style scoped lang="scss">
button {
	display: block;
	line-height: inherit;
	text-align: inherit;
	padding: 0 0;
	background: transparent;
	border: none;
	border-radius: 0;
	overflow: inherit;
	font-size: inherit;
	color: inherit;
}

button:after {
	display: none;
}

button.button-hover {
	color: inherit;
	background-color: transparent;
}

form {
	display: block;
	height: 100%;
	width: 100%;
}

.app-button-column {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.app-button-row {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.app-button-left {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
}

.app-button-top-cross-center {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-flex-direction: column;
	flex-direction: column;
	flex-wrap: nowrap;
	-webkit-align-items: center;
	align-items: center;
}

.app-left {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}

.app-left-between {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: row;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
}
</style>
