//////////////////////////////////////navbar
const hamburgerBtn = document.querySelector(".hamburger-btn");
const slideNavbar = document.querySelector(".slide-nav");
const bar1 = document.querySelector(".bar.bar1");
const bar2 = document.querySelector(".bar.bar2");
const bar3 = document.querySelector(".bar.bar3");

hamburgerBtn.addEventListener("click", () => {
  bar1.classList.toggle("anim-bar1");
  bar2.classList.toggle("anim-bar2");
  bar3.classList.toggle("anim-bar3");
  slideNavbar.classList.toggle("slide-nav-show");
  slideNavbar.classList.toggle("slide-nav-hide");
});

////////////////////////////////////api call

const inputUrl = document.getElementById("inputUrl");
const shortenBtn = document.querySelector(".shorten-btn");
const errorMsg = document.querySelector(".error-msg");
const spinner = document.querySelector(".spinner-container");

shortenBtn.onclick = () => {
  console.log("short btn clicked");
  console.log("value of input is: " + inputUrl.value);
  if (inputUrl.value === "") {
    console.log("empty input value");
    inputUrl.classList.add("input-error");
    errorMsg.style.display = "block";
  } else {
    console.log("non-empty input value,procceeded");
    inputUrl.classList.remove("input-error");
    errorMsg.style.display = "none";
    spinner.style.display = "block";
    fetchUrl(inputUrl.value);
    inputUrl.value = "";
  }
};

//async fetch function

// async function fetchUrl(oldLink) {
//   try {
//     console.log("data loading");
//     console.log("fetch called");
//     const response = await fetch(
//       `https://api.shrtco.de/v2/shorten?url=${oldLink}`
//     );
//     const data = await response.json();
//     console.log("data loaded");

//     updateUrlInDom(oldLink, data.result.full_short_link);
//   } catch (err) {
//     console.log("there was an error:" + err);
//   }
// }
function fetchUrl(oldLink) {
  console.log("fetch api called");
  console.log("data loading");
  fetch(`https://api.shrtco.de/v2/shorten?url=${oldLink}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("data got from api");
      console.log(data);
      updateUrlInDom(oldLink, data.result.full_short_link);
    })
    .catch((err) => {
      console.log("there was an error:" + err);
    });
}

//update the dom with new fetched short url

function updateUrlInDom(oldLink, newLink) {
  spinner.style.display = "none";
  const urlDataContainer = document.querySelector(".url-data");

  const newUrlData = document.createElement("div");
  newUrlData.classList.add("url-container");
  const newHtml = `<p class="old-url">${oldLink}</p>
                  <div class="flex-end-div">
                   <p class="new-url">${newLink}</p>
                  <button onclick="copyToClipboard('${newLink}',this)" class="copy-btn">copy</button>
                  </div>`;

  newUrlData.innerHTML = newHtml;

  urlDataContainer.append(newUrlData);
}

const copyBtnArr = document.querySelectorAll(".copy-btn");

//copy to clipboard function
function copyToClipboard(text, objId) {
  console.log("copy called");
  console.log(text);
  console.log(objId);
  let textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  objId.innerHTML = "copied!";
  objId.classList.add("copied-color");

  setTimeout(() => {
    objId.innerHTML = "copy";
    objId.classList.remove("copied-color");
  }, 1000);
}
