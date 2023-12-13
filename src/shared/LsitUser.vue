<template>
  <q-page-sticky position="top" expand>

    <q-tabs inline-label outside-arrows mobile-arrows class="bg-primary text-white shadow-2 full-width">
      <q-tab v-for="u in users" :name="u.email" icon="mail" :label="u.email" />

    </q-tabs>
  </q-page-sticky>
</template>

<script setup>
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { dbFirebase } from "src/boot/firebase";
import { ref, watch } from "vue";
const uidSelected = ref('');
const users = ref([])
// 
try {

  const q = query(collection(dbFirebase, "users"), where('estado', '==', true));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New USER: ", change.doc.data());

        users.value = [...users.value, change.doc.data()]


      }
      if (change.type === "modified") {
        console.log("Modified USER: ", change.doc.data());
        users.value = users.value.map(user => {
          user.uid === change.doc.data().uid ? { ...user, estado: change.doc.data().estado } : user
        })
      }
      if (change.type === "removed") {
        console.log("Removed USER: ", change.doc.data())


        users.value = users.value.map(user => {
          user.uid !== change.doc.data().uid ? { ...user, estado: false } : user
        })

      }
    });
  });

} catch (error) {
  console.log(error);
}



</script>

<style lang="scss" scoped></style>