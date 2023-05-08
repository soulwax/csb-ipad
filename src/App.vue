<template>
  <v-app id="inspire" :dark="true">
    <v-navigation-drawer v-model="drawer" app>
      <v-card tile v-if="this.msal.graph.profile">
        <v-img height="100%" src="https://live.staticflickr.com/5554/31058522966_b8ea3c7ab1.jpg">
          <v-row align="center" class="fill-height">
            <v-col align-self="center">
              <v-avatar class="profile" size="100">
                <v-img :src="blobtourl(this.msal.graph.photo)"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title
                    class="title"
                  >{{this.msal.graph.profile.givenName}} {{this.msal.graph.profile.surname}}</v-list-item-title>
                  <v-list-item-subtitle>{{this.msal.graph.profile.userPrincipalName}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-img>
      </v-card>

      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-for="(item, i) in panels">
          <template v-if="$store.state.permission[i]">
            <v-divider :key="i"></v-divider>
            <v-subheader :key="i">{{item.nombre}}</v-subheader>
            <v-list-item link :to="panel.url" :key="panel" v-for="panel in item.paneles">
              <v-list-item-action>
                <v-icon>{{panel.icon}}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{panel.nombre}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </template>
        <v-divider></v-divider>
        <v-list-item link to="/ajustes">
          <v-list-item-action>
            <v-icon>mdi-menu</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Ajustes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-on:click="$msal.signOut()">Cerrar Seción</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-snackbar v-model="$store.state.snack.show">
          {{ $store.state.snack.text }}
          <v-btn color="red" text v-on:click="$store.commit('hidesnack')">Cerrar</v-btn>
        </v-snackbar>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span
        class="white--text"
      >Centro de administración - &copy; {{ new Date().getFullYear() }} Esteban Hidalgo (esteban@7x7.cl)</span>
    </v-footer>
  </v-app>
</template>

<script>
import panels from "./store/panels";
export default {
  props: {
    source: String
  },
  async created() {},
  methods: {
    blobtourl(blob) {
      return URL.createObjectURL(blob);
    },
    async hello() {
      console.log(await this.msapi("/me"));
    }
  },

  data: () => ({
    panels: panels,
    drawer: null,
    debug: false
  }),
  mounted() {
    if (localStorage.debug) this.debug = localStorage.debug;
  },
  watch: {
    debug(newName) {
      localStorage.debug = newName;
    }
  }
};
</script>
