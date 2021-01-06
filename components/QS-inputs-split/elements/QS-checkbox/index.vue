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
		<view v-if="rightMoreText" slot="rightButton">
			<view class="rightMore" @click="onMore">
				<view>{{rightMoreText}}</view>
				<uniIcon type="forward" :size="fontSize" color="red"></uniIcon>
			</view>
		</view>
		<view class="flex_row_none_c width100 padding_10unit_15unit">
			<checkbox-group @change="checkboxChange" class="width100 wrap" :class="itemLayout_computed">
				<label
					class="fontColor666666 flex_row_none_c marginRight_15unit padding_10unit"
					v-for="(checkboxItem, checkboxIndex) in itemArray || []"
					:key="checkboxIndex"
				>
					<checkbox
						:value="checkboxItem.value"
						:checked="getStatus[checkboxIndex]"
						:disabled="checkboxItem.disabled || disabled"
						:color="checkboxItem.color || color"
						:style="'transform: scale(' + (scale || '.8') + ');'"
					/>
					<view class="flex_row_none_c" :class="{'flex_row_none_disabled':checkboxItem.disabled}">{{ checkboxItem.name }}</view>
				</label>
			</checkbox-group>
		</view>
	</QStemplate>
</template>

<script>
import _app from '../../js/app.js';
import QStemplate from '../../template/template.vue';
import QSInputsMixin from '../../js/QSInputsMixin.js';
import uniIcon from '../../uniIcons/uni-icons.vue';

export default {
	components: {
		uniIcon,
		QStemplate
	},
	props: {
		rightMoreText:{
			type: String,
			default: ''
		},
		itemArray: {
			type: Array,
			default() {
				return [];
			}
		},
		color: {
			type: String,
			default: '#33cc33'
		},
		scale: {
			type: String,
			default: '.8'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getStatus() {
			const status = [];
			const value = this.value;
			const itemArray = this.itemArray;
			if (Array.isArray(value) && value.length > 0) {
				for (let i = 0; i < itemArray.length; i++) {
					const j = value.findIndex(item => item == itemArray[i].value);
					if (j >= 0) {
						status.push(true);
					} else {
						status.push(false);
					}
				}
			} else {
				itemArray.forEach(() => {
					status.push(false);
				});
			}
			return status;
		}
	},
	methods: {
		checkboxChange({ detail: { value } }) {
			this.setValue(value);
		},
		onMore(){
			this.$emit('clickRightMore');
		}
	},
	mixins: [
		QSInputsMixin({
			QSInputsType: _app.typeObj.checkbox
		})
	]
};
</script>

<style scoped>
@import url('../../css/inputs.css');
.rightMore{
	display: flex;
	align-items: center;
	margin-right: 20rpx;
	font-size:28rpx; 
	color:red;
}
.flex_row_none_disabled{
	color: #9b9a9c;
}
</style>
