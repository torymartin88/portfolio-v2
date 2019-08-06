/* Available config props
 * w {integer} - controls initial width of window
 * h {integer} - controls initial width of window
 * resizable {Boolean} - can window be resized?
 * maxw {integer} - maximum width of window - optional
 * maxh {integer} - maximum height of window - optional
 * minw {integer} - minimum width of window - optional
 * minh {integer} - minimum height of window - optional
 * scroll {Boolean} - should entire window scroll, if not handle within app
 */
export default {
  Sample: {
    w: 250,
    h: 325,
    maxw: 300,
    maxh: 525,
    minw: 200,
    minh: 325,
    scroll: true,
    prettyName: 'Sample',
    icon: {
      name: 'vials',
      primaryColor: '#54548E',
      secondaryColor: '#54548E'
    }
  },
  Settings: {
    w: 325,
    h: 325,
    resizable: false,
    scroll: true,
    prettyName: 'Settings',
    showInDock: false,
    icon: {
      name: 'cog',
      primaryColor: '#54548E',
      secondaryColor: '#54548E'
    }
  },
  Quotes: {
    w: 400,
    h: 200,
    maxw: 500,
    maxh: 325,
    minw: 300,
    minh: 200,
    scroll: true,
    prettyName: 'Quotes',
    icon: {
      name: 'quote-left',
      primaryColor: '#54548E',
      secondaryColor: '#54548E'
    }
  },
  Calculator: {
    w: 200,
    h: 325,
    resizable: false,
    prettyName: 'Calculator',
    icon: {
      name: 'calculator',
      primaryColor: '#54548E',
      secondaryColor: '#54548E'
    }
  },
  Weather: {
    w: 200,
    h: 181,
    resizable: false,
    prettyName: 'Weather',
    icon: {
      name: 'sun-cloud',
      primaryColor: '#54548E',
      secondaryColor: '#54548E',
      swapOpacity: true
    }
  },
  Notepad: {
    w: 400,
    h: 325,
    minw: 200,
    minh: 325,
    prettyName: 'Notes',
    icon: {
      name: 'sticky-note',
      primaryColor: '#54548E',
      secondaryColor: '#54548E'
    }
  },
  Video: {
    w: 400,
    h: 325,
    minw: 200,
    minh: 325,
    prettyName: 'Video',
    icon: {
      name: 'video',
      primaryColor: '#54548E',
      secondaryColor: '#54548E'
    }
  }
};
