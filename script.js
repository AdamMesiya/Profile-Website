document.addEventListener('DOMContentLoaded', function() {

  const firebaseConfig = {
    apiKey: "AIzaSyB5zxhCYFz4gnYz7jhrQxflU-Msl90bBfY",
  authDomain: "profileapp-bbad5.firebaseapp.com",
  databaseURL: "https://profileapp-bbad5-default-rtdb.firebaseio.com",
  projectId: "profileapp-bbad5",
  storageBucket: "profileapp-bbad5.appspot.com",
  messagingSenderId: "85760187519",
  appId: "1:85760187519:web:fa330c41b7f328fdeab34a",
  measurementId: "G-MZWN2Y5LNL"
  };
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();

  function displayData(data) {
    let dataFormatted = "";

    for (let key in data) {
      if (typeof data[key] === 'object') {
        dataFormatted += `${key}:<br/>`;
        for (let property in data[key]) {
          if (property === 'image') {
            dataFormatted += `Image: <img src="${data[key][property]}" alt="Data Image" style="width: 100px; height: 100px; object-fit: cover;">`;
          } else {
            dataFormatted += `<p>*  ${property}: ${data[key][property]}</p>`;
          }
        }
      } else {
        dataFormatted += `${key}: ${data[key]}\n`;
      }
    }
    console.log(dataFormatted);
    document.getElementById("data").innerHTML = dataFormatted;
  }

  function fetchData(path) {
    const ref = database.ref(path);
    ref.once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        displayData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        data.innerText = "Error fetching data";
      });
  }

  fetchData("/");

  
});
