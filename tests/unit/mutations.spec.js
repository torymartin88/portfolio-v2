import mutations from '@/store/mutations'

describe('mutations', () => {
  it('sets quote of the day', () => {
    const quote = {
      quote: 'My Quote',
      author: 'Jeff Bridges',
      background: null,
      date: '01/01/2000'
    }

    const state = {
      quoteOfDay: null
    }

    const finalState = {
      quoteOfDay: quote
    }

    mutations.SET_QUOTE_OF_DAY(state, quote)
    expect(state).toEqual(finalState)
  })
})
