<template>
	<QStemplate
		:title="title"
		:titleHide="titleHide"
		:fontSize="fontSize"
		:width="width"
		:titleFlex="titleFlex"
		:contentFlex="contentFlex"
		:titleStyle="titleStyle"
		:contentStyle="contentStyle"
		:required="required"
		:requiredSign="requiredSign"
		:layout="layout"
		:titleLayout="titleLayout"
		:itemDisabled="itemDisabled"
		:titleColor="titleColor"
	>
		<view v-if="labelText" slot="labelText">
			<text :class="[getLabelLayout]" :style="labelStyle">{{ labelText }}</text>
		</view>
		<view v-if="rightButton" slot="rightButton" style="position: absolute;right:50rpx;">
			<button
				type="primary"
				size="mini"
				class="width100 text_nowrap"
				:style="'font-size:22rpx;' + rightButtonStyle"
				@tap="inputTap('button')"
			>
				{{ rightButtonText }}
			</button>
		</view>
		<view class="width100 padding_10unit_15unit wrap" :class="itemLayout_computed">
			<view
				class="flex_column_c_c border_radius_4px transition_border_point6s padding_10unit"
				v-for="(picsItem, picsIndex) in itemArray"
				:key="picsIndex"
			>
				<view
					class="flex_row_c_c border1pxf2f2f2 position_relative border_radius_4px backgrounColor_f8f8f8 picsBox"
					@tap="chooseImg"
					:data-picsindex="picsIndex"
					:data-customtapid="picsItem.customTapId"
				>
					<view v-if="itemArray[picsIndex].path">
						<image
							:src="itemArray[picsIndex].path"
							class="border_radius_4px box_shadow_2px_2px_5px_ADADAD picsBox"
							mode="aspectFill"
							@tap.stop.prevent="showImg"
							:data-picsindex="picsIndex"
						></image>
					</view>
					<view v-else><QSIcon type="image" :size="45" color="#999999" /></view>

					<view
						class="picsClear"
						v-if="itemArray[picsIndex].path"
						@tap.stop.prevent="clearPic"
						:data-picsindex="picsIndex"
					>
						<QSIcon type="clear" :color="picsItem.clearColor || clearColor || '#f5105c'" :size="34" />
					</view>
				</view>
				<view class="flex_row_c_c fontColorADADAD picsItemTitle" v-if="picsItem.title">
					<view class="requiredSign" v-if="picsItem.required">{{ requiredSign }}</view>
					{{ picsItem.title }}
				</view>
			</view>
		</view>
		<clip-image @upload="onClipComplete" ref="clip"></clip-image>
	</QStemplate>
</template>

<script>
import * as util from '@/utils';
import _app from '../../js/app.js';
import QStemplate from '../../template/template.vue';
import QSInputsMixin from '../../js/QSInputsMixin.js';
import QSIcon from '../../uniIcons/uni-icons.vue';
import clipImage from '../../plug-in/yq-avatar/yq-avatar.vue';

const CLIPDEFALUT = {
	inner: false,
	canRotate: false,
	canScale: true,
	stretch: 'shortSel',
	quality: 1,
	selWidth: '600upx',
	selHeight: '600upx',
	fileType: 'jpg' //压缩
};

export default {
	components: {
		QStemplate,
		QSIcon,
		clipImage
	},
	props: {
		// 支持裁剪
		clip: {
			type: Boolean,
			default: false
		},
		//支持压缩
		compress: {
			type: Boolean,
			default: false
		},
		clipParam: {
			type: Object,
			default: function() {
				return {};
			}
		},
		rightButtonStyle: {
			type: String,
			default: ''
		},
		rightButtonText: {
			type: String,
			default: ''
		},
		rightButton: {
			type: Boolean,
			default: false
		},
		clearColor: {
			type: String,
			default: '#f5105c'
		},
		labelText: {
			type: String,
			default: ''
		},
		labelStyle: {
			type: String,
			default: ''
		}
	},
	data() {
		let itemArray;
		if (Array.isArray(this.value) && this.value.length > 0) {
			itemArray = this.value;
		} else {
			itemArray = [];
		}

		let clipconf = Object.assign({}, CLIPDEFALUT, this.clipParam);
		// console.log('clipconf',clipconf)
		return {
			clipConfig: clipconf,
			itemArray,
			upLoadData: null
		};
	},
	computed: {
		iconSize() {
			return this.fontSize + 8;
		},
		btnSize() {
			return this.fontSize - 8;
		},
		getLabelLayout() {
			// console.log(this.labelText);
			//console.log(this.layout);
			if (this.layout == 'row') {
				return 'flex_row_label';
			} else {
				return 'flex_column_label';
			}
		}
	},
	methods: {
		inputTap() {
			this.$emit('onPic');
		},

		onClipComplete(data) {
			uni.compressImage({
				src: data.path,
				quality: 90,
				success: async res => {
					this.setImageValue(res.tempFilePath);
				}
			});
		},

		/**
		 * 设置图片
		 */
		setImageValue(tempFilePath) {
			this.itemArray[0].path = tempFilePath;
			this.setValue(this.itemArray);
		},

		/**
		 * 压缩图片
		 */
		compressImage() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有s
				success: res => {
					let src = res.tempFilePaths[0];
					util.getCompressImage(src, 50).then(path => {
						this.setImageValue(path);
					});
				}
			});
		},

		chooseImg({
			currentTarget: {
				dataset: { picsindex, infinite, customtapid }
			}
		} = {}) {

			// 支持压缩
			if (this.compress) {
				this.compressImage();
				return;
			}

			// 支持裁剪
			if (this.clip) {
				this.$refs.clip.fChooseImg('', this.clipConfig);
				return;
			}

			if (this.itemArray[picsindex].path) return;
			if (customtapid) {
				this.$emit('picsTap', {
					title: this.title,
					variableName: this.variableName,
					picsIndex: picsindex,
					customTapId: customtapid
				});
			} else {
				uni.chooseImage({
					sizeType: ['original', 'compressed'],
					success: res => {
						this.$set(this.itemArray[picsindex], 'path', res.tempFilePaths[0]);
						this.setValue(this.itemArray);
					}
				});
			}
		},
		clearPic({
			currentTarget: {
				dataset: { picsindex }
			}
		} = {}) {
			if (this.itemArray[picsindex].path) {
				this.itemArray[picsindex].path = '';
				this.setValue(this.itemArray);
			}
		},
		showImg({
			currentTarget: {
				dataset: { picsindex }
			}
		} = {}) {
			_app.previewImage(this.itemArray.map(item => item.path), picsindex);
		},
		setData(newArr) {
			this.itemArray = newArr;
			this.setValue(this.itemArray);
		},
		setUpLoadData(obj) {
			this.upLoadData = obj;
		},
		getUpLoadPromiseArray() {
			return _app.getUpLoadPromiseArray({
				itemArray: [...this.itemArray],
				customId: this.customId,
				upLoadData: this.upLoadData
			});
		}
	},
	mixins: [
		QSInputsMixin({
			QSInputsType: _app.typeObj.pics
		})
	]
};
</script>

<style scoped>
@import url('../../css/inputs.css');
@import url('../../config/css/picsAndInfinitePics.css');
.flex_row_label {
	position: absolute;
	top: 120rpx;
	color: red;
	font-size: 20rpx;
	left: 50rpx;
}
.flex_column_label {
	position: absolute;
	top: 60rpx;
	color: red;
	font-size: 20rpx;
	left: 55rpx;
}
</style>
