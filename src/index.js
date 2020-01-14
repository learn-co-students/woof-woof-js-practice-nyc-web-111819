document.addEventListener('DOMContentLoaded', (event) =>{
    function render(id){
        let container = document.getElementById('dog-bar')
        while(container.firstChild){
            container.removeChild(container.firstChild)
        }
        if(id === ''){
            fetch('http://localhost:3000/pups',{
                method: 'GET'
            })
            .then(response => {
                return response.json()
            })
            .then(json => {
                json.forEach(element =>{
                    let spahn = document.createElement('span')
                    spahn.innerText = element.name
                    container.appendChild(spahn)
                })
            })
        } else {
            let bool = true
            if(id == "Filter good dogs: ON"){
                bool = true
            } else {
                bool = false
            }
            fetch('http://localhost:3000/pups',{
                method: 'GET'
            })
            .then(response => {
                return response.json()
            })
            .then(json => {
                json.filter(element => {
                    return element.isGoodDog === bool
                }).forEach(element =>{
                    let spahn = document.createElement('span')
                    spahn.innerText = element.name
                    container.appendChild(spahn)
                })
            })
        }
    }
    render('')
    document.addEventListener('click',event => {
        if(event.target.id === "good-dog-filter"){
            if(event.target.innerText === 'Filter good dogs: OFF'){
                event.target.innerText = "Filter good dogs: ON"
                render(event.target.innerText)
            } else {
                event.target.innerText = "Filter good dogs: OFF"
                render(event.target.innerText)
            }
        }
        if(event.target.id === "true" || event.target.id === "false"){
            let bool = true
            if(event.target.id == "true"){
                bool = true
            } else {
                bool = false
            }
            let id = event.target.parentNode.id
            fetch(`http://localhost:3000/pups/${id}`,{
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: 'PATCH',
                body: JSON.stringify({
                    isGoodDog: bool
                })
            })
            if(event.target.id === "true"){
                event.target.id = "false"
                event.target.innerText = "Bad Dog!"
            } else {
                event.target.id = "true"
                event.target.innerText = "Good Dog!"
            }
        }
        if(event.target.parentNode.id == 'dog-bar'){
            let singleDog = document.getElementById('dog-info')
            while(singleDog.firstChild){
                singleDog.removeChild(singleDog.firstChild)
            }
            fetch('http://localhost:3000/pups',{
                method: 'GET'
            })
            .then(response => {
                return response.json()
            })
            .then(json => {
                let thing = json.find(element => element.name === event.target.innerText)
                let dihv = document.createElement('div')
                dihv.id = thing.id
                let ihmg = document.createElement('img')
                ihmg.src = thing.image
                let aech2 = document.createElement('h2')
                let buhton = document.createElement('button')
                buhton.id = 'dog-button'
                if(thing.isGoodDog === true){
                    buhton.id = 'true'
                    buhton.innerText = "Good Dog!"
                } else {
                    buhton.id = 'false'
                    buhton.innerText = "Bad Dog!"
                }
                aech2.innerText = thing.name
                singleDog.appendChild(dihv)
                dihv.appendChild(ihmg)
                dihv.appendChild(aech2)
                dihv.appendChild(buhton)
            })
        }
    })
})