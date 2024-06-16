<script setup lang="ts">
import ProductData from '@/components/pages/product/ProductData.vue';
import ExitAndBuyButtons from '@/components/pages/product/ExitAndBuyButtons.vue';
import SCSSVariables from 'assets/styles/variables.module.scss';
definePageMeta({
    layout: false,
});

const router = useRouter();
const { escape } = useMagicKeys();
watch(escape, (v) => {
    if (v) router.push('/');
});

const { $gsap } = useNuxtApp();
const { productPageBackground } = SCSSVariables;
onMounted(() => {
    $gsap.to('.product-page', {
        backgroundColor: productPageBackground,
        duration: 0.3,
    });
});
onBeforeRouteLeave(() => {
    $gsap.to('.product-page', { opacity: 0, duration: 0.4 });
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
    background-color: white;

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
