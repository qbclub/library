<<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-md-6 col-12">
           <v-sheet class="d-flex align-center flex-column ">
          <h1>Информация</h1>
          </v-sheet>
        <v-form>
          <v-text-field
            v-model="FirstName"
            label="Имя"
            required
          ></v-text-field>
         <v-text-field
            v-model="LastName"
            label="Фамилия"
            required
          ></v-text-field>

          <v-text-field
            v-model="BirthDate"
            label="Дата рождения"
            required
          ></v-text-field>

          <v-text-field
            v-model="EducationalInstitution"
            label="Учебное заведение"
            required
          ></v-text-field>

          <v-text-field
            v-model="LivingAddress"
            label="Адрес проживания"
            required
          ></v-text-field>
          <v-text-field
            v-model="UserType"
            label="Тип пользователя"
            required
          ></v-text-field>

          <v-sheet class="d-flex align-center flex-column ">
          <h3>История действий</h3>
          </v-sheet>

          <v-row>
            <v-col cols="6" sm="6">
              <v-text-field
                v-model="CurrentTakenBooks"
                label="Книги , которые были взяты пользователем"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6" sm="6">
              <v-text-field
                v-model="CurrentReservedBooks"
                label="Книги , которые были зарезервированы пользователем"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-sheet class="d-flex align-center flex-column ">
          <h3>Контакты</h3>
          </v-sheet>

          <v-row>
            <v-col cols="6" sm="4">
              <v-text-field
                v-model="PhoneNumber"
                label="Номер телефона"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6" sm="4">
              <v-text-field
                v-model="Email"
                label="Почта"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6" sm="4">
              <v-text-field
                v-model="SocCeti"
                label="Соц.сети"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn color="success" class="mr-4" @click="send"> Отправить </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import About from "../views/About.vue";
import axios from "axios";
export default {
  data: function () {
    return {
      example: {
        Id: 5,
        Annotation: "party",
        Name: "food1",
        TableOfContents: "Table",
        CoverPath: "http://google.com",
        Authors: ["Jacey", "Taylor", "Mary"],
        Sections: ["Javascript", "Java"],
        Status: "Ready",
        ReservedQueue: [1, 2],
        TemporaryOwner: "Vlad",
        DateOfGivenOut: "2021-12-21T23:25:27.338Z",
        ReleaseDate: "2021-12-21T23:25:27.338Z",
        TimeStamp: "2021-12-21T23:25:27.338Z",
        PhysicalPlace: "path to zhopa",
        ISBN: "123456",
        PublisherName: "Alpina",
        PageCount: 234,
        Series: 515,
      },
      form: {
        FirstName: "",
        LastName: "",
        BirthDate: "",
        EducationalInstitution: "",
        LivingAddress: "",
        UserType: "",
        CurrentTakenBooks: "",
        CurrentReservedBooks: "",
        PhoneNumber: "",
        Email: "",
        SocCeti: "",
      },

      cover: {
        newHeight: 0,
        newWidth: 0,
        image: null,
      },
    };
  },
  methods: {
    clearingForm: function () {
      this.form = {
        FirstName: "",
        LastName: "",
        BirthDate: "",
        EducationalInstitution: "",
        LivingAddress: "",
        UserType: "",
        CurrentTakenBooks: "",
        CurrentReservedBooks: "",
        PhoneNumber: "",
        Email: "",
        SocCeti: "",
      };
    },
    send: function () {
      const headers = {
        "content-type": "application/json",
      };

      axios
        // .post("http://localhost:8080/api/books/create", this.form, {
        //   headers: headers,
        // })
        .then((response) => {
          console.log(response);
          this.clearingForm();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  cursor: pointer;
}
</style>