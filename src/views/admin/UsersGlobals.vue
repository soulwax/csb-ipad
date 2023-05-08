<template>
  <div class="home">
    <v-skeleton-loader :loading="loading" transition="slide-y-reverse-transition" type="table">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Nombre</th>
              <th class="text-left">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in items.body.value" :key="item.name">
              <td>{{ item.displayName }}</td>
              <td>
                <v-btn text small v-on:click="deleteUser(item.id)" color="primary">Borrar</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-skeleton-loader>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ClassAdmin",
  data: () => ({
    items: {},
    loading: true
  }),
  async mounted() {
    this.items = await this.msapi("/users", {
      scopes: ["Directory.AccessAsUser.All"],
      params: { $top: 500 }
    });

    this.loading = false;
  },
  methods: {
    async deleteUser(id) {
      this.loading = true;
      await this.msapi(`/users/${id}`, {
        scopes: ["Directory.AccessAsUser.All"],
        method: "delete"
      });
      this.items = await this.msapi("/users", {
        scopes: ["Directory.AccessAsUser.All"],
        params: { $top: 500 }
      });
      this.loading = false;
    }
  }
};
</script>