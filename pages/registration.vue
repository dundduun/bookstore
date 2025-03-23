<script setup lang="ts">
const router = useRouter();

import FieldError from '@/components/ui/FieldError.vue';

import type { Database } from '~/database.types';

const client = useSupabaseClient<Database>();

const email = ref('');
const password = ref(null);

const errors = ref({
    email: [],
    password: [],
});

async function register() {
    errors.value = {
        email: [],
        password: [],
    };

    if (!email.value) {
        errors.value.email.push('Email - обязательное поле');
    }
    if (!password.value) {
        errors.value.password.push('Пароль - обязательное поле');
    }

    if (errors.value.email.length !== 0 || errors.value.password.length !== 0) {
        return;
    }

    const { data: users } = await client
        .from('user')
        .select('*')
        .eq('email', email.value);
    if (users.length !== 0) {
        errors.value.email.push('Email уже занят');
        return;
    }

    // Захэшировать пароль

    const { error } = await client
        .from('user')
        .insert({
            email: email.value,
            password: password.value,
        });
    if (error) {
        errors.value.email.push('Произошла непредвиденная ошибка');
        return;
    }

    // alert('Регистрация успешна!');

    await router.push('/auth');
}
</script>

<template>
    <div class="page-template">
        <h2>регистрация</h2>

        <form class="basic-form" @submit.prevent="register">
            <input v-model="email" class="basic-input" placeholder="email" type="email" />
            <div v-if="errors.email.length > 0">
                <div v-for="error in errors.email">
                    <FieldError :message="error" />
                </div>
            </div>

            <input v-model="password" class="basic-input" placeholder="пароль" type="password" />
            <div v-if="errors.password.length > 0">
                <div v-for="error in errors.password">
                    <FieldError :message="error" />
                </div>
            </div>

            <button class="basic-button">зарегистрироваться</button>
        </form>
    </div>
</template>
