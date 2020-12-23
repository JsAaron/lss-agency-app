<template>
	<view>
		<view class="flex-column">
			<view class="content">
				<image class="logo" src="/static/image/logo.png" />
				<view class="mainInfo">
					<text class="title">{{ version }}</text>
					<text class="tip">\n{{ Mtip }}</text>
				</view>
				<text class="line" />
			</view>
			<view>
				<view class="infoContentTitle">
					<image class="infoPic" src="/static/image/update/info-circle.png" />
					<text class="infoTitle">更新摘要</text>
				</view>
				<view class="infoContent">
					<text class="updateInfo">{{ updateInfo }}</text>
				</view>
			</view>
			<view v-if="!currentIsLatest">
				<view class="infoContentTitle">
					<image class="infoPic" src="/static/image/update/sync.png" />
					<text class="infoTitle">更新大小</text>
				</view>
				<view class="infoContent">
					<text class="updateInfo">{{ packgeSize }}</text>
				</view>
			</view>
			<view class="minorContent">
				<app-watch-login
					bgColor="rgb(8, 128, 218)"
					text="手动下载手动安装"
					@click.native="onTapUrl()"
				></app-watch-login>
				<app-watch-login
					bgColor="rgb(8, 128, 218)"
					text="自动下载自动安装"
					:rotate="isRotate"
					@click.native="onUpdate()"
				></app-watch-login>
				<view class="update-pocess" v-if="isRotate">
					<text>下载进度:{{ percent }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			currentIsLatest: '',
			packgeSize: '15M',
			version: 111, // 主标题显示版本号
			Mtip: '更新新版本', // 小提示标语
			updateInfo: '无', // 更新摘要
			percent: 0,
			isRotate: false
		};
	},
	onLoad(options) {
		this.updateInfo = options.content;
		this.url = options.url;
		if (options.size && options.size != 'undefined') {
			this.packgeSize = options.size;
		}
		if (options.version && options.size != 'undefined') {
			this.version = options.version;
		}
	},
	props: {},
	created() {},
	methods: {
		checkNetwork(callback) {
			uni.getNetworkType({
				success: function(res) {
					if (res.networkType == 'none') {
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '没检测到网络,请确定网络是否连接成功',
							duration: 1500
						});
						return;
					}
					if (res.networkType == 'wifi') {
						callback();
					} else {
						uni.showModal({
							title: '提示',
							content: `检测到当前使用的是${res.networkType}网络,确定更新吗?`,
							success: function(res) {
								if (res.confirm) {
									callback();
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			});
		},

		onTapUrl() {
			this.checkNetwork(() => {
				plus.runtime.openURL(this.url, function(res) {
					console.log(res);
				});
			});
		},
		onUpdate() {
			this.checkNetwork(() => {
				this.isRotate = true;
				uni.showToast({
					icon: 'none',
					mask: true,
					title: '新版本下载完成后将自动弹出安装程序',
					duration: 5000
				});
				var dtask = plus.downloader.createDownload(this.url, {}, (d, status) => {
					// 下载完成
					if (status == 200) {
						uni.hideToast();
						plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, error => {
							this.isRotate = false;
							uni.showToast({
								icon: 'none',
								mask: true,
								title: '安装成功',
								duration: 1500
							});
							plus.runtime.restart();
						});
					} else {
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '下载失败',
							duration: 1500
						});
						this.isRotate = false;
					}
				});
				dtask.start();
				dtask.addEventListener('statechanged', (download, status) => {
					switch (download.state) {
						case 2:
							break;
						case 3:
							var percent = (download.downloadedSize / download.totalSize) * 100;
							this.percent = parseInt(percent) + '%';
							break;
						case 4:
							this.percent = '100%';
							break;
					}
				});
			});
		}
	}
};
</script>

<style lang="scss">
.update-pocess {
	display: flex;
	align-items: center;
	justify-content: center;
}

.header {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 350rpx;
	width: 100%;
	color: #ffffff;

	&__password {
		margin-top: 30rpx;
		color: #007aff;
		background: #fff;
		border-radius: 20px;
		padding: 7rpx 25rpx;
		font-size: 25rpx;
	}

	&__text {
		font-size: 20px;
	}
}

.list {
	background-color: #fff;

	&__row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		font-size: 28rpx;

		> text {
			padding: 10rpx 0;
		}
	}
}

.update {
	display: flex;
	align-items: center;
	justify-content: center;

	&__content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		font-size: 28rpx;
		background: red;
		color: #fff;
		margin: 0 20rpx;
	}
}

.flex-column {
	display: flex;
	flex-direction: column;
}
.content {
	text-align: center;
}
.minorContent {
	width: 650upx;
	padding: 100rpx 50upx;
}
.process {
	margin-top: 200upx;
	margin-left: 30%;
}
.logo {
	height: 200upx;
	width: 200upx;
	margin-top: 100upx;
}
.title {
	font-size: 36upx;
	color: #373737;
	font-weight: bold;
}
.infoTitle {
	font-size: 32upx;
	color: #373737;
	padding-left: 15upx;
	font-weight: bold;
}
.tip {
	font-size: 28upx;
	color: #7e7e83;
	vertical-align: text-top;
}

.line {
	padding: 0 600upx;
	border-bottom: 2upx solid #d8d8d8;
}
.infoPic {
	height: 50upx;
	width: 50upx;
}
.infoContentTitle {
	display: flex;
	align-items: center;
	padding: 40upx 40upx;
}
.infoContent {
	display: flex;
	align-items: center;
}
.updateInfo {
	font-size: 28upx;
	color: #7e7e83;
	padding: 0 80upx;
}
.smallTitle {
	font-size: 26upx;
	font-weight: 500;
	padding: 20upx 0;
	line-height: 1.5;
	color: #888;
}
</style>
