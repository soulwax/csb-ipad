<template>
  <div class="home">
    {{profesores.body}}
    <br />
    <br />
    {{miembros.body}}
    <v-skeleton-loader :loading="loading" transition="slide-y-reverse-transition" type="table">
      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">OVERLINE</div>
            <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn text>Button</v-btn>
          <v-btn text>Button</v-btn>
        </v-card-actions>
      </v-card>
    </v-skeleton-loader>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "DetallesClase",
  data: () => ({
    detalles: {},
    profesores: {},
    miembros: {},
    loading: true
  }),
  async mounted() {
    this.detalles = await this.msapi(
      `/education/classes/${this.$route.params.id}`,
      {
        scopes: ["EduRoster.ReadBasic"]
      }
    );
    this.profesores = await this.msapi(
      `/education/classes/${this.$route.params.id}/teachers`,
      {
        scopes: ["EduRoster.ReadBasic"]
      }
    );
    this.miembros = await this.msapi(
      `/education/classes/${this.$route.params.id}/members`,
      {
        scopes: ["EduRoster.ReadBasic"]
      }
    );
    this.loading = false;
  }
};
</script>