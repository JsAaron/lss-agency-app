<template>
	<view
			class="video-con"
		:style="{ height: height, width: width }"
	>
		<video
			:src="video_url"
			preload
			:controls="false"
			:style="{ height: height, width: width }"
			:loop="true"
			:id="`video_${video_id}`"
			:enable-progress-gesture="false"
			class="video"
			@play="setPlay"
			@waiting="waiting"
			@pause="pause"
		>
		</video>
		<image v-if="!play" class="pause" src="/static/image/video-play.png"></image>
		<image v-if="play && !loading" class="loading" src="/static/image/icon/loading.gif"></image>
	</view>
</template>

<script>
    export default {
        props: {
            video_id: {
                type: Number,
                default: 0
            },

            video_url: {
                type: String,
                default: ''
            },
            play: {
                type: Boolean,
                default: false
            },
            height: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: ''
            }
        },

		data() {
        	return {
				loading: true,
			}
		},
        methods: {

            videoPlay() {
            	console.log(`video_${this.video_id}`);
				this.videoCtx = uni.createVideoContext(`video_${this.video_id}`, this);
				if (this.play) {
                    this.videoCtx.play();
                } else {
                    this.videoCtx.pause();
                }
            },
			waiting(data) {
            	this.loading = false;
            	console.log(data);
			},
			pause(data) {
            	console.log('暂停');
			},
			setPlay() {
				this.loading = true;
			}
        },
        watch: {
            play: {
            	handler() {
            		console.log(1);
			        this.videoPlay();
			    },
            },
	        
        }
    };
</script>

<style lang="scss" scoped>
	.video {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.video-con {
		position: relative;
	}
	.pause {
		width: #{128upx};
		height: #{128upx};
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.loading {
		width: #{80upx};
		height: #{80upx};
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
