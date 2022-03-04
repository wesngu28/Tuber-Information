"use strict";

(function() {

  window.addEventListener('load', init);
  let selectedValue;

  /**
   *  Init function that runs after load and gives two event listeners, one
   *  to show the source list and one that fills the table.
   */
  function init() {
    id('clickity').addEventListener('click', populateTable);
    id('biblio').addEventListener('click', showFooter);
  }

  /**
   *  This function assigns selectedValue to the checked option and then uses it
   *  to decide which fetch request to run, with both of these particular ones
   *  handling text but having different text files.
   */
  function populateTable() {
    let selected = document.querySelector('input[name="range"]:checked');
    selectedValue = selected.value;
    if (selectedValue === "tuber") {
      fetch('/foods')
        .then(statusCheck)
        .then(res => res.text())
        .then(fillTable)
        .catch(errorHandler);
    } else {
      fetch('/streamer')
        .then(statusCheck)
        .then(res => res.text())
        .then(fillTable)
        .catch(errorHandler);
    }
  }

  /**
   *  This function's job is to unhide the sources section, as well as flipping
   *  the button text to hide and causing the button to once again hide it.
   */
  function showFooter() {
    id('sources').classList.remove('hidden');
    id('biblio').textContent = 'Hide Sources';
    id('biblio').removeEventListener('click', showFooter);
    id('biblio').addEventListener('click', hideFooter);
  }

  /**
   *  This function's job is to hide the sources section, as well as flipping
   *  the button text to hide and causing the button to once again unhide it.
   */
  function hideFooter() {
    id('sources').classList.add('hidden');
    id('biblio').textContent = 'Show Sources';
    id('biblio').removeEventListener('click', hideFooter);
    id('biblio').addEventListener('click', showFooter);
  }

  /**
   *  This function is used by both variants of the fetch function that invokes
   *  it. It reads in the response txt, removes all current elements as to reset
   *  the table when you switch inputs, and then fillts it up. An event
   *  listener for another fetch function is added and the table is unhidden.
   *  @param {object} response - reads in the response txt
   */
  function fillTable(response) {
    const mythSplit = 5;
    const projectHope = 6;
    let names = response.split(',');
    while (id('table').firstChild) {
      id('table').removeChild(id('table').firstChild);
    }
    for (let i = 0; i < names.length; i++) {
      let splitter = document.createElement('hr');
      if (((i === mythSplit) || (i === projectHope))) {
        id('table').appendChild(splitter);
      }
      let fig = document.createElement('figure');
      let img = document.createElement('img');
      let cap = document.createElement('figcaption');
      cap.textContent = capitalize(names[i]);
      img.src = 'img/' + names[i] + '.jpg';
      fig.appendChild(img);
      fig.appendChild(cap);
      fig.addEventListener('click', tuberInfo);
      id('table').appendChild(fig);
    }
    id('table').classList.remove('hidden');
  }

  /**
   *  Function that uses two get requests depending on which value is currently
   *  selected.
   */
  function tuberInfo() {
    let parameter = this.textContent;
    parameter = parameter.replace(/\s+/g, '');
    if (selectedValue === "tuber") {
      fetch('/tuber/' + parameter)
        .then(statusCheck)
        .then(res => res.json())
        .then(processInfo)
        .catch(errorHandler);
    } else {
      fetch('/tuber/' + parameter)
        .then(statusCheck)
        .then(res => res.json())
        .then(processVInfo)
        .catch(errorHandler);
    }
  }

  /**
   *  First calls a prepareView function, before assigning fields from the
   *  json to various elements inside the DOM.
   *  @param {object} response - reads in the response json
   */
  function processInfo(response) {
    prepareView();
    id('tubeinformation').classList.remove('hidden');
    let name = document.querySelector('#tubeinformation > h2');
    name.textContent = response.name;
    id('scientificname').textContent = response.scientificname;
    id('description').textContent = response.description;
    let image = document.querySelector('#tubeinformation img');
    image.src = 'img/' + response.name + '.jpg';
  }

  /**
   *  First calls a prepareView function, before assigning fields from the
   *  json to various elements inside the DOM.
   *  @param {object} response - reads in the response json
   */
  function processVInfo(response) {
    prepareView();
    let name = document.querySelector('#vtubeinformation > h2');
    name.textContent = response.name;
    id('vtubeinformation').classList.remove('hidden');
    let image = document.querySelector('#vtubeinformation img');
    image.src = 'img/' + response.name + '.jpg';
    id('description2').textContent = response.description;
    id('birthday').textContent = 'Birthday: ' + response.birthday;
    id('debut').textContent = 'Debut: ' + response.debut;
    id('fanname').textContent = 'Fan Name: ' + response.fanname;
  }

  /**
   *  Function that disables the button to generate while a specific item is
   *  being displayed. Hides the table. Shows the button to redisplay table
   *  and hide the current element, and adds the appropriate element for it.
   */
  function prepareView() {
    id('clickity').disabled = true;
    id('table').classList.add('hidden');
    let figures = document.querySelectorAll('figure');
    for (let i = 0; i < figures.length; i++) {
      figures[i].classList.add('hidden');
    }
    id('return').classList.remove('hidden');
    id('return').addEventListener('click', changeDisplay);
  }

  /**
   *  Function that changes the display from the currently selected item back
   *  to the tabular view, and re-enables the button to generate.
   */
  function changeDisplay() {
    id('return').classList.add('hidden');
    id('table').classList.remove('hidden');
    let figures = document.querySelectorAll('figure');
    for (let i = 0; i < figures.length; i++) {
      figures[i].classList.remove('hidden');
    }
    id('tubeinformation').classList.add('hidden');
    id('vtubeinformation').classList.add('hidden');
    id('clickity').disabled = false;
  }

  /**
   *  This function is used to read in names, which are lowercase
   *  by defaut, and makes the first letter uppercase.
   *  @param {String} string - reads in the name value
   *  @return {String} - returns the string with the first letter uppercase
   */
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   *  This function handles errors by printing them to the console log.
   *  @param {Error} err - request's error detail
   */
  function errorHandler(err) {
    let errorMessage = document.createElement('p');
    let msg = "There was an error handling data from the api: " + err;
    errorMessage.textContent = msg;
    id('response').appendChild(errorMessage);
  }

  /**
   * Provided helper function to pull id elements from the DOM.
   * @param {string} idName - element ID.
   * @returns {object} - DOM object that has this id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Provided helper function to check whether or not a network related or api
   * related issue has happened before passing the file on.
   * @param {object} response - response to check for success/error
   * @return {object} - returns a response json
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text);
    }
    return response;
  }

})();