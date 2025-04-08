import {ref} from "vue";

const globalUser = ref({
    name: '',
    email: ''
});

function getUser() {
    return {globalUser}
}

function setUser(user) {
    globalUser.value.name = user.name
    globalUser.value.email = user.email
}

export {getUser, setUser}


