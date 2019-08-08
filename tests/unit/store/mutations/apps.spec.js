import { mutations } from '@/store/modules/apps'

// data passed to create a new app
let sampleAppData = {
  name: 'NewApp',
  props: {
    icon: '',
    prettyName: 'New App',
    showInDock: true
  }
}

// base app object in store
let sampleApp = {
  name: 'NewApp',
  icon: '',
  prettyName: 'New App',
  showInDock: true,
  open: false
}

describe('mutations', () => {
  it('clears all apps', () => {
    const state = {
      apps: [0, 1, 2]
    }

    const finalState = {
      apps: []
    }

    mutations.CLEAR_APPS(state)
    expect(state).toEqual(finalState)
  })

  it('adds app', () => {
    const newApp = sampleAppData;

    const state = {
      apps: []
    }

    const finalState = {
      apps: [sampleApp]
    }

    mutations.ADD_APP(state, newApp)
    expect(state).toEqual(finalState)
  })

  it('opens app', () => {
    let appOpen = JSON.parse(JSON.stringify(sampleAppData));
    const appName = 'NewApp';

    appOpen.open = true

    const state = {
      apps: [sampleAppData]
    }

    const finalState = {
      apps: [appOpen]
    }

    mutations.OPEN_APP(state, appName)
    expect(state).toEqual(finalState)
  })

  it('closes app', () => {
    let appOpen = JSON.parse(JSON.stringify(sampleAppData));
    const appName = 'NewApp';

    appOpen.open = true

    const state = {
      apps: [appOpen]
    }

    const finalState = {
      apps: [sampleAppData]
    }

    mutations.OPEN_APP(state, appName)
    expect(state).toEqual(finalState)
  })
})
