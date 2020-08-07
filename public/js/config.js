var firebaseConfig = {
    apiKey: "AIzaSyBG5hHsXZ-4IBTRolWhznPIPVjl-7EZPh8",
    authDomain: "mybrand-61fba.firebaseapp.com",
    databaseURL: "https://mybrand-61fba.firebaseio.com",
    projectId: "mybrand-61fba",
    storageBucket: "mybrand-61fba.appspot.com",
    messagingSenderId: "971411413605",
    appId: "1:971411413605:web:e9ae0257c4238b9ef9448c",
    measurementId: "G-B9F4EYSBSS"
};
// Initialize Firebase


firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const db = firebase.firestore();
export const auth=firebase.auth();