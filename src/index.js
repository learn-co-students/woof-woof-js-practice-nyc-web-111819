document.addEventListener("DOMContentLoaded", function() {
    function fetchDogs() {
        fetch ("http://localhost:3000/pups")
        .then(function(response) {
            return response.json();
        })
        .then(results => {
            results.forEach(dog => renderDogsNames(dog))
        })
    }
    fetchDogs()

    let dogBar = document.getElementById("dog-bar")

    function renderDogsNames(dog){
        let dogSpan = document.createElement('span')
        dogSpan.innerText = `${dog.name}`
        dogSpan.dataset.id = dog.id
        dogBar.appendChild(dogSpan)
    }

    function fetchDogsInfo(id) {
        fetch (`http://localhost:3000/pups/${id}`)
        .then(function(response) {
            return response.json();
        })
        .then(results => {
            renderDogs(results)
        })
    }

    function renderDogs(dog) {
        let dogInfoDiv = document.getElementById("dog-info")

        while (dogInfoDiv.hasChildNodes()) {
            dogInfoDiv.removeChild(dogInfoDiv.firstChild)
        }

        let dogName = document.createElement('h2')
        let dogImg = document.createElement('img')
        let dogStatus = document.createElement('button')
        
        dogStatus.dataset.id = dog.id
        dogName.innerText = `${dog.name}`
        dogImg.src = `${dog.image}`

        if (dogStatus) {
            dogStatus.innerText = "Good Dog!"
        } else {
            dogStatus.innerText = "Bad Dog!"
        }

        dogInfoDiv.appendChild(dogName)
        dogInfoDiv.appendChild(dogImg)
        dogInfoDiv.appendChild(dogStatus)

        dogStatus.addEventListener("click", function(e) {
            let newValue
            if (e.target.innerText === "Good Dog!") {
                e.target.innerText = "Bad Dog!"
                newValue = false
            } else {
                e.target.innerText = "Good Dog!"
                newValue = true
            }
            // e.target.innerText === "Good Dog!" ? e.target.innerText = "Bad Dog!" : e.target.innerText = "Good Dog!"

            let id = e.target.dataset.id

            fetch(`http://localhost:3000/pups/${id}`, {
                method: "PATCH",
                headers: {
                     "Content-Type": "application/json",
                Accept: "application/json"
                    },
                    body: JSON.stringify({isGoodDog: newValue})
            })

        })
    }

    dogBar.addEventListener("click", function(e){
        fetchDogsInfo(e.target.dataset.id)
    })

    let dogFilterButton = document.getElementById("good-dog-filter")

    dogFilterButton.addEventListener("click", function(e){

        if (e.target.innerText === "Filter good dogs: OFF") {
            e.target.innerText = "Filter good dogs: ON"
        } else {
            e.target.innerText = "Filter good dogs: OFF"
        }

        if (e.target.innerText === "Filter good dogs: ON") {
            while (dogBar.hasChildNodes()) {
                dogBar.removeChild(dogBar.firstChild)
            }} else {
            while (dogBar.hasChildNodes()) {
                dogBar.removeChild(dogBar.firstChild)
            }
            fetchDogs() }
       

        function renderGoodBoys(dog){
            if (dog.isGoodDog) {
                let dogSpan = document.createElement('span')
                dogSpan.innerText = `${dog.name}`
                dogBar.appendChild(dogSpan)
            }
        }
        fetchDogHeaderInfo()

        function fetchDogHeaderInfo() {
            fetch (`http://localhost:3000/pups/`)
            .then(function(response) {
                return response.json();
            })
            .then(results => {
                results.forEach(dog => renderGoodBoys(dog))
            })
        }
       
    })

})
