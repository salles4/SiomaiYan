
const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
];

let ch = new Chart(
    document.getElementById('revenue'),
    {
        type: 'line',
        data: {
            labels: data.map(row => row.year),
            datasets: [
                {
                    label: 'Revenue',
                    data: data.map(row => row.count),
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }
);
