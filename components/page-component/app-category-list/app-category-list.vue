<template>
    <scroll-view scroll-y class="app-category-list"
                 :style="{height: `${noSetHeight}` ? `${noSetHeight}` : `${setHeight}`}">
		<view class="app-item dir-left-nowrap" v-for="(item, index) in list" :key="index" @click="active(item, index)">
			<view class="app-border" :class="{'app-active-b': item.active === true}"></view>
			<view class="app-text"  :class="{'app-active-f': item.active === true}">{{item.name}}</view>
		</view>
	</scroll-view>
</template>

<script>

    export default {
        name: 'app-category-list',
	    props: {
            list: {
                type: Array,
	            default() {
                    return [];
	            }
            },
            windowHeight: {
                type: Number,
	            default() {
                    return 0
	            }
            },
            windowWidth: {
                type: Number,
                default() {
                    return 0
                }
            },
            botHeight: {
                type: Number,
                default() {
                    return 0
                }
            },
            noSetHeight: {
                type: String
            }
	    },
	    methods: {
            active(item, index) {
                this.$emit('click', item, index);
            }
	    },
	    computed: {
		    setHeight() {
                let bottom = 0;
                if (this.$parent.$parent.$children[0].tabbarbool) {
                    bottom = this.botHeight;
                }
                console.log(bottom);
                return (this.windowHeight * (750 / this.windowWidth)) - bottom - 88 + 'rpx';
		    }
	    }
    }
</script>

<style scoped lang="scss">
	.app-category-list {
		width: #{204rpx};
		background-color: #f7f7f7;
		.app-item {
			width: #{204rpx};
			height: #{106rpx};
			background-color: #f7f7f7;
			.app-border {
				width: #{8rpx};
				height: #{106rpx};
				background-color: #f7f7f7;
			}
			.app-active-b {
				background-color: #ff4544;
			}
			.app-active-f {
				background-color: #ffffff !important;;
				color: #ff4544 !important;
			}
			.app-text {
				background-color: #f7f7f7;
				width: #{196rpx};
				height: #{106rpx};
				line-height: #{106rpx};
				text-align: center;
				font-size: #{28rpx};
				color: #666666;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}
	}
</style>