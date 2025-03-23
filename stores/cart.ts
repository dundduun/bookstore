import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
        const cart = ref<{ id: string, amount: number }[]>([]);

        // Add computed cart item's amount...

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

        function howMuchInCart() {
            return cart.value.length;
        }

        return { cart, addToCart, clearCart, howMuchInCart };
    },
    {
        persist: true,
    },
);
