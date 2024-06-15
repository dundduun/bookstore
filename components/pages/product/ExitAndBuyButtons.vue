<template>
    <div class="exit-buttons">
        <NuxtLink to="/" class="text-home-link">← На главную</NuxtLink>

        <NuxtLink to="/" class="mobile-home-link">
            <img src="@/assets/images/left-arrow.svg" alt="На главную" />
        </NuxtLink>

        <!-- set cross icon to catalogue when it's done (or to previous page) -->
        <NuxtLink to="/" class="catalogue-link">
            <img src="@/assets/images/cross-icon.svg" class="cross-icon" alt="На главную" />
        </NuxtLink>
    </div>

    <div class="mobile-buy-button-container">
        <button class="mobile-buy-button">Купить</button>
    </div>
</template>

<style scoped lang="scss">
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
        height: 50px;
        margin-top: 0;
        padding: 0 0 0 10px;
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

        @media (max-width: 560px) {
            display: block;
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
        width: 100%;
        padding: 12px 0;
        font-size: 14px;
        border: 2px $background solid;
        border-radius: 0;
        font-family: $font-family;
        color: $background;
        background-color: white;
        transition:
            color 0.3s,
            background-color 0.3s;
        cursor: pointer;

        @media (hover: hover) {
            &:hover {
                color: white;
                background-color: $background;
            }
        }

        @media (hover: none) {
            &:active {
                color: white;
                background-color: $background;
            }
        }
    }
}
</style>
