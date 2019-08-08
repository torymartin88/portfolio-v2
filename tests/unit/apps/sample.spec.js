// import { shallowMount } from '@vue/test-utils'
import Sample from '@/apps/Sample.vue'

describe('Sample.vue', () => {
  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof Sample.data).toBe('function')
    const defaultData = Sample.data()
    expect(defaultData.tempResult).toBe('0')
  })
})
