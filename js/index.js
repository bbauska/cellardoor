var counterContainer = document.querySelector(".website-counter");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");
// tooltips=begin
const tooltip = document.getElementById("tooltip");

const updateTooltipPosition = (event) => {
  if (window.innerHeight > tooltip.offsetHeight + event.clientY) {
    tooltip.style.top = `${event.clientY}px`;
  }
  
  tooltip.style.left = `${event.clientX}px`;
};
// tooltips = end
// Check if page_view entry is present
if (visitCount) {
  visitCount = Number(visitCount) + 1;
  localStorage.setItem("page_view", visitCount);
} else {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
}
counterContainer.innerHTML = visitCount;

// Adding onClick event listener
resetButton.addEventListener("click", () => {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
  counterContainer.innerHTML = visitCount;
});
