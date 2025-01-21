<script setup lang="ts">
const sortOptions = [
    { text: 'дата: сперва новые' },
    { text: 'дата: сперва старые' },
    { text: 'название: А-Я' },
    { text: 'название: Я-А' },
    { text: 'цена: по убыванию' },
    { text: 'цена: по возрастанию' },
];

const activeSort = ref('');
</script>

<template>
    <div class="sort-filter">
        <div
            v-for="(option, index) in sortOptions"
            :key="index"
            @click="activeSort = option.text"
            :class="['option', { active: activeSort === option.text }]"
        >
            {{ option.text }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.sort-filter {
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;

    .option {
        transition: 0.2s;
        width: 100%;
        padding: 10px 0 10px 10px;
        cursor: pointer;

        @media (hover: hover) {
            &:hover {
                background-color: $catalog-filter;
            }

            &:active {
                background-color: $catalog-filter;
            }
        }

        &.active {
            background: $active-ok-button;
        }
    }
}
</style>
