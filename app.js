const $dateToday = document.querySelector(".price-today__title");
const $priceToday = document.querySelector(".price-today__pln");
const $chartThirtyDays = document.getElementById("thirtyDays__lineChart");
const $chartTenYears = document.getElementById("tenYears__lineChart");
const $progressBar = document.querySelector(".circular-progress");
const $valueContainer = document.querySelector(".value-container");

//------------progress bar-----------------------
let progressValue = 0;
let progressEndValue = 100;
let speed = 1;

const progress = setInterval(() => {
   progressValue++;
   $valueContainer.textContent = `${progressValue}%`;
   $progressBar.style.background = `conic-gradient(
       #4d5bf9 ${progressValue * 3.6}deg,
       #cadcff ${progressValue * 3.6}deg
   )`;
   progressValue === progressEndValue ? clearInterval(progress) : null;
}, speed);

//-----------------------------------------------

const lineChart30Days = new Chart($chartThirtyDays, {
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

const lineChart10Years = new Chart($chartTenYears, {
    type: 'line',
    data: {
        labels: ["b", "b", "b", "b", "b"],
        datasets: [{
            label: 'Gold Price (~January)',
            data: [1, 2, 40, 50, 9],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
});

const fetchLast30Days = async () => { //get 30 days gold price
    let response = await fetch('http://api.nbp.pl/api/cenyzlota/last/30/?format=json');
    let data = await response.json();

    return data;
}

fetchLast30Days()  //set today values
    .then((data) => {
        setTimeout(() => {
            $dateToday.textContent = `Today - ${data[data.length - 1].data}`;
            $priceToday.textContent = `Price - ${data[data.length - 1].cena} PLN`;
            $progressBar.style.display = 'none';
        }, 900)
    })
    .catch(error => console.log(error.message));


function updateLast30DaysChart(e) { //set 30 days line chart
    e.target.previousElementSibling.classList.remove("isHidden");
    fetchLast30Days().then(data => {
        const dates = data.map(item => item.data);
        const prices = data.map(item => item.cena);
        lineChart30Days.data.labels = dates;
        lineChart30Days.data.datasets[0].data = prices;
        lineChart30Days.update();
    });
}

document.querySelector(".thirtyDays__btn").addEventListener("click", updateLast30DaysChart);

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

const fetchLast10Years = async (e) => { //get and set 10 years line chart
    await Promise.all(urls.map(url =>
        fetch(url).then(resp => resp.json())
    )).then(data => {
        const dates = data.map(items =>
            items[0]).map(item => item.data);
        const prices = data.map(items =>
            items[0]).map(item => item.cena);
        lineChart10Years.data.labels = dates;
        lineChart10Years.data.datasets[0].data = prices;
        e.target.previousElementSibling.classList.remove("isHidden");
        lineChart10Years.update();
    })
}

document.querySelector(".tenYears__btn").addEventListener("click", fetchLast10Years);

