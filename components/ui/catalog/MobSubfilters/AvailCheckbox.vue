<script setup lang="ts">
const isAvailabilityChecked = ref(true);
</script>

<template>
    <ElCheckbox v-model="isAvailabilityChecked" size="large" >
        только товары в наличии
    </ElCheckbox>
</template>
