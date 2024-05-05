<script setup lang="ts">
defineProps<{
    cityName: string;
    phoneNumber: string;
    addresses: {
        name: string;
        full: string;
        workHours: string;
    }[];
}>();
</script>

<template>
    <div class="address-component">
        <span class="city-name"> {{ cityName }}: </span>

        <div
            class="city-addresses"
            v-for="(address, index) in addresses"
            :key="index"
        >
            <span class="address-name">
                {{ address.name }}
            </span>

            <span class="full-address">
                {{ address.full }}
            </span>

            <span class="working-time">
                {{ address.workHours }}
            </span>
        </div>

        <span class="phone-number">
            {{ phoneNumber }}
        </span>
    </div>
</template>

<style scoped lang="scss">
.address-component {
    margin-top: 45px;
    line-height: 130%;

    @media (max-width: 900px) {
        margin-top: 30px;
    }

    .city-name {
        display: block;
        font-weight: bold;
    }

    .city-addresses {
        margin-top: 30px;

        @media (max-width: 900px) {
            margin-top: 20px;
        }

        .address-name {
            display: block;
            font-weight: bold;
        }

        .full-address {
            display: block;
        }

        .working-time {
            display: block;
        }
    }

    .phone-number {
        display: block;
        margin-top: 30px;

        @media (max-width: 900px) {
            margin-top: 20px;
        }
    }
}
</style>
