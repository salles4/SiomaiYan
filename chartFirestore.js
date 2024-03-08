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

// Get arguments in url after the '?'
var queryString = window.location.search;
var queryParams = new URLSearchParams(queryString.substring(1));
if (queryParams.has('collection')){    
    const collectionName = queryParams.get('collection')
    getData(collectionName)
}else{
    document.getElementById('chartDiv').innerHTML = "No arguments. Check tech support."
}

const data = [];
function getData(collectionName){
    // Gets collection list at database in ascending order by date
    db.collection(collectionName).orderBy("date", "asc").get().then((querySnapshot) => {
        const dataMap = {};
        querySnapshot.forEach((doc) => {
            // Access the data of each document
            const data = doc.data();
            // Converts date field to yyyy-mm-dd
            const dateData = data.date.toDate();
            const dateString = `${dateData.getFullYear()}-${addZero(dateData.getMonth() + 1)}-${addZero(dateData.getDate())}`
            // Checks the collection name since value fields have different name
            let value = collectionName == "revenue" ? data.revenue : data.amount
            // Checks if date already exists to combine values with same date
            if (dataMap[dateString]){
                dataMap[dateString] += value;
            }else{
                dataMap[dateString] = value;
            }
        });
        // Change key value pair to array with two objects per index
        Object.entries(dataMap).forEach(([date, value]) =>{
            data.push({ date, value });
        })
        // Start drawing of the chart
        createChart();
    }).catch((error) => {
        console.error("Error getting documents: ", error);
    });
}

function createChart(){
    // Reference: Chart JS documentation
    new Chart(
        document.getElementById('chart').getContext('2d'),
        {
            type: 'line',
            data: {
                labels: data.map(row => row.date),
                datasets: [
                    {
                        label: 'Data',
                        data: data.map(row => row.value),
                        fill: true,
                        backgroundColor: '#FF36365F',
                        borderColor: '#FF3636'
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
                            parsing: 'yyyy-MM-dd',
                            displayFormats: {
                                day: 'MMM dd'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        }
    );
}
// Returns two digit string of passed number for mm-dd
function addZero(num){
    return String(num).padStart(2,"0");
}

document.getElementById("printButton").addEventListener('click', function(){print()})