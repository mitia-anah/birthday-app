import { data, listOfData, addDataBtn, myInput, getMonth, resetBtn } from './element.js';
import { wait, destroyPopup } from './destroyPopup.js';
import { generateLists } from './generate.js'


// Function that fetch the data from people.json
async function fetchData() {
    const response = await fetch(data);
    const dataList = await response.json();
    let people = dataList;

    function displayList() {
        const myHtml = generateLists(people);
        listOfData.innerHTML = myHtml;
    };
    displayList();


    // function that handle edit button and delete button
    function handleEditPerson(e) {
        if (e.target.closest('button.edit')) {
            const editButton = e.target.closest('ul')
            const editedId = editButton.dataset.id;
            editPerson(editedId);
        }
    }
    // Function for editing the form here
    const editPerson = async (dataId) => {
        console.log(people);
        const findPerson = people.find(person => person.id !== dataId);
        console.log(findPerson);
        return new Promise(async function (resolve) {            
            const birthdayDate = new Date(findPerson.birthday).toISOString().slice(0, 10);  
            const maxDate = new Date().toISOString().slice(0, 10)
            const popup = document.createElement('form');
            popup.classList.add('to-edit');
            popup.insertAdjacentHTML('afterbegin',
                `
            <div class="popup">
                <div class="inner-popup">
                    <h4 class="person-name">Edit ${findPerson.firstName} <span>${findPerson.lastName} </h4>
                    <label class="edit-label" for="picture">Picture</label>
                    <input class="edit-input" type="url" name="picture" value="${findPerson.picture}">
                    <label class="edit-label" for="last-name">Last name</label>
                    <input class="edit-input" type="text" name="lastName" value="${findPerson.lastName}">
                    <label class="edit-label" for="first-name">First name</label>
                    <input class="edit-input" type="text" name="firstName" value="${findPerson.firstName}">
                    <label class="edit-label" for="birthday">Birthday</label>
                    <input class="edit-input" type="date" name="birthday" value="${birthdayDate}" max="${maxDate}" >
                    <div class="buttons">
                        <button type="submit" class="btn submit">Save</button>
                        <button type="cancel" class="btn cancel">Cancel</button>
                    </div>
                    <button class="edit-close-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
			</div>
    	`
            );
            document.body.appendChild(popup);
            await wait(50);
            popup.classList.add('open');
            document.body.style.overflow = 'hidden';
           
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == popup) {
                popup.style.display = "none";
                }
                }
            // Reject the change
            window.addEventListener('click', e => {
                if (e.target.closest('button.cancel')) {
                    destroyPopup(popup);
                }
            })

            popup.addEventListener('submit', e => {
                e.preventDefault()
                findPerson.picture = popup.picture.value;
                findPerson.lastName = popup.lastName.value; 
                findPerson.firstName = popup.firstName.value; 
                const toTimestamp=(strDate)=>{
                    var datum = Date.parse(strDate);
                    return datum/1000;
                 } 
                findPerson.birthday = toTimestamp(popup.birthday.value);

                    displayList(findPerson);

                resolve(popup.remove());
                destroyPopup(popup);
                listOfData.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
            }, { once: true });
        });
    };

    // function for deleting item here
    function handleDeletePerson(e) {
        if (e.target.closest('button.delete')) {
            const deleteData = e.target.closest('ul');
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
                <button class="delete-close-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                </button>
			</div>
        `);

            window.addEventListener('click', e => {
                if (e.target.closest('button.cancel')) {
                    destroyPopup(dataToDelete);
                }
            });

            window.addEventListener('click', e => {
                e.preventDefault()
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
            document.body.style.overflow="hidden";
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == dataToDelete) {
                dataToDelete.style.display = "none";
                }
            }
            document.body.style.overflow="visible"
            listOfData.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
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
            newData.classList.add('add-person');
            newData.insertAdjacentHTML('afterbegin',
                `
            <div class="to-add">
                <div class="inner-popup">
                    <h4 class="add-title">Add somebody</h4>
                    <label  class="add-label"for="picture">Picture</label>
                    <input class="add-input" placeholder="Enter Url.." type="url" id="avatar" name="avatar" required>
                    <label class="add-label" for="last-name">Last name</label>
                    <input class="add-input" placeholder="What's your last name?" type="text" id="lastName" name="lastname" required>
                    <label class="add-label" for="first-name">First name</label>
                    <input class="add-input" placeholder="What's your first name? " type="text" id="firstName" name="firstname" required>
                    <label class="add-label" for="birthday">Birthday</label>
                    <input class="add-input" placeholder="Enter your birthday " type="date" id="birthday" name="birthdayDate" placeholder="dd/mm/yy"required>
                    <div>
                        <button type="cancel" class="btn cancel">Cancel</button>
                        <button type="submit" class=" btn submit">Save</button>
                    </div>
                    <button class="add-close-btn close-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>  
        `);
            document.body.appendChild(newData);
            newData.classList.add('open');
            document.body.style.overflow="hidden"

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == newData) {
            newData.style.display = "none";
            }
            }
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
                    destroyPopup(newData);
                    console.log(people);
                    displayList();
                    // form.reset();
                    listOfData.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
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
        listOfData.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
    };

    const updateLocalStorage = () => {
        localStorage.setItem('people', JSON.stringify(people));
    };

    const filteredName = (people) => {
        const listOfInput = myInput.value;
        const filteredList = people.filter(item => item.firstName.toLowerCase().includes(listOfInput.toLowerCase()));
       return filteredList;
    };

    const filteredMonth = (people) => {
        const listOfMonth = getMonth.value;
        const filteredMonth = people.filter(mth => {
            const fullMonth = new Date(mth.birthday).toLocaleString('en-US', { month: 'long' });
            return fullMonth.toLowerCase().includes(listOfMonth);
        });
        return filteredMonth
    };

    function filteredMonthAndName() {
        const nameFiltered = filteredName(people)
        const MonthFiltered = filteredMonth(nameFiltered) 
        const HTML = generateLists(MonthFiltered);
        listOfData.innerHTML = HTML;
    }

    // const resetFilters = e => {
    //     inputSearch.reset();
    //     displayList();
    // };

    // resetBtn.addEventListener('click', resetFilters);
    listOfData.addEventListener('pleaseUpdateTheList', updateLocalStorage);
    addDataBtn.addEventListener('click', addNewPerson);
    listOfData.addEventListener('click', handleEditPerson);
    listOfData.addEventListener('click', handleDeletePerson);
    myInput.addEventListener('input', filteredMonthAndName);
    getMonth.addEventListener('input', filteredMonthAndName);   
    initLocalStorage();
}

fetchData()