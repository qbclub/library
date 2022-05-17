<template>
  <v-container class="startPage d-flex align-center">
    <v-row>
      <v-col class="col-12 col-sm-6 d-flex justify-center flex-column align-center">
        <p class="text-center text-md-h6 text-uppercase pt-16">
          книги по <br />
          программированию <br />
          графике и дизайну <br />
          управлению проектами
        </p>
        <v-btn text color="accent" to="/books">Вход</v-btn>
      </v-col>
      <v-col class="col-12 col-sm-6">
       
        <div class="backgroundImage">
          <Clock></Clock> 
        </div>
    
        <div class="rules pb-8">
          <v-btn text color="accent" to="/present">О библиотеке</v-btn>
          <v-btn text color="accent" to="/rules">Правила</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Clock from "./Clock.vue"
export default {
  components: {
    Clock
  }

}

</script>

<style lang="scss" scoped>
.startPage {
  height: calc(100vh - 150px);
}

.backgroundImage {
  background: url(../assets/image/startPage.webp);
  height: calc(100vh / 2);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
}

.rules {
  text-align: center;
}

.main {
  display: flex;
  padding: 2em;
  height: 90vh;
  justify-content: center;
  align-items: middle;
}



</style>