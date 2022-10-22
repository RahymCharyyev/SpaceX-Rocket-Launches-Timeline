const button = document.querySelector(".button");
const BASE_URL = "https://api.spacexdata.com/v5/";
async function getLaunches() {
  const resLaunches = await fetch(BASE_URL + "launches");
  const launchesData = await resLaunches.json();
  if (resLaunches.status !== 200) {
    return {
      message: "Error Getting Launches",
    };
  }
  let launches = launchesData.map((launch) => {
    const image =
      launch.links.patch.small ||
      "https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg";
    return {
      name: launch.name,
      image,
      date: launch.date_local,
    };
  });
  return launches;
}

const launchesImg = document.querySelector(".launches__image");
const render = (launches) => {
  for (let i = 0; i < launches.length; i++) {
    document.querySelector(
      ".launches__list"
    ).innerHTML += `<div class = "launch__container">
                        <div class="launch__info">
                            <p>name: ${launches[i].name}</p>
                            <p>date: ${new Date(
                              launches[i].date
                            ).getFullYear()}</p>
                        </div>
                        <div class = "launch__img">
                        </div>
                    </div>`;
  }
};

getLaunches().then((launches) => {
  render(launches);
});
