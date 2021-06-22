<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-subheader>Kapasitas Gallon Saat Ini</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model="db.gallon"
          type="number"
          min="0"
          max="19000"
          suffix= "mililiter"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>Batas pengingat kapasitas galon</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model="batasNotif"
          type="number"
          min = "0"
          max = "19000"
          suffix="mililiter"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader>Notifikasi</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-switch
          v-model="switchNotifikasi"
          :label="`${switchNotifikasi ? 'Aktif' : 'Mati'}`"
        ></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      switchNotifikasi: !this.switchNotifikasi,
      gallon: 0,
      batasNotif: 500,
      db: {
        gallon: null
      }
    }
  },
  mounted() {
    this.fetchDb();
    this.switchNotifikasi = false;
    this.gallon = 2000;
    this.batasNotif = 500;
  },
  watch: {
    gallon(val) {
      this.refGallon.set(val)
    },
    batasNotif(val) {
      this.refBatasNotif.set(val)
    }
  },
  computed:{
    refGallon() {
      return this.$fire.database.ref().ref.child('gallon')
    },
    refBatasNotif() {
      return this.$fire.database.ref().ref.child('batasNotif')
    }
  },
  methods: {
    fetchDb(){
      this.refGallon.on('value', (dataSnapshot) => {
        this.db.gallon = dataSnapshot.val()
      }),
      this.refBatasNotif.on('value', (dataSnapshot) => {
        this.db.batasNotif = dataSnapshot.val()
      })
    }
  }
}
</script>