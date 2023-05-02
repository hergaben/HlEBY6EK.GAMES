// const API_URL = 'https://run.mocky.io/v3/2c9df411-3be2-4ad9-8da2-bd81dde02a09';
const API_URL = 'http://localhost:3000/top';

// Получение данных с помощью REST API
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
    // return data.top;
}

// Получение идентификатора карточки из URL-адреса страницы
function getCardIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cardId = urlParams.get('id');
    return cardId;
}

// Создание HTML-кода для карточки
function createCard(cardData) {
    const cardTemplate = `
    <div class="video">
        <iframe src="${cardData.video}" title="YouTube video player"
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
        </iframe>
    </div>
    
    <div class="text">
        <div class="description">
            <h3>Об игре</h3>
            <p>${cardData.description}</p>
        </div>
    </div>
  `;
    return cardTemplate;
}
// function createBack(backData) {
//     const backTemplate = `
//     body {
//       background-image: url(${backData.background});
//       background-attachment: fixed;
//     }
//   `;
//     return backTemplate;
// }

// function createBack(backData) {
//     const backTemplate = `
//     body {
//       background: linear-gradient(to bottom, rgba(0,0,0,0.6) 140%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.9) 64%), url(${backData.background});
//       background-attachment: fixed;
//     }
//   `;
//     return backTemplate;
// }
function createBack(backData) {
    const backTemplate = `
    body {
      background: radial-gradient(circle at center, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 70%), url(${backData.background});
      background-attachment: fixed;
    }
  `;
    return backTemplate;
}

function createRating(ratingData) {
    let green = '#008000';
    let yellow = '#FFFF00';
    let red = '#FF0000';

    var color = '';

    var x = ratingData.rating;

    if (x >= 8) {
        color = green;
    }
    else if (5 <= x < 8) {
        color = yellow;
    }
    else {
        color = red;
    }

    console.log(color);
    console.log(x);

    const ratingTemplate = `
    <h2 id="h2" style="background: ${color}">${ratingData.rating}</h2>
  `;
    return ratingTemplate;
}

function createTitle(titleData) {
    const titleTemplate = `
    <h1>${titleData.title}</h1>
  `;
    return titleTemplate;
}


// Добавление карточки на страницу
async function displayCard() {
    const cardContainer = document.getElementById('container');
    const backContainer = document.getElementById('background');
    const ratingContainer = document.getElementById('rating');   //new
    const titleContainer = document.getElementById('title');    //new
    const cardId = getCardIdFromUrl();
    const data = await fetchData(`${API_URL}/${cardId}`);
    const card = createCard(data);
    const back = createBack(data);
    const rating = createRating(data);
    const title = createTitle(data);
    cardContainer.innerHTML = card;
    backContainer.innerHTML = back;
    ratingContainer.innerHTML = rating;
    // document.getElementById('h2').style.background = "lightblue";
    titleContainer.innerHTML = title;
}

// Запуск приложения
window.onload = displayCard;