import { defineStore } from 'pinia';

export const useFiltersStore = defineStore(
    'filters',
    () => {
        return {
            showInStockOnly: true,
            sort: 'new-first', // isn't used
            minPrice: 0,
            maxPrice: 1_000_000,
        };
    },
    {
        persist: false,
    },
);
