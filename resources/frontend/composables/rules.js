const nameRules = [
    v => !!v || 'Имя обязательно',
];

const emailRules = [
    v => !!v || 'Email обязателен',
    v => /.+@.+\..+/.test(v) || 'Неверный формат email'
];

const passwordRules = [
    v => !!v || 'Пароль обязателен',
    v => v.length >= 6 || 'Минимум 6 символов'
];

export {
    nameRules,
    emailRules,
    passwordRules
}
