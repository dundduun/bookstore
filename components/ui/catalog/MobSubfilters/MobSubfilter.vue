<script setup lang="ts">
import AvailCheckbox from '@/components/ui/catalog/MobSubfilters/AvailCheckbox.vue';
import PriceRegulator from '@/components/ui/catalog/MobSubfilters/PriceRegulator.vue';
// import sort component

defineProps<{
    componentName: string;
    localName: string;
}>();

const components: object = {
    AvailCheckbox,
    PriceRegulator,
    // sort component
}

const isActive = ref(false); // will disappear when pinia come
</script>

<template>
    <div class="subfilter" :class="{ active: isActive }">
        <div class="title" @click="isActive = !isActive">
            <span>{{ localName }}</span>

            <img class="chevron-icon" src="@/assets/images/left-chevron.png" />
        </div>

        <Transition name="expand">
            <div class="content" v-if="isActive">
                <component :is="components[componentName as keyof object]"></component>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.subfilter {
    &.active {
        .title {
            filter: invert(60%) sepia(0%) saturate(55%) hue-rotate(157deg)
                brightness(106%) contrast(92%);

            .chevron-icon {
                transform: rotate(270deg);
            }
        }
    }

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.2s;
        width: 100%;
        height: 48px;
        cursor: pointer;

        .chevron-icon {
            height: 15px;
            transform: rotate(180deg);
            transition: 0.2s;
        }
    }

    .content {
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        width: 100%;
        height: 58px;
    }

    .expand-enter-active,
    .expand-leave-active {
        transition: height 0.2s ease;
        overflow: hidden;
    }

    .expand-enter-from,
    .expand-leave-to {
        height: 0;
    }
}
</style>
