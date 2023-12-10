<template>
  <q-page class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274C5, #5A4A9F);">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card class="my-card" style="-webkit-box-shadow: -10px 0px 13px -7px #5B9773, 10px 0px 13px -7px #000000, 5px 5px 15px 5px     rgba(91,151,115,0);box-shadow: -10px 0px 13px -7px #5B9773, 10px 0px 13px -7px #5B9773, 5px 5px 15px 5px rgba(91,151,115,0);
                    border-radius:15px;width:340px;border-bottom:11px solid #FFCB00;">

          <i class="material-icons text-green-10"
            style="border-radius:100px;background:#fff;font-size:100px;margin:-35px 0 0 120px;border:solid #fff 2px;">account_circle</i>

          <q-img :src="url" spinner-color="white"
            style="margin:0 auto 10px auto;display: block;height: 44px; width:199px"></q-img>

          <q-card-section>

            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" style="padding:0 29px 18px 29px;">

              <q-input color="green" v-model="user" label="Usuário" hint="" lazy-rules
                :rules="[val => val && val.length > 0 || 'Por favor, digite seu usuário!']"></q-input>
              <q-input color="green" :type="isPwd ? 'password' : 'text'" v-model="password" label="Senha" lazy-rules
                :rules="[val => val && val.length > 0 || 'Por favor digite sua senha!']">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd"></q-icon>
                </template>

              </q-input>

              <div>
                <q-btn style="display: block;margin:30px auto 0 auto;padding:0 30px" label="Entrar" type="submit"
                  color="green-10"></q-btn>
              </div>
            </q-form>

          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';


const $q = useQuasar();
const user = ref('');
const password = ref('')
const isPwd = ref(true)
const name = ref('')
const age = ref()
const accept = ref(false)
const url = ref('https://docs.google.com/uc?id=18LEqoq7eA61_wHZtM4pBgLu_SMOzj4y-')


function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'fas fa-exclamation-triangle',
      message: 'You need to accept the license and terms first'
    })
  }
  else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'fas fa-check-circle',
      message: 'Submitted'
    })
  }
}

function onReset() {
  name.value = '';
  age.value = null;
  accept.value = false
}

</script>

<style scoped></style>
