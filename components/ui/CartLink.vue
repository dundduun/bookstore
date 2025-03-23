<template>
    <div class="cart-link">
<!--        <NuxtLink to="/cart">-->
            <div class="icon-container">
                <img src="@/public/cart-icon.svg" class="cart-icon" alt="К корзине">
            </div>
<!--        </NuxtLink>-->
    </div>
</template>

<style scoped lang="scss">
.cart-link {
    z-index: 999;
    position: fixed;
    top: 20vh;
    right: 3vw;
    display: block;
    cursor: pointer;

    @media (max-width: 980px) {
        top: unset;
        bottom: 10vh;
    }

    .icon-container {
        background-color: #292929;
        padding: 20px;
        border-radius: 100%;

        .cart-icon {
            display: block;
            width: 40px;
            height: 40px;
        }
    }
}
</style>
<script setup lang="ts">
</script>