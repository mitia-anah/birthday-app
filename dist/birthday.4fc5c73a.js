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
exports.resetBtn = exports.inputSearch = exports.getMonth = exports.myInput = exports.addDataBtn = exports.listOfData = exports.data = void 0;
// fetching the data from people.json
const data = `https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json`;
exports.data = data;
const listOfData = document.querySelector('ul');
exports.listOfData = listOfData;
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
},{}],"component/generate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateLists = generateLists;

function generateLists(people) {
  return people.sort(function (a, b) {
    return new Date(a.birthday).getMonth() - new Date(b.birthday).getMonth();
  }).map(data => {
    function date(day) {
      if (day > 3 && day < 21) return "th";

      switch (day % 10) {
        case 1:
          return "st";

        case 2:
          return "nd";

        case 3:
          return "rd";

        default:
          return "0";
      }
    }

    const today = new Date();
    const currentDate = new Date(data.birthday);
    const day = currentDate.getDay();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear(); // const fullDate = `${day}${date(day)} / ${month + 1} / ${year}`;

    const peopleAge = today.getFullYear() - year;
    const futAge = peopleAge;
    const momentYear = today.getFullYear();
    const birthdayDate = new Date(momentYear, month, day);
    let oneDay = 1000 * 60 * 60 * 24; // let dateToday = new Date().getFullYear();

    const dayLeft = Math.ceil((birthdayDate.getTime() - today.getTime()) / oneDay);
    var monthNname = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];
    console.log(dayLeft);
    return `
            <li class='list-of-data' data-id="${data.id}">
                <div class="col-8 col-sm-6 picture"><image src="${data.picture}" alt="${data.firstName + ' ' + data.lastName}"/></div>
                <div class="names-and-date">
                    <div class="names">
                        <span class="col-8 col-sm-6 firstName" id="name">${data.firstName}</span>
                        <span class="col-8 col-sm-6 lastName">${data.lastName}</span>
                    </div>
                    <p class="col-8 col-sm-6">Turns ${futAge} on ${monthNname}  ${day}${date()} </p>
                </div>   
                <div class="group-btn">
                    <div class="col-8 col-sm-6 birthday" >in ${dayLeft < 0 ? dayLeft * -1 + "days" : dayLeft + " days"}</div>
                    <div class="buttons">
                        <button data-placement="top" data-toggle="tooltip" title="Edit" data-id="${data.id}" class="edit btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" stroke="#094067">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        </button>

                        <button data-id="${data.id}" class="delete">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#EF4565">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                            </svg>
                        </button>
                    </div>
                </div>            
            </li>
        `;
  }).join(''); // tbody.innerHTML = html;
}

;
},{}],"component/birthday.js":[function(require,module,exports) {
"use strict";

var _element = require("./element.js");

var _destroyPopup = require("./destroyPopup.js");

var _generate = require("./generate.js");

// Function that fetch the data from people.json
async function fetchData() {
  const response = await fetch(_element.data);
  const dataList = await response.json();
  let people = dataList;

  function displayList() {
    const myHtml = (0, _generate.generateLists)(people);
    _element.listOfData.innerHTML = myHtml;
  }

  ;
  displayList(); // function that handle edit button and delete button

  function handleEditPerson(e) {
    if (e.target.closest('button.edit')) {
      const editButton = e.target.closest('ul');
      const editedId = editButton.dataset.id;
      editPerson(editedId);
    }
  } // Function for editing the form here


  const editPerson = async dataId => {
    console.log(people);
    const findPerson = people.find(person => person.id !== dataId);
    console.log(findPerson);
    return new Promise(async function (resolve) {
      const popup = document.createElement('form');
      popup.classList.add('to-edit');
      popup.insertAdjacentHTML('afterbegin', `
            <div class="popup">
                <div class="inner-popup">
                    <h4 class="person-name">Edit ${findPerson.firstName} <span>${findPerson.lastName} </h4>
                    <label class="popup-label" for="picture">Picture</label>
                    <input class="input" type="url" name="picture" value="${findPerson.picture}">
                    <label class="popup-label" for="last-name">Last name</label>
                    <input class="input" type="text" name="lastName" value="${findPerson.lastName}">
                    <label class="popup-label" for="first-name">First name</label>
                    <input class="input" type="text" name="firstName" value="${findPerson.firstName}">
                    <label class="popup-label" for="birthday">Birthday</label>
                    <input class="input" type="date" name="birthday" >
                    <div class="buttons">
                        <button type="cancel" class="btn cancel">Cancel</button>
                        <button type="submit" class="btn submit">Save</button>
                    </div>
                </div>
                
			</div>
    	`);
      document.body.appendChild(popup);
      await (0, _destroyPopup.wait)(50);
      popup.classList.add('open'); // Reject the change

      window.addEventListener('click', e => {
        if (e.target.closest('button.cancel')) {
          (0, _destroyPopup.destroyPopup)(popup);
        }
      });
      popup.addEventListener('submit', e => {
        e.preventDefault();
        findPerson.picture = popup.picture.value;
        findPerson.lastName = popup.lastName.value;
        findPerson.firstName = popup.firstName.value;

        const toTimestamp = strDate => {
          var datum = Date.parse(strDate);
          return datum / 1000;
        };

        findPerson.birthday = toTimestamp(popup.birthday.value);
        displayList(findPerson);
        resolve(popup.remove());
        (0, _destroyPopup.destroyPopup)(popup);

        _element.listOfData.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
      }, {
        once: true
      });
    });
  }; // function for deleting item here


  function handleDeletePerson(e) {
    if (e.target.closest('button.delete')) {
      const deleteData = e.target.closest('ul');
      const deleteId = deleteData.querySelector('button.delete');
      const deleteBtn = deleteId.dataset.id;
      deleteDataForm(deleteBtn);
    }
  }

  ;

  const deleteDataForm = idToDelete => {
    // const deleteButton = people.filter(el => el.id !== idToDelete);
    console.log(idToDelete);
    return new Promise(async function (resolve) {
      const dataToDelete = document.createElement('div');
      dataToDelete.classList.add('to-delete');
      dataToDelete.insertAdjacentHTML('afterbegin', `
            <div class="to-deleteEl">
                <p> ⚠ </p>
                <p> Do you want to remove this person from the list?
                </p>
                <button class="remove">Yes</button>
                <button type="cancel" class="cancel">No</button>
			</div>
        `);
      window.addEventListener('click', e => {
        if (e.target.closest('button.cancel')) {
          (0, _destroyPopup.destroyPopup)(dataToDelete);
        }
      });
      window.addEventListener('click', e => {
        if (e.target.closest('button.remove')) {
          const removeData = people.filter(el => el.id != idToDelete);
          const deleteFindData = removeData;
          people = deleteFindData;
          displayList(deleteFindData);
          (0, _destroyPopup.destroyPopup)(dataToDelete);
        }
      });
      document.body.appendChild(dataToDelete);
      dataToDelete.classList.add('open');

      _element.listOfData.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
    });
  };

  const addNewPerson = e => {
    if (e.target.closest('button.add')) {
      addData();
    }
  };

  const addData = id => {
    return new Promise(async function (resolve) {
      const newData = document.createElement('form');
      newData.classList.add('popup');
      newData.insertAdjacentHTML('afterbegin', `
            <div class="popup">
                <label for="picture">Picture</label>
                <input type="url" id="avatar" name="avatar" required>
                <label for="last-name">Last name</label>
                <input type="text" id="lastName" name="lastname" required>
                <label for="first-name">First name</label>
                <input itype="text" id="firstName" name="firstname" required>
                <label for="birthday">Birthday</label>
                <input type="date" id="birthday" name="birthdayDate" placeholder="dd/mm/yy"required>
            </div>
            <div>
                <button type="cancel" class="btn cancel">Cancel</button>
                <button type="submit" class=" btn submit">Save</button>
            </div>
        `);
      document.body.appendChild(newData);
      newData.classList.add('open');
      window.addEventListener('click', e => {
        if (e.target.closest('button.cancel')) {
          (0, _destroyPopup.destroyPopup)(newData);
        }
      });
      newData.addEventListener('submit', e => {
        e.preventDefault();
        const form = e.currentTarget;
        const newPerson = {
          picture: form.avatar.value,
          firstName: form.firstname.value,
          lastName: form.lastname.value,
          birthday: form.birthdayDate.value,
          id: Date.now()
        };
        people.push(newPerson);
        console.log(people);
        displayList();
        (0, _destroyPopup.destroyPopup)(newData); // form.reset();

        _element.listOfData.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
      });
    });
  };

  const initLocalStorage = () => {
    //Check if there is something in the local storage
    const lsData = JSON.parse(localStorage.getItem('people'));

    if (lsData) {
      people = lsData;
      displayList();
    }

    _element.listOfData.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
  };

  const updateLocalStorage = () => {
    localStorage.setItem('people', JSON.stringify(people));
  };

  const filteredName = () => {
    const listOfInput = _element.myInput.value;
    console.log(listOfInput);
    const filteredList = people.filter(item => item.firstName.toLowerCase().includes(listOfInput.toLowerCase()));
    console.log(filteredList);
    const HTML = (0, _generate.generateLists)(filteredList);
    _element.listOfData.innerHTML = HTML;
  };

  const filteredMonth = () => {
    const listOfMonth = _element.getMonth.value;
    const filteredMonth = people.filter(mth => {
      const fullMonth = new Date(mth.birthday).toLocaleString('en-US', {
        month: 'long'
      });
      return fullMonth.toLowerCase().includes(listOfMonth);
    });
    const html = (0, _generate.generateLists)(filteredMonth);
    _element.listOfData.innerHTML = html;
  }; // const resetFilters = e => {
  //     inputSearch.reset();
  //     displayList();
  // };
  // resetBtn.addEventListener('click', resetFilters);


  _element.listOfData.addEventListener('pleaseUpdateTheList', updateLocalStorage);

  _element.addDataBtn.addEventListener('click', addNewPerson);

  _element.listOfData.addEventListener('click', handleEditPerson);

  _element.listOfData.addEventListener('click', handleDeletePerson);

  _element.myInput.addEventListener('input', filteredName);

  _element.getMonth.addEventListener('input', filteredMonth);

  initLocalStorage();
}

fetchData();
},{"./element.js":"component/element.js","./destroyPopup.js":"component/destroyPopup.js","./generate.js":"component/generate.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49999" + '/');

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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","component/birthday.js"], null)
//# sourceMappingURL=/birthday.4fc5c73a.js.map