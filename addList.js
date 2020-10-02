import { destroyPopup } from './destroyPopup.js';

export const addNewPerson = (e) => {
    if (e.target.closest('button.add')) {
        addData();
    }
};

export const addData = (e) => {
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
            <input type="text" id="birthday" name="birthdayDate" placeholder="dd/mm/yy"required>
        </div>
        <div>
            <button type="cancel" class="btn cancel">Cancel</button>
            <button type="submit" class=" btn submit">Save</button>
        </div>
    `);
    document.body.appendChild(newData);

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
            newData.classList.add('open');
            // form.reset();
            tbody.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
        });
};