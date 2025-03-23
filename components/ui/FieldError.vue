<script setup lang="ts">
defineProps<{
    message: String,
}>();

const imposter = 'imposter';
</script>

<template>
    <div class="error-container">
        {{ message }}
    </div>
</template>

<style scoped lang="scss">
.error-container {
    display: flex;
    padding: 10px 20px;
    border: 1px solid #c30707;
    border-radius: 5px;
}
</style>

<!--<template>-->

<!--</template>-->
