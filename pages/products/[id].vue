<script setup lang="ts">
definePageMeta({
    layout: false,
})
</script>

<template>
    <div class="product-page">
        {{ $route.params.id }}
    </div>
</template>

<style scoped lang="scss">
.product-page {
    background-color: $product-page-background;
}
</style>