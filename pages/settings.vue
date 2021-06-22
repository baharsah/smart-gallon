<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-subheader>Kapasitas Gallon Saat Ini</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model="gallon"
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
          v-model="notifikasi"
          :label="`${notifikasi ? 'Aktif' : 'Mati'}`"
        ></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      db: {
        gallon: null,
        batasNotif: null,
        notifikasi: null,
      }
    }
  },
  mounted() {
    this.fetchDb();
    this.switchNotifikasi = false;
  },
  computed:{
    gallon: {
      set(val){
        this.refGallon.set(val)
      },
      get(){
        return this.db.gallon
      }
    },
    batasNotif: {
      set(val){
        this.refBatasNotif.set(val)
      },
      get(){
        return this.db.batasNotif
      }
    },
    notifikasi:{
      set(val){
        this.refnotifikasi.set(val)
      },
      get(){
        return this.db.notifikasi
      }
    },
    refGallon() {
      return this.$fire.database.ref().ref.child('gallon')
    },
    refBatasNotif() {
      return this.$fire.database.ref().ref.child('batasNotif')
    },
    refnotifikasi() {
      return this.$fire.database.ref().ref.child('notifikasi')
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
      this.refnotifikasi.on('value', (dataSnapshot) => {
        this.db.notifikasi = dataSnapshot.val()
      })
    }
  }
}
</script>