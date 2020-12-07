<template>
    <view class="app-upload-image">
        <view class='upload-box' :style="{'background':backgroundColor}">
            <view class='flex-wrap'>
                <view v-for='(item, index) in imageList' :key='item.id' class='img-box'>
                    <view mode="aspectFill" @click='remove(index)' class='remove cross-center main-center'>x</view>
                    <image @click='previewImage(index)' :src='item' mode="aspectFill" class='img'></image>
                </view>
                <view @click='chooseImage'>
                    <view v-if='isAddImg' :style="{'margin':margin + 'rpx'}"
                          :class="{'other-border': diy ? true : false}"
                          class="add-img dir-top-nowrap cross-center main-center">
                        <image mode="aspectFill" class='add-img-icon' :src='defaultImg'></image>
                        <text class='text'>{{text}}</text>
                        <text class='text' v-if="showNumber">(最多{{maxNum}}张)</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>


<script>
    export default {
        props: {
            value: {
                default: null,
            },
            defaultImg: {
                // 添加图片的默认背景图片
                type: String,
                default: '/static/image/icon/icon-image.png'
            },
            maxNum: {
                // 可添加最大图片数量
                type: Number,
                default: 3
            },
            // 标记
            // 当组件用于循环时使用
            sign: {
                type: String,
                default: ''
            },
            backgroundColor: {
                type: String,
                default: '#f7f7f7',
            },
            margin: {
                type: String,
                default: '10'
            },
            diy: {
                type: Boolean,
                default: false
            },
            showNumber: {
                type: Boolean,
                default: true,
            },
            text: {
                type: String,
                default: '上传图片',
            },
            count: {
                type: Number,
                default: 9
            }
        },
        data() {
            return {
                imageList: this.value ? this.value : [],
                isAddImg: true
            }
        },
        methods: {
            // 上传最大图片数量
            checkMaxNum() {
                let status = this.imageList.length >= this.maxNum ? false : true;
                this.isAddImg = status;
            },
            // 移除图片
            remove(index) {
                let imageList = this.imageList;
                let data = imageList.splice(index, 1);
                this.imageList = imageList;
                this.checkMaxNum();

                // 触发事件 tabEvent
                this.$emit('imageEvent', {
                    imageList: imageList,
                    sign: this.sign
                })
            },
            // 选择图片
            chooseImage() {
                let self = this;
                let imageList = self.imageList;
                uni.chooseImage({
                    count: self.count,
                    success: function (e) {
                        for (let i in e.tempFilePaths) {
                            if (i >= (self.maxNum - imageList.length)) {
                                break;
                            }
                            let fileName = '';
                            // #ifdef MP-BAIDU
                            fileName = e.tempFilePaths[i].substr(e.tempFilePaths[i].lastIndexOf('/') + 1);
                            // #endif
                            uni.uploadFile({
                                url: self.$api.upload.file,
                                filePath: e.tempFilePaths[i],
                                name: 'file',
                                fileType: 'image',
                                formData: {
                                    file: e.tempFilePaths[i],
                                    file_name: fileName,
                                },
                                success(res) {
                                    const data = res.data;
                                    let result = null;
                                    if (typeof data === 'string') {
                                        result = JSON.parse(data);
                                    } else {
                                        result = data;
                                    }
                                    if (result.code == 0) {
                                        imageList.push(result.data.url)
                                        self.imageList = imageList;
                                        self.checkMaxNum();
                                        self.$emit('imageEvent', {
                                            imageList: imageList,
                                            sign: self.sign
                                        })
                                    } else {
                                        uni.showModal({
                                            title: '',
                                            content: result.msg,
                                            showCancel: false,
                                        })
                                    }
                                },
                                fail(e) {
                                    console.log('upload fail:', e);
                                    if (e && e.errMsg) {
                                        uni.showModal({
                                            title: '错误',
                                            content: e.errMsg,
                                            showCancel: false,
                                        });
                                    }
                                },
                            });
                        }
                    },
                    complete: function (e) {
                        // 触发事件 tabEvent
                        self.$emit('imageEvent', {
                            imageList: imageList,
                            sign: self.sign
                        })
                    }
                })
            },
            // 图片预览
            previewImage(index) {
                let imageList = this.imageList;
                uni.previewImage({
                    current: imageList[index],
                    urls: imageList
                })
            },
        },
        created() {
            this.checkMaxNum();
        }
    }
</script>

<style lang="scss" scoped>
    .upload-box {
        background-color: #fff;
    }

    .upload-box .title {
        padding: 15#{rpx} 0 15#{rpx} 20#{rpx};
    }

    .upload-box .img {
        width: 160#{rpx};
        height: 160#{rpx};
        margin: 10#{rpx};
        display: block;
    }

    .upload-box .add-img {
        width: 160#{rpx};
        height: 160#{rpx};
        border: 1#{rpx} dotted $uni-weak-color-one;
        background-color: #fff;
    }

    .upload-box .add-img .text {
        color: $uni-general-color-two;
        font-size: $uni-font-size-weak-two;
    }

    .upload-box .add-img-icon {
        width: 56#{rpx};
        height: 56#{rpx};
        margin-bottom: 10#{rpx};
    }

    .upload-box .img-box {
        position: relative;
    }

    .upload-box .remove {
        width: 55#{rpx};
        height: 55#{rpx};
        position: absolute;
        left: -5rpx;
        top: -10rpx;
        background: $uni-important-color-red;
        color: #fff;
        border-radius: 50%;
        padding-bottom: 8#{rpx};
    }

    .upload-box .add-img.other-border {
        border: 1#{rpx} solid $uni-weak-color-one
    }
</style>