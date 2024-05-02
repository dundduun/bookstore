<script setup lang="ts">
import {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
} from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

const zoom = ref(6);
</script>

<template>
    <div class="map-container">
        <LMap
            class="map"
            v-model="zoom"
            v-model:zoom="zoom"
            :center="[57.925154, 33.924931]"
            @move="console.log('move')"
        >
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            >
            </LTileLayer>
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
.map-container {
    width: 50vw;
    height: 80vw;
    margin-top: 60px;

    .map {
        border: none;
    }
}
</style>