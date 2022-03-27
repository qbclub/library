<<template>
  <v-container>
     <v-row>
      <button onclick="history.back()">
        <div>
          <span class="subtitle-1 fi fi-rr-angle-left"> </span>
        </div>
      </button>
    </v-row>
    <v-row class="justify-center">
      <v-col class="col-md-6 col-12">
        
          <h1 class="text-center">Информация</h1>
        
        <v-form>
          <v-row>
            <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.FirstName"
            label="Имя"
            required
          ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
         <v-text-field
            v-model="form.LastName"
            label="Фамилия"
            required
          ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.BirthDate"
            label="Дата рождения"
            required
          ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.EducationalInstitution"
            label="Учебное заведение"
            required
          ></v-text-field>
            </v-col>
          </v-row>  

          <v-row>
            <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.LivingAddress"
            label="Адрес проживания"
            required
          ></v-text-field>
            </v-col>
            <v-col class="d-flex align-center"  cols="12" sm="6">
          <v-checkbox
          v-model="form.isAdmin"
          ></v-checkbox>
          <span>{{form.isAdmin? 'Администратор': 'Пользователь'}}</span> 
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
                пользователь
              </v-sheet>
            </v-col>
          </v-row>

        
         
          <h3 class="text-center">Контакты</h3>
         

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.Contacts.PhoneNumber"
                label="Номер телефона"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.Contacts.Email"
                label="Почта"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" >
              <v-text-field
                v-model="form.Contacts.SocCeti"
                label="Соц.сети"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn color="success" class="mb-10" @click="send"> Отправить </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import About from "../views/About.vue";
import ImageUploader from "vue-image-upload-resize";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
const storage = getStorage();
import { mapActions } from "vuex";

export default {
  components: { About, ImageUploader },
  data: function () {
    return {
      form: {
        FirstName: "",
        LastName: "",
        BirthDate: "",
        EducationalInstitution: "",
        LivingAddress: "",
        isAdmin: false,
        CurrentTakenBooks: [],
        CurrentReservedBooks: [],
        Contacts: {
          PhoneNumber: "",
          Email: "",
          SocCeti: "",
        },
        PhotoPath: "",
      },

      cover: {
        newHeight: 0,
        newWidth: 0,
        image: null,
      },
    };
  },
  methods: {
    ...mapActions(["updateUser"]),
    clearingForm: function () {
      this.form = {
        FirstName: "",
        LastName: "",
        BirthDate: "",
        EducationalInstitution: "",
        LivingAddress: "",
        isAdmin: false,
        CurrentTakenBooks: [],
        CurrentReservedBooks: [],
        Contacts: {
          PhoneNumber: "",
          Email: "",
          SocCeti: "",
        },
        PhotoPath: "",
      };
    },
    send: async function () {
      this.form.UserId = Date.now();
      const headers = {
        "content-type": "application/json",
      };

      this.updateUser(this.form);
      this.clearingForm();
      this.$router.push({ path: "/admin" });
    },
    setImage: function (img) {
      // img - объект, содержащий много ифнормации об изображении
      this.cover.image = img.dataUrl;
      this.cover.newWidth = img.info.newWidth;
      this.cover.newHeight = img.info.newHeight;
    },
    uploadImageComplete: function () {
      /**
       * Поменять Date.now()
       */
      const storageRef = ref(storage, "users/" + Date.now().toString());
      uploadString(storageRef, this.cover.image, "data_url").then(
        (snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              this.form.PhotoPath = url;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
    },
    uploadImageStart: function () {
      console.log("UPLOAD STARTED");
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  cursor: pointer;
}
</style>