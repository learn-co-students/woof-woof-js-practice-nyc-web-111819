document.addEventListener("DOMContentLoaded", function(){

  let dogBar = document.getElementById('dog-bar')
  let dogInfo = document.getElementById('dog-info')
  let filter = document.getElementById('good-dog-filter')
  let toggle = false

  function dogName(dog){
    let span = document.createElement('span')
    span.className = 'dogName'
    span.dataset.id = dog.id
    span.innerHTML = dog.name
    dogBar.append(span)
  }

  function fetchDogs(){
    fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(pups => {
      if (toggle === false) {
        pups.forEach(dogName)
      } else if (toggle === true){
        let filtered = pups.filter(pup => pup.isGoodDog === true)
        console.log(filtered)
        filtered.forEach(dogName)
      }
    })
    .catch(error => {
      alert(error.message)
    })
  }

  fetchDogs()

  function updateDog(id, update) {
    fetch(`http://localhost:3000/pups/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(update)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  function toggleGoodBoy() {
    dogInfo.querySelector('button').addEventListener('click', function(){
      if (event.target.innerText === 'Good Dog!') {
        updateDog(dogInfo.dataset.id, {isGoodDog: false})
        event.target.innerText = 'Bad Dog!'
      } else if (event.target.innerText === 'Bad Dog!') {
        updateDog(dogInfo.dataset.id, {isGoodDog: true})
        event.target.innerText = 'Good Dog!' 
      }
    })
  }

  function pupInfo(pup) {
    let image = document.createElement('img')
    let name = document.createElement('h2')
    let button = document.createElement('button')
    image.src = `${pup.image}`
    name.innerText = pup.name
    if (pup.isGoodDog === true) {
      button.innerText = 'Good Dog!'
    } else {
      button.innerText = 'Bad Dog!'
    }
    while (dogInfo.hasChildNodes()) {  
      dogInfo.removeChild(dogInfo.firstChild);
    }
    dogInfo.dataset.id = pup.id
    dogInfo.append(image)
    dogInfo.append(name)
    dogInfo.append(button)
    toggleGoodBoy()
  }

  function fetchPup(id){
    fetch(`http://localhost:3000/pups/${id}`)
    .then(response => response.json())
    .then(pup => {
      pupInfo(pup)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  dogBar.addEventListener('click', function(){
    if (event.target.className === 'dogName') {
      let id = event.target.dataset.id
      fetchPup(id)
    }
  })

  filter.addEventListener('click', function(){
    if (event.target.innerText === 'Filter good dogs: OFF') {
      while (dogBar.hasChildNodes()) {  
        dogBar.removeChild(dogBar.firstChild);
      }
      toggle = true
      fetchDogs()
      event.target.innerText = 'Filter good dogs: ON'
    } else if (event.target.innerText === 'Filter good dogs: ON'){
      while (dogBar.hasChildNodes()) {  
        dogBar.removeChild(dogBar.firstChild);
      }
      toggle = false
      fetchDogs()
      event.target.innerText = 'Filter good dogs: OFF'
    }
    
  })

})