export class Popular {
  constructor(items) {
    this.items = items;
  }

  goDetail() {
    return this.items;
  }

  checkData(element) {
    const dataUser = JSON.parse(sessionStorage.getItem("dataUser"));
    if (!dataUser) {
      alert("Please select dates and number of guests");
      element.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    return true;
  }

  render(element) {
    let popularTemp = document.querySelector("#popularTemp");
    let temp = popularTemp.content.cloneNode(true);

    let hotelName = temp.querySelector("#hotelName");
    let hotelLocation = temp.querySelector("#hotelLocation");
    let hotelPrice = temp.querySelector("#hotelPrice");
    let hotelRating = temp.querySelector("#hotelRating");
    let hotelImg = temp.querySelector("#hotelImage");
    let searchForm = document.querySelector("#searchForm");

    hotelName.textContent = this.items.name;
    hotelLocation.textContent = this.items.location;
    hotelPrice.textContent = this.items.price + "$";
    hotelRating.textContent = this.items.rating;
    hotelImg.src = this.items.image;

    let hotelCard = temp.querySelector("#hotelCard");
    hotelCard.addEventListener("click", () => {
      const dataUser = this.checkData(searchForm);
      if (!dataUser) return;
      const goDetail = this.goDetail();
      window.location.href = `detail.html?id=${goDetail.id}`;
    });

    element.appendChild(temp);
  }
}
