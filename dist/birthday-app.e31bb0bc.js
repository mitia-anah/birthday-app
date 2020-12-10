// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"component/element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetBtn = exports.inputSearch = exports.getMonth = exports.myInput = exports.addDataBtn = exports.tbody = void 0;
// fetching the data from people.json
const tbody = document.querySelector('tbody');
exports.tbody = tbody;
const addDataBtn = document.querySelector('.add');
exports.addDataBtn = addDataBtn;
const myInput = document.querySelector('.myInput');
exports.myInput = myInput;
const getMonth = document.querySelector('.month');
exports.getMonth = getMonth;
const inputSearch = document.querySelector('.inputSearch');
exports.inputSearch = inputSearch;
const resetBtn = document.querySelector('.reset');
exports.resetBtn = resetBtn;
},{}],"component/generatePeople.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePeopleList = generatePeopleList;

function generatePeopleList(people) {
  return people.sort(function (a, b) {
    // Sort it by Month
    return new Date(a.birthday).getMonth() - new Date(b.birthday).getMonth();
  }).map(person => {
    // Get the suffix for the date 
    function nthDate(day) {
      if (day > 3 && day < 21) return "th";

      switch (day % 10) {
        case 1:
          return "st";

        case 2:
          return "nd";

        case 3:
          return "rd";

        default:
          return "th";
      }
    } // Get the birthday date


    const today = new Date();
    const currentDate = new Date(person.birthday);
    const currentDay = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const fullDate = `${currentDay}${nthDate(currentDay)} / ${month + 1} / ${year}`;
    const futureAge = today.getFullYear() - year; // ********** Counting date ******** \\
    // Counting how many days left untill the person's birthday

    const momentYear = today.getFullYear();
    const birthDayDate = new Date(momentYear, month, currentDay);
    let oneDay = 1000 * 60 * 60 * 24;
    const getTheDate = birthDayDate.getTime() - today.getTime();
    const dayLeft = Math.ceil(getTheDate / oneDay);
    return `
                    <tr data-id="${person.id}"> 
                        <td>
                            <img class="rounded-circle" src="${person.picture}" alt="This the picture for ${person.firstName} ${person.lastName}">
                        </td>
                        <td>
                            <span class="persoName">${person.lastName} ${person.firstName}</span>
                            <p>
                                Turns ${futureAge <= 1 ? futureAge + " " + "year" : futureAge + " " + "years"} old on the 
                                ${new Date(person.birthday).toLocaleString("en-US", {
      month: "long"
    })}
                                <time datetime="${fullDate}">
                                    ${new Date(person.birthday).toLocaleString("en-US", {
      day: "numeric"
    })}<sup>${nthDate(currentDay)}</sup>
                                </time> 
                            </p>
                        </td>
                        <td><time datetime="${fullDate}">${fullDate}</time></td>
                        <td>${dayLeft < 0 ? dayLeft * -1 + " " + "days ago" : dayLeft <= 1 ? dayLeft + " " + "day" : dayLeft + 'days'}
                        </td>
                        <td>
                            <button class="edit" data-id="${person.id}">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </button>
                        </td>
                        <td>
                            <button class="delete" data-id="${person.id}">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </td>
                    </tr>
                `;
  }).join('');
}
},{}],"component/destroyPopup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = wait;
exports.destroyPopup = destroyPopup;

// Destroy the popup
function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove("open");
  await wait(1000); // Wait for 1 sec

  popup.remove(); // remove it from the DOM

  popup = null; // remove it from the javascript memory
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _element = require("./component/element");

var _generatePeople = require("./component/generatePeople");

var _destroyPopup = require("./component/destroyPopup");

// ******* Importing ********* \\
// Import all the export functions or elements that store in other files
// import { divButton } from './libs/utils.js';
// Get the data
const endpoint = './people.json'; // fetch data from the json file

async function fetchPeople() {
  const response = await fetch(endpoint);
  const data = await response.json();
  let persons = data; // display the list of people

  const displayList = () => {
    const html = (0, _generatePeople.generatePeopleList)(persons);
    _element.tbody.innerHTML = html;
  };

  displayList(); // ****** Edit ******* \\

  const editPeson = e => {
    // Set all the result of the edit here
    if (e.target.closest('button.edit')) {
      const tableRowEdit = e.target.closest('tr');
      const id = tableRowEdit.dataset.id;
      editPersonPopup(id);
    }
  };

  const editPersonPopup = async idToEdit => {
    // Do all the code about the edit function here
    const people = persons.find(person => person.id == idToEdit);
    return new Promise(async function (resolve) {
      const popupForm = document.createElement('form');
      popupForm.classList.add('popupForm');
      popupForm.insertAdjacentHTML('afterbegin', `
                <fieldset>
                    <label>Avantar</label>
                    <input type="url" name="picture" value="${people.picture}">
                </fieldset>
                <fieldset>
                    <label>LastName</label>
                    <input type="text" name="lastName" value="${people.lastName}">
                </fieldset>
                <fieldset>
                    <label>FirstName</label>
                    <input type="text" name="firstName" value="${people.firstName}">
                </fieldset>
                <fieldset>
                    <label>Birth day</label>
                    <input type="date" name="birthday" value="${people.birthday}">
                </fieldset>
                <div class="form-btn">
                    <button type="button" class="cancel btn btn-warning">Cancel</button>
                    <button type="submit" class="submit btn btn-warning">Save</button>
                </div>
            `);
      document.body.appendChild(popupForm);
      await (0, _destroyPopup.wait)(50);
      popupForm.classList.add('open'); // Reject the Changes

      window.addEventListener('click', e => {
        if (e.target.closest('button.cancel')) {
          (0, _destroyPopup.destroyPopup)(popupForm);
        }
      }); // Submit the change

      popupForm.addEventListener('submit', e => {
        e.preventDefault();
        people.picture = popupForm.picture.value;
        people.lastName = popupForm.lastName.value;
        people.firstName = popupForm.firstName.value;
        people.birthday = popupForm.birthday.value;
        displayList(people);
        resolve(e.currentTarget.remove());
        (0, _destroyPopup.destroyPopup)(popupForm);

        _element.tbody.dispatchEvent(new CustomEvent('updatePeopleLs'));
      }, {
        once: true
      });
    });
  }; // ****** Delete ****** \\
  // Remove the person from the list


  const deletePerson = e => {
    // call the function here
    if (e.target.closest('button.delete')) {
      const tableRow = e.target.closest('tr');
      const id = tableRow.dataset.id;
      deletePersonPopup(id);
    }
  };

  const deletePersonPopup = async idToDelete => {
    // Code all thecondition about the delete list here
    return new Promise(async function (resolve) {
      await (0, _destroyPopup.wait)(50);
      document.body.appendChild(divButton);
      divButton.classList.add("open"); // Reject it

      window.addEventListener('click', e => {
        if (e.target.closest('button.cancelDel')) {
          (0, _destroyPopup.destroyPopup)(divButton);
        }
      }); // Remove the person

      window.addEventListener('click', e => {
        if (e.target.closest('button.remove')) {
          let person = persons.filter(person => person.id != idToDelete);
          persons = person;
          displayList(person);
          (0, _destroyPopup.destroyPopup)(divButton);

          _element.tbody.dispatchEvent(new CustomEvent('updatePeopleLs'));
        }
      });
    });
  }; // ************ Local storage ************* \\


  const initLocalStorage = () => {
    const personLs = JSON.parse(localStorage.getItem('persons'));

    if (personLs) {
      persons = personLs;
      displayList();
    }

    _element.tbody.dispatchEvent(new CustomEvent('updatePeopleLs'));
  };

  const updateLocalStorage = () => {
    localStorage.setItem('persons', JSON.stringify(persons));
  }; // ************* Add Person in the list ************* \\


  const handleAddBtn = e => {
    if (e.target.closest('button.addList')) {
      handleAddListBtn();
    }
  };

  const handleAddListBtn = id => {
    return new Promise(async function (resolve) {
      // Create a popup form when clicking the add button
      const popupAddForm = document.createElement('form');
      popupAddForm.classList.add('popupForm');
      popupAddForm.insertAdjacentHTML('afterbegin', `
                <form class="modalForm">
                    <fieldset>
                        <label>What is your Avantar?</label>
                        <input type="url" name="pic" value="https://bit.ly/35LplYa">
                    </fieldset>
                    <fieldset>
                        <label>What is your LastName?</label>
                        <input type="text" name="lastname" value="Marie">
                    </fieldset>
                    <fieldset>
                        <label>What is your FirstName?</label>
                        <input type="text" name="firstname" value="Noeline">
                    </fieldset>
                    <fieldset>
                        <label>What is your Birthday date?</label>
                        <input type="date" name="birthDay" value="12/08/2002">
                    </fieldset>
                    <div class="form-btn">
                        <button type="button" class="cancelCond btn btn-warning">Cancel</button>
                        <button type="submit" class="submit btn btn-warning">Submit</button>
                    </div>
                </form>
            `);
      document.body.appendChild(popupAddForm);
      popupAddForm.classList.add('open');
      window.addEventListener('click', e => {
        if (e.target.closest('button.cancelCond')) {
          (0, _destroyPopup.destroyPopup)(popupAddForm);
        }
      }); // Listen to the submit event

      popupAddForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = e.currentTarget; // Create a new object for the new 

        const newPerso = {
          picture: form.pic.value,
          lastName: form.lastname.value,
          firstName: form.firstname.value,
          birthday: form.birthDay.value,
          id: Date.now()
        };
        persons.push(newPerso);
        displayList(persons);
        (0, _destroyPopup.destroyPopup)(popupAddForm);

        _element.tbody.dispatchEvent(new CustomEvent('updatePeopleLs'));
      });
    });
  }; // *********** Filter ********* \\
  // Filter the person from the list by searching their name


  const filterPersonByName = () => {
    // Get the value of the input
    const input = _element.searchByName.value;
    const inputSearch = input.toLowerCase(); // Filter the list by the firstname or lastname

    const searchPerson = persons.filter(person => person.lastName.toLowerCase().includes(inputSearch) || person.firstName.toLowerCase().includes(inputSearch));
    const myHTML = (0, _generatePeople.generatePeopleList)(searchPerson);
    _element.tbody.innerHTML = myHTML;
  }; // Filter by month


  const filterPersonMonth = e => {
    // Get the value of the select input
    const select = _element.searchByMonth.value;
    const filterPerson = persons.filter(person => {
      // Change the month of birth into string
      const getMonthOfBirth = new Date(person.birthday).toLocaleString("en-US", {
        month: "long"
      }); // Filter the list by the month of birth

      return getMonthOfBirth.toLowerCase().includes(select.toLowerCase());
    });
    const myHTML = (0, _generatePeople.generatePeopleList)(filterPerson);
    _element.tbody.innerHTML = myHTML;
  }; // Reset the list


  const resteInputSearch = e => {
    _element.formSearch.reset();

    displayList();
  }; // ******** Listeners ******* \\


  _element.addListBtn.addEventListener('click', handleAddBtn);

  _element.tbody.addEventListener('click', editPeson);

  _element.tbody.addEventListener('click', deletePerson); // Custom event


  _element.tbody.addEventListener('updatePeopleLs', updateLocalStorage); // Filter event


  _element.searchByName.addEventListener('input', filterPersonByName);

  _element.searchByMonth.addEventListener('input', filterPersonMonth);

  _element.resetSearch.addEventListener('click', resteInputSearch);

  initLocalStorage();
}

fetchPeople();
},{"./component/element":"component/element.js","./component/generatePeople":"component/generatePeople.js","./component/destroyPopup":"component/destroyPopup.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53944" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/birthday-app.e31bb0bc.js.map