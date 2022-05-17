import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#F2DFCE',
            secondary:'#FDEDDB',
            accent: '#577A8E',
            error: '#b71c1c',
          },
        },
      },
});
