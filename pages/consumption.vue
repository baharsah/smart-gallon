<template>
  <v-row>
    <v-col class="text-center index">
      <v-progress-circular
        :rotate="-90"
        :size="200"
        :width="25"
        :value="percentConsume"
        class="consume-progress"
        color="primary"
      >
        <!-- <h1>{{consumed * 100 / 2000}}%</h1> -->
        <h1>{{ db.consumed * 100 /2000 }}%</h1>
      </v-progress-circular>
      <h2 class="text-grey">Hari ini anda minum <span class="text-blue">{{db.consumed}} mililiter</span> air</h2>
      <h3 class="text-grey" v-if="consumed * 100 /2000 == 100">Kebutuhan anda <span class="text-blue">sudah mencukupi</span>!</h3>
    </v-col>
  </v-row>
</template>

<style>
.consume-progress {
  margin-top: 8vh;
  margin-bottom: 5vh;
}
.index {
  padding: 5vw
}
.text-grey {
  color: #9E9E9E;
}
.text-blue {
  color: #47B9FF;
}
</style>
<script>
export default {
  data () {
    return {
      db: {
        consumed: null,
      }
    }
  },
  mounted(){   // program di dalam mounted dijalankan pertama saat load web
    this.fetchDb();
  },
  computed:{
    refConsumed() {
      return this.$fire.database.ref().ref.child('consumed')
    }
  },
  methods: {
    fetchDb(){
      this.refConsumed.on('value', (dataSnapshot) => {
        this.db.consumed = dataSnapshot.val()
      })
    },
  }
}
</script>