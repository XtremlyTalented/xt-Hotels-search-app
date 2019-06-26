//Calling Packeges required
let request = require("request-promise")

//getCity function for getting City ID
let getCity = async(city) => {
    console.log('actionpage is loaded')
    let options = {
        method: 'GET',
        url: 'https://developers.zomato.com/api/v2.1/cities',
        qs: {
            q: city
        },
        headers: {
            'user-key': 'a5f3c5e2a866b256efca185e2455b738',
            Accept: 'application/json'
        },
        resolveWithFullResponse: true
    }

    return request.get(options).then((response) => {
        let body = JSON.parse(response.body);
        return body.location_suggestions[0].id;
    })
    .catch((error) => {
        console.log('D> Error: ', error)
        return false
    })
}


//Using City ID to bring up the Restaurants under the City
let getRestaurants = async(city_Id) => {
    let options ={
        method: 'GET',
        url: 'https://developers.zomato.com/api/v2.1/search',
        qs: {
            entity_id: city_Id, 
            entity_type: 'city'
        },
        headers: {
            'user-key': 'a5f3c5e2a866b256efca185e2455b738',
            Accept: 'application/json'
        },
        resolveWithFullResponse: true
    }

    return request.get(options).then((response) => {
        let body = JSON.parse(response.body);
        // console.log(body);
        return body.restaurants;
    }).catch((error) => {
        console.log('D> Error: ', error)
        return false
    })
}


//Bringing up a Specific Restaurant Details when Clicked open
let res_details = async(res_Id) => {
    let options ={
        method: 'GET',
        url: 'https://developers.zomato.com/api/v2.1/restaurant',
        qs: {
            res_id: res_Id
        },
        headers: {
            'user-key': 'a5f3c5e2a866b256efca185e2455b738',
            Accept: 'application/json'
        },
        resolveWithFullResponse: true
    }
    return request.get(options).then((response) => {
        let body = JSON.parse(response.body);
        console.log(body.name);
        return body;
    })
}

//Exporting functions to the APP
module.exports = {
    getCity,
    getRestaurants,
    res_details
}