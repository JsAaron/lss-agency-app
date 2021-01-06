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
		<view class="width100 padding_10unit_15unit wrap" :class="itemLayout_computed">
			<view
				style="margin:10rpx"
				class="flex_column_c_c border_radius_4px transition_border_point6s padding_10unit"
				v-for="(picsItem, picsIndex) in itemArray"
				:key="picsIndex"
			>
				<view class="flex_row_c_c border1pxf2f2f2 position_relative border_radius_4px backgrounColor_f8f8f8 picsBox">
					<image
						:src="picsItem.path"
						class="border_radius_4px box_shadow_2px_2px_5px_ADADAD picsBox"
						mode="aspectFill"
						@tap.stop.prevent="showImg"
						:data-picsindex="picsIndex"
					></image>
					<view class="picsClear" @tap.prevent.stop="clearPic" :data-picsindex="picsIndex">
						<QSIcon type="clear" :color="picsItem.clearColor || clearColor || '#f5105c'" :size="34" />
					</view>
					<view
						class="sortSelection flex_row_c_c"
						:style="{
							'background-color': sortSelectionArray[picsIndex]
								? selectedColor || '#0099FF'
								: unSelectedColor || 'rgba(0,0,0,.7)',
							border: selectBorderColor || '1px solid rgba(255,255,255,.7)',
							color: selectColor || '#fff'
						}"
						v-if="sortSelection"
						@tap.stop.prevent="sortSelectionFc"
						:data-picsindex="picsIndex"
					>
						{{ sortSelectionArray[picsIndex] || '' }}
					</view>
				</view>
			</view>
			<view
				class="flex_column_c_c border_radius_4px transition_border_point6s padding_10unit"
				v-if="max ? (itemArray.length >= max ? false : true) : true"
			>
				<view
					class="flex_row_c_c border1pxf2f2f2 position_relative border_radius_4px backgrounColor_f8f8f8 box_shadow_2px_2px_5px_ADADAD picsBox"
					@tap="chooseImg"
				>
					<QSIcon type="image" :size="45" color="#999" />
				</view>
			</view>
		</view>
		<clip-image @choose="onChooseClipImage" @end="onClipComplete" @upload="onClipComplete" ref="clip"></clip-image>
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
	stretch: 'longSel',
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
		max: {
			//最多选择图片数量
			type: [String, Number],
			default: ''
		},
		sortSelection: {
			//排序选择模式
			type: Boolean,
			default: false
		},
		defaultSelectAll: {
			//在排序选择模式下，用户未选择任何图片时是否默认选择全部
			type: Boolean,
			default: true
		},
		clearColor: {
			type: String,
			default: '#f5105c'
		},
		selectedColor: {
			type: String,
			default: '#0099FF'
		},
		unSelectedColor: {
			type: String,
			default: 'rgba(0,0,0,.7)'
		},
		selectBorderColor: {
			type: String,
			default: '1px solid rgba(255,255,255,.7)'
		},
		selectColor: {
			type: String,
			default: '#fff'
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
		if (this.value && Array.isArray(this.value) && this.value.length > 0) {
			itemArray = this.value;
		} else {
			itemArray = [];
		}
		let clipConfig = Object.assign({}, CLIPDEFALUT, this.clipParam);
		return {
			clipConfig,
			itemArray,
			sortSelectionArray: [],
			sortSelectionCheckArray: []
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
		onChooseClipImage() {
			this.$emit('clipChoose');
		},

		onClipComplete(data) {
			this.$emit('clipComplete');
			uni.compressImage({
				src: data.path,
				quality: 90,
				success: async res => {
					this.itemArray.push({ path: res.tempFilePath });
					this.setValue(this.getItemArray());
				}
			});
		},

		chooseImg() {
			// 支持裁剪
			if (this.clip) {
				this.$refs.clip.fChooseImg('', this.clipConfig);
				return;
			}

			uni.chooseImage({
				success: async res => {
					let tempFiles = res.tempFiles;
					let overflow = false;
					for (var i = 0; i < tempFiles.length; i++) {
						let path = await util.getCompressImage(tempFiles[i].path);
						let size = await util.getFileSize(path);
						if (size > 500) {
							overflow = true;
						} else {
							this.itemArray.push({ path });
						}
					}
					if (overflow) {
						uni.showToast({ icon: 'none', title: '超过5M的图片无法上传' });
					}
					this.setValue(this.getItemArray());
				}
			});
		},
		clearPic({
			currentTarget: {
				dataset: { picsindex }
			}
		} = {}) {
			const oldPath = this.itemArray[picsindex].path;
			this.itemArray.splice(picsindex, 1);
			if (this.sortSelection) {
				const selectionIndex = this.sortSelectionCheckArray.findIndex(item => item.path === oldPath);
				if (selectionIndex >= 0) {
					this.sortSelectionCheckArray.splice(selectionIndex, 1);
				}
				this.checkPicsCheckObj();
			}
			this.setValue(this.getItemArray());
		},
		showImg({
			currentTarget: {
				dataset: { picsindex }
			}
		} = {}) {
			_app.previewImage(this.itemArray.map(item => item.path), picsindex);
		},
		sortSelectionFc({
			currentTarget: {
				dataset: { picsindex }
			}
		} = {}) {
			const hasIndex = this.sortSelectionCheckArray.findIndex(item => item.path === this.itemArray[picsindex].path);
			if (hasIndex >= 0) {
				this.sortSelectionCheckArray.splice(hasIndex, 1);
			} else {
				this.sortSelectionCheckArray.push(this.itemArray[picsindex]);
			}
			this.setValue(this.getItemArray());
			this.checkPicsCheckObj();
		},
		checkPicsCheckObj(vbName) {
			const newArray = [];
			const itemArray = this.itemArray;
			const sortSelectionCheckArray = this.sortSelectionCheckArray;
			for (let i = 0; i < itemArray.length; i++) {
				const index = sortSelectionCheckArray.findIndex(ite => ite.path === itemArray[i].path);
				if (index >= 0) {
					newArray.push(index + 1);
				} else {
					newArray.push('');
				}
			}
			this.sortSelectionArray = newArray;
		},
		setData(newArr) {
			this.itemArray = newArr;
			if (this.sortSelection) {
				this.sortSelectionCheckArray = [];
			}
			this.setValue(this.getItemArray());
			this.checkPicsCheckObj();
		},
		setUpLoadData(obj) {
			this.upLoadData = obj;
			if (this.sortSelection) {
				this.sortSelectionCheckArray = [];
			}
			this.setValue(this.getItemArray());
			this.checkPicsCheckObj();
		},
		getUpLoadPromiseArray() {
			return _app.getUpLoadPromiseArray({
				itemArray: [...this.getItemArray()],
				customId: this.customId,
				upLoadData: this.upLoadData,
				required: this.required
			});
		},
		getItemArray() {
			if (this.sortSelection) {
				if (this.sortSelectionCheckArray.length > 0) {
					return this.sortSelectionCheckArray;
				} else {
					if (this.defaultSelectAll) {
						return this.itemArray;
					} else {
						return [];
					}
				}
			} else {
				return this.itemArray;
			}
		}
	},
	mixins: [
		QSInputsMixin({
			QSInputsType: _app.typeObj.infinitePics
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
	font-size: 12px;
	left: 45rpx;
}
.flex_column_label {
	position: absolute;
	top: 60rpx;
	color: red;
	font-size: 12px;
	left: 55rpx;
}
=======
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
		<view class="width100 padding_10unit_15unit wrap" :class="itemLayout_computed">
			<view
				style="margin:10rpx"
				class="flex_column_c_c border_radius_4px transition_border_point6s padding_10unit"
				v-for="(picsItem, picsIndex) in itemArray"
				:key="picsIndex"
			>
				<view class="flex_row_c_c border1pxf2f2f2 position_relative border_radius_4px backgrounColor_f8f8f8 picsBox">
					<image
						:src="picsItem.path"
						class="border_radius_4px box_shadow_2px_2px_5px_ADADAD picsBox"
						mode="aspectFill"
						@tap.stop.prevent="showImg"
						:data-picsindex="picsIndex"
					></image>
					<view class="picsClear" @tap.prevent.stop="clearPic" :data-picsindex="picsIndex">
						<QSIcon type="clear" :color="picsItem.clearColor || clearColor || '#f5105c'" :size="34" />
					</view>
					<view
						class="sortSelection flex_row_c_c"
						:style="{
							'background-color': sortSelectionArray[picsIndex]
								? selectedColor || '#0099FF'
								: unSelectedColor || 'rgba(0,0,0,.7)',
							border: selectBorderColor || '1px solid rgba(255,255,255,.7)',
							color: selectColor || '#fff'
						}"
						v-if="sortSelection"
						@tap.stop.prevent="sortSelectionFc"
						:data-picsindex="picsIndex"
					>
						{{ sortSelectionArray[picsIndex] || '' }}
					</view>
				</view>
			</view>
			<view
				class="flex_column_c_c border_radius_4px transition_border_point6s padding_10unit"
				v-if="max ? (itemArray.length >= max ? false : true) : true"
			>
				<view
					class="flex_row_c_c border1pxf2f2f2 position_relative border_radius_4px backgrounColor_f8f8f8 box_shadow_2px_2px_5px_ADADAD picsBox"
					@tap="chooseImg"
				>
					<QSIcon type="image" :size="45" color="#999" />
				</view>
			</view>
		</view>
		<clip-image @choose="onChooseClipImage" @end="onClipComplete" @upload="onClipComplete" ref="clip"></clip-image>
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
	stretch: 'longSel',
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
		max: {
			//最多选择图片数量
			type: [String, Number],
			default: ''
		},
		sortSelection: {
			//排序选择模式
			type: Boolean,
			default: false
		},
		defaultSelectAll: {
			//在排序选择模式下，用户未选择任何图片时是否默认选择全部
			type: Boolean,
			default: true
		},
		clearColor: {
			type: String,
			default: '#f5105c'
		},
		selectedColor: {
			type: String,
			default: '#0099FF'
		},
		unSelectedColor: {
			type: String,
			default: 'rgba(0,0,0,.7)'
		},
		selectBorderColor: {
			type: String,
			default: '1px solid rgba(255,255,255,.7)'
		},
		selectColor: {
			type: String,
			default: '#fff'
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
		if (this.value && Array.isArray(this.value) && this.value.length > 0) {
			itemArray = this.value;
		} else {
			itemArray = [];
		}
		let clipConfig = Object.assign({}, CLIPDEFALUT, this.clipParam);
		return {
			clipConfig,
			itemArray,
			sortSelectionArray: [],
			sortSelectionCheckArray: []
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
		onChooseClipImage() {
			this.$emit('clipChoose');
		},

		onClipComplete(data) {
			this.$emit('clipComplete');
			uni.compressImage({
				src: data.path,
				quality: 90,
				success: async res => {
					this.itemArray.push({ path: res.tempFilePath });
					this.setValue(this.getItemArray());
				}
			});
		},

		chooseImg() {
			// 支持裁剪
			if (this.clip) {
				this.$refs.clip.fChooseImg('', this.clipConfig);
				return;
			}

			uni.chooseImage({
				success: async res => {
					let tempFiles = res.tempFiles;
					let overflow = false;
					for (var i = 0; i < tempFiles.length; i++) {
						let path = await util.getCompressImage(tempFiles[i].path);
						let size = await util.getFileSize(path);
						if (size > 500) {
							overflow = true;
						} else {
							this.itemArray.push({ path });
						}
					}
					if (overflow) {
						uni.showToast({ icon: 'none', title: '超过5M的图片无法上传' });
					}
					this.setValue(this.getItemArray());
				}
			});
		},
		clearPic({
			currentTarget: {
				dataset: { picsindex }
			}
		} = {}) {
			const oldPath = this.itemArray[picsindex].path;
			this.itemArray.splice(picsindex, 1);
			if (this.sortSelection) {
				const selectionIndex = this.sortSelectionCheckArray.findIndex(item => item.path === oldPath);
				if (selectionIndex >= 0) {
					this.sortSelectionCheckArray.splice(selectionIndex, 1);
				}
				this.checkPicsCheckObj();
			}
			this.setValue(this.getItemArray());
		},
		showImg({
			currentTarget: {
				dataset: { picsindex }
			}
		} = {}) {
			_app.previewImage(this.itemArray.map(item => item.path), picsindex);
		},
		sortSelectionFc({
			currentTarget: {
				dataset: { picsindex }
			}
		} = {}) {
			const hasIndex = this.sortSelectionCheckArray.findIndex(item => item.path === this.itemArray[picsindex].path);
			if (hasIndex >= 0) {
				this.sortSelectionCheckArray.splice(hasIndex, 1);
			} else {
				this.sortSelectionCheckArray.push(this.itemArray[picsindex]);
			}
			this.setValue(this.getItemArray());
			this.checkPicsCheckObj();
		},
		checkPicsCheckObj(vbName) {
			const newArray = [];
			const itemArray = this.itemArray;
			const sortSelectionCheckArray = this.sortSelectionCheckArray;
			for (let i = 0; i < itemArray.length; i++) {
				const index = sortSelectionCheckArray.findIndex(ite => ite.path === itemArray[i].path);
				if (index >= 0) {
					newArray.push(index + 1);
				} else {
					newArray.push('');
				}
			}
			this.sortSelectionArray = newArray;
		},
		setData(newArr) {
			this.itemArray = newArr;
			if (this.sortSelection) {
				this.sortSelectionCheckArray = [];
			}
			this.setValue(this.getItemArray());
			this.checkPicsCheckObj();
		},
		setUpLoadData(obj) {
			this.upLoadData = obj;
			if (this.sortSelection) {
				this.sortSelectionCheckArray = [];
			}
			this.setValue(this.getItemArray());
			this.checkPicsCheckObj();
		},
		getUpLoadPromiseArray() {
			return _app.getUpLoadPromiseArray({
				itemArray: [...this.getItemArray()],
				customId: this.customId,
				upLoadData: this.upLoadData,
				required: this.required
			});
		},
		getItemArray() {
			if (this.sortSelection) {
				if (this.sortSelectionCheckArray.length > 0) {
					return this.sortSelectionCheckArray;
				} else {
					if (this.defaultSelectAll) {
						return this.itemArray;
					} else {
						return [];
					}
				}
			} else {
				return this.itemArray;
			}
		}
	},
	mixins: [
		QSInputsMixin({
			QSInputsType: _app.typeObj.infinitePics
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
	font-size: 12px;
	left: 45rpx;
}
.flex_column_label {
	position: absolute;
	top: 60rpx;
	color: red;
	font-size: 12px;
	left: 55rpx;
}
</style>
