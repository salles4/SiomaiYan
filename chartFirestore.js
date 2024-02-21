// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCk6x5R3Mo64_pIZAz1M0Kk5MwKUHn86l8",
    authDomain: "siomaidb.firebaseapp.com",
    projectId: "siomaidb",
    storageBucket: "siomaidb.appspot.com",
    messagingSenderId: "313485269815",
    appId: "1:313485269815:web:59218b9452b2f6367798b2",
    measurementId: "G-NPZWZHG5DH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();

const data = [];

db.collection("revenue").get().then((querySnapshot) => {
    const dataMap = {};
    querySnapshot.forEach((doc) => {
        // Access the data of each document
        const data = doc.data();
        const dateData = data.date.toDate();
        const dateString = `${dateData.getDate()}-${dateData.getMonth() + 1}-${dateData.getFullYear()}`
        
        if (dataMap[dateString]){
            dataMap[dateString] += data.revenue;
        }else{
            dataMap[dateString] = data.revenue;
        }
    });
    Object.entries(dataMap).forEach(([x, y]) =>{
        data.push({ x, y });
    })
    console.log(data);
    createChart();
}).catch((error) => {
    console.error("Error getting documents: ", error);
});

function createChart(){
    let ch = new Chart(
        document.getElementById('revenue').getContext('2d'),
        {
            type: 'bar',
            data: {
                labels: data.map(row => row.x),
                datasets: [
                    {
                        label: 'Revenue',
                        data: data.map(row => row.y),
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            parser: 'dd-MM-yyyy'
                        }
                    },
                    y:{beginAtZero: true}
                }
            }
        }
    );
}