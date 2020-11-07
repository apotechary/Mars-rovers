// variable keeping state information
let store = {
    currentPage: 'home',
    // user: { name: 'Student' },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}
// const imagesOfRovers => {
//     if rovers == 'Curiosity' {
//     }
// }

// dynamic element of the app
const rootBodyElement = document.getElementById('root')

// updates the state variable

// given rootBody element and current state, render the html page
const render = async (root, state) => {
    root.innerHTML = AppBody(state)
}
//const astronomy

// create content
const AppBody = (state) => {
    let { rovers, apod, currentPage } = state
    //// THIS IS WHERE THE CONTENT THAT WAS DISPLAYED ON PAGE WAS LOCATED --AFTER THE RETURN STATEMENT 
    if (currentPage == 'mars') {
        return `
            <h3>Weather forcast for Mars is </h3>
            <p>Here is an example section.</p> 
        `
    }
    if (currentPage == 'astronomy') {
        return `
           ${ImageOfTheDay(apod)}
        `
    }

    return `
    <section>
    <div class="container">
    <div class="row">
      <div class="col-4">
      <div class="card" style="width:23rem;">
      <img src="../assets/images/Curiosity.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">Click the button below to view pictures taken by This rover.</p>
        <button type="button" class="btn btn-primary">Curiosity</button>
      </div>
    </div>
      </div>
      <div class="col-4">
      <div class="card" style="width: 23rem;">
      <img src="../assets/images/Opportunity.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">Click the button below to view pictures taken by This rover.</p>
        <button type="button" class="btn btn-primary">Opportunity</button>
      </div>
    </div>
      </div>
      <div class="col-4">
      <div class="card" style="width: 23rem;">
      <img src="../assets/images/Spirit.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">Click the button below to view pictures taken by This rover.</p>
        <button type="button" class="btn btn-primary"> Spirit </button>
      </div>
    </div>
      </div>
    </div>
  </div>
  </section>  
        
    `
}
const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    // render(rootBodyElement, store)
}
// shows home page
const showHomePage = () => {
    store.currentPage = 'home'
    render(rootBodyElement, store)

}

//shows the mars page
const showMarsPage = () => {
    store.currentPage = 'mars'
    render(rootBodyElement, store)

}

//shows the astronomy page
const showAstronomyPage = () => {
    store.currentPage = 'astronomy'
    render(rootBodyElement, store)

}
// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    getImageOfTheDay()
    console.log('current store, ', store)
    render(rootBodyElement, store)
    console.log('updated store, ', store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
// const Greeting = (name) => {
//     if (name) {
//         return `
//             <h1>Welcome, ${name}!</h1>
//         `
//     }

//     return `
//         <h1>Hello!</h1>
//     `
// }
// ------------------------------------------------------  API CALLS
// the response on the client side
// Example API call

// Example of a pure function that renders infomation requested from the backend
// If image does not already exist, or it is not from today -- request it again
const ImageOfTheDay = (apod) => {
    const today = new Date()
    if (!apod || store.apod.image.date === today.getDate()) {
        getImageOfTheDay()
    }

    // check if the photo of the day is actually type video!
    if (store.apod && store.apod.image.media_type == "video") {
        return (`
          <p>See today's featured video <a href="${store.apod.image.url}">here</a></p>
          <p>${store.apod.image.title}</p>
          <p>${store.apod.image.explanation}</p>
      `)
    } else if (store.apod && store.apod.image.media_type == "image") {

        return (`
          <img src="${store.apod.image.url}" height="450px" width="100%" />
          <h3 style="font-size:12px;font-family:sans;width40%">${store.apod.image.title}</h3> 
          <p style="font-size:12px;font-family:sans;width40%">${store.apod.image.explanation}</p>
      `)
    }
}
// const getWeatherData = () => {
//     return
//     const sol = weather.sol_keys
//     JSO[sol].AT.av

// }

// call backend to get information on image
const getImageOfTheDay = () => {
    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
    console.log('this will be the new store', store)

}
// const getWeatherData = () => {
//     fetch(`http://localhost:3000/currentpage`)
// }
// fetch(`http://localhost:3000/currentPage`)
    //     .then(res => res.json())
    // console.log('weatherres', res)
    //     .then(weather => updateStore(store, { weather }))
    // console.log('this will be the new jsonfile', weather)