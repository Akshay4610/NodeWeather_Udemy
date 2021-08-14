console.log("Client side javascript file is printed");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageError = document.querySelector('#message-error');
const messageData = document.querySelector('#message-data');
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageData.textContent = '';  
          messageError.textContent = data.error;
          return; 
        }
        messageError.textContent = '';
        messageData.textContent = JSON.stringify(data);
      });
    }
  );
});
