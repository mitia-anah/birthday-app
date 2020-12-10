import { tbody, addDataBtn, myInput, getMonth, inputSearch, resetBtn } from './element.js';
import { wait, destroyPopup } from './destroyPopup.js';
import { addNewPerson } from './addList.js';
import { generateLists } from './generate.js'


// get the Data
const dataList = `https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json`;

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
    function editPerson(dataId) {
        const findPerson = people.find(person => person.id == dataId);
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
				<input type="text" name="birthday" value="${findPerson.birthday}">
			</div>
			<div class="buttons">
				<button type="cancel" class="btn cancel">Cancel</button>
				<button type="submit" class="btn submit">Save</button>
			</div>
    	`
            );
            window.addEventListener('click', e => {
                if (e.target.closest('button.cancel')) {
                    destroyPopup(popup);
                }
            })

            popup.addEventListener('submit', e => {
                e.preventDefault()
                findPerson.picture = popup.picture.value,
                    findPerson.lastName = popup.lastName.value,
                    findPerson.firstName = popup.firstName.value,
                    findPerson.birthday = popup.birthday.value,

                    displayList(findPerson);
                // popup.reset();
                resolve(e.target.remove());
                destroyPopup(popup);
                tbody.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
            }, { once: true });
            document.body.appendChild(popup);
            popup.classList.add('open');
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
        console.log(people);
        // const deleteButton = people.filter(el => el.id !== idToDelete);
        console.log(idToDelete);
        return new Promise(async function (resolve) {
            const lastName = document.querySelector('.lastName').textContent;

            const dataToDelete = document.createElement('div');
            dataToDelete.classList.add('to-delete');
            dataToDelete.insertAdjacentHTML('afterbegin',
                `
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
                    destroyPopup(dataToDelete);
                }
            });

            dataToDelete.addEventListener('click', e => {
                if (e.target.closest('button.remove')) {
                    console.log(idToDelete);
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

    const initLocalStorage = () => {
        //Check if there is something in the local storage
        const dataToLs = localStorage.getItem('people');
        const lsData = JSON.parse(dataToLs);

        if (lsData) {
            people = lsData;
            tbody.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
        } else {
            people = [];
        }
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