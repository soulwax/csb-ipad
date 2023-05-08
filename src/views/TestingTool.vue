<template>
  <div class="about">
    <v-select :items="['Get','Post']" v-model="method" label="Standard"></v-select>
    <v-text-field v-model="baseurl" label="Baseurl"></v-text-field>
    <v-text-field v-model="resource" label="Resource"></v-text-field>
    <h1>Scopes</h1>
    <v-jsoneditor v-model="scopes" />
    <v-btn large :block="true" color="green" :loading="loading" @click="getToken()">Solicitar token</v-btn>

    <h1>Params</h1>
    <v-jsoneditor v-model="params" />
    <h1>Data</h1>
    <v-jsoneditor v-model="data" />
    <v-btn large color="green" :loading="loading" @click="send()">Enviar</v-btn>

    <v-btn large color="green" :loading="loading" @click="result=$msal">Get msal</v-btn>
    <v-btn large color="red" :loading="loading" @click="clean()">Clean Data</v-btn>

    <v-btn large color="red" :loading="loading" @click="result={}">Delete results</v-btn>

    <h1>Results</h1>
    <v-jsoneditor v-model="result" />
  </div>
</template>
<script>
export default {
  name: "Test",

  data: () => ({
    baseurl: "https://graph.microsoft.com/v1.0",
    method: "Get",
    data: {},
    params: {},
    resource: "/me",
    scopes: ["User.Read.All"],
    loading: false,
    result: {}
  }),
  mounted() {
    if (localStorage.baseurl) this.baseurl = localStorage.baseurl;
    if (localStorage.method) this.method = localStorage.method;
    if (localStorage.data) this.data = JSON.parse(localStorage.data);
    if (localStorage.params) this.params = JSON.parse(localStorage.params);
    if (localStorage.resource) this.resource = localStorage.resource;
    if (localStorage.scopes) this.scopes = JSON.parse(localStorage.scopes);
  },
  watch: {
    baseurl(newName) {
      localStorage.baseurl = newName;
    },
    method(newName) {
      localStorage.method = newName;
    },
    data(newName) {
      localStorage.data = JSON.stringify(newName);
    },
    params(newName) {
      localStorage.params = JSON.stringify(newName);
    },
    resource(newName) {
      localStorage.resource = newName;
    },
    scopes(newName) {
      localStorage.scopes = JSON.stringify(newName);
    }
  },
  methods: {
    async getToken() {
      this.loading = true;
      this.result = {};
      try {
        this.result = {
          token: await this.$msal.acquireToken({ scopes: this.scopes })
        };
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.result = { error: err };
      }

      this.loading = false;
    },
    async send() {
      this.loading = true;
      this.result = {};

      this.result = await this.msapi(this.resource, {
        method: this.method,
        baseurl: this.baseurl,
        data: this.data,
        params: this.params,
        scopes: this.scopes
      });
      this.loading = false;
    },
    async clean() {
      this.loading = true;
      localStorage.clear();
      location.reload();
      this.loading = false;
    }
  }
};
</script>

