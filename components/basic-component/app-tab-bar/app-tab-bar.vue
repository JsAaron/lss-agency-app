<template>
  <view
    class="app-navigation-bar"
    :style="{ height: botNavHei + 'rpx' }"
    :class="{ 'app-tab-bar-shadow': shadow }"
  >
    <view
      v-for="(item, index) in tabBarNavs.navs"
      :key="index"
      class="app-tab-bar-item box-grow-1"
      :style="{
        backgroundColor: bottom_background_color,
        width: `${100 / tabBarNavs.navs.length}%`,
      }"
    >
      <app-jump-button
        :backgroundColor="bottom_background_color"
        form
        class="app-button"
        :url="item.url"
        :open_type="item.open_type"
        :params="item.param"
        arrangement="column"
      >
        <image
          class="app-icon"
          :src="router === item.url ? item.active_icon : item.icon"
        ></image>
        <text
          class="app-nav-text"
          v-bind:style="{
            color: router === item.url ? item.active_color : item.color,
          }"
        >
          {{ item.text }}
        </text>
      </app-jump-button>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      router: "",
    };
  },
  props: {
    pageCount: Number,
  },
  computed: {
    ...mapGetters("mallConfig", {
      tabBarNavs: "getNavBar",
    }),
    ...mapGetters("iPhoneX", {
      botNavHei: "getNavHei",
    }),
    ...mapState("mallConfig", {
      bottom_background_color: (state) => state.navbar.bottom_background_color,
      shadow: (state) => state.navbar.shadow,
    }),
  },
  mounted() {
    this.router = this.$platDiff.tabBarUrl(null, this.pageCount);
  },
};
</script>

<style lang="scss" scoped>
.app-navigation-bar {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: white;
  z-index: 1600;
}

.app-nav-text {
  font-size: #{22rpx};
  line-height: #{22rpx};
  /*position: absolute;*/
  /*top: 0;*/
  margin-top: #{75rpx};
}
.app-icon {
  width: #{50rpx};
  height: #{50rpx};
  position: absolute;
  top: 0;
  left: 50%;
  margin-top: #{20rpx};
  transform: translateX(-50%);
}
.app-tab-bar-item {
  flex-grow: 1;
  position: relative;
}
.app-tab-bar-shadow {
  border-top: 1rpx solid $uni-weak-color-one;
}
</style>
