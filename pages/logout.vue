<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

cartStore.clearCart();

onMounted(() => {
    localStorage.removeItem('bookshelf-token');
});
</script>

<template>
<main class="page-template">
    <div class="page-container">
        <div class="exit-success">
            выход прошёл успешно!
        </div>

        <NuxtLink class="basic-button" to="/">на главную</NuxtLink>
    </div>
</main>
</template>

<style scoped lang="scss">
.page-container {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.exit-success {
    font-size: 40px;
    padding: 70px;
    border-radius: 7px;
    background-color: green;
    color: white;
}

.basic-button {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>