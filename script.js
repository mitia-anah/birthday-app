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
                <p>${data.lastName}</p>
                <p>${data.birthday}</p>
                
                <button value="${data.id}"class="edit">
                ✏ 
                </button>
                <button value="${data.id}" class="delete">
                ✖ 
                </button>
            </div>
        `;
    }).join('');
    container.innerHTML = html;
}
populateData();

// handling date computations
import { differenceInYears } from "date-fns";