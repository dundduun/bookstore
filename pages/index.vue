<script setup lang="ts">
import Carousel from '@/components/ui/header/carousel/Carousel.vue';
import LandingSearch from '@/components/sections/landing-search/LandingSearch.vue';
import RecommendedItem from '@/components/sections/RecommendedItem.vue';
import MapPreview from '@/components/ui/footer/MapPreview.vue';
import Contacts from '@/components/ui/footer/contacts/Contacts.vue';
import SocialMedia from '@/components/ui/footer/SocialMedia.vue';
</script>

<template>
    <Carousel />

    <LandingSearch />

    <RecommendedItem />

    <div class="store-locations">
        <MapPreview />
        <Contacts />
    </div>

    <SocialMedia />
</template>

<style scoped lang="scss">
.store-locations {
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
