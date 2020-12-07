<template>
    <view class="app-rule">
        <view class="rule-title" v-if="is_title">
            {{title}}
        </view>
        <view class="rule-content">
            <app-rich-text
                :content="content">
            </app-rich-text>
        </view>
    </view>
</template>

<script>
    import appRichText from "../../basic-component/app-rich/parse";

    export default {
        name: "app-rule",

        props: {
            title: String,
            content: String,
            is_title: {
                type: Boolean,
                default: false
            }
        },

        components: {
            'app-rich-text': appRichText
        },
    }
</script>

<style scoped lang="scss">
    .app-rule {
        padding: #{30upx};
        font-size: #{28upx};
        position: absolute;
        min-height: 100%;
        width: 100%;
        background-color: #ffffff;
    }
    .rule-content {
        color: #353535;
    }
    .rule-title {
        margin-bottom: #{30upx};
        color: #000000;
    }
</style>