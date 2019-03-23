<template>
    <div id="main" role="main">
        <div id="map" class="map"></div>
        <div v-for="(r,index) in requests" :tabindex="index" :key="r._id" class="event-card" role="button" :aria-roledescription="`View: ${r.title}`">
                <h2 class="event-title">
                    {{r.title}}
                </h2>
                <div class="volunteers-count" aria-label="5 volunteers">
                    {{r.description}}
                </div>
            </div>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      requests: [],
      map: null
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
      addMarkers(data) {
          data.forEach(i=>{
              let pos = {
                  lat: Math.round(i.lat*10000)/10000,
                  lng: Math.round(i.longit*10000)/10000
              }
              i.marker = new google.maps.Marker({
                  position: pos,
                  map: this.map,
                  title: i.title
              })
          })
      }
  },
  created() {
    this.$axios.get(`/api/requests/${this.user.lat}/${this.user.longit}`).then(res=>{
    // this.$axios.get(`/api/requests/44.425401/26.10249`).then(res => {
      this.requests = res.data;
      this.addMarkers(res.data);
    });
  },
  mounted() {
      this.map = new google.maps.Map(document.getElementById('map'),{
          zoom: 15,
          center: {
              lat: Math.round(this.user.lat*10000)/10000,
              lng: Math.round(this.user.longit*10000)/10000
          }
      })
  }
};
</script>

<style>
.map {
    height: 300px;
    width: 80%;
}
</style>
