fetch("https://static.easysunday.com/covid-19/getTodayCases.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });