import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import msal from 'vue-msal'
import VJsoneditor from 'v-jsoneditor/src/index'
import microsoftgraph from "./plugins/microsoftgraph";

Vue.config.productionTip = false;



Vue.use(VJsoneditor)
Vue.use(msal, {
    auth: {
        clientId: '6093c3c2-3a7a-457a-8bae-f41d40d1a242',
        tenantId: '2989ab58-4a19-4202-87df-bce5382532a1',
        requireAuthOnInitialize: true,
        redirectUri: "http://localhost:8080/"
    },
    graph: {
        callAfterInit: true,
        endpoints: {
            profile: { url: '/me?$select=displayName,aboutMe,ageGroup,birthday,businessPhones,surname,city,consentProvidedForMinor,country,department,employeeId,givenName,jobTitle,legalAgeGroupClassification,schools' },
            photo: { url: '/me/photo/$value', responseType: 'blob', force: true }
        }
    },
    framework: {
        globalMixin: true
    },
    request: {
        scopes: ["user.read"]
    },
});

Vue.mixin(microsoftgraph);


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");