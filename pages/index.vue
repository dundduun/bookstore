<script setup lang="ts">
import MapPreview from '@/components/ui/footer/MapPreview.vue';
import Contacts from '@/components/ui/footer/Contacts.vue';
import SocialMedia from '@/components/ui/footer/SocialMedia.vue';
</script>

<template>
    <div class="map-contacts">
        <MapPreview />
        <Contacts />
    </div>
    <SocialMedia />
</template>

<style scoped lang="scss">
.map-contacts {
    height: 110vh;
    width: 100%;
    min-height: 930px;
    display: flex;
    flex-direction: row;
    margin-top: 60px;

    @media (max-width: 900px) {
        height: 1140px;
        flex-direction: column;
    }

    @media (max-width: 325px) {
        height: 1250px;
    }
}
</style>
