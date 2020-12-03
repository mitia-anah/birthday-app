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
})({"element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetBtn = exports.inputSearch = exports.getMonth = exports.myInput = exports.addDataBtn = exports.tbody = exports.dataList = void 0;
// fetching the data from people.json
const dataList = `people.json`;
exports.dataList = dataList;
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
},{}],"destroyPopup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = wait;
exports.destroyPopup = destroyPopup;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Destroy the popup
function wait() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function destroyPopup(_x) {
  return _destroyPopup.apply(this, arguments);
}

function _destroyPopup() {
  _destroyPopup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(popup) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            popup.classList.remove("open");
            _context.next = 3;
            return wait(1000);

          case 3:
            // Wait for 1 sec
            popup.remove(); // remove it from the DOM

            popup = null; // remove it from the javascript memory

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _destroyPopup.apply(this, arguments);
}
},{}],"addList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addData = exports.addNewPerson = void 0;

var _destroyPopup = require("./destroyPopup.js");

var addNewPerson = function addNewPerson(e) {
  if (e.target.closest('button.add')) {
    addData();
  }
};

exports.addNewPerson = addNewPerson;

var addData = function addData(e) {
  var newData = document.createElement('form');
  newData.classList.add('popup');
  newData.insertAdjacentHTML('afterbegin', "\n        <div class=\"popup\">\n            <label for=\"picture\">Picture</label>\n            <input type=\"url\" id=\"avatar\" name=\"avatar\" required>\n            <label for=\"last-name\">Last name</label>\n            <input type=\"text\" id=\"lastName\" name=\"lastname\" required>\n            <label for=\"first-name\">First name</label>\n            <input itype=\"text\" id=\"firstName\" name=\"firstname\" required>\n            <label for=\"birthday\">Birthday</label>\n            <input type=\"text\" id=\"birthday\" name=\"birthdayDate\" placeholder=\"dd/mm/yy\"required>\n        </div>\n        <div>\n            <button type=\"cancel\" class=\"btn cancel\">Cancel</button>\n            <button type=\"submit\" class=\" btn submit\">Save</button>\n        </div>\n    ");
  document.body.appendChild(newData);
  window.addEventListener('click', function (e) {
    if (e.target.closest('button.cancel')) {
      (0, _destroyPopup.destroyPopup)(newData);
    }
  });
  newData.addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.currentTarget;
    var newPerson = {
      picture: form.avatar.value,
      firstName: form.firstname.value,
      lastName: form.lastname.value,
      birthday: form.birthdayDate.value,
      id: Date.now()
    };
    people.push(newPerson);
    console.log(people);
    displayList();
    (0, _destroyPopup.destroyPopup)(newData);
    newData.classList.add('open'); // form.reset();

    tbody.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
  });
};

exports.addData = addData;
},{"./destroyPopup.js":"destroyPopup.js"}],"birthday.js":[function(require,module,exports) {
"use strict";

var _element = require("./element.js");

var _destroyPopup = require("./destroyPopup.js");

var _addList = require("./addList.js");

// Function that fetch the data from people.json
async function fetchData() {
  const response = await fetch(_element.dataList);
  const data = await response.json();
  let people = data;
  console.log(people);

  function generateLists(data) {
    const sortedData = people.sort((a, b) => a.birthday - b.birthday);
    console.log(sortedData);
    return data.map(data => {
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
            return "th";
        }
      }

      const today = new Date();
      const currentDate = new Date(data.birthday);
      const day = currentDate.getDay();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const fullDate = `${day}${date(day)} / ${month + 1} / ${year}`;
      const peopleAge = today.getFullYear() - year;
      const futAge = peopleAge;
      const momentYear = today.getFullYear();
      const birthdayDate = new Date(momentYear, month, day);
      let oneDay = 1000 * 60 * 60 * 24;
      let dateToday = new Date().getFullYear();
      const dayLeft = Math.ceil((birthdayDate.getTime() - today.getTime()) / oneDay);
      var monthNname = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];
      return `
                <tr class='list-of-data' data-id="${data.id}">
                    <td class="picture"><image src="${data.picture}" alt="${data.firstName + ' ' + data.lastName}"/></td>
                    <td id="name" class="firstName">${data.firstName}</td>
                    <td class="lastName">${data.lastName}</td>
                    <td>Turns ${futAge} years old on ${day}${date()} of ${monthNname} ${dateToday}</td>
                    <td>${fullDate}</td>
                    <td class="birthday">${dayLeft < 0 ? dayLeft * -1 + " " + "days ago" : "after" + " " + dayLeft + " days"}</td>
                    
                    <td><button value="${data.id}"class="edit"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button></td>
                    <td><button value="${data.id}" class="delete"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></td>
                </tr>
            `;
    }).join('');
    _element.tbody.innerHTML = html;
  }

  ;

  function displayList() {
    const myHtml = generateLists(people);
    _element.tbody.innerHTML = myHtml;
  }

  ;
  displayList(); // function that handle edit button and delete button

  const handleClick = e => {
    if (e.target.closest('button.edit')) {
      const editButton = e.target.closest('tr');
      const editedBtn = editButton.value;
      editPerson(editedBtn);
    }

    if (e.target.closest('button.delete')) {
      const deleteData = e.target.closest('tr');
      const deleteB = deleteData.querySelector('button.delete');
      console.log(deleteData);
      const deleteBtn = deleteB.value;
      deleteDataForm(deleteBtn);
      console.log(deleteBtn);
    }
  }; // Function for editing the form here


  function editPerson(dataId) {
    const findPerson = people.find(person => person.id != dataId);
    return new Promise(async function (resolve) {
      // We create form here
      const popup = document.createElement('form');
      popup.classList.add('popup');
      popup.insertAdjacentHTML('afterbegin', `
            <div class="popup">
                <label for="picture">Picture</label>
				<input type="url" name="picture" value="${findPerson.picture}">
				<label for="last-name">Last name</label>
				<input type="text" name="lastName" value="${findPerson.lastName}">
				<label for="first-name">First name</label>
				<input type="text" name="firstName" value="${findPerson.firstName}">
				<label for="birthday">Birthday</label>
				<input type="text" name="birthday" value="${findPerson.birthday}">
			</div>
			<div class="buttons">
				<button type="cancel" class="btn cancel">Cancel</button>
				<button type="submit" class="btn submit">Save</button>
			</div>
    	`);
      window.addEventListener('click', e => {
        if (e.target.closest('button.cancel')) {
          (0, _destroyPopup.destroyPopup)(popup);
        }
      });
      popup.addEventListener('submit', e => {
        e.preventDefault();
        findPerson.picture = e.target.picture.value, findPerson.lastName = e.target.lastName.value, findPerson.firstName = e.target.firstName.value, findPerson.birthday = e.target.birthday.value, displayList(findPerson); // popup.reset();

        resolve(e.target.remove());
        (0, _destroyPopup.destroyPopup)(popup);

        _element.tbody.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
      }, {
        once: true
      });
      document.body.appendChild(popup);
      popup.classList.add('open');
    });
  }

  ; // function for deleting item here

  const deleteDataForm = idToDelete => {
    // const deleteButton = people.filter(el => el.id !== idToDelete);
    console.log(idToDelete);
    return new Promise(async function (resolve) {
      const lastName = document.querySelector('.lastName').textContent;
      const dataToDelete = document.createElement('div');
      dataToDelete.classList.add('to-delete');
      dataToDelete.insertAdjacentHTML('afterbegin', `
            <div class="to-deleteEl">
                <p> ⚠ </p>
                <p> Do you want to remove <br> <q>${lastName}</q> from the list?
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
      dataToDelete.addEventListener('click', e => {
        if (e.target.closest('button.remove')) {
          console.log(idToDelete);
          const removeData = people.filter(el => el.id != idToDelete);
          const deleteFindData = removeData;
          people = deleteFindData;
          displayList(deleteFindData);
          (0, _destroyPopup.destroyPopup)(dataToDelete);
        }
      });
      document.body.appendChild(dataToDelete);
      dataToDelete.classList.add('open');

      _element.tbody.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
    });
  };

  const initLocalStorage = () => {
    //Check if there is something in the local storage
    const dataToLs = localStorage.getItem('people');
    const lsData = JSON.parse(dataToLs);
    console.log(lsData);

    if (lsData) {
      people = lsData;

      _element.tbody.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
    } else {
      people = [];
    }
  };

  const updateLocalStorage = () => {
    localStorage.setItem('people', JSON.stringify(people));
  };

  const filteredName = () => {
    const listOfInput = _element.myInput.value;
    console.log(listOfInput); // const filter = listOfInput.toLowerCase();

    const filteredList = people.filter(item => item.firstName.toLowerCase().includes(listOfInput.toLowerCase()));
    console.log(filteredList);
    const HTML = generateLists(filteredList);
    _element.tbody.innerHTML = HTML;
  };

  const filteredMonth = () => {
    const listOfMonth = _element.getMonth.value; // console.log(listOfMonth);

    const filteredMonth = people.filter(mth => {
      const fullMonth = new Date(mth.birthday).toLocaleString('en-US', {
        month: 'long'
      });
      return fullMonth.toLowerCase().includes(listOfMonth);
    });
    const html = generateLists(filteredMonth);
    _element.tbody.innerHTML = html;
  };

  const resetFilters = e => {
    _element.inputSearch.reset();

    displayList();
  };

  _element.resetBtn.addEventListener('click', resetFilters);

  _element.tbody.addEventListener('pleaseUpdateTheList', updateLocalStorage);

  _element.addDataBtn.addEventListener('click', _addList.addNewPerson);

  _element.tbody.addEventListener('click', handleClick);

  _element.myInput.addEventListener('input', filteredName);

  _element.getMonth.addEventListener('input', filteredMonth);

  initLocalStorage();
}

fetchData();
},{"./element.js":"element.js","./destroyPopup.js":"destroyPopup.js","./addList.js":"addList.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49908" + '/');

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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","birthday.js"], null)
//# sourceMappingURL=/birthday.eb7d1bd7.js.map