<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center index">
        <div class="img-gallon">
          <v-img
            aspect-ratio="1"
            max-height="250"
            contain
            :src="require('~/assets/gallon.jpg')"
          ></v-img>
          <h1 class="img-gallon-text">{{ db.gallon * 100 / 2000 }}%</h1>
        </div>
        <h1 class="text-grey padding-bottom">Sisa air galon: {{db.gallon}} ml</h1>
        <!-- <h3 class="text-grey">Sudah minum sebanyak {{db.consumed}} mililiter</h3> -->
        <p class="text-grey">Tekan tahan tombol <b class="text-blue">AMBIL AIR</b><br> untuk mengambil air</p>
        <!-- <p>db flowSensor : {{db.flowSensor}}</p>
        <p>nambah berapa: {{nambah}}</p> -->
        <!-- <h1>Relay: {{relay}}</h1> -->
        <v-btn
          @mousedown="start"
          @mouseleave="stop"
          @mouseup="stop"
          @touchstart="start"
          @touchend="stop"
          @touchcancel="stop"
          depressed
          large
          rounded
          :color="button ? 'secondary' : 'primary'"
        >
          {{ button ? 'Sedang ambil Air' : 'Ambil Air' }}
        </v-btn>
        <br>

        <!-- db relay : {{ db.relay }} -->
      </div>
    </v-col>
  </v-row>
</template>

<style>
.index {
  padding: 3vw
}
.img-gallon {
  position: relative;
}
.img-gallon-text {
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}
.text-grey {
  color: #9E9E9E;
}
.text-blue {
  color: #47B9FF;
}
.padding-bottom {
  padding-bottom: 1vh;
}
</style>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {    // data client
    return {
      nambah: 0,
      consumed: 0,
      relay: 0,
      flowSensor: 0,
      gallon: 2000,
      button: false,
      db: {
        consumed: null,
        relay: null,
        flowSensor: null,
        button: null,
        gallon: null,
        batasNotif: null,
      },
    }
  },
  mounted(){   // program di dalam mounted dijalankan pertama saat load web
    this.fetchDb();
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
    },
    refBatasNotif() {
      return this.$fire.database.ref().ref.child('batasNotif')
    },
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
      this.refBatasNotif.on('value', (dataSnapshot) => {
        this.db.batasNotif = dataSnapshot.val()
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

      if(this.gallon <= this.refBatasNotif){
        this.notification(`sisa air galon anda ${galon} milimeter`)
      }
    },

    notification(message){
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(message);
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification(message);
          }
        });
      }
    }
  }
}
</script>
