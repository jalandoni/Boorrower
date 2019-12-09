import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: colors.blue.darken1,
            secondary: colors.grey.darken1,
            accent: colors.blue.darken1,
            error: colors.red.accent3,
            background: colors.grey.lighten2, 
            
          },
          dark: {
            primary: colors.blue.lighten1, 
            
          },
        },
      },
});
