const BASE_URL = "https://api.spacexdata.com/v5/launches/query";
let queryLimit = 12;
let queryOffset = 0;
let loader = document.querySelector(".launches__loader");
let loading = (document.getElementById("loader").innerHTML = "Load More...");
async function getLaunches(limit, offset) {
  try {
    const resLaunches = await fetch(BASE_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        query: {},
        options: {
          limit: limit,
          offset: offset,
        },
      }),
    });
    const { docs, totalDocs } = await resLaunches.json();
    let launches = docs.map((launch) => {
      const image = launch.links.patch.small || "./img/launch.jpg";
      const details = launch.details || "No details";
      return {
        name: launch.name,
        image,
        date: launch.date_local,
        details,
      };
    });
    loader.classList.toggle("launches__loader-hide");
    return { launches, totalDocs };
  } catch (error) {
    alert(
      "Error Getting Launches. Maybe API is blocked in your network. Check your internet connection and try again."
    );
    loader.classList.toggle("launches__loader");
  }
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
    if (i == nth) details[i].classList.toggle("modal__show");
  }
};

const hideModal = (nth) => {
  let modal = document.getElementsByClassName("modal");
  for (i = 0; i < modal.length; i++) {
    if (i == nth) modal[i].classList.remove("modal__show");
  }
};

const loadMore = () => {
  queryOffset += 12;
  loading = document.getElementById("loader").innerHTML = "Loading...";
  loading = document.getElementById("loader").disabled = true;

  try {
    getLaunches(queryLimit, queryOffset).then((launches) => {
      if (2 * queryLimit + queryOffset >= launches.totalDocs) {
        let loadMoreBtn = document.querySelector(".launches__button");
        loadMoreBtn.addEventListener("click", () => {
          loadMoreBtn.classList.toggle("launches__button-hide");
        });
      }
      render(launches.launches);
      loading = document.getElementById("loader").innerHTML = "Load More...";
      loading = document.getElementById("loader").disabled = false;
    });
  } catch (error) {
    alert(
      "Error Getting Launches. Maybe API is blocked in your network. Check your internet connection and try again."
    );
  }
  loader.classList.toggle("launches__loader-hide");
};

getLaunches(queryLimit, queryOffset).then((launches) => {
  render(launches.launches);
});
