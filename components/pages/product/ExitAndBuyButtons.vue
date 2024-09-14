<script setup lang="ts">
const router = useRouter();
function goBack() {
    router.back();
}
</script>

<template>
    <div class="exit-buttons">
        <button @click="goBack" class="text-home-link">← Назад</button>

        <NuxtLink to="/" class="mobile-home-link">
            <img src="@/assets/images/left-arrow.svg" alt="На главную" />
        </NuxtLink>

        <!-- set cross icon to catalogue when it's done (or to previous page) -->
        <NuxtLink to="/" class="catalogue-link">
            <img
                src="@/assets/images/cross-icon.svg"
                class="cross-icon"
                alt="На главную"
            />
        </NuxtLink>
    </div>

    <div class="mobile-buy-button-container">
        <button class="mobile-buy-button">купить</button>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.exit-buttons {
    position: fixed;
    width: 100%;
    max-width: 2000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 2% 0;

    @media (max-width: 1100px) {
        background-color: $product-page-background;
    }

    @media (max-width: 560px) {
        position: fixed;
        height: 56px;
        margin-top: 0;
        padding: 0;
        background-color: $product-page-background;
        border-bottom: 1px $shadow solid;
    }

    .text-home-link {
        padding: 10px;
        text-decoration: none;
        color: $font-color;
        cursor: pointer;

        @media (max-width: 560px) {
            display: none;
        }
    }

    .mobile-home-link {
        display: none;
        height: 56px;
        width: 56px;

        @media (max-width: 560px) {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .cross-icon {
        height: 50px;
        width: auto;
        padding: 10px;

        @media (max-width: 560px) {
            display: none;
        }
    }
}

.mobile-buy-button-container {
    display: none;
    position: fixed;
    width: 100%;
    height: 80px;
    align-items: center;
    bottom: 0;
    padding: 0 20px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 -3px 10px $shadow;

    @media (max-width: 560px) {
        display: flex;
    }

    .mobile-buy-button {
        @include hover-button(white, $background);
        width: 100%;
        padding: 12px 0;
        font-size: 18px;
        border: 2px $background solid;
    }
}
</style>
