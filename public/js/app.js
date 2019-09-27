fetch('http://puzzle.mead.io/puzzle').then(response => {
  console.log(
    response.json().then(data => {
      console.log(data);
    })
  );
});
const latitude = -71.0596;
const longitude = 42.3605;

const weatherform = document.querySelector('form');
const search = document.querySelector('input');

const paraOne = document.getElementById('message');
const success = document.getElementById('success');

weatherform.addEventListener('submit', e => {
  paraOne.textContent = 'Loading.....';
  success.textContent = '';
  e.preventDefault();
  const location = search.value;

  fetch(`http://localhost:3000/weather?adress=${location}`).then(response => {
    console.log(
      response.json().then(data => {
        if (data.error) {
          paraOne.textContent = data.error;
        } else {
          paraOne.textContent = '';
          success.textContent = `At ${data.location} it is expected to be ${data.foreCastData.message}`;
        }
      })
    );
  });
});
