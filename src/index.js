// write your code here
const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetail = document.querySelector('#ramen-detail')
const form = document.querySelector('#ramen-rating')
const newForm = document.querySelector("#new-ramen")
const deleteBtn = document.querySelector('#delete-button')


function getAllRamen(){
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramen => {
        ramen.forEach(element => {
        displayRamen(element)
    })  
    displayDetails(ramen[0])
    }
    )
    
}
function displayRamen(ramen){
    let image = document.createElement('img')
    image.src = ramen.image
    image.alt = ramen.name
    image.dataset.id = ramen.id

    ramenMenu.append(image)
}


function getDetails(e){  
    
    fetch(`http://localhost:3000/ramens/${e.target.dataset.id}`)
        .then(res => res.json())
        .then(displayDetails)  
}

function displayDetails(ramen){

    /////////// update details //////////////////
    ramenDetail.dataset.id = ramen.id
    ramenDetail.children[0].src = ramen.image
    ramenDetail.children[0].alt = ramen.name
    ramenDetail.children[1].textContent = ramen.name
    ramenDetail.children[2].textContent = ramen.restaurant

    //////////// update form /////////////////////

    form.dataset.id = ramen.id
    form.rating.value = ramen.rating
    form.comment.value = ramen.comment
}



function updateRating(e){
    e.preventDefault()
    if(isNaN(e.target.dataset.id)) {
        alert('Please select a ramen to update')
    }else{
        
        let rating = e.target.rating.value
        let comment = e.target.comment.value
        
        let newInfo = {rating, comment}
        fetch(`http://localhost:3000/ramens/${e.target.dataset.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newInfo)
        })
        
        alert("Your feedback has been updated!")
    }
    
}

function newRamen(e){
    e.preventDefault()
    
    
    let name = e.target.name.value
    let restaurant = e.target.restaurant.value
    let image = e.target.image.value
    let rating = e.target.rating.value
    let comment = e.target.comment.value

    let ramenObj = {name, restaurant, image, rating, comment}

    fetch('http://localhost:3000/ramens',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ramenObj)
    })
    .then(res => res.json())
    .then(ramen =>{
        displayRamen(ramen)
        displayDetails(ramen)

    })

    e.target.reset()
}

function deleteRamen(e){
    
    let ramenId = e.target.parentElement.dataset.id
    fetch(`http://localhost:3000/ramens/${ramenId}`,{
            method: "DELETE"
        })
        let img = ramenMenu.querySelector(`[data-id='${ramenId}']`)
        img.remove()
        
        if(ramenId === 1){
            e.target.dataset.id = 2
        }else{
            e.target.dataset.id = 1
        }
        
        getDetails(e)

}
    


deleteBtn.addEventListener('click', deleteRamen)
newForm.addEventListener('submit', newRamen)
ramenMenu.addEventListener('click', getDetails)
form.addEventListener('submit', updateRating)
getAllRamen()