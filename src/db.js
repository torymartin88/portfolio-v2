import firebase from '@firebase/app';
import '@firebase/firestore';

export const db = firebase.initializeApp({
  apiKey: 'AIzaSyCDPZaVocYSrPGkM3GA25jYLGfv8LFu4lE',
  projectId: 'classic-mac'
}).firestore()

const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }
