<template>
	<app-layout>
		<view class="bg">
			<view class="dir-top-wrap cross-center">
				<image mode="aspectFill" class="qrcode" @click="look" :src="img"></image>
				<view @click="saveImg" :class="[`share-btn main-center cross-center`, `${theme}-background`]">
					保存店铺支付码
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
			mch_id: 0
		};
	},
	computed: {
		...mapState({
			theme: state => state.mallConfig.theme,
			custom_setting: state => state.mallConfig.share_setting_custom
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

		getList() {
			let that = this;
			that
				.$request({
					url: that.$api.mch.aggregate_code,
					data: {
						mch_id: that.mch_id
					}
				})
				.then(response => {
					that.$hideLoading();
					if (response.code == 0) {
						that.img = response.data.pic_url;
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none',
							duration: 1500,
							success() {
								setTimeout(function() {
									uni.navigateBack();
								}, 2000);
							}
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
		this.mch_id = options.mch_id;
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
