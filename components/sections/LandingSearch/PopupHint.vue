<script setup lang="ts">
import type { SearchedInstanceResult } from '@/types';
import type { Database } from '@@/database.types';

const client = useSupabaseClient<Database>();
const productImage = ref({ publicUrl: '' });

const props = defineProps<{
    searchedInstance: SearchedInstanceResult;
}>();

if (props.searchedInstance.pictures[0]) {
    const { data } = client.storage
        .from('product_images')
        .getPublicUrl(props.searchedInstance.pictures[0]);
    productImage.value = data;
    console.log(productImage);
}

const finishedDescription = ref('');
if (props.searchedInstance.description.length > 60) {
    finishedDescription.value =
        props.searchedInstance.description.slice(0, 60) + '...';
} else {
    finishedDescription.value = props.searchedInstance.description;
}
</script>

<template>
    <div class="popup-hint">
        <div class="img-container">
            <img :src="productImage.publicUrl" class="product-image" />
        </div>

        <div class="text">
            <span class="title">
                {{ searchedInstance.title }}
            </span>

            <span class="description">
                {{ finishedDescription }}
            </span>

            <span class="price"> {{ searchedInstance.price }} р. </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.popup-hint {
    width: 100%;
    min-height: 100px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: $hint-background-light-gray;
    }

    .img-container {
        width: 72px;
        height: 72px;
        min-width: 72px;
        display: flex;
        justify-content: center;
        margin-left: 15px;
        align-items: center;
        background-color: white;
        border: 1px $border-light-gray solid;

        .product-image {
            height: auto;
            width: 50%;
        }
    }

    .text {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        font-size: 16px;

        .title {
            font-weight: 600;
        }

        .description {
            margin-top: 6px;
            font-weight: 300;
        }

        .price {
            margin-top: 6px;
            font-weight: 600;
        }
    }
}
</style>
