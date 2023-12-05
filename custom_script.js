// Elements
const ringsBox = document.getElementById("ring-count");
const movesValue = document.getElementById("min-moves");
const movesReveal = document.getElementById("moves-maker");
const movesBox = document.getElementById("moves");
const solution = document.getElementById("solution-steps");
let seeOrHide = document.getElementById("see-hide");
const buttonParagraph = document.getElementById("button-instructions");

const showButtonText = "Show me the moves!";
const hideButtonText = "Hide the solution";
const tooBigText =
  "Life is short and listing all the moves would take a long time. Go back and see if you can find the pattern.";
let buttonToggle = true;

ringsValue = ringsBox.valueAsNumber;

// Listeners
ringsBox.addEventListener("change", function () {
  if (ringsBox.value > 75) {
    // Keep things somewhat reasonable
    console.log("That number is too big; I'm going to make it smaller.");
    ringsBox.value = "75";
  }

  // update display
  ringsValue = ringsBox.valueAsNumber;
  displayMoves(ringsValue);
  if (!buttonToggle) {
    updateSolutionText();
  }

  if (ringsValue > 16) {
    // Avoid VERY long calculations
    movesReveal.setAttribute("disabled", "");
    buttonParagraph.innerText = tooBigText;
    movesReveal.innerText = "Try a smaller number...";
  } else {
    movesReveal.disabled = false;
    movesReveal.innerText = showButtonText;
    buttonParagraph.innerHTML = `Click the button to <span id="see-hide">see</span> your solution!`;
    seeOrHide = document.getElementById("see-hide");
  }
});

movesReveal.addEventListener("click", function () {
  console.log("Thinking!");
  updateSolutionText();
});

// Function to update number of rings in text
function displayRingCount() {
  ringsText.innerText = ringsValue;
}

// Calculate and display the minimum number of moves
function calculateMoves(n) {
  return 2 ** n - 1;
}

// Display the NUMBER of calculated moves
function displayMoves(n) {
  if (n > 54) {
    movesValue.innerHTML = `You can move your <span class="boldme">${n}</span> rings in as few as (about) <span class="boldme">${calculateMoves(
      n
    ).toLocaleString()}</span> moves.`;
  } else if (n != 1) {
    movesValue.innerHTML = `You can move your <span class="boldme">${n}</span> rings in as few as <span class="boldme">${calculateMoves(
      n
    ).toLocaleString()}</span> moves.`;
  } else {
    movesValue.innerHTML = `You can move your <span class="boldme">1</span> ring in just <span class="boldme">1</span> move (duh!).`;
  }
}

// Updates solution text (steps) (hiding if necessary)
function updateSolutionText() {
  if (buttonToggle) {
    movesBox.classList.replace("invisible", "visible");
    movesBox.classList.replace("mt-0", "mt-3");
    movesBox.setAttribute("style", "font-size:1em;");
    solution.innerHTML = hanoiSolution(ringsValue, "A", "B", "C", ``);
    if (ringsValue >= 10) {
      solution.innerHTML += "<li>Get a cold drink!</li>";
    }
    movesReveal.innerText = hideButtonText;
    seeOrHide.innerText = "hide";
    buttonToggle = false;
  } else {
    movesBox.classList.replace("visible", "invisible");
    movesBox.classList.replace("mt-3", "mt-0");
    movesBox.setAttribute("style", "font-size:0em;");
    solution.innerHTML = "";
    movesReveal.innerText = showButtonText;
    seeOrHide.innerText = "see";
    buttonToggle = true;
  }
}

// Function to list moves; adapted from https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/
function hanoiSolution(n, fromPole, toPole, auxPole, output) {
  if (n == 0) {
    return output;
  }

  output = hanoiSolution(n - 1, fromPole, auxPole, toPole, output);

  output += `<li>Move disk ${n} from pole ${fromPole} to pole ${toPole}.</li>`;

  output = hanoiSolution(n - 1, auxPole, toPole, fromPole, output);

  return output;
}
