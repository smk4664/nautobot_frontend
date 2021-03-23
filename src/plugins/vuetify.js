import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                nav: colors.grey.lighten3,
                nav_text: colors.grey.darken1,
                footer: colors.blue.accent2
            },
            dark: {
                nav: colors.grey.darken3,
                nav_text: colors.grey.lighten1,
                footer: colors.blue.accent2
            }
        }
    }
});
