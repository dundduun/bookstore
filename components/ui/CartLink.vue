<script setup lang="ts">
import { watch, nextTick } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const showAnimation = ref(false);

watch(
    () => cartStore.goodsAmount,
    async () => {
        showAnimation.value = true;
        await nextTick().then(() => {
            return new Promise((resolve) => setTimeout(resolve, 300));
        }).then(() => {
            showAnimation.value = false;
        });
    },
);
</script>

<template>
    <div class="cart-link">
        <Transition name="fade">
            <div
                class="cart-link-container"
                :class="{ scaleUp: showAnimation }"
                v-if="cartStore.goodsAmount > 0"
            >
                <NuxtLink to="/cart">
                    <div class="icon-container">
                        <img
                            src="@/public/cart-icon.svg"
                            class="cart-icon"
                            alt="К корзине"
                        />
                    </div>
                    <div class="goods-amount">
                        <span>{{ cartStore.goodsAmount }}</span>
                    </div>
                </NuxtLink>
            </div>
        </Transition>
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

    .cart-link-container {
        transition: 0.25s;

        &.scaleUp {
            transform: scale(1.1);
        }

        &:hover {
            transform: scale(1.03);
        }

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

        .goods-amount {
            position: fixed;
            margin-top: -25px;
            margin-left: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: fit-content;
            min-height: 33px;
            min-width: 33px;
            padding: 7px;
            border-radius: 10px;
            background-color: $primary;
        }
    }
}
</style>
