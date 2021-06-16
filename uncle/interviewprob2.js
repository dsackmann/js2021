const fetch = require('node-fetch')

findCityAndState = function (value) {
      // assume request is an working HTTP client
      fetch(`https://ziptasticapi.com/${value}`)
        .then(results => {
          return results.json()
        })
        .then(response => {
          let results = response.body;
         console.log(response)

          return {
            City: results.city,
            State: results.state,
            Country: results.county
          }
        })

      console.log(userModel)
}


findCityAndState(02122).
  then((userModel) => {
    console.log(userModel)
  })