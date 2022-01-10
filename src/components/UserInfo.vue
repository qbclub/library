<<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-md-6 col-12">
           <v-sheet class="d-flex align-center flex-column ">
          <h1>Информация</h1>
          </v-sheet>
        <v-form>
          <v-row>
            <v-col cols="12" sm="6">
          <v-text-field
            v-model="FirstName"
            label="Имя"
            required
          ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
         <v-text-field
            v-model="LastName"
            label="Фамилия"
            required
          ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
          <v-text-field
            v-model="BirthDate"
            label="Дата рождения"
            required
          ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
          <v-text-field
            v-model="EducationalInstitution"
            label="Учебное заведение"
            required
          ></v-text-field>
            </v-col>
          </v-row>  

          <v-row>
            <v-col cols="12" sm="6">
          <v-text-field
            v-model="LivingAddress"
            label="Адрес проживания"
            required
          ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
          <v-checkbox
      v-model="checkbox"
      :label="`Администратор?  ${checkbox.toString()}`"
          ></v-checkbox>
            </v-col>
          </v-row>
          <v-row class="align-center">
            <v-col cols="6">
              <image-uploader
                :preview="false"
                accept="image/*"
                :scaleRatio="0.5625"
                :quality="0.96"
                :maxWidth="256"
                outputFormat="verbose"
                :className="['d-flex', 'flex-column']"
                @input="setImage"
                @onComplete="uploadImageComplete"
                @onUpload="uploadImageStart"
              >
                <label for="fileInput" slot="upload-label">
                  <div class="d-flex flex-column text-center">
                    <i class="fi fi-rr-camera text-h4 ma-0 d-inline"></i>

                    <span class="caption"> фото <br /></span>
                  </div>
                </label>
              </image-uploader>
            </v-col>
            <v-col cols="6">
              <v-img
                contain
                v-if="cover.image"
                :src="cover.image"
                :height="cover.newHeight"
                :width="cover.newWidth"
              ></v-img>

              <v-sheet
                color="grey"
                min-height="200px"
                class="pa-3 d-flex justify-center align-center"
                v-if="!cover.image"
              >
                фото обложки
              </v-sheet>
            </v-col>
          </v-row>

          <v-sheet class="d-flex align-center flex-column ">
          <h3>История действий</h3>
          </v-sheet>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="CurrentTakenBooks"
                label="Книги , которые были взяты пользователем"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
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
import ImageUploader from "vue-image-upload-resize";
export default {
  components: { About, ImageUploader },
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
      checkbox: true,
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
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  cursor: pointer;
}
</style>