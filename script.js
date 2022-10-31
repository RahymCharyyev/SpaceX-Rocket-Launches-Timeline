const BASE_URL = "https://api.spacexdata.com/v5/";
async function getLaunches() {
  const resLaunches = await fetch(BASE_URL + "launches");
  const launchesData = await resLaunches.json();
  if (resLaunches.status !== 200) {
    return {
      message: alert(
        "Error Getting Launches. May be API is blocked in your network. Check your internet connection and try again."
      ),
    };
  }
  let launches = launchesData.map((launch) => {
    const image = launch.links.patch.small || "./img/launch.jpg";
    const details = launch.details || "No details";
    return {
      name: launch.name,
      image,
      date: launch.date_local,
      details,
    };
  });
  return launches;
}

const render = (launches) => {
  for (let i = 0; i < launches.length; i++) {
    document.querySelector(".launches__layout").innerHTML += `
    <div class="launches__layout-container" onClick={showDetails(${i})}>
          <img src="${
            launches[i].image
          }" class="launches__img" alt="Image of Rocket Launch">
          <p class="launches__date">${new Date(
            launches[i].date
          ).toLocaleDateString()}</p>
          <h2 class="launches__name">${launches[i].name}</h2>
    </div>
    <div class="modal" id="modal">
        <div class="modal__window">
            <span class="modal__close" onClick={hideModal(${i})}>&times;</span>
            <h2>${launches[i].name}</h2>
            <p>${launches[i].details}</p>
        </div>
    </div>
    `;
  }
};

const showDetails = (nth) => {
  let details = document.getElementsByClassName(
    "modal",
    "modal__window",
    "modal__close"
  );
  for (i = 0; i < details.length; i++) {
    if (i == nth) {
      details[i].classList.toggle("modal__show");
    }
  }
};

const hideModal = (nth) => {
  let modal = document.getElementsByClassName("modal");
  for (i = 0; i < modal.length; i++) {
    if (i == nth) {
      modal[i].classList.remove("modal__show");
    }
  }
};
getLaunches().then((launches) => {
  render(launches);
});
