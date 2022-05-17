<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12"
        >
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