const select = document.getElementById('breeds');
const card = document.querySelector('.card');

// Creating a list of options
fetch('https://dog.ceo/api/breeds/list')
  .then(response => response.json())
  .then(data => generateOptions(data.message));

const generateOptions = (data) => {
  const options = data.map(option => `
    <option value=${option}> ${option} </option>
    `).join('');
    select.innerHTML = options;
}

// Generating an image according to a selected option
fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json())
  .then(data => generateImage(data.message))

const fetchImage = () => {
  const breed = select.value;
  const img = card.querySelector('img');

  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(data => {
      img.src = data.message;
      img.alt = breed;
    });
}

const generateImage = (data) => {
  const image = `
  <img src='${data}' alt='This is a dog
  breed called ${select.value}'/>
  `;
  card.innerHTML = image;
}

// Event listeners
select.addEventListener('change', fetchImage);
card.addEventListener('click', fetchImage);
