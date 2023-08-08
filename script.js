var timeout;
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("mousemove", handleMove);
  card.addEventListener("touchmove", handleMove);
  card.addEventListener("mouseout", handleOut);
  card.addEventListener("touchend", handleOut);
  card.addEventListener("touchcancel", handleOut);
});

function handleMove(event) {
  event.preventDefault();

  let clientX, clientY;
  if (event.type === "touchmove") {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  } else {
    clientX = event.offsetX;
    clientY = event.offsetY;
  }

  const card = event.currentTarget;
  const cardHeight = card.clientHeight;
  const cardWidth = card.clientWidth;
  const xPercentage = Math.abs(Math.floor((100 / cardWidth) * clientX) - 100);
  const yPercentage = Math.abs(Math.floor((100 / cardHeight) * clientY) - 100);
  const position = 50 - xPercentage + (50 - yPercentage);

  const gradientX = 50 + (xPercentage - 50) / 1.5;
  const gradientY = 50 + (yPercentage - 50) / 1.5;
  const sparkX = 50 + (xPercentage - 50) / 7;
  const sparkY = 50 + (yPercentage - 50) / 7;
  const opacity = 20 + Math.abs(position) * 1.5;
  const rotationY = ((gradientY - 50) / 2) * -1;
  const rotationX = ((gradientX - 50) / 1.5) * 0.5;

  const style = `
    .card:hover:before { background-position: ${gradientX}% ${gradientY}%; }
    .card:hover:after { background-position: ${sparkX}% ${sparkY}%; opacity: ${
    opacity / 100
  }; }
  `;

  cards.forEach((card) => {
    card.classList.remove("active");
    card.classList.remove("animated");
  });
  card.classList.add("moved");
  card.style.setProperty(
    "transform",
    `rotateX(${rotationY}deg) rotateY(${rotationX}deg)`
  );
  const afterElement = window.getComputedStyle(card, "::before");
  console.log(afterElement.background);
  card.style.setProperty("--boxBeforePositionX", `${sparkX}%`);
  console.log("sparkX: ", sparkX);
  card.style.setProperty("--boxBeforePositionY", `${sparkY}%`);
  console.log("sparkY: ", sparkY);

  if (event.type === "touchmove") {
    return false;
  }

  clearTimeout(timeout);
}

function handleOut(event) {
  const card = event.currentTarget;
  card.removeAttribute("style");
  timeout = setTimeout(() => {
    card.classList.add("animated");
  }, 2500);
}
