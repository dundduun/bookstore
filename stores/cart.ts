import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore(
    'cart',
    () => {
        const cart = ref<{ id: string; amount: number }[]>([
            { id: '9c356792-ef0b-4cd8-96cc-98a76b1a5cfc', amount: 1 },
            { id: '44e577c1-8221-4e0c-aafe-1c2a3cbe5c35', amount: 1 },
            { id: 'be2f4adf-3400-43d6-83c6-cea12e90ba59', amount: 1 },
        ]);

        function addToCart(id: string) {
            for (const product of cart.value) {
                if (product.id === id) {
                    product.amount += 1;
                    return;
                }
            }

            cart.value.push({ id: id, amount: 1 });
            return;
        }

        function removeFromCart(id: string) {
            const index = cart.value.findIndex((product) => product.id === id);
            if (index !== -1) {
                cart.value.splice(index, 1);
            }
        }

        const goodsAmount = computed(() => {
            const goodsAmount = ref(0);
            for (const product of cart.value) {
                goodsAmount.value += product.amount;
            }

            return goodsAmount.value;
        });

        function clearCart() {
            cart.value = [];
        }

        return { cart, addToCart, removeFromCart, clearCart, goodsAmount };
    },
    {
        persist: true,
    },
);
