<template>
	<view>
		<!-- 遮罩层 -->
		<view class="mask" @touchmove="preventTouchMove" v-if="show" @click="handleMaskClick"></view>
		<!-- 弹出层 -->
		<view class="modalDlg" v-if="show"><slot></slot></view>
	</view>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			value: false
		}
	},
	methods: {
		// 禁止屏幕滚动
		preventTouchMove: function() {},
		// 点击蒙层
		handleMaskClick() {
			this.$emit('mask');
		}
	}
};
</script>

<style scoped>
/* 遮罩层 */
.mask {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: #000;
	z-index: 9000;
	opacity: 0.5;
}

/* 弹出层 */
.modalDlg {
	width: 70vw;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	z-index: 9999;
	background-color: #fff;
	border-radius: 7px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
