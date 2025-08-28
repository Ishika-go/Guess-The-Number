let random;
let min, max;

function generateRandomNumber(min, max) {
  random = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(random);
}

let minInput = document.getElementById("minNum");
let maxInput = document.getElementById("maxNum");

minInput.addEventListener("input", (e) => {
  min = parseInt(e.target.value);
  if (!isNaN(min) && !isNaN(max) && min < max) {
    generateRandomNumber(min, max);
  } else {
    random = undefined;
  }
});

maxInput.addEventListener("input", (e) => {
  max = parseInt(e.target.value);
  if (!isNaN(min) && !isNaN(max) && min < max) {
    generateRandomNumber(min, max);
  } else {
    random = undefined;
  }
});

let typedNum;
let enterNum = document.getElementById("typedNum");
enterNum.addEventListener("input", (e) => {
  typedNum = e.target.value;
});

//--------------------Submit Button-----------------------//
let submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", () => {
  if (isValidate()) {
    if (typedNum && random && typedNum == random) {
      showMessage("win");
    } else if (typedNum && random && typedNum != random) {
      showMessage("lose");
    }
  }
});

//--------------------Reset Button-----------------------//
let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
  minInput.value = "";
  maxInput.value = "";
  enterNum.value = "";

  min = undefined;
  max = undefined;
  random = undefined;
  popupMessage.classList.add("hidden");
});

//--------------------Hint Button-----------------------//
let hintButton = document.getElementById("hintButton");
hintButton.addEventListener("click", () => {
  if (isValidate()) {
    if (typedNum < random) {
      console.log("please add bit higher");
      showMessage();
    }
    if (typedNum > random) {
      console.log("please add bit lower num");
      showMessage();
    }
    if (typedNum == random) {
      console.log("good to go , submit please ");
      showMessage();
    }
  }
});

//----------------isValidate--------------------//
function isValidate() {
  let errorList = {};
  function validateField(condition, key, el) {
    if (condition) {
      showMessage("required");
      errorList[key] = el;
      el.classList.add("border-error", "border-2");
    } else {
      el.classList.remove("border-error", "border-2");
    }
  }

  validateField(!min, "minInputError", minInput);
  validateField(!max, "maxInputError", maxInput);
  validateField(!typedNum, "typedNumError", enterNum);

  if (min && max && min >= max) {
    showRangePopup("rangeIssue");
    errorList["rangeError"] = [minInput, maxInput];
    [minInput, maxInput].forEach((el) =>
      el.classList.add("border-error", "border-2")
    );
  } else if (min && max && min < max) {
    showRangePopup();
    [minInput, maxInput].forEach((el) =>
      el.classList.remove("border-error", "border-2")
    );
  }

  return Object.keys(errorList).length === 0;
}

let rangeMessage = document.getElementById("rangeIssue");
function showRangePopup(status) {
  rangeMessage.classList.remove("hidden", "opacity-100", "scale-48");
  rangeMessage.className =
    "mt-6 text-lg font-semibold opacity-100 scale-48 transform transition-all duration-500 ease-out";

  if (status == "rangeIssue") {
    rangeMessage.textContent =
      "😢 Minimum value should less than maximum value";
    rangeMessage.classList.add("text-red-400");
  } else {
    rangeMessage.classList.add("hidden");
  }
}
let popupMessage = document.getElementById("popupMessage");
function showMessage(status) {
  popupMessage.classList.remove("hidden", "opacity-100", "scale-48");
  popupMessage.className =
    "mt-6 text-lg font-semibold opacity-100 scale-48 transform transition-all duration-500 ease-out";

  if (status === "win") {
    popupMessage.textContent = "🎉 You Win! 🏆";
    popupMessage.classList.add("text-green-400");
  } else if (status === "lose") {
    popupMessage.textContent = "😢 You Lose! Try Again!";
    popupMessage.classList.add("text-red-400");
  } else if (status == "required") {
    popupMessage.textContent = "😢 Please fill all the fields";
    popupMessage.classList.add("text-red-400");
  }
}
