<script setup lang="ts">
const isAvailabilityChecked = ref(true);
</script>

<template>
    <ElCheckbox v-model="isAvailabilityChecked" size="large" class="checkbox">
        только товары в наличии
    </ElCheckbox>
</template>

<style scoped lang="scss">
@media (max-width: 980px) {
    .checkbox {
        margin-bottom: 18px;
        padding-left: 10px;
    }
}
</style>
