export function generateLists(people) {
    return people.sort(function (a, b) {
        return new Date(a.birthday).getMonth() - new Date(b.birthday).getMonth()
    })
        .map(data => {
            function date(day) {
                if (day > 3 && day < 21) return 'th';
                switch (day % 10) {
                  case 1:  return "st";
                  case 2:  return "nd";
                  case 3:  return "rd";
                  default: return "th";
                }
            }

            const today = new Date();
            const currentDate = new Date(data.birthday);
            const day = currentDate.getDay();
            const newDate = currentDate.getDate()
            const month = currentDate.getMonth();
            const year = currentDate.getFullYear();
            const peopleAge = today.getFullYear() - year;
            const futAge = peopleAge;

            const momentYear = today.getFullYear();
            const birthdayDate = new Date(momentYear, month, day);
            let oneDay = 1000 * 60 * 60 * 24;

            

            const dayLeft = Math.ceil((birthdayDate.getTime() - today.getTime()) / (oneDay));
            const birthdayInDays = dayLeft < 0 ? 365 + dayLeft : dayLeft; 

            var monthNname = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ][month];

            console.log(dayLeft)

            return `
            <li class='list-of-data' data-id="${data.id}">
                <div class="col-8 col-sm-6 picture"><image src="${data.picture}" alt="${data.firstName + ' ' + data.lastName}"/></div>
                <div class="names-and-date">
                    <div class="names">
                        <span class="col-8 col-sm-6 firstName" id="name">${data.firstName}</span>
                        <span class="col-8 col-sm-6 lastName">${data.lastName}</span>
                    </div>
                    <p class="date">Turns <span class="future-age">${futAge}</span> on ${monthNname}  ${day}<sup>${date(newDate)}</sup> </p>
                </div>   
                <div class="group-btn">
                    <div class="birthday-in-days">in <span>${birthdayInDays}</span> days</div>
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
        }).join('');
    // tbody.innerHTML = html;
};
