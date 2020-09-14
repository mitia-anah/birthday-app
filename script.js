// fetching the data from people.json

const dataList = `people.json`;
const container = document.querySelector(".container");

async function fetchData() {
    const response = await fetch(dataList);
    const data = await response.json();
    return data;
}

async function populateData() {
    const persons = await fetchData();
    const sortedData = persons.sort((a, b) => b.rt_score - a.rt_score);
    const html = sortedData.map(data => {
        return `
            <article>
                <h3>${data.firstName}</h3>
                <p>${data.lastName}</p>
                <p>${data.birthday}</p>
                <p>${data.picture}</p>
                <p>${data.id}</p> 
            </article>
        `;
    }).join('');
    container.innerHTML = html;
}

populateData();