// variable keeping state information
let store = {
    currentPage: 'home',
    apod: '',
    rovers: ['curiosity', 'opportunity', 'spirit'],
}
// dynamic element of the app
const rootBodyElement = document.getElementById('root')
// given rootBody element and current state, render the html page
const render = async (root, state) => {
    root.innerHTML = AppBody(state)
}
// create content
const AppBody = (state) => {
    rootBodyElement.style.backgroundImage = "url('../assets/images/starynight.jpg')";
    let { rovers, apod, currentPage } = state
    if (currentPage == 'mars') {
        // rootBodyElement.style.backgroundImage = "url('../assets/images/starynight.jpg')";
        document.getElementById('main').style = "marginBottom: 200px;"
        return `
            <h3 style="color:#fff;">Weather recorded for Mars  </h3>
            <span style="color:#fff; font-size:13px;"> 
             A Mars solar day has a mean period of 24 hours 39 minutes 35.244 seconds, and is customarily referred to as a "sol"</span>
            <p style="color:#fff;">Weather displayed by "SOL Days"</p> 
            ${getWeather()}
           
        `
    }
    if (currentPage == 'astronomy') {
        return ImageOfTheDay(apod)
    }
    if (currentPage == 'rovers') {
        return showRoverinfo()
    }
    return `
            <div class="container">
            <div class="row">
                <div class="col-lg-4 col-sm-12">
                    <div class="card" >
                        <img src="../assets/images/Curiosity.jpg" class="card-img-top" alt="curiosityroverimage">
                            <div class="card-body">
                                <p class="card-text">Click the button below to view pictures taken by This rover.</p>
                                <button type="button" id="curiosity" class="btn btn-primary" onclick=getRoverinfo("curiosity")> Curiosity</button >
                            </div >
                    </div>
                </div >
                <div class="col-lg-4 col-sm-12">
                    <div class="card" >
                        <img src="../assets/images/Opportunity.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">Click the button below to view pictures taken by This rover.</p>
                                <button type="button" id="opportunity" class="btn btn-primary" onclick=getRoverinfo('opportunity')>Opportunity</button>
                            </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-12">
                    <div class="card">
                        <img src="../assets/images/Spirit.jpg"  class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">Click the button below to view pictures taken by This rover.</p>
                                <button type="button" onclick=getRoverinfo('spirit') id="spirit" class="btn btn-primary"> Spirit </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    `
}
const sayHello = () => {
    console.log("HELLO");
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
const displayRoverPage = () => {
    store.currentPage = 'rovers'
    render(rootBodyElement, store)
}
// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    getImageOfTheDay()
    getWeatherData()
    render(rootBodyElement, store)

})


