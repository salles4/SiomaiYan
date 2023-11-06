
// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATD76bQ98EsFc6g1pStjcvKuhNqiMJSFE",
    authDomain: "first-firebasedb-ec7c0.firebaseapp.com",
    databaseURL: "https://first-firebasedb-ec7c0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "first-firebasedb-ec7c0",
    storageBucket: "first-firebasedb-ec7c0.appspot.com",
    messagingSenderId: "166496135489",
    appId: "1:166496135489:web:27b83dda1ce4d2b49ed9c0",
    measurementId: "G-175RQ08JK9"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();

export function pushData(data){
    const reference = ref(db, 'salesData/')
    set(reference, data)
}

export function getData(){

    const salesData = ref(db, 'salesData/');
    return new Promise((resolve)=>{
        onValue(salesData, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            resolve(data);
        }) 

    })

}
export function updateData(path="", updatedValue){
    db.ref('salesData/'+path).update(updatedValue)
}
