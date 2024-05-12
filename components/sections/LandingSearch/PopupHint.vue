<script setup lang="ts">
import type { SearchedInstanceType } from '@/types';

defineProps<{
    searchedInstance: SearchedInstanceType;
}>();
// const { data: productImage } = client.storage
//     .from('product_images')
//     .getPublicUrl(data!.pictures[0]);
</script>

<template>
    <div class="popup-hint">
        <div class="img-container"></div>

        <div class="text">
            {{ searchedInstance.title }}
            <!--            {{ searchedInstance.description }}-->
            <!--            {{ searchedInstance.price }}-->
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
