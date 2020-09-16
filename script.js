function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// fetching the data from people.json
const dataList = `people.json`;
const tbody = document.querySelector('tbody');

// Function that fetch the data from people.json
async function fetchData() {
    const response = await fetch(dataList);
    const data = await response.json();
    let people = data;
    console.log(people);

    function displayList() {
        const sortedData = people.sort((a, b) => b.birthday - a.birthday);
        console.log(sortedData);
        const html = people.map(
            data => {
                const dateNow = new Date();
                const currentDate = new Date(data.birthday);
                const day = currentDate.getDay();
                const month = currentDate.getMonth();
                const year = currentDate.getFullYear();
                const fullDate = `${day} / ${month} / ${year}`;
                const peopleBirth = dateNow.getFullYear() - currentDate.getFullYear();
                return `
                <tr class='list-of-data' data-id="${data.id}">
                    <td><image src="${data.picture}" alt="${data.firstName + ' ' + data.lastName}"/></td>
                    <td>${data.firstName}</td>
                    <td class="lastName">${data.lastName}</td>
                    <td>${peopleBirth}</td>
                    <td>
                        <button value="${data.id}"class="edit">
                        ✏ 
                        </button>
                    </td>
                    <td>
                        <button value="${data.id}" class="delete">
                        ||| 
                        </button>
                    </td>
                </tr>
            `;
            }).join('');
        tbody.innerHTML = html;
    }
    displayList();

    // Destroy the popup
    async function destroyPopup(popup) {
        popup.classList.remove("open");
        await wait(1000); // Wait for 1 sec
        popup.remove(); // remove it from the DOM
        popup = null; // remove it from the javascript memory
    }

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
        const findPerson = people.find(person => person.id !== dataId);
        return new Promise(async function(resolve) {
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
                    console.log(findPerson);
                    resolve(e.target.remove());
                    destroyPopup(popup);
                }, { once: true });
            document.body.appendChild(popup);
            popup.classList.add('open');
        });
    }

    // function for deleting item here
    const deleteDataForm = (idToDelete) => {
        // const deleteButton = people.filter(el => el.id !== idToDelete);
        console.log(idToDelete);
        return new Promise(async function(resolve) {
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
                    const removeData = people.filter(el => el.id !== idToDelete);
                    const deleteFindData = removeData;
                    people = deleteFindData;
                    displayList(deleteFindData);
                    destroyPopup(dataToDelete);
                }
            })
            document.body.appendChild(dataToDelete);
            dataToDelete.classList.add('open');
        });
    }
    tbody.addEventListener('click', handleClick)
}
fetchData();