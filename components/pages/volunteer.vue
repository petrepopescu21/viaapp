<template>
    <div id="main" role="main">
      <div role="navigation" class="view-needs">
                <button class="third-bt today-needs-bt" v-bind:class="{'primary-bt':!tab}" role="button" aria-label="New Request" @click="tab=false">Ongoing</button>
                <button class="third-bt all-needs-bt" v-bind:class="{'primary-bt':tab}" role="button" aria-label="Today needs" @click="tab=true">New</button>
      </div>
      <div v-show="!tab">
          <h1 class="h1-title">Requests you've engaged</h1>
            <div v-for="(r,index) in reqs" :tabindex="index" :key="r._id" class="event-card" role="button" :aria-roledescription="`View: ${r.title}`">
                <h2 class="event-title">
                    {{r.title}}
                </h2>
                <div class="card-rating card-prof">
                    <span aria-label="location"><i class="fas fa-map-marker-alt"></i><geolocator :lat="r.lat" :lng="r.longit"></geolocator></span>
                    <span aria-label="date-time"><i class="fas fa-calendar-alt"></i><span v-html="`Event date/time: ${$moment(r.starts).format('ddd, hA')}`"></span></span>
                </div>
                <nuxt-link :to="`/requests/${r._id}`" class="third-bt view-task" role="button" aria-label="View task">View task</nuxt-link>
            </div>
      </div>
      <div v-show="tab">
            <div id="map" class="map"></div>
            <h1 class="h1-title">Other requests around you</h1>
            <div v-for="(r,index) in filteredRequests" :tabindex="index" :key="r._id" class="event-card" role="button" :aria-roledescription="`View: ${r.title}`">
                <h2 class="event-title">
                    {{r.title}}
                </h2>
                <div class="card-rating card-prof">
                    <span aria-label="location"><i class="fas fa-map-marker-alt"></i><geolocator :lat="r.lat" :lng="r.longit"></geolocator></span>
                    <span aria-label="date-time"><i class="fas fa-calendar-alt"></i><span v-html="`Event date/time: ${$moment(r.starts).format('ddd, hA')}`"></span></span>
                </div>
                <nuxt-link :to="`/requests/${r._id}`" class="third-bt view-task" role="button" aria-label="View task">View task</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import Geolocator from "~/components/Geolocator";
export default {
  components: { Geolocator },
  props: ["reqs"],
  data() {
    return {
      requests: [],
      map: null,
      tab: 0
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    filteredRequests() {
      return this.requests.filter(x => {
        return !this.reqs.some(function(i) {
          return i._id == x._id;
        });
      });
    }
  },
  methods: {
    addMarkers(data) {
      data.forEach(i => {
        let pos = {
          lat: Math.round(i.lat * 10000) / 10000,
          lng: Math.round(i.longit * 10000) / 10000
        };
        i.marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          title: i.title
        });
      });
      let c = new google.maps.LatLng(this.user.lat, this.user.longit);
      this.map.panTo(c);
    }
  },
  created() {
    this.$axios
      .get(`/api/requests/${this.user.lat}/${this.user.longit}`)
      .then(res => {
        // this.$axios.get(`/api/requests/44.425401/26.10249`).then(res => {
        this.requests = res.data;
        // this.addMarkers(res.data);
      });
  },
  mounted() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: {
        lat: Math.round(this.user.lat * 10000) / 10000,
        lng: Math.round(this.user.longit * 10000) / 10000
      }
    });
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 400px;
  margin: 1em 0;
}

.h1-title {
  margin: 1em 0;
}
</style>
