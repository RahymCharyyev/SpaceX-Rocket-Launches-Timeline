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
    const details = launch.details || "";
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
      <div class="launches__layout-cont-block">
        <img src="${launches[i].image}" alt="Image of Rocket Launch">
        <p>${new Date(launches[i].date).toLocaleDateString()}</p>
        <h2>${launches[i].name}</h2>
      </div>
    </div>`;
  }
};

getLaunches().then((launches) => {
  render(launches);
});
