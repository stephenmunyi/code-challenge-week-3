// WRITE TOUR CODE HERE
const url = 'http://localhost:3000/films'

fetch(url,{
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }
})

.then((response) => response.json())
.then((data) => {


    const movieTitle= document.querySelector('#films')
    movieTitle.innerHTML = ''
    data.forEach((title,index) => {
        const movieTitleList = document.createElement('li')
        movieTitleList.innerText = title.title

      
       let  deleteFilm = document.createElement('button')
       deleteFilm.innerText =  'Delete'
       deleteFilm.addEventListener('click', () =>{
         deleteMovie(title.id)
         movieTitleList.remove()
       })
       movieTitleList.appendChild(deleteFilm)


     function deleteMovie(id){
        fetch (`${url}/${id}`,{
        method: 'DELETE'
       })
       .then(response => {
        if(response.ok){
           
            alert ('MOVIE DELETED')
        }
        else{
            alert('ERROR DELETING')
        }
 
       })
     }



        movieTitleList.addEventListener('click', () =>{
          showTitleInfo(title)
        })
        
        movieTitle.append(movieTitleList)
    
        if(index===0){
            showTitleInfo(title)
        }
    });
})


function showTitleInfo(title){
  document.querySelector('#title').innerText = title.title
  document.querySelector('#runtime').innerText = title.runtime
  document.querySelector('#film-info').innerText = title.description
  document.querySelector('#showtime').innerText = title.showtime
  document.querySelector('#ticket-num').innerText = `${title.capacity - title.tickets_sold}`
  document.querySelector('#poster').src = title.poster
}


 document.querySelector('#buy-ticket').addEventListener('click',() =>{
    let allAvailableTickets = document.querySelector('#ticket-num');
    let availableTickets = parseInt(allAvailableTickets.textContent);
 
        if(!isNaN(availableTickets) && availableTickets > 0){
            availableTickets--;
            allAvailableTickets.innerText = availableTickets;

            document.querySelector('#buy-ticket').innerText  ='Buy Tickets'
            
        }
      if(availableTickets===0){
        alert("SOLD OUT");
         document.querySelector('#buy-ticket').innerText= 'Sold Out';
      
       
        
      
          }

        });
        

