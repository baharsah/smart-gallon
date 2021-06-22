<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-subheader>Ukuran Gallon</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="Ukuran Gallon"
          value="19000"
          type="number"
          suffix= "mililiter"
          min = "0"
          max = "19000"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>Notifikasi Isi Ulang Galon</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="Batas maksimum notifikasi"
          value="500"
          type="number"
          min = "0"
          max = "19000"
          suffix="mililiter"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>