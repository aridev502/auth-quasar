<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img :src="user?.photoURL">
          </q-avatar>
          {{ user?.displayName }}
        </q-toolbar-title>
        <q-btn color="negative" @click="logout" icon="menu" label="SALIR" />
      </q-toolbar>

      <ListUser />

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import useAuth from 'src/auth/composables/useAuth';
import { authStore } from 'src/auth/store/authStore';
import { defineAsyncComponent, defineComponent } from 'vue';

const ListUser = defineAsyncComponent(() => import('src/shared/LsitUser.vue'))


const { logout } = useAuth();
const { userAuth: user } = authStore();
</script>
