<template>
	<app-layout>
		<view class="apply-com">基本信息</view>
		<view class="white">
			<view class="dir-left-nowrap cross-center form-input">
				<view class="box-grow-0 form-label main-right">联系人</view>
				<view class="box-grow-1">
					<input
						@input="applyInput"
						data-type="realname"
						placeholder-class="plugins-mch-config-input"
						placeholder="必填"
						name="realname"
						:value="form.realname"
					/>
				</view>
			</view>
			<view class="dir-left-nowrap cross-center form-input">
				<view class="box-grow-0 form-label main-right">联系电话</view>
				<view class="box-grow-1">
					<input
						@input="applyInput"
						data-type="mobile"
						placeholder-class="plugins-mch-config-input"
						placeholder="必填"
						maxlength="18"
						name="mobile"
						:value="form.mobile"
					/>
				</view>
			</view>
			<view class="dir-left-nowrap cross-center form-input">
				<view class="box-grow-0 form-label main-right">微信号</view>
				<view class="box-grow-1">
					<input
						@input="applyInput"
						data-type="wechat"
						placeholder-class="plugins-mch-config-input"
						placeholder="请输入微信号"
						name="wechat"
						:value="form.wechat"
					/>
				</view>
			</view>
		</view>

		<view class="apply-com">店铺信息</view>
		<view class="white">
			<view class="dir-left-nowrap cross-center form-input">
				<view class="box-grow-0 form-label main-right">店铺名称</view>
				<view class="box-grow-1">
					<input
						@input="applyInput"
						data-type="name"
						placeholder-class="plugins-mch-config-input"
						placeholder="必填"
						:value="form.name"
					/>
				</view>
			</view>

			<view class="dir-left-nowrap cross-center form-input">
				<view class="box-grow-0 form-label main-right">所在地区</view>
				<view class="box-grow-1 area-left">
					<app-area-picker
						@customevent="areaEvent"
						:ids="[area.province_id, area.city_id, area.district_id]"
					></app-area-picker>
				</view>
			</view>

			<view class="dir-left-nowrap cross-center form-input">
				<view class="box-grow-0 form-label main-right">详细地址</view>
				<view class="box-grow-1">
					<input
						@input="applyInput"
						data-type="address"
						placeholder-class="plugins-mch-config-input"
						placeholder="必填"
						name="address"
						:value="form.address"
					/>
				</view>
			</view>
			<view class="dir-left-nowrap cross-center form-input">
				<view class="box-grow-0 form-label main-right">店铺经纬度</view>
				<view class="box-grow-1">
					<view class="dir-left-nowrap cross-center">
						<view class="box-grow-1 password" v-if="mch_detail.latitude && mch_detail.longitude">
							{{ mch_detail.latitude }},{{ mch_detail.longitude }}
						</view>
						<view class="box-grow-1 password" v-else>根据地图选择经纬度</view>
						<view @click="navMap" class="box-grow-0 cross-center icon-address main-center">
							<image src="/static/image/myshop/summary-address.png"></image>
						</view>
					</view>
				</view>
			</view>

			<view class="dir-left-nowrap cross-center form-input">
				<view class="box-grow-0 form-label main-right">客服电话</view>
				<view class="box-grow-1">
					<input
						@input="applyInput"
						data-type="service_mobile"
						placeholder-class="plugins-mch-config-input"
						placeholder="必填"
						name="service_mobile"
						:value="form.service_mobile"
					/>
				</view>
			</view>

			<view class="dir-left-nowrap cross-center form-input">
				<view class="box-grow-0 form-label main-right">所售类目</view>
				<view class="box-grow-1">
					<picker
						:range="category_list"
						range-key="name"
						class="category-picker"
						:value="form.mch_common_cat_key"
						@change="categoryChange"
					>
						<view class="cross-center dir-left-nowrap category-info">
							<view class="box-grow-1 category-select">
								{{ form.mch_common_cat_str ? form.mch_common_cat_str : `请选择` }}
							</view>
							<view class="box-grow-0 cross-center"><icon class="icon-arrow-right"></icon></view>
						</view>
					</picker>
				</view>
			</view>

			<view class="dir-left-nowrap cross-center form-input end">
				<view class="form-label box-grow-0 dir-top-nowrap main-right">
					<view class="main-right">店铺头像</view>
					<view class="main-right bigness">240×240</view>
				</view>
				<view class="box-grow-1">
					<view class="dir-left-nowrap up-pic" @click="uploadCoverUrl">
						<view class="box-grow-1 cross-center category-picker">
							<view v-if="form.cover_url" class="shop-pic">
								<image mode="aspectFill" :src="form.cover_url" class="pic-head"></image>
							</view>
							<view v-else class="box-grow-1 category-select">请选择图片</view>
						</view>
						<view class="box-grow-0 cross-center"><icon class="icon-arrow-right"></icon></view>
					</view>
				</view>
			</view>

			<view class="dir-left-nowrap cross-center form-input end">
				<view class="form-label box-grow-0 dir-top-nowrap main-right">
					<view class="main-right">店铺背景</view>
					<view class="main-right bigness">750×200</view>
				</view>
				<view class="box-grow-1">
					<view class="dir-left-nowrap up-pic" @click="uploadPicUrl">
						<view class="box-grow-1 cross-center category-picker">
							<view v-if="form.pic_url" class="shop-pic">
								<image mode="aspectFill" :src="form.pic_url" class="pic-bg"></image>
							</view>
							<view v-else class="box-grow-1 category-select">请选择图片</view>
						</view>
						<view class="box-grow-0 cross-center"><icon class="icon-arrow-right"></icon></view>
					</view>
				</view>
			</view>
		</view>
		<view class="main-center submit-btn">
			<app-button @click="formSubmit" height="80" width="702" font-size="32" background="#ff4544" color="#ffffff" round>
				提交
			</app-button>
		</view>
	</app-layout>
</template>

<script>
import appAreaPicker from '@/components/page-component/app-area-picker/app-area-picker';
import { mapGetters } from 'vuex';
import permision from '@/js_sdk/wa-permission/permission.js';
export default {
	name: 'config',
	components: { appAreaPicker },
	data() {
		return {
			mch_id: -1,
			category_list: [],
			area: {
				province_id: 0,
				city_id: 0,
				district_id: 0
			},
			form: {},

			form_data: {},
			mch_detail: {}
		};
	},

	computed: {
		...mapGetters('gConfig', {
			isPlatform: 'getPlatform'
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.mch_id = options.mch_id;
		this.getCategory();
	},
	methods: {
		async requestAndroidPermission(permisionID) {
			var result = await permision.requestAndroidPermission(permisionID);
			var strStatus;
			if (result == 1) {
				uni.navigateTo({
					url: `/pages/admin/map/index`
				});
			} else if (result == 0) {
				uni.showModal({
					title: '特别提示',
					content: '请授权定位,否则定位正确获取到当前位置',
					success: function(res) {
						if (res.confirm) {
							permision.gotoAppPermissionSetting();
						}
					}
				});
			}
		},

		// 店铺经纬度
		navMap() {
			//#ifdef MP
			var that = this;
			uni.chooseLocation({
				latitude: parseFloat(this.mch_detail.latitude),
				longitude: parseFloat(this.mch_detail.longitude),
				success: function(res) {
					that.form.address = res.address;
					that.mch_detail.latitude = res.latitude;
					that.mch_detail.longitude = res.longitude;
				}
			});
			//#endif

			//#ifdef APP-PLUS
			let latitude = parseFloat(this.mch_detail.latitude);
			let longitude = parseFloat(this.mch_detail.longitude);
			if (longitude && latitude) {
				uni.navigateTo({
					url: `/pages/admin/map/index?longitude=${longitude}&latitude=${latitude}`
				});
				return;
			}

			if (this.isPlatform === 'android') {
				this.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION');
			} else if (this.isPlatform === 'ios') {
				uni.navigateTo({
					url: `/pages/admin/map/index`
				});
			}
			//#endif
		},

		$$updateMap(res) {
			this.form.address = res.address;
			this.mch_detail.latitude = res.latitude;
			this.mch_detail.longitude = res.longitude;
		},

		getCategory: function() {
			const self = this;
			self
				.$request({
					url: self.$api.mch.category,
					data: {
						id: self.mch_id
					}
				})
				.then(info => {
					if (info.code === 0) {
						self.category_list = info.data.list;
						self.loadData();
					}
				});
		},

		loadData: function() {
			const self = this;
			self.$showLoading();

			self
				.$request({
					url: self.$api.mch.detail,
					data: {
						id: self.mch_id,
						review_status: 1
					}
				})
				.then(info => {
					self.$hideLoading();
					if (info.code === 0) {
						const detail = info.data.detail;

						let mch_common_cat_str = '';
						let mch_common_cat_key = 0;
						self.category_list.map((v, k) => {
							if (v.id == detail.mch_common_cat_id) {
								mch_common_cat_str = v.name;
								mch_common_cat_key = k;
							}
						});

						self.form = {
							id: detail.id,
							realname: detail.realname,
							mobile: detail.mobile,
							wechat: detail.wechat,
							address: detail.store.address,
							name: detail.store.name,
							service_mobile: detail.store.mobile,
							mch_common_cat_str,
							mch_common_cat_key,
							mch_common_cat_id: detail.mch_common_cat_id,
							cover_url: detail.store.cover_url,
							username: detail.mchUser.username,
							pic_url: detail.store.pic_url.length > 0 ? detail.store.pic_url[0].pic_url : '',
							form_data: detail.form_data
						};
						self.area = {
							province_id: detail.store.province_id,
							city_id: detail.store.city_id,
							district_id: detail.store.district_id
						};
						self.mch_detail = {
							latitude: detail.store.latitude,
							longitude: detail.store.longitude
						};
					}
				});
		},

		navPassword() {
			uni.navigateTo({ url: `/pages/admin/password/password?mch_id=` + this.mch_id });
		},

		//INPUT
		applyInput: function(e) {
			let name = e.currentTarget.dataset.type;
			this.form[name] = e.detail.value;
		},

		categoryChange(e) {
			const item = this.category_list[e.detail.value];

			this.form.mch_common_cat_id = item.id;
			this.form.mch_common_cat_str = item.name;
			this.form.mch_common_cat_key = e.detail.value;
		},

		//地址处理
		areaEvent(data) {
			// console.log(5555, data);
			if (data) {
				this.area.province_id = data.province.id;
				this.area.city_id = data.city.id;
				this.area.district_id = data.district.id;
			}
		},

		// 上传头像
		uploadCoverUrl(e) {
			const self = this;
			uni.chooseImage({
				count: 1,
				success: function(e) {
					uni.uploadFile({
						url: self.$api.upload.file,
						filePath: e.tempFilePaths[0],
						name: 'file',
						formData: {
							file: e.tempFilePaths[0]
						},
						success(res) {
							const result = JSON.parse(res.data);
							if (result.code === 0) {
								self.form.cover_url = result.data.url;
								uni.showToast({ title: '上传成功' });
							} else {
								uni.showToast({ icon: 'none', title: result.msg });
							}
						}
					});
				}
			});
		},

		// 上传背景
		uploadPicUrl(e) {
			const self = this;
			uni.chooseImage({
				count: 1,
				success: function(e) {
					uni.uploadFile({
						url: self.$api.upload.file,
						filePath: e.tempFilePaths[0],
						name: 'file',
						formData: {
							file: e.tempFilePaths[0]
						},
						success(res) {
							const result = JSON.parse(res.data);
							if (result.code === 0) {
								self.form.pic_url = result.data.url;
								self.form.pic_url_id = result.data.id;
								uni.showToast({ title: '上传成功' });
							} else {
								uni.showToast({ icon: 'none', title: result.msg });
							}
						},
						file(info) {
							console.error(info);
						}
					});
				},
				fail(info) {
					console.error(info);
				}
			});
		},

		//SUBMIT
		formSubmit: function(e) {
			let self = this;
			let form = self.form;
			let area = self.area;
			let mch_detail = self.mch_detail;

			let content = (function() {
				if (!form.realname) {
					return '联系人不能为空';
				}
				if (!form.mobile) {
					return '联系电话不能为空';
				}
				if (!form.username) {
					return '账号不能为空';
				}
				if (!form.mch_common_cat_id) {
					return '类目不能为空';
				}
				if (!form.name) {
					return '店铺名称不能为空';
				}
				return false;
			})();
			if (content) {
				uni.showToast({ icon: 'none', title: content });
				return;
			}
			self.$showLoading({ title: '保存中' });
			self
				.$request({
					url: self.$api.mch.apply,
					data: {
						id: form.id,
						mch_common_cat_id: form.mch_common_cat_id,
						address: form.address,
						username: form.username,
						name: form.name,
						service_mobile: form.service_mobile,
						realname: form.realname,
						mobile: form.mobile,
						wechat: form.wechat,
						form_data: JSON.stringify(form.form_data),
						province_id: area.province_id,
						city_id: area.city_id,
						district_id: area.district_id,
						logo: form.cover_url,
						bg_pic_url: JSON.stringify({ pic_url: form.pic_url, id: form.pic_url_id }),
						latitude: mch_detail.latitude,
						longitude: mch_detail.longitude
					},
					method: 'POST'
				})
				.then(info => {
					self.$hideLoading();
					if (info.code === 0) {
						uni.showModal({
							title: '提示',
							content: info.msg,
							showCancel: false,
							success: function(e) {
								if (e.confirm) {
									uni.navigateBack({
										delta: 1
									});
								}
							}
						});
					} else {
						uni.showToast({ icon: 'none', title: info.msg });
					}
				});
		}
	}
};
</script>

<style lang="scss">
.plugins-mch-config-input {
	color: #bbb;
	font-size: #{28rpx};
}
</style>
<style scoped lang="scss">
// 店铺经纬度
.icon-address {
	width: #{120rpx};
	border-left: 1px solid #e2e2e2;
	image {
		height: #{32rpx};
		width: #{32rpx};
		display: block;
	}
}
.apply-com {
	padding-top: #{30rpx};
	padding-left: #{24rpx};
	height: #{72rpx};
	color: #999;
	font-size: #{26rpx};
	background: #f7f7f7;
	width: 100%;
}

.white {
	background: #ffffff;

	.form-input {
		margin: 0 #{24rpx};
		border-bottom: 1px solid #e2e2e2;
		height: #{100rpx};
	}

	input {
		height: 100%;
		width: 100%;
		padding-left: #{32rpx};
		padding-right: #{24rpx};
		color: #666666;
		font-size: #{28rpx};
	}

	.form-label {
		padding-left: #{3rpx};
		font-size: #{28rpx};
		color: #353535;
		min-width: #{125rpx};
	}

	> view:last-child {
		border-bottom: none;
	}

	//
	.password {
		font-size: #{28rpx};
		color: #666666;
		text-align: right;
		padding-right: #{24rpx};
		overflow: scroll;
		padding-left: 10rpx;
	}

	.icon-arrow-right {
		// background-image: url('/static/image/myshop/icon/arrow-right.png');
		height: #{22rpx};
		width: #{12rpx};
		background-size: 100% auto;
		background-repeat: no-repeat;
	}

	.area-left {
		padding-left: #{32rpx};
		text-align: right;
		margin-left: auto;
	}

	.category-picker {
		height: 100%;
		width: 100%;
	}

	.category-info {
		height: 100%;
		width: 100%;
		min-height: #{98rpx};
	}

	.category-select {
		font-size: #{28rpx};
		color: #666666;
		text-align: right;
		padding-right: #{24rpx};
	}

	.end {
		height: #{128rpx};

		.bigness {
			font-size: #{24rpx};
			color: #888;
			line-height: 1;
		}
	}

	.up-pic {
		height: 100%;
		padding-left: #{32rpx};

		.shop-pic {
			padding: #{18rpx} #{24rpx};
			text-align: right;
			width: 100%;
			font-size: 0;

			.pic-head {
				height: #{80rpx};
				width: #{80rpx};
			}

			.pic-bg {
				height: #{80rpx};
				width: #{298rpx};
			}
		}
	}
}

.submit-btn {
	margin-top: #{56rpx};
	margin-bottom: #{24rpx};
}
</style>
