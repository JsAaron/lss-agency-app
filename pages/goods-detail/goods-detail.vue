<template>
	<app-layout>
		<view style="height: 100%;background-color: #fff;width: 100%;position: absolute;">
			<view v-for="(item, index) in img" style="position:relative;background-color: #fff;" :key="index">
				<image
					class="detail"
					@load="imageLoad(index, $event)"
					:style="{ height: `${item.height}` }"
					:src="item.pic_url"
				></image>
				<image @click="clear(index)" class="close" src="/static/image/myshop/delete.png"></image>
			</view>
			<view v-if="img.length > 0" class="img-place"></view>
			<view style="background-color: #fff;" v-if="img.length < 6" @click="add">
				<view
					:class="[
						'main-center',
						'cross-center',
						`${img[0].pic_url.length > 0 ? 'more-add' : 'add-img'}`,
						`${iphone_x ? 'iphone_x' : ''}`
					]"
				>
					<image src="/static/image/myshop/add-goods.png"></image>
					<text>添加图片</text>
				</view>
			</view>
		</view>
	</app-layout>
</template>

<script>
import appLayout from '@/components/basic-component/app-layout/app-layout.vue';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			tempFilePaths: '',
			imgheight: 0,
			img: [],
			iphone_x: false
		};
	},
	components: {
		'app-layout': appLayout
	},
	computed: {
		...mapState({
			theme: state => state.mallConfig.theme,
			userInfo: state => state.user.info,
			adminImg: state => state.mallConfig.__wxapp_img.app_admin
		})
	},
	methods: {
		add() {
			let that = this;
			let num = 6 - that.img.length;
			uni.chooseImage({
				count: num,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					// tempFilePath可以作为img标签的src属性显示图片
					const tempFilePaths = res.tempFilePaths;
					let img = that.img;
					tempFilePaths.forEach(function(row, index) {
						uni.showLoading({
							title: '上传中...'
						});
						let fileName = '';
						// #ifdef MP-BAIDU
						fileName = row.substr(row.lastIndexOf('/') + 1);
						// #endif
						uni.uploadFile({
							url: that.$api.upload.file,
							filePath: row,
							name: 'file',
							fileType: 'image',
							formData: {
								file: row,
								file_name: fileName
							},
							success(res) {
								// #ifndef MP-BAIDU
								const imgInfo = JSON.parse(res.data);
								// #endif
								// #ifdef MP-BAIDU
								const imgInfo = res.data;
								// #endif
								console.log(imgInfo);
								console.log(img);
								let para = {
									pic_url: imgInfo.data.url,
									id: imgInfo.data.id
								};
								if (imgInfo.code == 0) {
									img.push(para);
								}
								that.img = img;
								uni.setStorage({
									key: 'goods_mch_detail',
									data: img
								});
								if (index == tempFilePaths.length - 1) {
									uni.hideLoading();
								}
							}
						});
					});
				}
			});
		},
		imageLoad(index, e) {
			let $height = e.detail.height; //获取图片真实高度
			let $width = e.detail.width; //获取图片真实宽度
			let height = $height * (702 / $width);
			this.img[index].height = height + 'rpx';
			this.$forceUpdate();
			console.log(this.img);
		},
		clear(index) {
			this.img.splice(index, 1);
			uni.setStorage({
				key: 'goods_mch_detail',
				data: this.img
			});
		}
	},

	onLoad(options) {
		let that = this;
		uni.getStorage({
			key: 'goods_mch_detail',
			success(res) {
				if (res.data) {
					that.img = res.data;
				}
			}
		});
		uni.getSystemInfo({
			success: function(res) {
				if (
					res.model.indexOf('iPhone X') > -1 ||
					res.model.indexOf('iPhone 11') > -1 ||
					res.model.indexOf('iPhone11') > -1 ||
					res.model.indexOf('iPhone12') > -1 ||
					res.model.indexOf('Unknown Device') > -1
				) {
					that.iphone_x = true;
				}
			}
		});
	}
};
</script>

<style scoped lang="scss">
.add-img {
	margin: #{96rpx} #{75rpx};
	width: #{600rpx};
	height: #{240rpx};
	background-color: #f4f5f9;
	font-size: #{28rpx};
	color: #999999;
}

.add-img image {
	height: #{40rpx};
	width: #{40rpx};
	margin-right: #{16rpx};
}

.detail {
	width: #{702rpx};
	margin: #{24rpx};
}

.close {
	position: absolute;
	right: #{6rpx};
	top: #{6rpx};
	width: #{40rpx};
	height: #{40rpx};
}

.more-add.iphone_x {
	height: #{146rpx};
	padding-bottom: #{50rpx};
}

.more-add {
	border-top: #{1rpx} solid #e2e2e2;
	height: #{96rpx};
	line-height: #{96rpx};
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	z-index: 20;
}

.more-add image {
	height: #{40rpx};
	width: #{40rpx};
	margin-right: #{16rpx};
}

.img-place {
	height: #{96rpx};
	background-color: #fff;
}
</style>
