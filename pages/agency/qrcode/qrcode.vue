<template>
	<app-layout>
		<view class="bg">
			<view class="dir-top-wrap cross-center">
				<image mode="aspectFill" class="qrcode" @click="look" :src="img"></image>
				<view @click="saveImg" :class="[`share-btn main-center cross-center`, `${theme}-background`]">
					保存图片分享赚钱
				</view>
			</view>
		</view>
	</app-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			img: '',
			type: 1
		};
	},
	computed: {
		...mapState({
			theme: state => state.mallConfig.theme,
			mall: state => state.mallConfig.mall,
			custom_setting: state => state.mallConfig.share_setting_custom,
			share_img: state => state.mallConfig.__wxapp_img.share
		})
	},
	methods: {
		look() {
			let that = this;
			uni.previewImage({
				current: that.img,
				urls: [that.img]
			});
		},

		saveImg() {
			let that = this;
			// #ifndef MP-ALIPAY
			uni.authorize({
				scope: 'scope.writePhotosAlbum',
				success(res) {
					if (res.errMsg == 'authorize:ok') {
						uni.downloadFile({
							url: that.img,
							success(res) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success(res) {
										uni.showToast({
											title: '保存成功',
											icon: 'success',
											duration: 1000
										});
									},
									fail(res) {
										uni.showToast({
											title: '保存失败',
											icon: 'none',
											duration: 1000
										});
									}
								});
							}
						});
					}
				},
				fail(res) {
					uni.showModal({
						title: '提示',
						content: '保存到相册失败，需要授权保存到相册权限',
						showCancel: false,
						confirmText: '打开授权',
						success(e) {
							if (e.confirm) {
								uni.openSetting({});
							}
						}
					});
				}
			});
			// #endif
			// #ifdef MP-ALIPAY
			my.showLoading({
				content: '图片保存中'
			});
			my.saveImage({
				url: that.img,
				showActionSheet: true,
				success: res => {
					uni.showToast({
						title: '保存成功',
						icon: 'success',
						duration: 1000
					});
				},
				fail() {
					uni.showToast({
						title: '保存失败',
						icon: 'none',
						duration: 1000
					});
				},
				complete() {
					my.hideLoading();
				}
			});
			// #endif
		},

		getList(value) {
			let that = this;
			that
				.$request({
					url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/poster&type=' + this.type,
					method: 'get'
				})
				.then(response => {
					that.$hideLoading();
					if (response) {
						that.img = response.data.pic_url;
					} else {
						uni.showToast({
							title: '图片获取失败',
							icon: 'none',
							duration: 1000
						});
					}
				})
				.catch(response => {
					that.$hideLoading();
					that.$event.on(that.$const.EVENT_USER_LOGIN).then(() => {
						that.getList();
					});
				});
		}
	},

	onLoad(options) {
		let that = this;
		uni.setNavigationBarTitle({
			title: that.custom_setting.menus.qrcode.name
		});
		that.$showLoading({
			type: 'global',
			text: '加载中...'
		});
		if (options.type) {
			this.type = options.type;
		}
		that.getList();
	}
};
</script>

<style scoped lang="scss">
.bg {
	position: absolute;
	width: 100%;
	background-color: #fff;
	height: 100%;
}

.qrcode {
	height: #{1030rpx};
	width: #{580rpx};
	margin-top: #{32rpx};
}

.load {
	width: #{400rpx};
	height: #{400rpx};
	margin: 0 auto;
	padding-top: #{280rpx};
}

.share-btn {
	margin-top: #{24rpx};
	width: #{480rpx};
	height: #{80rpx};
	font-size: #{32rpx};
	color: #fff;
	border-radius: #{40rpx};
}
</style>
