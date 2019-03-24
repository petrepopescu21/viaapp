<template>
            <form role="form" class="from" v-on:submit.prevent="formSubmit">
                <div>
                    <label for="event-title">Event title</label>
                    <input id="event-title" type="text" name="event-title" required aria-required="true" v-model="item.title" ref="title">
                    <!-- <span id="nameError" class="input-error-message" aria-live="polite">Event title invalid</span> -->
                </div>
                <div>
                    <label for="event-description">Event description</label>
                    <textarea id="event-description" rows="3" name="event-description" v-model="item.desc"></textarea>
                    <!-- <span id="nameError" class="input-error-message" aria-live="polite">Event title invalid</span> -->
                </div>
                <!-- <div>
                    <label for="event-title">Event location</label>
                    <input id="event-title" type="text" name="event-title" required aria-required="true">
                </div> -->
                <div>
                    <label for="event-date-time">Event date/time</label>
                    <input id="event-date-time" type="datetime-local" name="event-date-time" required aria-required="true" v-model="item.start">
                </div>
                <div>
                    <label for="event-people">Nr. of people who can help</label>
                    <input id="event-people" type="number" name="event-people" v-model="item.count">
                </div>
                <div>
                    <label for="event-deadline">Deadline</label>
                    <input id="event-deadline" type="datetime-local" name="event-ddeadline" v-model="item.deadline">
                </div>
                <!-- <div>
                    <label for="event-comments">Comments</label>
                    <textarea id="event-comments" name="event-comments"  rows="3"></textareatextarea>
                </div> -->
                <button class="third-bt primary-bt" role="button" aria-label="Publish request">Publish</button>

            </form>
    <!-- <div>
        <p>pickup</p>
        <input type="text" v-model="keyword" v-on:input="getList">
        <button>Submit</button>
        <button @click="getCurrentLoc">Get Current Location</button>
        <ul aria-live="polite">
            <li :tabindex="index" v-for="(i,index) in results" v-bind:key="i.id">{{i.name}}</li>
            <li tabindex="0" v-if="results.length==0">No Results Found</li>
        </ul>
    </div> -->
</template>

<script>
import debounce from "lodash.debounce";
export default {
  data() {
    return {
      keyword: "",
      results: [],
      loctype: 0,
      item: {
        title: "",
        desc: "",
        count: 1,
        start: null,
        deadline: null
      }
    };
  },
  mounted() {
    document.getElementById('event-title').focus()
  },
  computed: {
    loc() {
      if (this.loctype == 0) return "Current Location";
    },
    latlng() {
      return `${this.$store.state.user.lat},${this.$store.state.user.longit}`;
    }
  },
  methods: {
    formSubmit() {
      
      this.$axios.post("/api/requests", {
        description: this.item.desc,
        comments: "",
        deadline: this.item.deadline || this.item.start,
        duration: 0,
        lat: this.$store.state.user.lat,
        longit: this.$store.state.user.longit,
        numberOfPeopleNeeded: this.item.count,
        starts: this.item.start,
        title: this.item.title,
        ownerId: this.$store.state.user._id,
        userRegistrations: []
      }).then(res=>{
          // console.log('Here')
          this.$store.state.socketConn.emit('newrequest',res.data)
          this.$router.push('/')
      })
    },
    getCurrentLoc() {
      // console.log(locString);
    },
    getList: debounce(function() {
      if (this.keyboard != "")
        this.$axios
          .get(`/api/geocode/${this.keyword}/${this.latlng}`)
          .then(res => {
            // console.log(res.data.results)
            this.results = res.data.json.results;
          });
    }, 500)
  }
};
</script>
