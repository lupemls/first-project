    
   // Updated site for atari 2600 search
   $(document).ready(function () {
    let listOfResults;
    let recImg = [
        {
            src: "assets/hero.jpg", 
            name: "hero",
            id: 52535,
            screenArr:['assets/hero/1.jpg','assets/hero/2.jpg','assets/hero/3.jpg','assets/hero/4.jpg'

            ]    
        },
        {
            src: "assets/riverraid.jpg", 
            name: "river raid",
            id: 52576,
            screenArr:['assets/riverraid/1.jpg','assets/riverraid/2.jpg','assets/riverraid/3.jpg','assets/riverraid/4.jpg'

            ]
        },
        {
            src: "assets/asteroids.jpg", 
            name: "asteroids",
            id: 52394,
            screenArr:['asstets/asteroids/1.jpg','asstets/asteroids/2.jpg','asstets/asteroids/3.jpg','asstets/asteroids/4.jpg'

            ]
        },
        {
            src: "assets/battlezone.jpg", 
            name: "battlezone",
            id: 59123,
            screenArr:['assets/battlezone/1.jpg','assets/battlezone/2.jpg','assets/battlezone/3.jpg','assets/battlezone/4.jpg'

            ]
        },
        {
            src: "assets/missilecommand.jpg", 
            name: "missile command",
            id: 52436,
            screenArr:['assets/missilecommand/1.jpg','assets/missilecommand/2.jpg','assets/missilecommand/3.jpg','assets/missilecommand/4.jpg'

            ]
        },
        {
            src: "assets/yarsrevenge.jpg", 
            name: "yar's revenge",
            id: 52474,
            screenArr:['assets/yarsrevenge/1.jpg','assets/yarsrevenge/2.jpg','assets/yarsrevenge/3.jpg','assets/yarsrevenge/4.jpg'

            ]
        },
        {
            src: "assets/kaboom.jpg", 
            name: "kaboom",
            id: 52540,
            screenArr:['assets/kaboom/1.jpg','assets/kaboom/2.jpg','assets/kaboom/3.jpg','assets/kaboom/4.jpg'

            ]
        },
        {
            src: "assets/joust.jpg", 
            name: "joust",
            id: 28279,
            screenArr:['assets/joust/1.jpg','assets/joust/2.jpg','assets/joust/3.jpg','assets/joust/4.jpg'

            ]
        },
        {
            src: "assets/starmaster.jpg", 
            name: "starmaster",
            id: 52598,
            screenArr:['assets/starmaster/1.jpg','assets/starmaster/2.jpg','assets/starmaster/3.jpg','assets/starmaster/4.jpg'

            ]
        },
        {
            src: "assets/warlords.jpg", 
            name: "warlords",
            id: 52476,
            screenArr:['assets/warlords/1.jpg','assets/warlords/2.jpg','assets/warlords/3.jpg','assets/warlords/4.jpg'

            ]
        },
        {
            src: "assets/pitfall.jpg", 
            name: "pitfall",
            id: 52563,
            screenArr:['assets/pitfall/1.jpg','assets/pitfall/2.jpg','assets/pitfall/3.jpg','assets/pitfall/4.jpg'

            ]
        },
        {
            src: "assets/berzerk.jpg", 
            name: "berzerk",
            id: 52398,
            screenArr:['assets/berzerk/1.jpg','assets/berzerk/2.jpg','assets/berzerk/3.jpg'

            ]
        },
    ]
    
    function randoRec(){
       for(i=0; i < 3; i++){
        let randoIndex = Math.floor(Math.random()*(recImg.length))
            let rec = $('<img>');
            rec.addClass('image recommend')
            rec.attr({'src': recImg[randoIndex].src,
                    'alt': recImg[randoIndex].name,
                     
                });
            let title = $('<p>');
            title.text(recImg[randoIndex].name);
            
            $('#recommend').append(rec, title);
            recImg.splice(randoIndex, 1);
            
        }
    
    }
    randoRec()        
    $('body').on('click','.recommend', function(){
        let game = $(this).name
        let queryUrl = `https://rawg.io/api/games?search=${game}&platforms=23`;

        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(response){
            // printGames(response);
            listOfResults = response.results;
        })

    })
    

    //This will search for the game name and a platfrom that the user submits, and append results to the page
    $('#search').on('submit', function (e) {
        e.preventDefault();
        let game = $('#game').val();

        //if there is no input it will not search
        if(game == ""){
            return;
        }
        let queryUrl = `https://rawg.io/api/games?search=${game}&platforms=23`;

        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(response){
            printGames(response);
            listOfResults = response.results;
            let queryUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCBZbc5OhnbOKL7oKitbYrGa0F6_P5kLQU&part=snippet&q=${game}+atari+2600`;
            
            $.ajax({
                url: queryUrl,
                method:'GET'
            }).then(function(response) {
                console.log(response)
                printMoreInfo(game, response);
            })
        })
    })

    //this will allow a user to click one of the images, searching the youtube API
    //user might get ERR_BLOCKED_BY_CLIENT if they have an adblocker
    $('body').on('click','.image', function(){
        console.log($(this).attr('alt'));
        let game = $(this).attr('alt');

        // if($(this).attr('starter') === 'true') {
        //     let starterUrl = `https://rawg.io/api/games?search=${game}&platforms=23`;

        //     $.ajax({
        //         url: starterUrl,
        //         method: 'GET'
        //     }).then(function(response){
        //         printGames(response);
        //         listOfResults = response.results;
        //         return listOfResults;
        //     }).then(function(response){
        //         let queryUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCBZbc5OhnbOKL7oKitbYrGa0F6_P5kLQU&part=snippet&q=${game}+atari+2600`;
        
        //         $.ajax({
        //             url: queryUrl,
        //             method:'GET'
        //         }).then(function(response) {
        //             console.log(response)
        //             printMoreInfo(game, response);
        //         })
        //     })
        //  else {
            let queryUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCBZbc5OhnbOKL7oKitbYrGa0F6_P5kLQU&part=snippet&q=${game}+atari+2600`;
            
            $.ajax({
                url: queryUrl,
                method:'GET'
            }).then(function(response) {
                console.log(response)
                printMoreInfo(game, response);
            })
        })
    
        // })

    //this will append the additional images and the 5 youtube video results of the game to the page
    function printMoreInfo(game, response){
        let info = $('#info');
        //clears previous click's results
        info.empty();
        let picDiv = $('<div>');
        picDiv.attr('class', 'screenshots')
        let picArray;
        let gameId;
        // adds additional screenshots of the game
        for(let i = 0; i < listOfResults.length; i++){
            console.log(listOfResults[0].name, game)
            if(listOfResults[i].name == game){
                gameId = listOfResults[i].id;
                picArray = listOfResults[i].
                ;                
            } 
        }
        let num = 6;
        //sets the number of images to fit the number in the array or keeps the max at 5
        if(picArray.length < num){
            num = picArray.length - 1;
        }

        //appends the 5 or less images after the thumbnail image(index 0)
        for(let j = 1; j < num; j++){
            let screenshot = $('<img>');
            screenshot.attr({
                'src': picArray[j].image,
                'class': 'screenshot'
            });
            picDiv.append(screenshot);
        }
        info.append(picDiv);
        //appends the 5 videos to the page
        for(let i = 0; i < response.items.length; i++){
            let videoUrl = `https://www.youtube.com/embed/${response.items[i].id.videoId}`;
            let video = $('<iframe allowFullScreen>');
            video.attr('src', videoUrl);
            info.append(video);
        }
        let queryUrl = `https://api.rawg.io/api/games/${gameId}`
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            let date = new Date(response.released);
            let getYear = date.getFullYear();
            
            let year = $('<p>');
            year.text("Released: "+getYear);
            $('#year').append(year);
            
            let dev = $('<p>');
            dev.text("Developers: "+response.developers[0].name);
            $("#dev").append(dev);
            let description = $('<p>');
            description.text(response.description_raw);
            description.attr('id', 'desc')
            $('#description').append(description);
        })
    }

    //This will append the game name and the image to the page
    function printGames(response){
        console.log(response);
        let p = $('#gameRes');
        p.empty();
        $('#info').empty();
        let array = response.results;
    
        for(let i = 0; i<array.length; i++){
            let name = $('<div>').text(array[i].name)
            let image = $('<img>').attr({
                'class': 'image',
                'src': array[i].background_image,
                'alt': array[i].name,
                'id': array[i].id
            });
            p.append(name, image);
        }
    }

})
