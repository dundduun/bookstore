import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
        const cart = ref<{ id: string, amount: number }[]>([]);

        function addToCart(id: string) {
            for (const product of cart.value) {
                if (product.id === id) {
                    product.amount += 1;
                    return;
                }
            }

            cart.value.push({ id: id, amount: 1});
            return;
        }

        function clearCart() {
            cart.value = [];
        }

        const goodsAmount = computed(() => {
            const goodsAmount = ref(0);
            for (const product of cart.value) {
                goodsAmount.value += product.amount;
            }

            return goodsAmount.value;
        });

        return { cart, addToCart, clearCart, goodsAmount };
    },
    {
        persist: true,
    },
);
