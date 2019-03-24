<template>
            <form role="form" class="from" v-on:submit.prevent="formSubmit" v-if="form">
                <div>
                    <label for="event-title">Event title</label>
                    <input id="event-title" type="text" name="event-title" required aria-required="true" v-model="form.title" ref="title">
                </div>
                <div>
                    <label for="event-description">Event description</label>
                    <textarea id="event-description" rows="3" name="event-description" v-model="form.description"></textarea>
                </div>
                <div>
                    <label for="event-date-time">Event date/time</label>
                    <input id="event-date-time" type="datetime-local" @input="getDate(form.starts,0)" name="event-date-time" required aria-required="true" v-model="form.starts">
                </div>
                <div>
                    <label for="event-people">No. of people who can help</label>
                    <input id="event-people" type="number" name="event-people" v-model="form.numberOfPeopleNeeded">
                </div>
                <div>
                    <label for="event-deadline">Deadline</label>
                    <input id="event-deadline" type="datetime-local" @input="getDate(form.deadline,1)" name="event-ddeadline" v-model="form.deadline">
                </div>
                <button class="third-bt primary-bt" role="button" aria-label="Publish request">Update</button>
            </form>
</template>

<script>
export default {
  data() {
    return {
      form: null
    };
  },
  created() {
    this.$axios.get(`/api/requests/${this.$route.params.id}`).then(res => {
      this.form = res.data;
    });
  },
  mounted() {
    // document.getElementById('event-title').focus()
  },
  computed: {},
  methods: {
    getDate(value, x) {
      if (x == 0)
        this.form.starts = this.$moment(value);
      else
        this.form.deadline = this.$moment(value);
    },
    formSubmit() {
      this.$axios
        .post("/api/requests", {
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
        })
        .then(res => {
          // console.log('Here')
          this.$store.state.socketConn.emit("newrequest", res.data);
          this.$router.push("/");
        });
    }
  }
};
</script>