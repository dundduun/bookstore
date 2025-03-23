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

function generateBearerToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 60; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

async function authorize() {
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
    if (users !== null && users.length === 0) {
        errors.value.email.push('Пользователя с таким email не существует');
        return;
    }

    if (password.value !== users[0].password) {
        errors.value.password.push('Неверный пароль')
        return;
    }

    const bearerToken = generateBearerToken();

    const { error } = await client
        .from('user')
        .update({ token: bearerToken })
        .eq('id', users[0].id);

    if (error) {
        errors.value.email.push('Произошла непредвиденная ошибка, попробуйте позже');
        return;
    }
    localStorage.setItem('bookshelf-token', bearerToken);

    await router.push('/books');
}
</script>

<template>
    <div class="page-template">
        <div class="page-container">
            <h2>вход</h2>

            <form class="basic-form" @submit.prevent="authorize">
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

                <button class="basic-button">войти</button>
            </form>
        </div>
    </div>
</template>
