// const API_URL = 'https://jsonplaceholder.typicode.com/posts';
// const API_URL = 'https://run.mocky.io/v3/2c9df411-3be2-4ad9-8da2-bd81dde02a09';
const API_URL = 'http://localhost:3000/top';

// Получение данных с помощью REST API
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
  // return data.top;
}

// Создание HTML-кода для карточки
function createCard(cardData) {
  const cardTemplate = `
    <div class="card">
        <a href="card.html?id=${cardData.id}" class="s_card">
            <img src="${cardData.image}">
            <div class="container">
                <h4>${cardData.title}</h4>
                <p>${cardData.rating}</p>
            </div>
        </a>
    </div>
  `;
  return cardTemplate;
}
// function createCard(cardData) {
//   const cardTemplate = `
//     <div class="card">
//       <h2>${cardData.title}</h2>
//       <p>${cardData.body}</p>
//     </div>
//   `;
//   return cardTemplate;
// }

// Добавление карточек на страницу
async function displayCards() {
  const cardContainer = document.getElementById('wrapper');
  const data = await fetchData(API_URL);
  const cards = data.map(createCard).join('');
  cardContainer.innerHTML = cards;
}

// Запуск приложения
displayCards();