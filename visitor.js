const $inputCmt = document.querySelector("#inputBox");
const cmtList = "comment";
const $btn = document.querySelector(".btn");
let comment = [];
const $cmtList = document.getElementById("cmtList");

function savecomment() {
  localStorage.setItem(cmtList, JSON.stringify(comment));
}

function regcomment() {
  const inputText = document.getElementById("inputBox").value;
  if (inputText != "") {
    $inputCmt.value = "";
    printcomment(inputText);
    savecomment();
  }
}

$btn.addEventListener("click", regcomment);

function printcomment(inputText) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");

  delBtn.innerHTML = "X";
  delBtn.className = "delBtn";

  delBtn.addEventListener("click", delcomment);
  const dateTime = new Date().toLocaleString();
  const key = `${dateTime}`;

  span.innerHTML = `${inputText}<br>${key}`;
  li.appendChild(span);
  li.appendChild(delBtn);
  $cmtList.appendChild(li);

  comment.push({
    [key]: inputText,
  });
  savecomment();
}

function delcomment() {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  const spanHTML = span.innerHTML;
  const key = spanHTML.split("<br>")[1].trim();

  $cmtList.removeChild(li);

  const index = comment.findIndex((item) => Object.keys(item)[0] === key);
  if (index !== -1) {
    comment.splice(index, 1);
    savecomment();
  }
}

function loadSavedcomment() {
  const loadedcomment = localStorage.getItem(cmtList);
  if (loadedcomment != null) {
    comment = JSON.parse(loadedcomment);
    comment.forEach(function (commentItem) {
      const key = Object.keys(commentItem)[0];
      const inputText = commentItem[key];
      printcommentWithKey(inputText, key);
    });
  }
}

function printcommentWithKey(inputText, key) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");

  delBtn.innerHTML = "X";
  delBtn.className = "delBtn";
  delBtn.addEventListener("click", delcomment);

  span.innerHTML = `${inputText}<br>${key}`;
  li.appendChild(span);
  li.appendChild(delBtn);
  $cmtList.appendChild(li);
}

function sync() {
  $cmtList.innerHTML = "";
  comment = [];

  loadSavedcomment();
}

function init() {
  sync();
}

init();
