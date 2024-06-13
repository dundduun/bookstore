<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';

import ProductData from '@/components/pages/product/ProductData.vue';
import ExitAndBuyButtons from '@/components/pages/product/ExitAndBuyButtons.vue';
const router = useRouter();

definePageMeta({
    layout: false,
});

const { escape } = useMagicKeys();

watch(escape, (v) => {
    if (v) router.push('/');
});
</script>

<template>
    <div class="product-page">
        <div class="container">

            <ProductData />

            <ExitAndBuyButtons />
        </div>
    </div>
</template>

<style lang="scss">
.product-page {
    width: 100%;
    background-color: $product-page-background;

    .container {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 100px;
    }
}
</style>
