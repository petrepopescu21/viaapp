import axios from 'axios'
export const state = () => ({
    counter: 0,
    user: null,
    userid: null,
    socketConn: null,
    nav: false,
    openend: false,
    openrate: false,
    openedit: false
})

export const mutations = {
    user(state, data) {
        state.user = data
    },
    userid(state,data) {
        state.userid = data
    },
    socketConn(state,data) {
        state.socketConn = data
    },
    location(state,data) {
        state.user.lat = data.lat
        state.user.longit = data.lng
    },
    toggleNav(state) {
        state.nav = !state.nav
    },
    toggleEnd(state) {
        state.openend = !state.openend
    },
    toggleRate(state) {
        state.openrate = !state.openrate
    },
    toggleEdit(state) {
        state.openedit = !state.openedit
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        // console.log(req.user)
        if (req.user) {
            commit('userid',req.user._id)
        }
    }
}

export const strict = false