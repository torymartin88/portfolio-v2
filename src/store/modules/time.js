// Store and update time related properties

import moment from 'moment'

// default dateFormatString
const dateFormatString = 'ddd h:MM A'

const state = {
    now: new Date()
}

const getters = {
    formattedDate(state) {
        return moment(state.now).format(dateFormatString)
    }
}

const actions = {
    start ({ commit }) {
        setInterval(() => {
            commit('updateTime')
        }, 1000 * 30)
    }
}

const mutations = {
    updateTime (state) {
      state.now = new Date()
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  