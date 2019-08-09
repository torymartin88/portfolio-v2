
// state for notepad app
const state = {
  activeNoteId: 0,
  notes: [{
    content: 'test'
  }],
}

const getters = {
  getActiveNote(state) {
    return state.notes[state.activeNoteId];
  }
}

const actions = {
  updateNoteContent({ commit }, { id, content } ) {
    commit('UPDATE_NOTE_CONTENT', { id, content })
  }
}

const mutations = {
  CREATE_NOTE(state) {
    state.notes.push({
      content: ''
    })
  },

  DELETE_NOTE(state, note) {
    state.notes.splice(state.notes.indexOf(note), 1);
  },

  UPDATE_NOTE_CONTENT (state, { id, content }) {
    state.notes[id].content = content
    state.activeNoteId = id
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
