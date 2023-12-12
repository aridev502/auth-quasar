import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Auth } from '../interface/Auth.interface';

export const authStore = defineStore('authStore', () => {



  const userAuth = ref<Auth>();
  const token = ref<string>('');
  const isLogin = ref<boolean>(false);


  const setUserAuth = (user: Auth) => {
    userAuth.value = user
  }

  return {
    token,
    userAuth,
    isLogin,
    setUserAuth
  }


});


