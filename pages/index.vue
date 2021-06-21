<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <v-img
          aspect-ratio="1"
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="150"
          max-width="250"
          src="~/assets/gallon.jpg"
        ></v-img>
        <h1>Sudah minum sebanyak {{consumed}} mililiter</h1>
        <h1>Relay dalam keadaan {{relay}}</h1>
        <v-btn
          @mousedown="start"
          @mouseleave="stop"
          @mouseup="stop"
          @touchstart="start"
          @touchend="stop"
          @touchcancel="stop"
          depressed
          color="primary"
        >
          Ambil Air
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      consumed: 60,
      interval:false,
      relay: 0,
    }
  },
  methods: {
  	start(){
    	if(!this.interval){
      	this.interval = setInterval(() => this.relay = 1, 30)	
      }
    },
    stop() {
      this.relay = 0
    	clearInterval(this.interval)
      this.interval = false
    },
  }
}
</script>
