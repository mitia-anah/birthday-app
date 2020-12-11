export function generateLists(people) {
    return people.sort(function (a, b) {
        return new Date(a.birthday).getMonth() - new Date(b.birthday).getMonth()
    })
        .map(data => {
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
                <td class="col-8 col-sm-6 picture"><image src="${data.picture}" alt="${data.firstName + ' ' + data.lastName}"/></td>
                <td class="col-8 col-sm-6 firstName" id="name">${data.firstName}</td>
                <td class="col-8 col-sm-6 lastName" >${data.lastName}</td>
                <td class="col-8 col-sm-6">Turns ${futAge} years old on ${day}${date()} of ${monthNname} ${dateToday}</td>
                <td class="col-8 col-sm-6">${fullDate}</td>
                <td class="col-8 col-sm-6 birthday" >${dayLeft < 0 ? dayLeft * -1 + " " + "days ago" : "after" + " " + dayLeft + " days"}</td>
                
                <td class="col-8 col-sm-6">
                <p data-placement="top" data-toggle="tooltip" title="Edit">
                    <button data-id="${data.id}" class="edit btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span>
                    </button>
                </td>
                <td class="col-8 col-sm-6"><button data-id="${data.id}" class="delete"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></td>
            </tr>
        `;
        }).join('');
    // tbody.innerHTML = html;
};
