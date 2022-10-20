const launchesEl = document.querySelector(".launches");
const loadMoreBtn = document.querySelector(".btn");

const loadLaunches = () => {
  const URL = "https://api.spacexdata.com/v4/launches";
  fetch(URL)
    .then((response) => response.json())
    .then((responseJson) => {
      for (let { date_local } of responseJson) {
        const launches = document.createElement("p");
        launches.innerText = date_local;
        launchesEl.append(date_local);
      }
    });
};

loadMoreBtn.addEventListener("click", loadLaunches);
