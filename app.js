// const nbpApiData = async () => {
//     let response = await fetch('http://api.nbp.pl/api/cenyzlota/last/30/?format=json');
//     let data = await response.json();
//
//     return data;
// }
//
// nbpApiData()
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message));

const fetchLastTenYears = async () => {
    let [response, dwa] = await Promise.all([
       fetch('https://api.nbp.pl/api/cenyzlota/2013-01-02/?format=json'),
       fetch('https://api.nbp.pl/api/cenyzlota/2014-01-02/?format=json')
    ]);
    // let data = await response.json();

    return data;
}
fetchLastTenYears()
    .then(data => console.log(data))

const $tenYearsBtn = document.querySelector(".tenYears__btn");
$tenYearsBtn.addEventListener("click", fetchLastTenYears)
/*
https://api.nbp.pl/api/cenyzlota/2013-01-02/?format=json
https://api.nbp.pl/api/cenyzlota/2014-01-02/?format=json
https://api.nbp.pl/api/cenyzlota/2015-01-02/?format=json
https://api.nbp.pl/api/cenyzlota/2016-01-04/?format=json
https://api.nbp.pl/api/cenyzlota/2017-01-04/?format=json
https://api.nbp.pl/api/cenyzlota/2018-01-04/?format=json
https://api.nbp.pl/api/cenyzlota/2019-01-04/?format=json
https://api.nbp.pl/api/cenyzlota/2020-01-03/?format=json
https://api.nbp.pl/api/cenyzlota/2021-01-04/?format=json
https://api.nbp.pl/api/cenyzlota/2022-01-04/?format=json


 */