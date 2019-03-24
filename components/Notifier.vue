<template>
    <div style="display:none;"></div>
</template>

<script>
export default {
  mounted() {
    this.$store.state.socketConn.on("newrequestreceived", this.newReq);
    this.$store.state.socketConn.on("requestaccepted", this.accepted);
    this.$store.state.socketConn.on("requestreminder", this.accepted);
  },
  methods: {
    accepted(data) {
      if(data.userRegistrations.filter(x=>{
        return x._id == this.$store.state.user._id && x.isConfirmed == true
      }).length>0) {
        var options = {
          body: data.title,
          onclick: function(event) {
            event.preventDefault();
            window.open(`/requests/${data._id}`)
          }
        }

        var obj = {
          a: data.title,
          b: data._id,
          c: '/requests',
          d: 'Accepted: '
        }
        this.notifyMe(options,obj)
      }
    },
    newReq(data) {
      var options = {
        body: data.description,
        onclick: function(event) {
          event.preventDefault();
          window.open(`/requests/${data._id}`);
        }
      }
      var obj = {
        a: data.title,
        b: data._id,
        c: '/requests/',
        d: 'New request: '
      }
      this.notifyMe(options,obj)
    },
    notifyMe(options,obj) {
      
      if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
      } else if (Notification.permission === "granted") {
        var notification = new Notification(
          `${obj.d} ${obj.a}`,
          options
        );
        notification.onclick = function() {
          window.location.href = `${obj.c}${obj.b}`;
        };
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function(permission) {
          if (permission === "granted") {
            var notification = new Notification(
              `${obj.d} ${data.title}`,
              options
            );
            notification.onclick = function() {
              window.location.href = `${obj.c}${data._id}`;
            };
          }
        });
      }
    }
  }
};
</script>

