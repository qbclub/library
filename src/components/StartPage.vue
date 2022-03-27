<template>
  <div>
    <v-containner class="startPage d-flex align-center">
      <v-row>
        <v-col class="col-12 col-sm-6 d-flex justify-center flex-column align-center">
      
            <p>Это библиотека клуба программирования Кубит</p>
            <v-btn  text color="accent"  to="/books">Вход</v-btn>
         
        </v-col>
        <v-col class="col-12 col-sm-6 d-flex justify-center align-center">
          <div class="d-flex justify-center">
            <v-img
              loading="lazy"
             contain
              
              src="../assets/image/test.png"
            ></v-img>
          </div>
        </v-col>
      </v-row>
    </v-containner>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.startPage {
  height: calc(100vh - 200px);
}
</style>