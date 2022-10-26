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
    <div class="launches__layout-cont">
      <div class="launches__layout-cont-block" onClick={showDetails(${i})}>
          <p class="launches__details" id="launches__details">${
            launches[i].details
          }</p>
          <img src="${
            launches[i].image
          }" class="launches__img" alt="Image of Rocket Launch">
          <p class="launches__date">${new Date(
            launches[i].date
          ).toLocaleDateString()}</p>
    `;
  }
};
const showDetails = (nth) => {
  let details = document.getElementsByClassName("launches__details");
  for (i = 0; i < details.length; i++) {
    if (i == nth) {
      details[i].classList.toggle("launches__details-visible");
    }
  }
};

getLaunches().then((launches) => {
  render(launches);
});
