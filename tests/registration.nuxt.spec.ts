// tests/Registration.spec.ts
import { mount } from '@vue/test-utils';
import Registration from '@/pages/registration.vue';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock useNuxtApp to inject a fake Supabase client
vi.mock('#app', () => ({
    useNuxtApp: () => ({
        $supabase: {
            client: {
                from: vi.fn(() => ({
                    select: vi.fn(),
                    insert: vi.fn(),
                })),
            },
        },
    }),
}));

// Alternatively, if you want to reuse your existing mock:
const selectMock = vi.fn();
const insertMock = vi.fn();
const fromMock = vi.fn(() => ({
    select: selectMock,
    insert: insertMock,
}));
const supabaseClientMock = {
    from: fromMock,
};

// Re-mock useNuxtApp with your supabaseClientMock
vi.mock('#app', () => ({
    useNuxtApp: () => ({
        $supabase: {
            client: supabaseClientMock,
        },
    }),
}));

// Mock vue-router
const pushMock = vi.fn();
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

describe('Registration Component', () => {
    beforeEach(() => {
        pushMock.mockReset();
        selectMock.mockReset();
        insertMock.mockReset();
        fromMock.mockClear();
    });

    it('должен отображать ошибки валидации, если email и пароль не заполнены', async () => {
        const wrapper = mount(Registration);
        await wrapper.find('form').trigger('submit.prevent');
        expect(wrapper.html()).toContain('Email - обязательное поле');
        expect(wrapper.html()).toContain('Пароль - обязательное поле');
    });

    it('должен показывать ошибку "Email уже занят", если пользователь с таким email найден', async () => {
        // Simulate that the user already exists
        selectMock.mockResolvedValueOnce({ data: [{ email: 'test@example.com' }] });

        const wrapper = mount(Registration);
        const emailInput = wrapper.find('input[type="email"]');
        const passwordInput = wrapper.find('input[type="password"]');

        await emailInput.setValue('test@example.com');
        await passwordInput.setValue('Password123!');
        await wrapper.find('form').trigger('submit.prevent');
        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toContain('Email уже занят');
    });

    it('должен показывать ошибку "Произошла непредвиденная ошибка", если вставка пользователя завершилась неудачно', async () => {
        // Simulate that the email is not taken
        selectMock.mockResolvedValueOnce({ data: [] });
        // Simulate error on insertion
        insertMock.mockResolvedValueOnce({ error: { message: 'insert error' } });

        const wrapper = mount(Registration);
        const emailInput = wrapper.find('input[type="email"]');
        const passwordInput = wrapper.find('input[type="password"]');

        await emailInput.setValue('test@example.com');
        await passwordInput.setValue('Password123!');
        await wrapper.find('form').trigger('submit.prevent');
        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toContain('Произошла непредвиденная ошибка');
    });

    it('должен перенаправлять на страницу /auth при успешной регистрации', async () => {
        // Simulate that the email is not taken
        selectMock.mockResolvedValueOnce({ data: [] });
        // Simulate successful insertion
        insertMock.mockResolvedValueOnce({ error: null });

        const wrapper = mount(Registration);
        const emailInput = wrapper.find('input[type="email"]');
        const passwordInput = wrapper.find('input[type="password"]');

        await emailInput.setValue('test@example.com');
        await passwordInput.setValue('Password123!');
        await wrapper.find('form').trigger('submit.prevent');
        await wrapper.vm.$nextTick();

        expect(pushMock).toHaveBeenCalledWith('/auth');
    });
});
