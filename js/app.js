import { popularData } from "../popularData.js";
import { Popular } from "./Popular.js";

document.addEventListener("DOMContentLoaded", () => {
  const containerPop = document.querySelector("#hotelsPop");
  const dateDep = document.querySelector("#dateDep");
  const dateRet = document.querySelector("#dateArr");
  const formSearch = document.querySelector("#searchForm");
  const searchBtn = document.querySelector("#search-btn");
  const roomDrop = document.querySelector("#roomDropdown");
  const btnRoom = document.querySelector("#btn-room");
  const roomList = document.querySelector("#roomList");
  const roomValue = document.querySelector("#roomValue");
  const guestDrop = document.querySelector("#guestDropdown");
  const btnGuest = document.querySelector("#btn-guest");
  const guestList = document.querySelector("#guestList");
  const guestValue = document.querySelector("#guestValue");
  const btnLog = document.querySelector("#btn-Log");

  let listRM = false;
  let valueRM = 0;

  popularData?.forEach((item) => {
    const popular = new Popular(item);
    popular.render(containerPop);
  });

  btnLog.addEventListener("click", (e) => {
    window.location.href = "login.html";
  });

  formSearch?.addEventListener("submit", (e) => {
    e.preventDefault();
    const depart = dateDep.value;
    const arrive = dateRet.value;
    if (guestValue.textContent == 0 || roomValue.textContent == 0) {
      alert("Please select number of guests and rooms");
      return;
    }
    let data = {
      depart: depart,
      arrive: arrive,
      guest: guestValue.textContent,
      room: roomValue.textContent,
    };
    sessionStorage.setItem("dataUser", JSON.stringify(data));
    const popularSection = document.getElementById("hotelCard");
    if (popularSection) {
      popularSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  roomValue.textContent = valueRM;

  fetchListDrop(5, "room", roomValue, roomDrop, roomList);
  fetchListDrop(10, "guest", guestValue, guestDrop, guestList);

  btnRoom.addEventListener("click", (e) => {
    e.preventDefault();
    roomDrop.classList.toggle("hidden");
  });

  btnGuest.addEventListener("click", (e) => {
    e.preventDefault();
    guestDrop.classList.toggle("hidden");
  });

  roomList.addEventListener("click", handleListClick);
  guestList.addEventListener("click", handleListClick);

  function handleListClick(event) {
    event.preventDefault();
    const listItem = event.target.closest("li");
    if (!listItem) return;
    const clicked = listItem.id.split("-")[1];
    if (listItem.parentElement === roomList) {
      roomValue.textContent = clicked;
      roomDrop.classList.toggle("hidden");
    } else if (listItem.parentElement === guestList) {
      guestValue.textContent = clicked;
      guestDrop.classList.toggle("hidden");
    }
  }

  function fetchListDrop(items, name, tgValue, dropCls, listContainer) {
    for (let i = 1; i <= items; i++) {
      const listItem = document.createElement("li");
      listItem.id = `${name}-${i}`;
      listItem.classList.add(
        "hover:bg-gray-200",
        "p-1",
        "cursor-pointer",
        "rounded-md"
      );
      listItem.textContent = `${name} ${i}`;
      listContainer.appendChild(listItem);
    }
  }
});
