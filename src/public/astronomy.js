
const ImageOfTheDay = (apod) => {
    const today = new Date()
    if (!apod || store.apod.image.date === today.toString()) {
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

const getImageOfTheDay = () => {
    fetch(`http://localhost:3000/apod?`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
}

// Higer order function that renders UI
// const displayData = async(roverName, callBack() => ({
//     const info = await getRoverinfo(roverName);
//     callBack(info);
// });

const getRoverinfo = async (roverName) => {
    await fetch(`http://localhost:3000/roverinfo?rname=${roverName}`)
        .then(res => res.json())
        .then(info => updateStore(store, info));
    displayRoverPage();
}

// getting the most recent images from nasa using date from previous api call

const showRoverinfo = () => {
    const roverData = store.info.photo_manifest;
    const photos = store.photoInfo.photos;
    return (` 
        <div class="row">
            <div class="col-md-3"> 
                <h2> Stats of ${roverData.name}: </h2>
                <ul class="list-group"> 
                    <li class="list-group-item"> Launch Date:${roverData.launch_date} </li>
                    <li class="list-group-item"> Landing Date:${roverData.landing_date} </li>
                    <li class="list-group-item"> Status: ${roverData.status.toUpperCase()} </li>
                    <li class="list-group-item"> Most recent photos were taken on: ${roverData.max_date} </li>
                    <li class="list-group-item"> Total Photos by rover since landing: ${roverData.total_photos}
                    <li class="list-group-item"> Total Photos by rover since landing: ${roverData.total_photos}
                </ul> 
            </div>
            <div class="col-md-7">
                <h2>Images Taken</h2>
                
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src="${photos[0].img_src}" alt="0 slide">
                        </div>
                        ${showRoverPhoto(photos.splice(1))}
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>`
    )
}

const showRoverPhoto = (photos) => {
    let photoList = "";

    photos.forEach((p, index) => {

        photoList += `
        <div class="carousel-item">
            <img class="d-block w-100" src="${p.img_src}" alt="${index} slide">
        </div>
        `
    });

    return photoList;
}


