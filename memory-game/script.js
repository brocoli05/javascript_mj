const tilesContainer = document.querySelector(".tiles");
// possible card color
const colors = [
  "aquamarine",
  "crimson",
  "cyan",
  "blue",
  "dodgerblue",
  "gold",
  "greenyellow",
  "teal",
];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

// Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false; // true: waiting for two unmatched tiles to be turned over again

function buildTile(color) {
  const element = document.createElement("div");

  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");
    // revealed === "true": prevents the revealed cards from being reused
    // element === activeTile: cancel the move of cards which is cliked twice
    if (awaitingEndOfMove || revealed === "true" || element === activeTile) {
      return;
    }

    element.style.backgroundColor = color;

    if (!activeTile) {
      activeTile = element;

      return;
    }
    //console.log(activeTile);

    const colorToMatch = activeTile.getAttribute("data-color");

    if (colorToMatch === color) {
      activeTile.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");

      activeTile = null;
      awaitingEndOfMove = false;
      // two matched cards
      revealedCount += 2;

      if (revealedCount === tileCount) {
        alert("You win! Refresh to play again.");
      }

      return;
    }

    awaitingEndOfMove = true;
    setTimeout(() => {
      element.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;

      /* reset a tile after clicking two unmatched tiles */
      activeTile = null;
      awaitingEndOfMove = false;
    }, 1000);
  });

  return element;
}

// Build up tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
  const color = colorsPicklist[randomIndex];
  const tile = buildTile(color);

  // unique or two cards per color
  colorsPicklist.splice(randomIndex, 1);

  // add <div class="tile"></div> in tiles
  tilesContainer.appendChild(tile);
  //console.log(color);
}
