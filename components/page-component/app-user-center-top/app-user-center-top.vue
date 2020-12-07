<template>
    <view class="app-user-center-top cross-center" :style="{'background-image': 'url('+topPicUrl+')'}">
        <!-- style 3 start -->
        <view class=" row-itm style-3 box-grow-1 main-center" v-if="topStyle == '3'">
            <view class="style-3-container dir-left-nowrap cross-center"
                  :style="userCenter.style_bg_pic_url?`background-image: url(${userCenter.style_bg_pic_url})`:``">
                <view class="box-grow-0 avatar-container">
                    <image :src="avatar" :class="[userInfo!=null&&userInfo.is_vip_card_user && is_icon_super_vip == '1' ? 'avatar is_vip' : 'avatar']"></image>
                    <image v-if="userInfo!=null&&userInfo.is_vip_card_user && is_icon_super_vip == '1'" src="/static/image/vip_icon.png" class="vip_icon"></image>
                </view>
                <view class="box-grow-1 info-container">
                    <template v-if="isLogin">
						
                        <view class="nickname">{{userInfo.nickname}}</view>
                        <app-form-id v-if="userInfo.ck != null">
                            <view @click="go_ck_log" class="member-info inline-flex cross-center dir-left-nowrap">
                                <view>
                                    <image :src="getMemberPicUrl" class="member-icon" mode="aspectFill"></image>
                                </view>
                                <view>{{userInfo.ck.level_name}}</view>
                            </view>
                        </app-form-id>
                    </template>
                    <template v-else>
                        <app-form-id>
                            <view class="login-btn" @click="callLogin">点击登录</view>
                        </app-form-id>
                    </template>
                </view>
                <view v-if="false" class="box-grow-0 address-container">
                    <app-jump-button form url="/pages/address/address">
                        <view class="address-btn-3">
                            <image class="address-btn-icon" src="/static/image/icon/address-gray.png"></image>
                            <view>收货地址</view>
                        </view>
                    </app-jump-button>
                </view>
            </view>
        </view>
        <!-- style 3 end -->

        <!-- style 2 start -->
        <view class=" row-itm style-2 box-grow-1" v-else-if="topStyle == '2'">
            <view class="avatar-container">
                <image :src="avatar" :class="[userInfo!=null&&userInfo.is_vip_card_user && is_icon_super_vip == '1' ? 'avatar is_vip' : 'avatar']"></image>
                <image v-if="userInfo!=null&&userInfo.is_vip_card_user  && is_icon_super_vip == '1'" src="/static/image/vip_icon.png" class="vip_icon"></image>
            </view>
            <view class="info-container">
                <template v-if="isLogin">
                    <app-form-id  v-if="userInfo.ck != null">
                        <view @click="go_ck_log" class="member-info inline-flex cross-center dir-left-nowrap">
                            <view>
                                <image :src="getMemberPicUrl" class="member-icon" mode="aspectFill"></image>
                            </view>
                            <view>{{userInfo.ck.level_name}}</view>
                        </view>
                    </app-form-id>
                    <view class="nickname"
                          :class="[mall.setting.is_icon_members_grade != 1 ? 'no-member-icon' : '',]">
                        {{userInfo.nickname}}
                    </view>
                </template>
                <template v-else>
                    <app-form-id>
                        <view class="login-btn" @click="callLogin">点击登录</view>
                    </app-form-id>
                </template>
            </view>
        </view>
        <!-- style 2 end -->

        <!-- style 1 start -->
        <view class=" row-itm style-1 dir-left-nowrap cross-center box-grow-1" v-else-if="topStyle == '1'">
            <view class="box-grow-0 avatar-container">
                <image :src="avatar" :class="[userInfo!=null&&userInfo.is_vip_card_user && is_icon_super_vip == '1' ? 'avatar is_vip' : 'avatar']"></image>
                <image v-if="userInfo!=null&&userInfo.is_vip_card_user && is_icon_super_vip == '1'" src="/static/image/vip_icon.png" class="vip_icon"></image>
            </view>
            <view class="box-grow-1 info-container">
                <template v-if="isLogin">
					
                    <view class="nickname">{{userInfo.nickname}}</view>
                    <app-form-id v-if="userInfo.ck != null">
                        <view @click="go_ck_log" class="member-info inline-flex cross-center dir-left-nowrap">
                            <view>
                                <image :src="getMemberPicUrl" class="member-icon" mode="aspectFill"></image>
                            </view>
                            <view>{{userInfo.ck.level_name}}</view>
                        </view>
                    </app-form-id>
                </template>
                <template v-else>
                    <app-form-id>
                        <view class="login-btn" @click="callLogin">点击登录</view>
                    </app-form-id>
                </template>
            </view>
            <view v-if="false" class="box-grow-0 address-container">
                <app-jump-button form url="/pages/address/address">
                    <view class="address-btn-1 dir-left-nowrap cross-center" :class="[`${theme}-background`]">
                        <view>
                            <image class="address-btn-icon" src="/static/image/icon/address-white.png"></image>
                        </view>
                        <view>收货地址</view>
                    </view>
                </app-jump-button>
            </view>
        </view>
        <!-- style 1 end -->
		
		<view v-if="userCenter.is_foot_bar_status == 1" class="app-foot-list main-center">
		    <view @click="toNext(item.name)" class="app-foot-item main-center" v-for="(item, key) in userCenter.foot_bar" :key="key">
		        <image v-if="false" :src="item.icon_url"></image>
		        <view class="app-foot-info">
		            <view class="app-foot-num" v-if="key == 0">{{(userInfo!=null&&userInfo.favorite) ? userInfo.favorite : 0}}</view>
		            <view class="app-foot-num" v-if="key == 1 ">{{(userInfo!=null&&userInfo.footprint) ? userInfo.footprint : 0}}</view>
		            <view class="app-foot-name">{{item.name}}</view>
		        </view>
		    </view>
		    <view class="app-foot-line"></view>
		</view>
    </view>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    export default {
        name: 'app-user-center-top',
        props: {
            topStyle: String,
            topPicUrl: String,
            memberPicUrl: String,
            is_icon_super_vip: {
                type: String,
                default() {
                    return '0';
                }
            },
        },
        computed: {
            isLogin() {
                return this.$user.isLogin();
            },
            ...mapState({
                theme: state => state.mallConfig.theme,
                mall: state => state.mallConfig.mall,
				userInfo: state => state.user.info,
            }),
			/**
			 * ...mapGetters('userCenter', {
                foot_bar: 'foot_bar'
            })
			 */
            ...mapGetters({
                userCenter: 'mallConfig/getUserCenter',
                userInfo: 'user/info',
					
            }),
			
            avatar() {
                if (this.isLogin && this.userInfo) {
                    return this.userInfo.avatar;
                } else {
                    return '/static/image/user-default-avatar.png';
                }
            },
            getMemberPicUrl() {
                return this.memberPicUrl;
                // todo 此处选哪个图标待确认
                if (this.memberPicUrl) {
                    return this.memberPicUrl;
                } else {
                    return this.userInfo.identity.member_pic_url;
                }
            },
        },
        created() {
            if (this.isLogin) {
                this.$store.dispatch('user/info');
            } else {
            }
			console.log('userCenter==========='+JSON.stringify(this.userCenter));
        },
        methods: {
			go_ck_log(){
				uni.navigateTo({
					url:"/pages/user-center/usercklog/usercklog"
				})
			},
            callLogin() {
                this.$store.dispatch('user/accessToken');
            },
            goMember() {
                uni.navigateTo({
                    url: '/pages/member/index/index',
                });
            },
			toNext(name) {
			    if(name == '我的收藏') {
			        uni.navigateTo({
			            url: `/pages/favorite/favorite`,
			        });
			    }else {
			        uni.navigateTo({
			            url: `/pages/foot/index/index`,
			        });
			    }
			}
        },
    }
</script>

<style scoped lang="scss">

	
    .app-user-center-top {
        width: #{750rpx};
        display: flex;
		flex-direction: column;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        overflow: hidden;
    }

	.row-itm{
		
	}

    .avatar {
        width: #{132rpx};
        height: #{132rpx};
        border-radius: #{1000rpx};
    }

    .avatar.is_vip {
        border: #{8rpx} solid #ffe993;
    }

    .login-btn {
        display: inline-block;
        padding: #{12rpx} #{24rpx};
        font-size: $uni-font-size-import-one;
    }

    .avatar-container {
        padding: #{24rpx};
        position: relative;
    }

    .style-2 .vip_icon {
        left: 50%;
        margin-left: 29rpx;
    }

    .vip_icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 58rpx;
        height: 57rpx;
    }

    .info-container {
        padding: #{0rpx};
    }

    .address-container {
        padding: #{24rpx};
    }

    .member-info {
        background: #3c3642;
        color: #fff;
        font-size: $uni-font-size-weak-two;
        padding: #{6rpx} #{12rpx};
        border-radius: #{1000rpx};
        height: #{36rpx};
        line-height: #{36rpx};

        .member-icon {
            display: block;
            width: #{44rpx};
            height: #{44rpx};
            margin-top: -#{6rpx};
            margin-bottom: -#{6rpx};
            margin-left: -#{12rpx};
            margin-right: #{6rpx};
            border-radius: #{1000rpx};
            overflow: hidden;
        }
    }

    .address-btn-3 {
        text-align: center;
        font-size: $uni-font-size-general-two;
        color: $uni-general-color-two;

        .address-btn-icon {
            width: #{56rpx};
            height: #{56rpx};
        }
    }

    .address-btn-1 {
        padding: #{16rpx} #{18rpx};
        border-radius: #{1000rpx} 0 0 #{1000rpx};
        margin-right: -#{48rpx};

        .address-btn-icon {
            width: #{44rpx};
            height: #{44rpx};
            margin-right: #{12rpx};
            display: block;
        }
    }

    .style-3 {

        .style-3-container {
            background-color: #fff;
            border-radius: #{12rpx};
            width: #{656rpx};
            height: #{220rpx};
            background-size: 100% 100%;

            .nickname {
                margin-bottom: #{12rpx};
                color: $uni-important-color-black;
            }
        }
    }

    .style-2 {
        text-align: center;

        .info-container {
            margin-top: -#{50rpx};
        }

        .nickname {
            color: #fff;
        }

        .nickname.no-member-icon {
            margin-top: #{20rpx};
        }

        .login-btn {
            color: #fff;
            margin-top: #{40rpx};
        }
    }

    .style-1 {
        padding: 0 #{24rpx};

        .nickname {
            color: #fff;
            margin-bottom: #{12rpx};
        }
    }
	
	.app-foot-list {
		width:  #{750rpx};;
	    position: relative;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	    .app-foot-item {
	        font-size: #{26rpx};
	        color: #666666;
	        padding-top: #{14rpx};
	        width: 50%;
	        image {
	            margin-top: #{44rpx};
	            width: #{40rpx};
	            height: #{40rpx};
	            margin-right: #{17rpx};
	        }
	        .app-foot-info {
	            text-align: center;
	            .app-foot-num {
	                font-size: #{32rpx};
	                margin-bottom: #{10rpx};
					font-weight: bold;
					color: white;
	            }
				.app-foot-name{
					font-size: #{32rpx};
					margin-bottom: #{10rpx};
					color: white;
				}
	        }
	    }
	    .app-foot-line {
	        height: #{40rpx};
	        width: #{2rpx};
	        background-color: #666666;
	        position: absolute;
	        top: #{45rpx};
	        left: 50%;
	        margin-left: #{-2rpx};
	    }
	}

</style>