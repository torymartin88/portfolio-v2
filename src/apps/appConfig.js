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
        scroll: true
    },
    Calculator: {
        w: 200,
        h: 325,
        resizable: false
    },
    Weather: {
        w: 200,
        h: 181,
        resizable: false
    },
    Notepad: {
        w: 400,
        h: 325,
        minw: 200,
        minh: 325
    },
    Video: {
        w: 400,
        h: 325,
        minw: 200,
        minh: 325
    }
}
