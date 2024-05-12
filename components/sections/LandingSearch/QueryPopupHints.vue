<script setup lang="ts">
import PopupHint from '@/components/sections/LandingSearch/PopupHint.vue';
import type { SearchProductResult } from '@/types';

defineProps<{
    containerWidth: string;
    searchedData: SearchProductResult;
}>();
</script>

<template>
    <div class="landing-query-popup-hints">
        <PopupHint
            v-for="(searchedInstance, index) in searchedData"
            v-key="searchedData[index].id"
            :searchedInstance="searchedInstance"
        />
    </div>
</template>

<style scoped lang="scss">
.landing-query-popup-hints {
    position: absolute;
    width: v-bind(containerWidth);
    height: 100px;
    margin-right: 190px;
    margin-top: 150px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 600px) {
        margin-top: 110px;
        margin-right: 0;
    }
}
</style>
