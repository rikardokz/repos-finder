const inputEl = document.querySelector("input");
const ulEl = document.querySelector("ul");

function add() {
  const inputVal = inputEl.value;
  ulEl.innerHTML = "";
  loading();
  axios
    .get(`https://api.github.com/users/${inputVal}/repos`)
    .then((res) => {
      const data = res.data;
      data.forEach((value) => {
        inputEl.value = "";
        const project = value.name;
        const link = value.full_name;
        const liElement = document.createElement("li");
        liElement.innerHTML = `<a href="https://github.com/${link}">${
          project.charAt(0).toUpperCase() + project.slice(1)
        }</a>`;
        ulEl.appendChild(liElement);
      });
    })
    .catch((err) => {
      const headerEl = document.createElement("h1");
      headerEl.innerText = "No repositories for this user";
      ulEl.appendChild(headerEl);
    });
}

function loading() {
  const liWait = document.createElement("li");
  liWait.innerText = "Loading...";
  ulEl.appendChild(liWait);
  setTimeout(() => {
    ulEl.removeChild(liWait);
  }, 00);
}
