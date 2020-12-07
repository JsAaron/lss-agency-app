<template>
	<view class="app-account-style">
		<view class="app-account-style" :style="{ width: 702 / showCount + 'rpx' }">
			<app-jump-button form arrangement="column" :url="page" open_type="navigate">
				<template v-if="showCount >= 3">
					<view class="dir-top-nowrap" style="width: 100%;overflow: hidden">
						<view class="unit box-grow-1">
							<view class="t-omit">{{ text }}</view>
						</view>
						<view class="value box-grow-0">{{ value }}</view>
					</view>
				</template>
				<template v-else>
					<view class="dir-left-nowrap" :class="[showCount > 1 ? '' : 'data-col']">
						<view :class="[showCount > 1 ? '' : 'box-grow-0']"><image class="icon" :src="icon"></image></view>
						<view class="unit" :class="[showCount > 1 ? '' : 'box-grow-1']">
							<view class="t-omit">{{ text }}</view>
						</view>
						<view class="value" :class="[showCount > 1 ? '' : 'box-grow-0']">{{ value }}</view>
					</view>
				</template>
			</app-jump-button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'app-account-style',
	props: {
		showCount: Number,
		icon: String,
		text: String,
		value: Number,
		page: String
	}
};
</script>

<style scoped lang="scss">
.app-account-style {
}

.icon {
	width: #{26rpx};
	height: #{26rpx};
	display: block;
	margin-right: #{12rpx};
}

.unit {
	color: $uni-general-color-one;
	margin-right: #{16rpx};
	font-size: $uni-font-size-general-two;
}

.value {
	color: #333333;
	font-weight: bold;
	font-size: 40rpx;
}
</style>
