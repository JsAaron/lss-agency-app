<template>
	<view class="app-view" :style="{backgroundColor: newData.background}">
<!--		<app-jump-button open_type="navigate" url="../search/search" height="100" width="100" form>-->
<!--			<view class="app-text dir-left-nowrap cross-center" :style="{color: `${newData.textColor}`}" :class="[`${newData.textPosition === 'center' ? 'main-center' : 'main-left'}`]">-->
<!--				<icon class="app-icon"></icon>-->
<!--				<text>{{newData.placeholder}}</text>-->
<!--			</view>-->
<!--			<view class="input" :style="{backgroundColor: newData.color, borderRadius: `${newData.radius}rpx`,color: `${newData.textColor}`}"></view>-->
<!--		</app-jump-button>-->
		<view class="jump dir-left-nowrap main-center cross-center" @click="jump_route()">
			<view class="input main-center" :style="{backgroundColor: newData.color, borderRadius: `${newData.radius}rpx`,color: `${newData.textColor}`}">
				<view class="app-text dir-left-nowrap cross-center" :style="{color: `${newData.textColor}`}" :class="[`${newData.textPosition === 'center' ? 'main-center' : 'main-left'}`]">
					<icon class="app-icon"></icon>
					<text>{{newData.placeholder}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import appInput from '../../basic-component/app-input/app-input.vue';
	
    export default {
        name: 'app-search-for',
	    
	    props: {
            value: {
                type: Object,
	            default: function() {
	                return {
                        background: `#efeff4`,
                        color: '#ffffff',
                        placeholder: '搜索',
                        radius: 28,
                        textColor: '#999999',
                        textPosition: `center`,
	                }
	            }
            }
	    },
	    components: {
		    'app-input': appInput,
	    },
		data() {
            return {
                newData: this.value
			};
		},
		methods: {
			jump_route() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
    }
</script>

<style scoped lang="scss">
	.jump {
		width: 100%;
		height: 100%;
	}
	.app-view {
		height: #{88rpx};
		width: #{750rpx};
		position: relative;
		border-radius: 0;
		border: none;
	}
	.app-text {
		z-index: 1000;
		width: #{704rpx};
		height: #{58rpx};
		line-height: #{58rpx};
	}
	.app-text text {
		font-size: #{26rpx};
	}
	.app-icon {
		margin-right: #{12rpx};
		margin-left: #{12rpx};
		width: #{25rpx};
		height: #{25rpx};
		background-size: 100% 100%;
		background-image: url("../../../static/image/icon/search.png");
	}
	
	.input {
		height: #{58rpx};
		width: #{704rpx};
		border: #{1rpx} solid #dcdfe6;
	}
</style>