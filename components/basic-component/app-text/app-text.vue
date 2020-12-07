<template>
    <text :style="{'font-size': `${fontSize ? fontSize : 32}rpx`, 'color': `${color}`}" :class="[theme ? `${theme}-color` : '']">
        <slot></slot>
    </text>
</template>

<script>
    export default {
        name: 'app-text',
        props: {
            theme: String,
            fontSize: String,
            color: String,
        }
    }
</script>

<style scoped lang="scss">
</style>