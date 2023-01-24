const carsList = document.querySelector("#carsList");
const addCarInput = document.querySelector("#add_car_input")
const addCarBtn = document.querySelector("#add_car_button")

const BASE_URL = "http://localhost:8080";

const loadData = async () => {
  carsList.innerHTML = ""
  const responseCar = await fetch(BASE_URL + "/cars");
  const dataCar = await responseCar.json();
  for (const cars of dataCar) {
    carsList.innerHTML += `<li><input type="text" value="${cars.model}" data-carsId="${cars.id}"><button onclick="changeCar(${cars.id})">change</button><button onclick="deleteCar(${cars.id})">delete</button></li>`;
  }
};

loadData();

addCarBtn.addEventListener("click", () => {
  const newCarModel = addCarInput.value;
  let payload = {
    model: newCarModel,
  };

  fetch(BASE_URL + "/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  })
    .then(() => alert("Car added!"))
    .then(() => {
      loadData();
    })
    .catch(() => alert("Car add error"));
});


const deleteCar = (id) => {
  fetch(BASE_URL + "/cars/" + id, { method: "delete" })
    .then(() => alert("car deleted!"))
    .then(() => {
      loadData();
    })
    .catch(() => alert("car delete error"));
};

const changeCar = (carsid) =>{
  const carsItems = document.querySelectorAll(`input[data-carsId="${carsid}"]`)
  console.log(carsItems[0].value)
  let payload = {
    id: carsid,
    model: carsItems[0].value
  }

  fetch(BASE_URL + "/cars", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  })
    .then(() => alert("Car changed!"))
    .then(() => {
      loadData();
    })
    .catch(() => alert("Car change error"));

}