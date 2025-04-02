import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore(
    'cart',
    () => {
        const cart = ref<{ id: string; amount: number }[]>([    ]);

        function addToCart(id: string) {
            if (localStorage.getItem('bookshelf-token')) {
                for (const product of cart.value) {
                    if (product.id === id) {
                        product.amount += 1;
                        return;
                    }
                }

                cart.value.push({ id: id, amount: 1 });
                return;
            } else {
                alert('Вы не зарегистрированы!');
            }
        }

        function removeFromCart(id: string) {
            const index = cart.value.findIndex(product => product.id === id);
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
