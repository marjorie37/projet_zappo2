const promo = document.getElementsByClassName("promo");
const containerPromo = [
  "pills-Pizze",
  "pills-Desserts",
  "pills-Bambino",
  "pills-Entrées",
  "pills-Boissons"
];
let resultat = [];
Array.from(promo).map(el => {
  el.addEventListener("click", e => {
    e.stopPropagation();
    e.preventDefault();
    if (Array.from(el.classList).includes("down" && "btnPromoSelect")) {
      const test = el.classList.value.split(" ");
      const resultat = test.filter(el => containerPromo.includes(el));
      e.target.querySelector("input").checked = false;
      document.getElementById(resultat[0]).appendChild(e.target);
      el.classList.remove("down" && "btnPromoSelect");
    } else {
      el.classList.add("down" && "btnPromoSelect");
      e.target.querySelector("input").checked = true;
      document.getElementById("showPromo").appendChild(e.target);
    }
  });
});
