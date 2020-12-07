<template>
    <view class="app-share-qr-code-poster" :class="{'app-show-hidden': value}">
	    <view class="app-bottom" v-if="buttonBoolean">
		    <view class="app-icons dir-left-nowrap">
			    <view class="box-grow-1" @click="showHiddenClick">
				    <app-jump-button form arrangement="topCenter" open_type="share">
					    <icon class="app-icon app-share"></icon>
					    <text class="app-text">发送给朋友</text>
				    </app-jump-button>
			    </view>
			    <!--  #ifndef MP-BAIDU -->
			    <view class="box-grow-1" v-if="isHidden">
				    <app-form-id @click="fenxianghaibao">
					    <view class="dir-top-wrap main-center cross-center">
						    <icon class="app-icon app-code"></icon>
						    <text class="app-text">生成商品海报</text>
					    </view>
				    </app-form-id>
			    </view>
			    <!--  #endif -->
		    </view>
		    <view class="app-button">
			    <app-form-id>
				    <view style="height: 100rpx;background-color: #ffffff;text-align: center;line-height: 100rpx;font-size: 32rpx;color: #353535;" @click="showHiddenClick"  type="general">取消</view>
			    </app-form-id>
		    </view>
		    <view v-if="getBoolEmpty.XBoolean" :style="{height: getBoolEmpty.emptyHeight + 'rpx',}"></view>
	    </view>
	    <!--  #ifndef MP-BAIDU -->
	    <view class="app-center dir-top-wrap main-center cross-center" v-else>
		    <view class="app-close" @click="showHiddenClick"></view>
		    <view class="app-image-iframe main-center dir-top-nowrap cross-center" v-if="loading">
			    <image class="loading" src="../../../static/image/loading.gif"></image>
			    <view class="text">海报生成中</view>
		    </view>
		    <image class="app-image-iframe" v-if="!loading" show-menu-by-longpress mode="aspectFit" @click="preview(shareImage)"  :src="shareImage"></image>
		    <view class="app-button">
			    <button class="save-picture" :class="loading ? 'disabled-save' : ''" :disabled="loading" @click="savePicture">保存图片</button>
		    </view>
		    <text class="app-text">保存到相册</text>
	    </view>
	    <!--  #endif -->
	    <app-permissions-auth :text="text" :isShow='is_can_save' @cancel="cancel"></app-permissions-auth>
    </view>
</template>

<script>
	import {mapGetters} from 'vuex';
    import appPermissionsAuth from '../../basic-component/app-layout/app-permissions-auth/app-permissions-auth.vue';
    
    export default {
        name: 'app-share-qr-code-poster',
        components: {
            appPermissionsAuth,
        },
        computed: {
            ...mapGetters('iPhoneX', {
                getBoolEmpty: 'getBoolEmpty'
            }),
        },
        props: {
            value: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            url: {
                type: String,
                default() {
                    return '';
                }
            },
            disabled: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            isHidden: {
                type: Boolean,
	            default() {
                    return true;
                }
            }
        },
        data() {
            return {
                showHidden: this.value,
                buttonBoolean: true,
                shareImage: '',
                is_can_save: false,
                text: '保存图片需要您的授权。点击去设置,开启 保存到相册 权限',
	            loading: true,
            }
        },
        methods: {
            fenxianghaibao() {
                this.buttonBoolean = false;
                this.getShareImg();
            },
            showHiddenClick() {
                this.showHidden = false;
                this.$emit('input', this.showHidden);
                this.buttonBoolean = true;
            },
            savePicture() {
                let self = this;
                // #ifndef MP-ALIPAY
                uni.showLoading({
                    title: '图片保存中'
                });
                uni.downloadFile({
                    url: this.shareImage,
                    success(res) {
                        uni.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success() {
                                uni.hideLoading();
                                uni.showToast({
                                    title: '保存成功',
                                    duration: 3000,
	                                icon: 'none',
                                });
                            },
                            fail() {
                                uni.hideLoading();
                                self.getAuthSetting();
                            },
                            complete() {
                            }
                        })
                    }
                });
                // #endif
                // #ifdef MP-ALIPAY
                my.showLoading({
                    content: '图片保存中'
                });
                my.saveImage({
                    url: this.shareImage,
                    showActionSheet: true,
                    success: () => {
                        my.hideLoading();
                        uni.showToast({
                            title: '保存成功',
                            duration: 3000,
	                        icon: 'none',
                        });
                    },
                    fail() {
                        my.hideLoading();
                    },
                    complete() {
                    }
                });
                // #endif
            },
            getShareImg() {
                if (!this.url) return;
                this.$request({
                    url: this.url,
                }).then(response => {
                    if (response.code === 0) {
                        this.shareImage = response.data.pic_url;
                        this.loading = false;
                    } else {
                        uni.showModal({
                            content: response.msg,
                            showCancel: false,
                        });
                    }
                });
            },
            getAuthSetting() {
                let self = this;
                uni.getSetting({
                    success(res) {
                        self.is_can_save = !res.authSetting['scope.writePhotosAlbum'];
                    }
                });
            },
            cancel(isShow) {
                this.is_can_save = isShow;
            },
            preview(data) {
                uni.previewImage({
                    urls: [data],
                    longPressActions: true,
                });
            }
        }
    }
</script>


<style scoped lang="scss">
	.save-picture {
		width: #{500upx};
		height: #{80upx};
		border-radius: #{40upx};
		font-size: #{32upx};
		line-height: #{80upx};
		text-align: center;
		background-color: #ff4544;
		margin: 0;
		padding: 0;
		border: none;
		color: #ffffff;
	}
	.disabled-save {
		background-color: #cdcdcd;
	}
    .app-share-qr-code-poster {
        width: #{750rpx};
        height: 100%;
        position: fixed;
        z-index: 1501;
        left: 0;
        opacity: 0;
	    top: 0;
        visibility: hidden;
        background-color: rgba(153, 153, 153, 0.5);
	    .loading {
		    width: #{220rpx};
		    height: #{220rpx};
	    }
        .app-icons {
            height: #{290rpx};
	        .app-text {
		        font-size: #{26rpx};
		        color: #353535;
	        }
            > view {
                width: 50%;
                height: 100%;
                .app-icon {
                    width: #{120rpx};
                    height: #{120rpx};
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-color: white;
                    border-radius: 50%;
                    margin-top: #{60rpx};
                    margin-bottom: #{24rpx};
                }
                .app-share {
                    background-image: url('../../../static/image/icon/share.png');
                }
                .app-code {
                    background-image: url('../../../static/image/icon/code.png');
                }
                .text {
                    font-size: #{26rpx};
                    color: #353535;
                }
            }
        }
        .app-bottom {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            background-color: #f2f2f2;
            .app-icons {
                width: 100%;
                height: #{290rpx};
            }
            .app-button {
                width: 100%;
                height: #{100rpx};
                /deep/ button {
                    border-radius: 0;
                    border: none;
                }
            }
        }
        .app-center {
            width: calc(100% - #{80rpx});
            padding-top: #{100rpx};
            padding-bottom: #{77rpx};
            border-radius: #{8rpx};
            background-color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .app-close {
                width: #{30rpx};
                height: #{30rpx};
                background-size: cover;
                background-repeat: no-repeat;
                background-image: url("../../../static/image/icon/close.png");
                position: absolute;
                top: #{28rpx};
                right: #{24rpx};

            }
            .app-image-iframe {
                width: #{440rpx};
                height: #{783rpx};
	            position: relative;
                box-shadow: #{2rpx} #{2rpx} #{10rpx} #d9d9d9;
	            .text {
		            text-align: center;
		            color: #888;
	            }
            }
            .app-button {
                width: #{500rpx};
                height: #{80rpx};
                margin-top: #{38rpx};
                margin-bottom: #{24rpx};
            }
            .app-text {
                font-size: #{24rpx};
                color: #999999;
            }
        }
    }

    .app-show-hidden {
        opacity: 1;
        visibility: visible;
    }
</style>