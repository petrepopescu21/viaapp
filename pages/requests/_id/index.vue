<template>
    <div>
        <div v-if="isu">
            <h1 v-if="!item">Looking for user...</h1>
            <ul v-if="item" >
                <!-- <user-card :id="v._id" v-for="v in item.userRegistrations" :key="v._id"></user-card> -->
                <nuxt-link :to="`${$route.path}/volunteers`"><h1 v-if="item.userRegistrations.length>0" v-html="`${item.userRegistrations.length} volunteers applied`"></h1></nuxt-link>
                <h1 v-if="item.userRegistrations.length==0">No volunteers applied yet</h1>
            </ul>
        </div>
        <div v-if="isv">
        <div id="main" role="main" v-if="item">
            <h1 class="h1-title req-prev-title">{{item.title}}</h1>
            <p class="sub-header request-dec">{{item.description}}</p>
            

            <div  v-if="owner" class="event-card user-card request-profile" role="button" aria-roledescription="View: I need help to go to the pharmacy this weekend">
                <img :src="owner.thumb" alt="User name avatar" width="112" height="112" class="card-avatar">
                <div class="card-user-details">
                    <h2 class="event-title">
                        {{owner.firstName}} {{owner.lastName}}
                    </h2>
                    <div class="card-rating card-prof">
                        <span aria-label="location" v-if="addr"><i class="fas fa-map-marker-alt"></i><span>{{addr}}</span></span>
                        <span aria-label="date-time"><i class="fas fa-calendar-alt"></i><span v-html="`  Event date/time: ${$moment(item.starts).format('ddd, hA')}`"></span></span>
                        <span aria-label="Task very urgent" v-if="item.isUrgent"><i class="fas fa-exclamation-triangle"></i><span>Urgent</span></span>
                        <span aria-label="date-time-deadline"><i class="fas fa-clock"></i><span v-html="`  Deadline: ${$moment(item.deadline).format('ddd, hA')}`"></span></span>
                    </div>
                </div>
                
            </div>

            <div role="navigation" class="view-needs">
                    <button v-if="!applied" class="third-bt primary-bt bt-green" role="button" aria-label="Offer your help" v-on:click="apply">OFFER YOUR HELP</button>
                    <button v-if="applied" class="third-bt primary-bt bt-green" style="background-color:#555;" role="button" aria-label="Already applied">ALREADY APPLIED</button>
            </div>

            
        </div>    
        </div>
    </div>
</template>

<script>
import axios from "axios";
import UserCard from "~/components/volunteerCard";
export default {
  components: { UserCard },
  data() {
    return {
      item: null,
      owner: null,
      addrObj: null
    };
  },
  computed: {
    isu() {
      return this.user.accountType == 0;
    },
    isv() {
      return this.user.accountType == 1;
    },
    user() {
      return this.$store.state.user;
    },
    addr() {
        if (this.addrObj!=null && this.addrObj.json.results.length>0)
            return this.addrObj.json.results[0].formatted_address || null
        else return null
    },
    applied() {
        return this.item.userRegistrations.filter(x=>{
            return x._id === this.user._id
        }).length>0
    }
  },
  created() {
    console.log;

    this.$axios
      .get(`/api/requests/${this.$route.params.id}`)
      .then(res => {
        this.item = res.data;
        this.$axios.get(`/api/users/${res.data.ownerId}`).then(res2 => {
          this.owner = res2.data;
        });
        this.$axios.get(`/api/geocode/${this.item.lat},${this.item.longit}`).then(res3 =>{
            this.addrObj = res3.data;
        }).catch(err=>{
            console.log(err)
        })
      })
      .catch(err => {
        this.$router.push("/");
      });
  },
  methods: {
      apply() {
          this.$axios.post(`/api/requests/apply`,{
              _id: this.item._id,
              _userId: this.user._id
          }).then(res=>{
              this.$router.push('/')
          }).catch(err=>{
              console.log(err)
          })
      }
  }
};
</script>

<style>
</style>
