<template>
  <view class="swiperContent">
    <swiper
      @change="change"
      @animationfinish="animationfinish"
      :indicator-dots="indicatorDots"
      :indicator-active-color="indicatorActiveColor"
      :indicator-color="indicatorColor"
      :autoplay="autoplay && flag"
      :current="current"
      :interval="interval"
      :duration="duration"
      :circular="circular"
      :vertical="vertical"
      :previous-margin="previousMargin"
      :next-margin="nextMargin"
      :display-multiple-items="displayMultipleItems"
      :skip-hidden-item-layout="skipHiddenItemLayout"
      :style="{ height: swiperHeight + 'rpx' }"
      :class="
        swiperType && displayMultipleItems == 1 && !vertical && !fullScreen
          ? 'cardSwiper'
          : ''
      "
      class="screen-swiper"
    >
      <swiper-item
        class="swiper-item"
        v-for="(item, index) in swiperList"
        :key="index"
        :class="
          cardCur == index &&
          displayMultipleItems == 1 &&
          !vertical &&
          !fullScreen
            ? 'cur'
            : ''
        "
      >
        <view
          v-if="item[imageKey] && !item[videoKey]"
          @click.stop="clickItem(index)"
        >
          <image
            :mode="mode"
            :src="item[imageKey]"
            :style="{ height: swiperHeight + 'rpx' }"
          ></image>
        </view>
        <view v-if="item[videoKey]" @click.stop="clickItem(index)">
          <video
            :src="item[videoKey]"
            @play="play"
            @pause="pause"
            :style="{ height: swiperHeight + 'rpx' }"
            autoplay
            loop
            muted
            :autoplay="videoAutoplay"
            objectFit="cover"
          ></video>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import jump from "../../../core/routeJump.js";

export default {
  name: "bw-swiper",
  props: {
    mode: {
      type: String,
      default: "scaleToFill",
    },
    swiperHeight: {
      type: Number,
      default: 350,
    },
    fullScreen: {
      // 是否全屏
      type: Boolean,
      default: false,
    },
    swiperList: {
      // 滑块视图容器数据
      type: Array,
      default: function () {
        return [];
      },
    },
    swiperType: {
      type: Boolean,
      default: false,
    },
    videoAutoplay: {
      type: Boolean,
      default: false,
    },
    videoKey: {
      type: String,
      default: "src",
    },
    imageKey: {
      type: String,
      default: "img",
    },
    skipHiddenItemLayout: {
      type: Boolean,
      default: false,
    },
    displayMultipleItems: {
      type: Number,
      default: 1,
    },
    nextMargin: {
      type: String,
      default: "0px",
    },
    previousMargin: {
      type: String,
      default: "0px",
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    circular: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 400,
    },
    interval: {
      type: Number,
      default: 5000,
    },
    current: {
      type: Number,
      default: 0,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    indicatorColor: {
      type: String,
      default: "#CCCCCC",
    },
    indicatorActiveColor: {
      type: String,
      default: "#ffffff",
    },
    indicatorDots: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      flag: true,
      cardCur: 0,
    };
  },

  methods: {
    play: function () {
      this.flag = false;
    },
    pause: function () {
      this.flag = true;
    },
    clickItem: function (index) {
      console.log(index);
      if (this.swiperList.length > 0) {
        jump({
          open_type: this.swiperList[index].open_type,
          params: this.swiperList[index].params,
          page_url: this.swiperList[index].page_url,
        });
        this.$emit("clickItem", this.swiperList[index]);
      }
    },
    change: function (e) {
      this.$emit("change", e);
    },
    animationfinish: function (e) {
      this.cardCur = e.detail.current;
      this.$emit("animationfinish", e);
    },
  },
};
</script>

<style lang="scss">
.cardSwiper .swiper-item {
  width: 86% !important;
  overflow: initial;
}

.cardSwiper .swiper-item view {
  width: 100%;
  display: block;
  height: 100%;
  border-radius: 10upx;
  transform: scale(0.93, 0.8);
  opacity: 0.7;
  transition: all 0.4s ease-in 0s;
  overflow: hidden;
  box-sizing: border-box;
  margin-left: 8.1%;
}

.cardSwiper .cur view {
  transform: initial;
  opacity: 1;
  transition: all 0.4s ease-in 0s;
}
.swiper-item view {
  height: 100%;
  width: 100%;
  position: relative;
}
.swiperText {
  position: absolute;
  color: #ffffff;
  z-index: 2;
  border-radius: 4upx;
  padding: 0 4upx;
}
.screen-swiper image {
  width: 100%;
  border-radius: 5px;
}
.screen-swiper video,
.swiper-item video {
  width: 100%;
  display: block;
  height: 100%;
}
.swiperContent {
  width: 100%;
}
</style>
