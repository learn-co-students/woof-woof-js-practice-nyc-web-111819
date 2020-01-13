document.addEventListener('DOMContentLoaded', function(){
    let dogUrl = `http://localhost:3000/pups`
    let dogDiv = document.getElementById('dog-bar')
    let infoDiv = document.getElementById('dog-info')

    fetchDogs()

    function fetchDogs() {
        fetch(dogUrl).then(resp => resp.json())
        .then(result => result.forEach(dog => renderDog(dog)))
    }

    function fetchInfo(id) {
        fetch(dogUrl + `/${id}`).then(resp => resp.json())
        .then(dog => renderInfo(dog)) 
    }

    function updateDogStatus (id, goodOrBad) {
        fetch(dogUrl + `/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify({isGoodDog: goodOrBad})
        })
    }

    function renderDog(dog) {
        dogSpan = document.createElement('span')
        dogSpan.innerText = dog.name
        dogSpan.dataset.id = dog.id
        dogDiv.appendChild(dogSpan)
    }

    function goodDogBadDog(e){
        let goodOrBad
        if (e.target.innerText === 'Good Dog!') {
            e.target.innerText = 'Bad Dog!'
            goodOrBad = false 
            updateDogStatus(e.target.dataset.id, goodOrBad)
        } else { e.target.innerText = 'Good Dog!'
            goodOrBad = true
            updateDogStatus(e.target.dataset.id, goodOrBad)
        }

    }

    function renderInfo(dog) {
        while (infoDiv.hasChildNodes()) {
            infoDiv.removeChild(infoDiv.firstChild)
        }
        let dogImg = document.createElement('img')
        let dogName = document.createElement('h2')
        let dogButton = document.createElement('button')
        dogImg.src = dog.image
        dogName.innerText = dog.name
        dogButton.dataset.id = dog.id
        if (dog.isGoodDog) {
            dogButton.innerText = "Good Dog!"
        } else {dogButton.innerText = "Bad Dog!"}

        infoDiv.appendChild(dogImg)
        infoDiv.appendChild(dogName)
        infoDiv.appendChild(dogButton)

        dogButton.addEventListener('click', function(e){
            goodDogBadDog(e)
        })
    }

    dogDiv.addEventListener('click', function(e){
        fetchInfo(e.target.dataset.id)
    })





})