<template>
	<view>
		<view class="app-announcement" :style="{backgroundColor:background}">
			<app-form-id>
				<view class="app-announcement-view cross-center" @click="show">
					<view class="dir-left-wrap">
						<image class="app-icon-left" :src="icon ? icon : '/static/image/icon/icon-notice.png'" ></image>
						<text class="app-text app-name" :style="{color: textColor}">{{name}}</text>
					</view>
					<view class="content">
						<view class="content-child" :animation="animationData">
							<text :style="{color: textColor,}">{{content}}</text>
						</view>
					</view>
				</view>
			</app-form-id>
	</view>
	<view class="app-spring-board" v-show="showHidden">
		<view class="app-transparent-frame">
			<view class="app-top-image" :style="{backgroundImage: `url(${headerUrl})`}" v-if="headerUrl"></view>
			<view class="app-top-image icon" v-else></view>
			<view class="app-bottom-content">
				<scroll-view scroll-y class="app-text-content">
					<view>
						{{content}}
					</view>
				</scroll-view>
				<view class="app-content-button" :style="{width: `${btnWidth}rpx`}">
					<app-form-id>
						<app-button @click="showHidden=false"
						            :color="btnTextColor"
						            :background="btnColor"
						            fontSize="31"
						            type="important"
						            :roundSize="btnRadius">
							{{btnText}}
						</app-button>
					</app-form-id>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
    export default {
        name: 'app-announcement',
	    props: {
            background: {
                type: String,
				default() {
                    return '#f67f79';
				}
			},
            btnColor: {
                type: String,
				default() {
                    return '#ff4544';
				}
			},
            btnHeight: {
                type: Number,
				default() {
                    return 80;
				}
			},
            btnRadius: {
                type: String,
				default() {
                    return '40rpx';
				}
			},
            btnText: {
                type: String,
				default() {
                    return '我知道了';
				}
			},
            btnTextColor: {
                type: String,
				default() {
                    return '#ffffff';
				}
			},
            btnWidth: {
                type: Number,
				default() {
                    return 500;
				}
			},
            content: {
                type: String,
				default() {
                    return '';
				}
			},
            headerUrl: {
                type: String,
				default() {
                    return '';
				}
			},
            icon: {
                type: String,
				default() {
                    return '';
				}
			},
            name: {
                type: String,
                default() {
                    return '公告';
                }
            },
            textColor: {
                type: String,
                default() {
                    return '#ffffff';
                }
            },
	    },
	    data() {
            return {
                showHidden: false,
	            speed: 2000,
                animationData: null,
                animationTime: null,
                againTime: null,
                over: false,
                animation: {},
                duration: 0,
            }
	    },
	    methods: {
            show() {
                this.showHidden = true;
            },
            initAnimation() {
                let speed = this.content.length > 10 ? this.speed : 2000 + (10 - this.content.length) * 700;
                this.duration = this.content.length * 26 / 40 * speed;

                this.animation = uni.createAnimation({
                    transformOrigin: "50% 50%",
                    duration: this.duration,
                    timingFunction: "linear",
                    delay: 0,
                });
            },
            startAnimation() {
                // #ifdef MP-WEIXIN
                if (this.animation.option.transition.duration !== 0) {
                    this.animation.option.transition.duration = 0;
                    const resetAnimation = this.animation.translateX(this.content.length).step();
                    this.animationData = resetAnimation.export();
                }
                this.animation.option.transition.duration = this.duration;
	            // #endif
	            
                // #ifdef MP-ALIPAY
                if (this.animation.config.duration !== 0) {
                    this.animation.config.duration = 0;
                    const resetAnimation = this.animation.translateX(this.content.length).step();
                    this.animationData = resetAnimation.export();
                }
                this.animation.config.duration = this.duration;
                // #endif
	            
	            // #ifdef MP-TOUTIAO
                if (this.animation.option.duration !== 0) {
                    this.animation.option.duration = 0;
                    const resetAnimation = this.animation.translateX(this.content.length).step();
                    this.animationData = resetAnimation.export();
                }
                this.animation.option.duration = this.duration;
	            // #endif
	            
	            // #ifdef MP-BAIDU
                if (this.animation.duration !== 0) {
                    this.animation.duration = 0;
                    const resetAnimation = this.animation.translateX(this.content.length).step();
                    this.animationData = resetAnimation.export();
                }
                this.animation.duration = this.duration;
	            // #endif
	            
                this.animation.translateX(-this.content.length * 26).step();
                setTimeout(() => {
                    this.animationData = this.animation.export();
                }, 1000);
                let t = this.duration >= 52000 ? this.duration/2.5 : this.duration/1.5;
                this.againTime = setTimeout(() => {
                    this.startAnimation();
                }, t);
            }
	    },
	    watch: {
            content: {
                handler: function(value) {
                    if (value && !this.over) {
                        this.initAnimation();
                        this.startAnimation();
                        this.over = true;
                    }
                },
	            immediate: true,
	            deep: true,
            }
	    },
	    destroyed() {
            clearTimeout(this.animationTime);
            clearTimeout(this.againTime);
        }
    }
</script>

<style scoped lang="scss">
	.app-announcement {
		width: #{750rpx};
		height: #{72rpx};
		font-size: #{28rpx};
	}
	.content {
		position: relative;
		flex: 1;
		margin: #{0 30rpx};
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: #{72rpx};
		.content-child {
			height: #{72rpx};
			line-height: #{72rpx};
			position: absolute;
			>text {
				width: 100%;
				white-space: nowrap;
			}
		}
	}
	.app-announcement-view {
		width: #{750rpx};
		height: #{72rpx};
		position: relative;
	}
	.app-text-one {
		font-size:#{26rpx};
		white-space:nowrap;
	}
	.app-icon-left {
		width: #{36rpx};
		height: #{36rpx};
		margin-left: #{24rpx};
		margin-right: #{20rpx};
	}
	.app-icon-right {
		width: #{14rpx};
		height: #{24rpx};
		margin-right: #{4rpx};
	}
	.app-text {
		font-size:#{26rpx};
		overflow: hidden;
		word-break:keep-all;
		white-space:nowrap;
	}
	.app-name {
		max-width: #{180rpx};
		margin-right: #{10rpx};
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		display: inline-block;
	}
	.app-content-frame {
		overflow: hidden;
		width: #{560rpx};
		text-overflow: ellipsis;
		white-space: nowrap;
		position: relative;
		height: #{72rpx};
	}
	.app-animate {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.app-content {
		/*width:100%;*/
		display: block;
		transform: translateX(-50%);
		animation: mymove 100.5s infinite;
	}
	@keyframes mymove
	{
		0% {
			transform: translateX(0%);
		}
		
		100% {
			transform: translateX(-100%);
		}
	}
	
	.app-spring-board {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		z-index: 1600;
		background-color: rgba(153, 153,153,0.7);
	}
	.app-transparent-frame {
		height: #{540rpx};
		width: #{600rpx};
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.app-top-image {
		height: #{150rpx};
		width: #{600rpx};
		background-repeat: no-repeat;
		background-size: cover;

		&.icon {
			background-image: url("../../../static/image/icon/announcement.png");
		}
	}
	.app-text-content {
		display: block;
		min-height: #{144rpx};
		max-height: #{285rpx};
		width: #{500rpx};
		margin-bottom: #{66rpx};
		word-break: break-all;
		line-height: #{48rpx};
	}
	.app-bottom-content {
		background-color: #ffffff;
		padding: #{50rpx};
		border-bottom-right-radius: #{11rpx};
		border-bottom-left-radius: #{11rpx};
		.app-content-button {
			margin: 0 auto;
		}
	}
</style>