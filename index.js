const requestURL = "https://gp-js-test.herokuapp.com/pizza";

let load_btn = document.querySelector(".load_btn");

let box = document.querySelector(".box");
let pizza = document.querySelector(".pizza");

let list_box = document.querySelector(".list_box");
let list = document.querySelector(".list");

function createNode(elem) {
  return document.createElement(elem);
}

function append(parent, elem) {
  return parent.appendChild(elem);
}

function setItem(elem) {
  let li = createNode("li");
  li.innerText = `${elem.name}`;
  li.classList.add("item");
  append(list, li);
}

function toggleLoad(elem) {
  elem.classList.toggle("loading");
  return elem.innerText === "Loading"
    ? (elem.innerText = "Waiting...")
    : (elem.innerText = "Loading");
}

function disabledElm(elem) {
  elem.classList.toggle("disabled");
}

load_btn.addEventListener("click", (event) => {
  event.preventDefault();

  toggleLoad(load_btn);

  fetch(requestURL)
    .then((response) => response.json())
    .then(function (data) {
      disabledElm(load_btn);
      toggleLoad(load_btn);

      disabledElm(box);
      disabledElm(list_box);

      let participients = data.party;

      let people = createNode("li");
      people.innerText = `Tere are ${participients.length} people.`;
      append(list, people);

      participients = participients.filter(
        (participient) => participient.eatsPizza === true
      );

      let liTotal = createNode("li");
      liTotal.innerText = `Who wants pizza? ${participients.length} people`;
      append(list, liTotal);

      participients.map((participient) => {
        setItem(participient);
      });

      let skew = -90 + 360 / participients.length;

      for (let i = 0; i < 360; i += 360 / participients.length) {
        let li = createNode("li");
        li.classList.add("bite");
        li.style.transform = `rotate(${i}deg) skewY(${skew}deg)`;

        append(pizza, li);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
