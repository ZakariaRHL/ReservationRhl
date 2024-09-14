import { popularData } from "../popularData.js";

const imgHotel = document.querySelector("#hotelImg");
const hotelName = document.querySelector("#hotelName");
const hotelLocation = document.querySelector("#hotelLocation");
const hotelPrice = document.querySelector("#hotelPrice");
const hotelRating = document.querySelector("#hotelRating");
const hotelDesc = document.querySelector("#hotelDesc");
const cancelBtn = document.querySelector("#btn-cancel");
const depart = document.querySelector("#departDate");
const returnDate = document.querySelector("#returnDate");
const guestVl = document.querySelector("#guestVl");

try {
  const selectedUser = JSON.parse(sessionStorage.getItem("dataUser"));
  const nights = calculateNights(selectedUser.arrive, selectedUser.depart);
  console.log("nights", nights);
  const data = getData();
  render(data, selectedUser, nights);
  console.log("data", data);
  cancelBtn.addEventListener("click", cancel);
} catch (err) {
  console.log(err);
}

function getData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const find = popularData?.filter((item) => {
    return item.id == id;
  });
  if (!find) {
    alert("Not found");
    window.location.href = "index.html";
  }
  return find;
}

function render(data, selectedUser, nights) {
  imgHotel.src = data[0].image;
  hotelName.textContent = data[0].name;
  hotelDesc.textContent = data[0].description;
  hotelLocation.textContent = data[0].location;
  hotelPrice.textContent = data[0].price * nights;
  hotelRating.textContent = data[0].rating;
  guestVl.textContent = selectedUser.guest;
  depart.textContent = selectedUser.depart;
  returnDate.textContent = selectedUser.arrive;
}

function calculateNights(departDate, arriveDate) {
  var depart = new Date(departDate);
  var arrive = new Date(arriveDate);

  var difference = arrive.getTime() - depart.getTime();

  var nights = Math.ceil(difference / (1000 * 3600 * 24));

  return nights;
}

function cancel() {
  window.location.href = "index.html";
}
