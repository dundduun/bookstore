import { defineStore } from 'pinia';

export const useStockStore = defineStore(
    'stock',
    () => {
        const showInStockOnly = ref(true);
        return { showInStockOnly }
    },
    {
        persist: true,
    },
);
