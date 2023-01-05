const mainBtn = document.querySelector(".main-btn")

mainBtn.addEventListener('click', function() {
})

const API_URL = 'https://my.api.mockaroo.com/edi.json?key=953a0b00';
const test_url = 'https://jsonplaceholder.typicode.com/todos/1';

fetch(test_url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // const dataArray = document.getElementById('player-array');
      // data.forEach(datum => {
      //   const div = document.createElement('div');
      //   div.textContent = JSON.stringify(datum);
      //   dataArray.appendChild(div);
      });