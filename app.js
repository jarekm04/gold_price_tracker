const $dateToday = document.querySelector(".price-today__title");
const $priceToday = document.querySelector(".price-today__pln");

const $chartThirtyDays = document.getElementById("thirtyDays__lineChart");
let lineChart = new Chart($chartThirtyDays, {
    type: 'line',
    data: {
        labels: ["a", "a", "a", "a", "a"],
        datasets: [{
            label: 'Gold Price',
            data: [55, 40, 40, 5, 90],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
});

const fetchLastThirtyDays = async () => {
    let response = await fetch('http://api.nbp.pl/api/cenyzlota/last/30/?format=json');
    let data = await response.json();

    return data;
}

fetchLastThirtyDays()  //set Today values
    .then((data) => {
        $dateToday.textContent = `Today - ${data[data.length - 1].data}`;
        $priceToday.textContent = `Price - ${data[data.length - 1].cena} PLN`;
    })
    .catch(error => console.log(error.message));


function update30DaysChart(e) {
    e.target.previousElementSibling.classList.remove("isHidden");
    fetchLastThirtyDays().then(data => {
        const dates = data.map(item => item.data);
        const prices = data.map(item => item.cena)
        lineChart.data.labels = dates;
        lineChart.data.datasets[0].data = prices;
        console.log(dates, prices)
        lineChart.update();
    });
}

document.querySelector(".thirtyDays__btn").addEventListener("click", update30DaysChart);

//-----------------------------------------------------------------------------------
const urls = [
    'https://api.nbp.pl/api/cenyzlota/2013-01-02/?format=json',
    'https://api.nbp.pl/api/cenyzlota/2014-01-02/?format=json',
    'https://api.nbp.pl/api/cenyzlota/2015-01-02/?format=json',
    'https://api.nbp.pl/api/cenyzlota/2016-01-04/?format=json',
    'https://api.nbp.pl/api/cenyzlota/2017-01-04/?format=json',
    'https://api.nbp.pl/api/cenyzlota/2018-01-04/?format=json',
    'https://api.nbp.pl/api/cenyzlota/2019-01-04/?format=json',
    'https://api.nbp.pl/api/cenyzlota/2020-01-03/?format=json',
    'https://api.nbp.pl/api/cenyzlota/2021-01-04/?format=json',
    'https://api.nbp.pl/api/cenyzlota/2022-01-04/?format=json'
];

const fetchLastTenYears = async () => {
    await Promise.all(urls.map(url =>
        fetch(url).then(resp => resp.json())
    )).then(texts => {
        console.log(texts)
    })
}

document.querySelector(".tenYears__btn").addEventListener("click", fetchLastTenYears);

//---------------------------------------------------

