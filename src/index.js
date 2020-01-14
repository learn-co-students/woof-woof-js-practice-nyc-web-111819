const url = "http://localhost:3000/pups/"

document.addEventListener('DOMContentLoaded', function(){
  const dogBar = document.getElementById('dog-bar')
  const dogInfo = document.getElementById('dog-info')
  const dogFilter = document.getElementById('good-dog-filter')
  let filterOn = false
  
  getDogs()

  dogBar.addEventListener('click', function(event){
    // console.log("Click!", event)
    if (event.target.tagName === 'SPAN') {
      const id = event.target.dataset.id
      console.log(id)
      fetch(url + id)
      .then(resp => resp.json())
      .then(dog =>{
        renderDogInfo(dog)
      })
    }
  })

  dogFilter.addEventListener('click', function(event){
    //The button's text should change from "Filter good dogs: OFF" to "Filter good dogs: ON", or vice versa.
    if (!filterOn) {
      filterOn = true
      event.target.innerText = "Filter good dogs: ON"
      // function to set display: none on spans with dataset.isGoodDog === false
      for (const span of dogBar.children) {
        if (span.dataset.isGoodDog === "false") {
          span.style.display = "none"
        } 
      }
      
    } else {
      filterOn = false
      event.target.innerText = "Filter good dogs: OFF"
      // function to set display: flex on spans with dataset.isGoodDog === false
      for (const span of dogBar.children) {
        if (span.dataset.isGoodDog === "false") {
          span.style.display = ""
        }
      }
    }

    // If the button now says "ON"(meaning the filter is on), then the Dog Bar should only show pups whose isGoodDog attribute is true.If the filter is off, the Dog Bar should show all pups(like normal).

  })

  dogInfo.addEventListener('click', function (event) {
    if (event.target.tagName === "BUTTON") {
      let button = event.target
      goodDogHandler(dog, button)
    }
  })

  ////

  function getDogs() {
    fetch(url)
      .then(resp => resp.json())
      .then(dogs => {
        for (const dog of dogs) {
          const span = document.createElement('span')
          span.dataset.id = dog.id
          span.dataset.isGoodDog = dog.isGoodDog
          span.innerText = dog.name
          dogBar.appendChild(span)
        }
      })
  }

  function renderDogInfo(dog){
    dogInfo.innerHTML = `
        <img src="${dog.image}">
        <h2>${dog.name}</h2>
        `
    const button = document.createElement('button')
    button.innerText = setDogButtonText(dog.isGoodDog)
    dogInfo.appendChild(button)
  }

  function setDogButtonText(bool) {
    if (!!bool) {
      return "Good Dog! (for now)"
    } else {
      return "Bad Dog! (for now)"
    }
  }

  function goodDogHandler(dog, button){
    //optimistic render....
    //change isGoodDog locally
    dog.isGoodDog = !(dog.isGoodDog)

    //update innertext
    button.innerText = setDogButtonText(dog.isGoodDog)

    //update dogBar span dataset
    span = dogBar.querySelector(`span[data-id = "${dog.id}"]`)

    if (dog.isGoodDog === false) {
      span.dataset.isGoodDog = "false"
    } else {
      //show the item in the dogBar
      span.dataset.isGoodDog = "true"
    }

    // update dogbar if filter is on
    if (filterOn) {
      if (dog.isGoodDog === false) {
        //hide the item from the dogBar
        span.style.display = "none"
      } else {
        //show the item in the dogBar
        span.style.display = ""
      }
    }

    // create config object for database update
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: dog.isGoodDog
      })
    }

    //update database
    fetch((url + dog.id), configObj)
      .then(resp => resp.json())
      .then(dog => { })
      // .catch(console.warn("Error"))
  }


})
