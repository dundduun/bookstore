<script setup lang="ts">
import Header from '@/components/ui/header/Header.vue';
import Footer from '@/components/ui/footer/Footer.vue';
</script>

<template>
    <div>
        <Header />

        <slot />

        <Footer />
    </div>
</template>
