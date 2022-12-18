//// Super Global variables
var timer;
var t1;
var t2;

let btnSubmit = document.getElementById("btn");

////////Positioning the loading animation
document.getElementById("colapa").style.top = "63%";
document.getElementById("colapa").style.left = "87%";
document.getElementById("colapa").style.display = "none";

function inputChecker() {
  let intValue = document.getElementById("numberInput").value;

  if (intValue == "") {
    Alert.render("Please fill the input filed!");
    return;
  } else {
    if (intValue.includes(".")) {
      Alert.render("Can't compute decimals!");
      document.getElementById("numberInput").placeholder = "Number Of Dots";
      return;
    }
    intValue = parseInt(intValue, 10);
  }

  if (Number.isNaN(intValue)) {
    Alert.render("This is not a number!");
    document.getElementById("numberInput").placeholder = "Number Of Dots";
    return;
  }
  if (Math.sign(intValue) === -1) {
    Alert.render("Positive real numbers only!");
    document.getElementById("numberInput").placeholder = "Number Of Dots";
    return;
  }
  if (intValue == 0) {
    Alert.render("Number should be > 0!");
    document.getElementById("numberInput").placeholder = "Number Of Dots";
    return;
  }

  /////////// MAKKE THE BUTTON INACTIVE and change the state information
  t1 = Date.now();

  btnSubmit.disabled = true;
  btnSubmit.style.opacity = 0.3;
  btnSubmit.style.backgroundColor = "#" + "0bc9c9";
  btnSubmit.style.color = "black";
  btnSubmit.style.height = "32px";
  btnSubmit.style.cursor = "auto";

  document.getElementById("colapa").style.display = "block";
  document.getElementById("numberInput").disabled = true;
  document.getElementById("numberInput").style.border = "2px solid orangered";
  timer = setInterval(mapper, 0.1, intValue);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//////////////////// Variables //////////////////
let x = 0;
let bodyReference = document.getElementById("collector");
let me = document.getElementById("me");
let intialDots = [
  document.getElementById("dot1"),
  document.getElementById("dot2"),
  document.getElementById("dot3"),
];

function mapper(dotNumber) {
  let span = document.createElement("span");
  let node = document.createTextNode(".");
  span.appendChild(node);
  span.setAttribute("id", "dot" + (x + 5));

  ///////// Choosing a main dot randomly
  let mainDot = intialDots[getRandomNumber(0, 2)];
  // Fetching possitions for the main dot && current dot
  //mainDot
  let theMainStyleObject = getComputedStyle(mainDot);
  let Xtop = parseFloat(theMainStyleObject.top);
  let Yleft = parseFloat(theMainStyleObject.left);

  //currentDot
  let currentDot = document.getElementById("dot" + (x + 4));
  let theCurrentStyleObject = getComputedStyle(currentDot);
  let xtop = parseFloat(theCurrentStyleObject.top);
  let yleft = parseFloat(theCurrentStyleObject.left);

  // Difference Values
  let toper = (Xtop - xtop) / 2;
  let lefter = (Yleft - yleft) / 2;

  /////////// Extra computations to avoid positioning errors in the rendering
  //// removing negatives
  if (Math.sign(toper) === -1) {
    toper = toper * -1;
  }
  if (Math.sign(lefter) === -1) {
    lefter = lefter * -1;
  }
  ///// cacluating the correct top and left values
  Xtop > xtop ? (toper = toper + xtop) : (toper = toper + Xtop);
  Yleft > yleft ? (lefter = lefter + yleft) : (lefter = lefter + Yleft);

  //////// Putting the leter dynamic created tag in the DOM && Positioning it
  //////// Putting It
  bodyReference.insertBefore(span, me);

  /////// Positioning It
  span.style.position = "absolute";
  span.style.top = toper + "px";
  span.style.left = lefter + "px";

  if (x == dotNumber) {
    t2 = Date.now();
    document.getElementById("colapa").style.display = "none";
    document.getElementById("takeInfo").innerHTML = `Done!!! Took ${
      (t2 - t1) / 1000
    } seconds`;
    document.getElementById("numberInput").value = "";
    clearInterval(timer);
    return;
  } else {
    document.getElementById("takeInfo").innerHTML =
      "Dotting... " + x + " Of " + dotNumber + " Dots";
    x = x + 1;
  }
}

function CustomAlert() {
  this.render = function (dialog) {
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById("dialogoverlay");
    var dialogbox = document.getElementById("dialogbox");
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH + "px";
    dialogbox.style.left = winW / 2 - 550 * 0.5 + "px";
    dialogbox.style.top = "150px";
    dialogbox.style.display = "block";
    document.getElementById("dialogboxhead").innerHTML =
      "<img src='images/about.png' style='height: 50px; width: 50px; display:inline;' /> <span style='font-size: 20px; font-family: monospace; color: white; position:absolute; top:17%;'>Error!</span> <span id='piko' style='float:right; cursor: pointer;' onclick='Alert.ok()'>x</span>";
    document.getElementById("dialogboxbody").innerHTML = dialog;

    document.getElementById("dialogboxfoot").innerHTML =
      '<span id="miss">This app is made by <a href="https://www.instagram.com/patric_forreal" target="__blank" style=\'color:#fa7c7c; text-decoration:none;\'>@patric_forreal</span></a>';
  };
  this.ok = function () {
    document.getElementById("dialogbox").style.display = "none";
    document.getElementById("dialogoverlay").style.display = "none";
  };
}
var Alert = new CustomAlert();
