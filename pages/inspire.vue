<template>
  <v-row>
    <v-col class="text-center">
      <v-progress-circular
        :rotate="-90"
        :size="200"
        :width="25"
        :value="96"
        class="consume-progress"
        color="primary"
      >
        <!-- <h1>{{consumed * 100 / 2000}}%</h1> -->
        <h1>96%</h1>
      </v-progress-circular>
      <h2>Hari ini anda minum 2 Liter air</h2>
      <h3>Kebutuhan anda sudah mencukupi!</h3>
    </v-col>
  </v-row>
</template>

<style>
.consume-progress {
  margin-top: 8vh;
  margin-bottom: 5vh;
}
</style>
<script>
export default {
  data () {
    return {
      interval: {},
      value: 30,
      nambah: 0,
      consumed: 0,
      interval:false,
      relay: 0,
      flowSensor: 0,
      gallon: 2000,
      button: false,
      db: {
        consumed: null,
        relay: null,
        flowSensor: null,
        button: null,
        gallon: null
      }
    }
  },
  mounted(){   // program di dalam mounted dijalankan pertama saat load web
    this.fetchDb();
    this.consumed = 0;
    this.flowSensor = 0;
    this.gallon = 2000;
  },
  watch:{     // memantau perubahan value dari relay
    relay(val) {
      this.refRelay.set(val)
    },
    flowSensor(val) {
      this.refFlowSensor.set(val)
    },
    button(val) {
      this.refButton.set(val)
    },
    consumed(val) {
      this.refConsumed.set(val)
    },
    gallon(val) {
      this.refGallon.set(val)
    }
  },
  computed:{   
    refRelay() {
      return this.$fire.database.ref().ref.child('relay')
    },
    refFlowSensor() {
      return this.$fire.database.ref().ref.child('flowSensor')
    },
    refButton() {
      return this.$fire.database.ref().ref.child('button')
    },
    refConsumed() {
      return this.$fire.database.ref().ref.child('consumed')
    },
    refGallon() {
      return this.$fire.database.ref().ref.child('gallon')
    }
  },
  methods: {
    fetchDb(){
      this.refRelay.on('value', (dataSnapshot) => {
        this.db.relay = dataSnapshot.val()
      }),
      this.refFlowSensor.on('value', (dataSnapshot) => {
        this.db.flowSensor = dataSnapshot.val()
      }),
      this.refConsumed.on('value', (dataSnapshot) => {
        this.db.consumed = dataSnapshot.val()
      }),
      this.refButton.on('value', (dataSnapshot) => {
        this.db.button = dataSnapshot.val()
      }),
      this.refGallon.on('value', (dataSnapshot) => {
        this.db.gallon = dataSnapshot.val()
      })
    },
  	start(){
      this.nambah = 0
    	if(!this.interval){
      	this.interval = setInterval(() => {
          this.relay = 1, 30
          this.flowSensor = this.db.flowSensor, 30
          this.button = true
        })	
      }
    },
    stop() {
      this.nambah = this.db.flowSensor
      this.gallon -= this.nambah
      this.consumed += this.db.flowSensor
    	clearInterval(this.interval)
      this.interval = false
      this.flowSensor = 0
      this.relay = 0
      this.button = false
    },
  }
}
</script>