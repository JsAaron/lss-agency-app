<template>
	<view class="app-video app-content" :style="{width: width, height: height}">
		<view class="app-video app-image" @click="play" v-if="!start">
			<image :src="picUrl" class="app-image" style="width: 100%;height:100%"></image>
			<view class="app-play app-image">
				<icon class="app-play-icon"></icon>
			</view>
		</view>
		<video id="myVideo" @fullscreenchange="fullscreenChange" v-else class="app-video video" :style="{width: width, height: height}" :autoplay="start" show-center-play-btn @error="error" :src="url"></video>
	</view>
</template>

<script>
	import * as event from '../../../core/event.js';

    export default {
        name: "app-video",
	    data() {
            return {
	            start: false,
                fullScreen: false,
            }
	    },
        props: {
			picUrl: {
			    type: String,
				default: () => {
				    return '';
				}
			},
			url: {
			    type: String,
				default() {
                    return '';
                }
            },
			width: {
			    type: String,
				default() {
			        return `750rpx`;
				}
			},
			height: {
			    type: String,
				default() {
			        return `422rpx`;
				}
			},
	    },
	    methods: {
            fullscreenChange(e) {
                this.fullScreen = e.detail.fullScreen;
		    },
		    play() {
			    this.$nextTick().then(() => {
                    this.start = true;
                });
                event.trigger(this.$const.EVENT_VIDEO_END);
                this.$emit('videoStart', true);
                event.on(this.$const.EVENT_VIDEO_END, true).then(() => {
                    this.start = false;
                    this.$emit('videoStart', false);
                });
		    },
            autoEnd() {
                if (!this.start || this.fullScreen) return;
                let maxTop = uni.getSystemInfoSync().windowHeight;
                let query = null;
                /* #ifndef MP-ALIPAY */
                query = this.createSelectorQuery();
				/* #endif */
	            /* #ifdef MP-ALIPAY */
                query = uni.createSelectorQuery();
	            /* #endif */
                query.select('.video').boundingClientRect();
                query.selectViewport().scrollOffset();
                query.exec(res => {
                    if (res[0].top <= -200 || res[0].top >= maxTop - 57) {
                        event.trigger(this.$const.EVENT_VIDEO_END);
                    }
                })
            }
	    },
		computed: {
            scrollTop() {
                return this.$store.state.page.scrollTop;
			}
		},
        watch: {
            scrollTop: {
                handler(v) {
                    this.autoEnd();
				},
				immediate: true
			}
        }
    }
</script>

<style scoped lang="scss">
	.app-content {
		position: relative;
	}
	.app-image {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height:100%;
	}
	.app-play-icon {
		width:#{130rpx};
		height: #{130rpx};
		background-image: url("../../../static/image/icon/play.png");
		background-size:100% 100%;
		position: absolute;
		top: 50%;
		z-index: 100;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>