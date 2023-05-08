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
              <td>{{ item.description }}</td>
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
    this.items = await this.msapi("/education/me/classes", {
      scopes: ["EduRoster.ReadBasic"]
    });
    this.loading = false;
  }
};
</script>