import { dataList, tbody, addDataBtn, myInput, getMonth, inputSearch, resetBtn } from './element.js';
import { wait, destroyPopup } from './destroyPopup.js';
import { generateLists } from './generate.js'

// Function that fetch the data from people.json
async function fetchData() {
    const response = await fetch(dataList);
    const data = await response.json();
    let people = data;

    function displayList() {
        const myHtml = generateLists(people);
        tbody.innerHTML = myHtml;
    };
    displayList();


    // function that handle edit button and delete button
    function handleEditPerson(e) {
        if (e.target.closest('button.edit')) {
            const editButton = e.target.closest('tr');
            const editedId = editButton.dataset.id;
            editPerson(editedId);
        }
    }
    // Function for editing the form here
    const editPerson = async (dataId) => {
        console.log(people);
        const findPerson = people.find(person => person.id == dataId);
        console.log(findPerson);
        return new Promise(async function (resolve) {
            const popup = document.createElement('form');
            popup.classList.add('popup');
            popup.insertAdjacentHTML('afterbegin',
                `
            <div class="popup">
                <label for="picture">Picture</label>
				<input type="url" name="picture" value="${findPerson.picture}">
				<label for="last-name">Last name</label>
				<input type="text" name="lastName" value="${findPerson.lastName}">
				<label for="first-name">First name</label>
				<input type="text" name="firstName" value="${findPerson.firstName}">
				<label for="birthday">Birthday</label>
				<input type="date" name="birthday"  >
			</div>
			<div class="buttons">
				<button type="cancel" class="btn cancel">Cancel</button>
				<button type="submit" class="btn submit">Save</button>
			</div>
    	`
            );
            document.body.appendChild(popup);
            await wait(50);
            popup.classList.add('open');

            // Reject the change
            window.addEventListener('click', e => {
                if (e.target.closest('button.cancel')) {
                    destroyPopup(popup);
                }
            })

            popup.addEventListener('submit', e => {
                e.preventDefault()
                findPerson.picture = popup.picture.value,
                    findPerson.lastName = popup.lastName.value,
                    console.log(findPerson.lastName);
                findPerson.firstName = popup.firstName.value,
                    console.log(findPerson.firstName);
                findPerson.birthday = popup.birthday.value,

                    displayList(findPerson);

                resolve(popup.remove());
                destroyPopup(popup);
                tbody.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
            }, { once: true });
        });
    };

    // function for deleting item here
    function handleDeletePerson(e) {
        if (e.target.closest('button.delete')) {
            const deleteData = e.target.closest('tr');
            const deleteId = deleteData.querySelector('button.delete');
            const deleteBtn = deleteId.dataset.id;
            deleteDataForm(deleteBtn);
        }
    };

    const deleteDataForm = (idToDelete) => {
        // const deleteButton = people.filter(el => el.id !== idToDelete);
        console.log(idToDelete);
        return new Promise(async function (resolve) {
            const dataToDelete = document.createElement('div');
            dataToDelete.classList.add('to-delete');
            dataToDelete.insertAdjacentHTML('afterbegin',
                `
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
                    destroyPopup(dataToDelete);
                }
            });

            window.addEventListener('click', e => {
                if (e.target.closest('button.remove')) {
                    const removeData = people.filter(el => el.id != idToDelete);
                    const deleteFindData = removeData;
                    people = deleteFindData;
                    displayList(deleteFindData);
                    destroyPopup(dataToDelete);
                }
            })
            document.body.appendChild(dataToDelete);
            dataToDelete.classList.add('open');
            tbody.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
        });
    };

    const addNewPerson = (e) => {
        if (e.target.closest('button.add')) {
            addData();
        }
    };

    const addData = id => {
        return new Promise(async function (resolve) {
            const newData = document.createElement('form');
            newData.classList.add('popup');
            newData.insertAdjacentHTML('afterbegin',
                `
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
                    destroyPopup(newData);
                }
            })

            newData.addEventListener('submit',
                e => {
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
                    destroyPopup(newData);

                    // form.reset();
                    tbody.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
                });
        })
    };

    const initLocalStorage = () => {
        //Check if there is something in the local storage
        const lsData = JSON.parse(localStorage.getItem('people'));
        if (lsData) {
            people = lsData;
            displayList();
        }
        tbody.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
    };

    const updateLocalStorage = () => {
        localStorage.setItem('people', JSON.stringify(people));
    };

    const filteredName = () => {
        const listOfInput = myInput.value;
        console.log(listOfInput);
        // const filter = listOfInput.toLowerCase();
        const filteredList = people.filter(item => item.firstName.toLowerCase().includes(listOfInput.toLowerCase()));
        console.log(filteredList);
        const HTML = generateLists(filteredList);
        tbody.innerHTML = HTML;
    };

    const filteredMonth = () => {
        const listOfMonth = getMonth.value;
        // console.log(listOfMonth);
        const filteredMonth = people.filter(mth => {
            const fullMonth = new Date(mth.birthday).toLocaleString('en-US', { month: 'long' });
            return fullMonth.toLowerCase().includes(listOfMonth);
        });
        const html = generateLists(filteredMonth);
        tbody.innerHTML = html;
    };

    const resetFilters = e => {
        inputSearch.reset();
        displayList();
    };

    resetBtn.addEventListener('click', resetFilters);
    tbody.addEventListener('pleaseUpdateTheList', updateLocalStorage);
    addDataBtn.addEventListener('click', addNewPerson);
    tbody.addEventListener('click', handleEditPerson);
    tbody.addEventListener('click', handleDeletePerson);
    myInput.addEventListener('input', filteredName);
    getMonth.addEventListener('input', filteredMonth);
    initLocalStorage();
}

fetchData()