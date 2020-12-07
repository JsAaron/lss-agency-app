<template>
    <view class="app-hotspot" :style="aa">
        <app-jump-button :open_type="hotspot.link.openType" :url="hotspot.link.url" :params="hotspot.link.params">
            <slot></slot>
        </app-jump-button>
    </view>
</template>

<script>
    import appJumpButton from "../../basic-component/app-jump-button/app-jump-button.vue";

    export default {
        name: "app-hotspot",
        components: {
            appJumpButton,
        },
        props: {
            hotspot: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {}
        },
        onLoad() {
        },
        computed: {
            aa() {
                if (this.hotspot) {
                    return `left:${this.hotspot.left}rpx;top:${this.hotspot.top}rpx;width:${this.hotspot.width}rpx;height:${this.hotspot.height}rpx;`;
                } else {
                    return ``;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .app-hotspot {
        position: absolute;
        z-index: 1000;
    }
</style>
