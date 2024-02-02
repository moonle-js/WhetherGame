// Car obyekti yaradiram ki gelecekde bunun pozisiyasini rahatliqla deyisdire bilim
var carAndCommentObj = {
    path: document.querySelector('#carAndComment'),
    top: 0,
    left: 0,

    setPlaceForCar: function (){
        this.path.style.top = `${this.top}%`
        this.path.style.left = `${this.left}%`
    }
}

// Commentariyani saliram obyekte ki sonradan deyisiklikler ede bilim
var commentObj = {
    path: document.querySelector('#comment'),
    
    showComment: function(){
        if(carAndCommentObj.top == 0 && carAndCommentObj.left == 0){
            this.path.style.display = "none"
        }else{
            this.path.style.display = "flex"
        }
    }
}

var startObj = {
    id: 'start',
    path: document.querySelector("#start")
}

// Baku city
var baku = {
    id: 'baku',
    path: document.querySelector('#baku'),
    top: 10,
    left: 40,

    setPlace: function(){
        this.path.style.top = `${this.top}%`
        this.path.style.left = `${this.left}%`
    }
}

// London city
var london = {
    id: 'london',
    path: document.querySelector('#london'),
    top: 60,
    left: 60,

    setPlace: function(){
        this.path.style.top = `${this.top}%`
        this.path.style.left = `${this.left}%`
    }
}

// Baku city
var moscow = {
    id: 'moscow',
    path: document.querySelector('#moscow'),
    top: 10,
    left: 70,

    setPlace: function(){
        this.path.style.top = `${this.top}%`
        this.path.style.left = `${this.left}%`
    }
}

// Baku city
var shaki = {
    id: 'shaki',
    path: document.querySelector('#shaki'),
    top: 50,
    left: 30,

    setPlace: function(){
        this.path.style.top = `${this.top}%`
        this.path.style.left = `${this.left}%`
    }
}



// Addin all the cities to array for future usage (hansi elementdi deye tapmaq ucun)
var cities = [baku, shaki, london, moscow]




// Standart functions when onload
carAndCommentObj.setPlaceForCar();
baku.setPlace();
london.setPlace();
moscow.setPlace();
shaki.setPlace();



document.querySelectorAll('.cityBlock')
        .forEach(function(block){
            block.addEventListener('click', function(){

                for(let i in cities){
                    if(cities[i].id == block.id){
                        carAndCommentObj.top = cities[i].top + 5
                        carAndCommentObj.left = cities[i].left - 5
                        carAndCommentObj.setPlaceForCar();
                        commentObj.showComment();
                    }
                }


                fetch(`https://api.openweathermap.org/data/2.5/weather?&appid=00515cd91cf4d63f75d631d7dd68ded4&q=${block.id}`)
                .then(data => data.json())
                .then(data => {
                    comment.innerHTML = `${data.weather[0].main}`;
                    setTimeout(function(){
                        comment.innerHTML = `Temperature =  ${(data.main.temp-273).toFixed(2)} C`
                    },2000)
                    setTimeout(function(){
                        comment.innerHTML = "Humidity = " + data.main.humidity + "%"
                    },4000)
                }
                    )

                
            })
        })
    
document.querySelector('#start').addEventListener('click', function(){
    carAndCommentObj.top = 0
    carAndCommentObj.left = 0
    carAndCommentObj.setPlaceForCar();
    commentObj.showComment();

})



// Showing navbar
var navStatus = 0;
document.querySelector('#showNav').addEventListener('click', function(){
    if(navStatus == 0){
        document.querySelector('section').style.width = "60%"
        document.querySelector('section').style.left = "0%"
        document.querySelector('#navbar').style.width = '40%'
        document.querySelector('#showNav').style.right = '40%'
        document.querySelector("#navbar").innerHTML = `
        <form action="">
            <input id="cityName" placeholder="Add name of City you want to view" type="text">
            <button id="formSubmit">Submit</button>
        </form>
        <div id="cityInfo"></div>
        `



        document.querySelector('#formSubmit').addEventListener('click', function(e){
            console.log('true')
            e.preventDefault();
            fetch(`https://api.openweathermap.org/data/2.5/weather?&appid=00515cd91cf4d63f75d631d7dd68ded4&q=${document.querySelector('#cityName').value}`).then(response => response.json()).then(data => {
                
            if(data.weather[0].main == "Clouds"){
                document.querySelector('#cityInfo').innerHTML = `<img class="searchResult" src="./assets/images/clouds.svg">`
            }else if(data.weather[0].main == "Clear"){
                document.querySelector('#cityInfo').innerHTML = `<img class="searchResult" src="./assets/images/sun.svg">`
            }
            document.querySelector("#cityInfo").innerHTML += `<span>Temperature: ${(data.main.temp-273).toFixed(2)}</span>`
        })
        })


        navStatus = 1;

    }else{
        document.querySelector('section').style.width = "100%"
        document.querySelector('#navbar').style.width = '0%'
        document.querySelector('#showNav').style.right = '0%'
        document.querySelector("#navbar").innerHTML = ``
        navStatus = 0;
    }
})



// Form input clicker

