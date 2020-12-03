import { dataList, tbody, addDataBtn, myInput, getMonth, inputSearch, resetBtn } from './element.js';
import { wait, destroyPopup } from './destroyPopup.js';
import { addNewPerson } from './addList.js';

// Function that fetch the data from people.json
async function fetchData() {
    const response = await fetch(dataList);
    const data = await response.json();
    let people = data;
    console.log(people);

    function generateLists(data) {
        const sortedData = people.sort((a, b) => a.birthday - b.birthday);
        console.log(sortedData);
        return data.map(
            data => {
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
                const dayLeft = Math.ceil((birthdayDate.getTime() - today.getTime()) / (oneDay));


                var monthNname = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ][month];

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
        tbody.innerHTML = html;
    };

    function displayList() {
        const myHtml = generateLists(people);
        tbody.innerHTML = myHtml;
    };
    displayList();

    // function that handle edit button and delete button
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
    };

    // Function for editing the form here
    function editPerson(dataId) {
        const findPerson = people.find(person => person.id != dataId);
        return new Promise(async function (resolve) {
            // We create form here
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

            popup.addEventListener(
                'submit',
                e => {
                    e.preventDefault();
                    findPerson.picture = e.target.picture.value,
                        findPerson.lastName = e.target.lastName.value,
                        findPerson.firstName = e.target.firstName.value,
                        findPerson.birthday = e.target.birthday.value,

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
    const deleteDataForm = (idToDelete) => {
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
        console.log(lsData);
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
    tbody.addEventListener('click', handleClick);
    myInput.addEventListener('input', filteredName);
    getMonth.addEventListener('input', filteredMonth);
    initLocalStorage();
}

fetchData()