<template>
  <q-page class="row justify-center items-center" style="background: linear-gradient(#8274c5, #5a4a9f)">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card class="my-card" flat bordered>
          <q-img
            src="https://cdn.icon-icons.com/icons2/2072/PNG/512/arrow_entrance_in_internet_log_login_security_icon_127060.png" />

          <q-card-section>
            <q-btn fab color="primary" icon="add" class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)" :to="{ name: 'register' }" label="REGISTER" />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">LOGIN</div>
            </div>
          </q-card-section>

          <form @submit.prevent="check">

            <q-card-section class="q-pt-none">
              <div class="q-gutter-md" style="max-width: 300%">
                <q-input type="email" rounded outlined v-model="data.email" label="Correo"
                  :rules="[(val) => (val && val.length > 0) || 'Por favor, digite Su Email!',]">
                  <template v-slot:append>
                    <q-avatar>
                      <img @click="" src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
                    </q-avatar>
                  </template>
                </q-input>


                <q-input rounded outlined :type="isPassT ? 'password' : 'text'" v-model="data.password" label="Contrasena"
                  :rules="[(val) => (val && val.length > 0) || 'Por favor, digite Su Contrasena!',]">
                  <template v-slot:append>
                    <q-avatar>
                      <q-icon :name="isPassT ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="isPassT = !isPassT"></q-icon>
                    </q-avatar>
                  </template>
                </q-input>
              </div>
            </q-card-section>

            <q-separator />
            <q-card-actions>
              <q-btn type="submit" color="positive"> LOGIN </q-btn>
            </q-card-actions>
          </form>


        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import { reactive, ref } from 'vue';
import useAuth from '../composables/useAuth';
import { useQuasar } from 'quasar';
const isPassT = ref(true);
const $q = useQuasar();
const data = reactive({
  email: '',
  password: '',
});
const { login } = useAuth();

const check = () => {
  if (data.password === '' || data.email === '') {

    $q.notify({
      message: 'El Correo y Contrasena Son Requeridos',
      progress: true,
      position: 'top',
      color: 'negative'
    });

    return;
  }
  login(data);
}



</script>

<style scoped lang="css"></style>
