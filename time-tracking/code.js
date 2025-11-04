const listItems = document.querySelectorAll('#myList li');
const container = document.querySelector('.grid-container');
let dataList = []

fetch('data.json').then((res) => {
    if (!res.ok) throw new Error('oops something went wrong')
    return res.json()
}).then((data) => {
    dataList = data
    displayCards('weekly');
}).catch(console.error);

const displayCards = (time) => {
    // remove all previous cards except the first (profile)
    const oldCards = container.querySelectorAll('.card:not(.span-row-2)');
    oldCards.forEach(card => card.remove());

    const label = time.charAt(0).toUpperCase() + time.slice(1, -2) ;

    dataList.forEach((data) => {
        let cardTitle = data.title.toLowerCase().replace(' ', '-');
        const timeframe = data.timeframes[time];

        const card = document.createElement('div');
        card.className = `card ${cardTitle}`;
        card.innerHTML = `
      <div class="card-header">
            <img src="./images/icon-${cardTitle}.svg" alt="${data.title}">
        </div>
        <div class="card-body">
            <div class="top-info">
            <p>${data.title}</p>
            <img src="./images/icon-ellipsis.svg" alt="ellipsis">
            </div>
            <div id="date-info" class="bottom-info">
            <h1>${timeframe.current}hrs</h1>
            <p>Last ${(label === 'Dai')? 'Day' : label} - ${timeframe.previous}hrs</p>
            </div>
      </div>
    `;
        container.appendChild(card);
    })
}

listItems.forEach(item => {
    item.addEventListener('click', function () {
        console.log(this.id)
        let time = this.id;
        displayCards(time);

        listItems.forEach(li => {
            li.classList.remove('active');
        })
        this.classList.add('active');
    });
});
