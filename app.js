const paginationNumber = 6;
let pageCnt = 0, rightArrowCnt = 0;
const key = "ae460827";

let movieList;




window.onload = (event) => {
    let s = localStorage.getItem("movieList")
    movieList = JSON.parse(s)
    if(movieList)
    retriveData();
}


function searchClicked(){
    let s = document.getElementById('searchInput').value.toString().toLowerCase().trim();
    if(s=='') return

    const urlFront = "https://www.omdbapi.com/?s=";
    const urlBack = "&apikey=ae460827"
    const url = urlFront + s + urlBack;

    fetch(url)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        
        localStorage.removeItem('movieList');
        movieList = data.Search;
        localStorage.setItem('movieList', JSON.stringify(movieList));
        let myNode = document.getElementById('list');
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
        retriveData();
    })
    .catch(error=>{
        console.log('error' + error)
    })
}


function retriveData(){
    const list = document.getElementById('list')
    let mainDiv = document.createElement('div')
    mainDiv.classList.add('mainDiv')

    for(let i=pageCnt*paginationNumber; i<(pageCnt+1)*paginationNumber && i<movieList.length; i++){
        let e = movieList[i];
        let anchor = document.createElement('a')
        anchor.setAttribute('id', e.imdbID);
        anchor.setAttribute('taget', '_blank')
        anchor.classList.add('movieCard')
        anchor.setAttribute('href', './movieDetails.html')
        anchor.setAttribute('title', e.Title)

        anchor.addEventListener('click', (e)=>{
            console.log('okk')
            localStorage.setItem('last-clicked-movie', e.target.parentElement.title)
        })
        

        let img = document.createElement('img')
        img.setAttribute('src', e.Poster);
        img.classList.add('moviePoster')

        let title = document.createElement('h3');
        title.classList.add('cardTitle')
        title.textContent = e.Title;

        anchor.appendChild(img);
        anchor.appendChild(title);
        mainDiv.appendChild(anchor)  

    }

    list.appendChild(mainDiv)
}








function leftArrowClicked(e){  
    if(pageCnt > 0) {
        pageCnt -= 1;  
        document.getElementById('pageNo').textContent = "Page " + (pageCnt+1);
        let myNode = document.getElementById('list')
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
        retriveData();
    }
}

function rightArrowClicked(e){
    if((pageCnt+1)*paginationNumber < movieList.length){
        pageCnt += 1;
        document.getElementById('pageNo').textContent = "Page " + (pageCnt+1);
        let myNode = document.getElementById('list')
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
        retriveData();
    }
    
}


