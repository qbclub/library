<template>
  <v-container>
    <v-row class="justify-center text-center">
      <v-col cols="8"
        ><h1>user actions</h1>
        <UserInfo />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserInfo from "../UserInfo.vue";
export default {
  name: "UserActions",
  components: {
    UserInfo,
  },
};
</script>

<style>
</style> 