<template>
  <div class="home">
    <v-skeleton-loader :loading="loading" transition="slide-y-reverse-transition" type="table">
      <v-data-iterator :items="items.body.value" :search="search">
        <template v-slot:header>
          <v-toolbar dark color="blue darken-3" class="mb-1">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-search"
              label="Search"
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item.name" cols="24" sm="12" md="8" lg="6">
              <v-card>
                <v-card-title class="subheading font-weight-bold">{{ item.displayName}}</v-card-title>

                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Correo:</v-list-item-content>
                    <v-list-item-content>{{ item.mailNickname }}@escuelaatenas.cl</v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-card-actions>
                  <v-btn text :to="`/clase/${item.id}/editar`">Editar</v-btn>
                  <v-btn text :to="`/clase/${item.id}`">Ver más</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
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
    search: "",
    loading: true
  }),
  async mounted() {
    this.items = await this.msapi("/education/classes", {
      scopes: ["EduRoster.ReadBasic"]
    });
    console.log(this.result);
    this.loading = false;
  }
};
</script>