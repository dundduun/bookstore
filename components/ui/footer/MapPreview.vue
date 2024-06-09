<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
const config = useRuntimeConfig();

const zoom = ref(5);

const tileUrl =
        config.public.vercelEnv === 'production'
            ? 'https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
</script>

<template>
    <div class="map-preview">
        <LMap
            class="map"
            v-model="zoom"
            v-model:zoom="zoom"
            :center="[57.925154, 33.924931]"
        >
            <LTileLayer :url="tileUrl" />
            <LMarker :lat-lng="[59.939343, 30.285361]">
                <LPopup>
                    masters bookstore
                    <br />
                    Санкт-Петербург, Василеостровский рынок,
                    <br />
                    Большой проспект В.О., 16
                </LPopup>
            </LMarker>

            <LMarker :lat-lng="[55.763346, 37.591171]">
                <LPopup>
                    masters bookstore
                    <br />
                    Москва, Малый Патриарший переулок, 5с1
                </LPopup>
            </LMarker>
        </LMap>
    </div>
</template>

<style scoped lang="scss">
.map-preview {
    width: 50vw;
    height: 100%;
    z-index: 0;

    @media (max-width: 900px) {
        width: 100%;
        height: 27%;
    }
}
</style>
