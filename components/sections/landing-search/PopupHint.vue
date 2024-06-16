<script setup lang="ts">
import type { SearchedInstanceResult } from '@/types';
import type { Database } from '@@/database.types';

const client = useSupabaseClient<Database>();
const productImage = ref({ publicUrl: '' });

const props = defineProps<{
    searchedInstance: SearchedInstanceResult;
}>();

function fetchImage() {
    if (props.searchedInstance.pictures[0]) {
        const { data } = client.storage
            .from('product_images')
            .getPublicUrl(props.searchedInstance.pictures[0]);
        productImage.value = data;
    }
}

onMounted(() => {
    fetchImage();
});

onBeforeUpdate(() => {
    productImage.value = { publicUrl: '' };
    fetchImage();
});
</script>

<template>
    <NuxtLink
        :to="{ name: 'product-id', params: { id: searchedInstance.id } }"
        class="popup-hint"
    >
        <div class="img-container">
            <img
                v-if="productImage.publicUrl"
                :src="productImage.publicUrl"
                class="product-image"
            />
        </div>

        <div class="text">
            <span class="title">
                {{ searchedInstance.title }}
            </span>

            <span class="description" v-html="searchedInstance.description" />

            <span class="price"> {{ searchedInstance.price }} р. </span>
        </div>
    </NuxtLink>
</template>

<style scoped lang="scss">
.popup-hint {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    transition: 0.2s;

    @media (hover: hover) {
        &:hover {
            background-color: $hint-background-light-gray;
        }
    }

    @media (hover: none) {
        &.active {
            background-color: $hint-background-light-gray;
        }
    }

    .img-container {
        width: 72px;
        height: 72px;
        flex: 0 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border: 1px $border-light-gray solid;

        .product-image {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    .text {
        max-width: calc(100% - 105px);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 15px;
        font-size: 16px;

        .title {
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 600;
        }

        .description {
            max-width: 100%;
            max-height: 19px;
            margin-top: 6px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 300;
        }

        .price {
            margin-top: 6px;
            font-weight: 600;
        }
    }
}
</style>
