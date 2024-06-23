import { dev } from "./vocabulary.js";
// const dev = require('./vocabulary.js');
const vocabularyElement = document.getElementById("vocabulary");
const vocabularyString = dev;
// vocabularyElement.value = dev;
// const vocabularyString = `commit>фиксировать
// pull>тянуть
// push>толкать
// merge>соединять
// folder>папка
// setup>устанавливать
// bundle>пакет
// implement>реализовывать
// allow>разрешать
// prohibit>запрещать
// persistent>постоянный
// layout>макет
// introduce>представлять
// validation>проверка
// template>шаблон
// reference>ссылка
// exception>исключение
// requirement>требование
// request>запрос
// button>кнопка
// network>сеть
// perform>выполнять
// string>строка
// purpose>цель
// deny>отказывать
// permission>разрешение
// column>столбец
// solution>решение
// settings>настройки
// bind>связывать
// reset>сбрасывать
// mandatory>обязательный
// batch>комплектовать
// switch>переключать
// amount>количество
// issue>проблема
// bootstrap>загружать
// free>свободный
// ability>способность
// integer>целое число
// timestamp>метка времени
// assemble>собирать
// wrapper>обертка
// clause>условие
// variable>переменная
// example>пример
// property>свойство
// explanation>объяснение
// split>разделять
// current>текущий
// credentials>учетные данные`;

const vocabulary = [];
const preloader = document.getElementById("preloader");

const createVocabularyElement = document.getElementById("create-vocabulary");
const learnWordElement = document.getElementById("learn-word");

function startLearn() {
  //   console.log(vocabularyElement.value);
  // const lines = vocabularyElement.value.split("\n");
  const lines = vocabularyString.split("\n");
  //   console.log(lines);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    // console.log('perse line', line);
    const word = line.split(">");
    // console.log('got word', word);
    vocabulary.push({
      en: word[0],
      ru: word[1],
    });
  }
  // console.log('vocabulary =', vocabulary);

  createVocabularyElement.style.display = "none";
  learnWordElement.style.display = "block";

  learnWord();
}

const currentWordElement = document.getElementById("current-word");
const suggestionsElement = document.getElementById("suggestions");

let currentWordIndex;
let currentWord;

function learnWord() {
  preloader.style.display = "flex";

  currentWordIndex = Math.round(Math.random() * (vocabulary.length - 1));
  currentWord = vocabulary[currentWordIndex];
  //   console.log("current word", currentWord);
  currentWordElement.innerHTML = currentWord.en;

  suggest();
  loadMeme();

  // console.log('suggestions', suggestions);
}

function suggest() {
  const suggestions = [];
  for (let i = 0; i < vocabulary.length; i++) {
    const suggestionWordIndex = Math.round(
      Math.random() * (vocabulary.length - 1)
    );
    // console.log('suggestion word index', suggestionWordIndex);
    if (suggestionWordIndex !== currentWordIndex) {
      suggestions.push(vocabulary[suggestionWordIndex]);
    }
    if (suggestions.length >= 5) {
      break;
    }
  }
  suggestionsElement.innerHTML = "";

  const randomPlace = Math.round(Math.random() * (suggestions.length - 1));
  //   console.log("random place", randomPlace);

  for (let i = 0; i < suggestions.length; i++) {
    const suggestion = suggestions[i];
    const suggestionElement = document.createElement("button");
    suggestionElement.innerHTML = suggestion.ru;
    suggestionElement.onclick = function () {
      suggestionElement.style.backgroundColor = "red";
    };
    // console.log(suggestionElement.outerHTML);
    suggestionsElement.appendChild(suggestionElement);

    if (i === randomPlace) {
      const suggestionElement = document.createElement("button");
      suggestionElement.innerHTML = currentWord.ru;
      suggestionElement.onclick = function () {
        suggestionElement.style.backgroundColor = "green";
        setTimeout(learnWord, 500);
      };

      suggestionsElement.appendChild(suggestionElement);
    }
  }
}

const memeElement = document.getElementById("meme");
const apiKey = "JXoliOwEaxnkSGRhJARWyVuM9H2A32kE";

function loadMeme() {
  const limit = 10;
  const rand = Math.floor(Math.random() * limit);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const json = JSON.parse(xhttp.responseText);
      // console.log(json);
      const url = json.data[rand].embed_url;
      // console.log("meme url", url);
      memeElement.setAttribute("src", url);
    }
  };
  xhttp.open(
    "GET",
    "https://api.giphy.com/v1/gifs/search?api_key=" +
      apiKey +
      "&q=" +
      currentWord.en +
      "&limit=" +
      limit
  );
  xhttp.send();
}

window.addEventListener("load", function () {
  var preloader = document.getElementById("preloader");
  preloader.style.display = "none";
});

document.querySelector("iframe").onload = iframeOnload;

function iframeOnload() {
  var preloader = document.getElementById("preloader");
  preloader.style.display = "none";
}
