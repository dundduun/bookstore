<script setup lang="ts">
import type { Database } from '~/database.types';
import { useCartStore } from '@/stores/cart';

const client = useSupabaseClient<Database>();

const props = defineProps<{
    product: {
        id: string;
        amount: number;
    }
}>();

const { data: fullProduct, error } = await client
    .from('product')
    .select('*')
    .eq('id', props.product.id)
    .single();

if (error) {
    alert('Перезагрузите страницу');
}

const picture = ref({ publicUrl: '' });
if (fullProduct) {
    if (fullProduct.pictures.length > 0) {
        const { data } = client.storage
            .from('product_images')
            .getPublicUrl(fullProduct.pictures[0]);
        picture.value = data;
    }
} else {
    alert('Перезагрузите страницу');
}

const cartStore = useCartStore();
function increaseAmount() {
    for (const item of cartStore.cart) {
        if (item.id === props.product.id) {
            item.amount += 1;
            return;
        }
    }
}

function decreaseAmount() {
    for (const item of cartStore.cart) {
        if (item.id === props.product.id) {
            item.amount -= 1;

            if (item.amount <= 0) {
                cartStore.removeFromCart(item.id);
            }
            return;
        }
    }
}

function removeFromCart() {
    cartStore.removeFromCart(props.product.id);
}
</script>

<template>
    <div class="card">
        <div v-if="fullProduct" class="content">
            <div class="picture-container">
                <img
                    v-if="picture.publicUrl"
                    class="picture picture-container-child"
                    :src="picture.publicUrl"
                    alt="Изображение"
                />

                <div v-else class="without-picture picture-container-child">
                    Без изображения
                </div>
            </div>

            <div class="name">{{ fullProduct.title }}</div>

            <div class="amount-container">
                <img src="@/public/minus-amount.svg" @click="decreaseAmount" class="control-icon" alt="Убавить" />
                <span class="amount-number">{{ product.amount }}</span>
                <img src="@/public/plus-amount.svg" @click="increaseAmount"  class="control-icon" alt="Прибавить" />
            </div>

            <div class="price">{{ fullProduct.price * product.amount }}р.</div>

            <div class="close">
                <img @click="removeFromCart" class="control-icon" alt="Убрать" src="@/public/circle-amount.svg" />
            </div>
        </div>
        <div v-else class="reload-window">
            Перезагрузите страницу
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    .content {
        display: grid;
        grid-template-columns: 2fr 3fr 2fr 1fr 1fr;
        grid-template-rows: 1fr;
        column-gap: 20px;
        justify-items: center;
        align-items: center;
        width: 1200px;
        height: 200px;

        max-width: 90vw;
        text-align: center;

        .picture-container {
            .picture-container-child {
                width: 100%;
                height: 200px;
                aspect-ratio: 1 / 1;
            }

            .picture {
                object-fit: cover;
            }

            .without-picture {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid $border-light-gray;
                font-size: 12px;
            }
        }

        .amount-container {
            display: flex;
            align-items: center;
            gap: 5px;

            .amount-number {
                text-align: center;
                width: 35px;
                font-size: 22px;
            }
        }

        .control-icon {
            width: 30px;
            height: auto;
            cursor: pointer;
        }
    }
}
</style>
