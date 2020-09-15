// import differenceInYears from 'date-fns/difference_in_years';

// fetching the data from people.json
const dataList = `people.json`;
const container = document.querySelector(".container");

async function fetchData() {
    const response = await fetch(dataList);
    const data = await response.json();
    return data;
}

async function populateData() {
    const peoples = await fetchData();
    const sortedData = peoples.sort((a, b) => b.rt_score - a.rt_score);
    const html = sortedData.map(data => {
        return `
            <div class='list-of-data'>
                <image src="${data.picture}">
                <h3>${data.firstName}</h3>
                <p class="lastName">${data.lastName}</p>
                <p>${data.birthday}</p>
                
                <button value="${data.id}"class="edit">
                ✏ 
                </button>
                <button value="${data.id}" class="delete">
                ||| 
                </button>
            </div>
        `;
    }).join('');
    container.innerHTML = html;
}
populateData();

function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function destroyShowList(showList) {
    showList.classList.remove("open");
    // Wait for 1 sec, to let the animation do its work.
    await wait(1000);
    // remove it from the DOM
    showList.remove();
    // remove it from the javascript memory
    showList = null;
}

// Here is the code that handle editForm, If the user want to edit the form
const editForm = (e) => {
    e.preventDefault();
    if (e.target.closest('button.edit')) {
        // every time we click the icon in each rows, the showList will appear  
        const editButton = e.target.closest('.container');
        const editedBtn = editButton.value;
        editTheForm(editedBtn);
    }
};

async function editTheForm(dataId) {
    const formToEdit = await fetchData(dataList);
    console.log(formToEdit)

    const editedForm = formToEdit.find(data => data.id !== dataId);
    console.log(editedForm);

    return new Promise(async function(resolve) {
        // We create form here
        const showList = document.createElement('form');
        showList.classList.add('show-list');
        showList.insertAdjacentHTML('afterbegin',
            `
            <div class="show-list">
                <label for="picture">Picture</label>
				<input type="url" name="picture" value="${editedForm.picture}">
				<label for="last-name">Last name</label>
				<input type="text" name="lastName" value="${editedForm.lastName}">
				<label for="first-name">First name</label>
				<input type="text" name="firstName" value="${editedForm.firstName}">
				<label for="birthday">Birthday</label>
				<input type="text" name="birthday" value="${editedForm.birthday}">
			</div>
			<div class="buttons">
				<button type="cancel" class="btn cancel">Cancel</button>
				<button type="submit" class="btn submit">Save</button>
			</div>
    	`
        );

        window.addEventListener('click', e => {
            if (e.target.closest('button.cancel')) {
                destroyShowList(showList);
            }
        })

        showList.addEventListener(
            'submit',
            e => {
                e.preventDefault();
                editedForm.picture = e.target.picture.value,
                    editedForm.lastName = e.target.lastName.value,
                    editedForm.firstName = e.target.firstName.value,
                    editedForm.birthday = e.target.birthday.value,
                    populateData(editedForm);
                resolve(e.target.remove());
                console.log(editedForm)
                destroyShowList(showList);
            }, { once: true });
        document.body.appendChild(showList);
        showList.classList.add('open');
    });
}

// Code that handle the delete list
const deleteForm = (e) => {
    e.preventDefault();
    // code delete function here
    if (e.target.closest('button.delete')) {
        const deleteData = e.target.closest('.container');
        const deleteX = deleteData.querySelector('button.delete');
        const deleteBtn = deleteX.id;
        deleteDataForm(deleteBtn);
    }
};

async function deleteDataForm(idToDelete) {
    const findData = await fetchData();
    const deleteButton = findData.filter(el => el.id === idToDelete);
    console.log(deleteButton);
    return new Promise(async function(resolve) {
        const dataToDelete = document.createElement('div');
        const lastName = document.querySelector('.lastName').textContent;
        dataToDelete.classList.add('to-delete');
        dataToDelete.insertAdjacentHTML('afterbegin',
            `
            <div class="to-deleteEl">
                <p> Are you sure to remove <br> ${lastName}?</p>
                <button class="remove">Yes</button>
                <button type="cancel" class="cancel">No</button>
			</div>
        `);

        dataToDelete.addEventListener('click', e => {
            if (e.target.closest('button.cancel')) {
                destroyShowList(dataToDelete);
            }
        });

        dataToDelete.addEventListener('click', e => {
            if (e.target.closest('button.remove')) {
                const removeData = findData.filter(el => el.id !== idToDelete);
                populateData(removeData);
                destroyShowList(dataToDelete);
            }
        })
        document.body.appendChild(dataToDelete);
        dataToDelete.classList.add('open');
    });
}
container.addEventListener('click', deleteForm);

container.addEventListener('click', editTheForm);

populateData(dataList)


// handling date computation