$(document).ready(function () {
    let listOfResults = null;
    let recImg = [
        {
            name: "hero",
            id: 52535
        },
        {
            name: "river raid",
            id: 52576
        },
        {
            name: "asteroids",
            id: 52394
        },
        {
            name: "battlezone",
            id: 59123
        },
        {
            name: "missile command",
            id: 52436
        },
        {
            name: "yar's revenge",
            id: 52474
        },
        {
            name: "kaboom",
            id: 52540
        },
        {
            name: "joust",
            id: 28279
        },
        {
            name: "starmaster",
            id: 52598
        },
        {
            name: "warlords",
            id: 52476
        },
        {
            name: "pitfall",
            id: 52563
        },
        {
            name: "berzerk",
            id: 52398
        }
    ]
    randoRec(); 
    //randomizes recImg, and then chooses three games to display, saving the responses object of the three games to corresponding place in recImg
    function randoRec(){
        let temp;
        let num;
        for(let i = 0; i < 3; i++){
            num = Math.floor(Math.random()*(recImg.length))
            temp = recImg[i];
            recImg[i] = recImg[num];
            recImg[num] = temp;
        }
        for(let i=0; i < 3; i++){
            let img = $('<img>');
            let title = $('<p>');
            let span = $('<span>')
            let name = recImg[i].name;
            
            let queryUrl = `https://rawg.io/api/games?search=${name}&platforms=23`;

            $.ajax({
                url: queryUrl,
                method: 'GET'
            }).then(function(response){
                let array = response.results;
                recImg[i].object = array;
                let thumbnail = response.results[0].background_image;
                img.attr({
                    'src': thumbnail,
                    'class': 'image thumbnail',
                    'alt': name
                })
                title.text(array[0].name);
                $(span).append(title, img);
                $('#recommend').append(span);
            })
        }
    
    }
    //displays the additional information for the clicked recommended game(additional images, videos, description, release date and devs)
    $('body').on('click','.recommend', function(){
        let game = $(this).attr(alt);
        let queryUrl = `https://rawg.io/api/games?search=${game}&platforms=23`;

        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(response){
            printMoreInfo(game);
        })
    })
    
    //This will search for the game name and a platfrom that the user submits, and append results to the page
    $('#search').on('submit', function (e) {
        e.preventDefault();
        let game = $('#game').val().trim();
        //if there is no input it will not search
        if (game == '') {
            return;
        }
        printGames(game);
    })

    //this will allow a user to click one of the images, searching the youtube API
    //user might get ERR_BLOCKED_BY_CLIENT if they have an adblocker
    $('body').on('click', '.thumbnail', function () {
        console.log($(this).attr('alt'));
        let game = $(this).attr('alt');
        printMoreInfo(game);
    })

    //this will append the additional images and the 5 youtube video results of the game to the page
    function printMoreInfo(game) {
        let queryUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAnOFnUw0G81BnJj2mpFBAbBe8QStxPUzs&part=snippet&q=${game}+atari+2600`;
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function (response) {
            let info = $('#info');
            //clears previous click's results
            info.empty();
            let picDiv = $('<div>');
            picDiv.attr('class', 'screenshots');
            let picArray;
            let gameId;
            let videos = $('<div>').attr('class', 'videos');
            // adds additional screenshots of the game if clicked from the recommended games
            if(listOfResults == null){
                for(let i = 0; i < recImg.length; i++){
                    if(recImg[i].name == game){
                        gameId = recImg[i].id;
                        picArray = recImg[i].object[0].short_screenshots;
                    }
                }
            }
            // adds additional screenshots of the game if clicked from the results from the search
            else{
                for (let i = 0; i < listOfResults.length; i++) {
                    // console.log(listOfResults[0].name, game)
                    if (listOfResults[i].name == game) {
                        gameId = listOfResults[i].id;
                        picArray = listOfResults[i].short_screenshots;
                    }
                }
            }

            let num = 6;
            //sets the number of images to fit the number in the array or keeps the max at 5
            if (picArray.length < num) {
                num = picArray.length - 1;
            }
            //appends the 5 or less images after the thumbnail image(index 0)
            for (let j = 1; j < num; j++) {
                let screenshot = $('<img>');
                screenshot.attr({
                    'src': picArray[j].image,
                    'class': 'image screenshot'
                });
                picDiv.append(screenshot);
            }
            info.append(picDiv);
            //appends the 5 videos to the page
            for (let i = 0; i < response.items.length; i++) {
                let videoUrl = `https://www.youtube.com/embed/${response.items[i].id.videoId}`;
                let video = $('<iframe allowFullScreen>');
                video.attr({
                    'src': videoUrl,
                    'height': 250,
                    'width':500
                    });
                videos.append(video);
            }
            info.append(videos);

            let queryUrl = `https://api.rawg.io/api/games/${gameId}`
            $.ajax({
                url: queryUrl,
                method: 'GET'
            }).then(function (response) {
                console.log(response);
                let date = new Date(response.released);
                let getYear = date.getFullYear();
                
                let year = $('<p>');
                year.text(`Released: ${getYear}`);
                
                let dev = $('<p>');
                dev.text(`Developers: ${response.developers[0].name}`);

                response.description_raw;
                let description = $('<div>')
                description.text(response.description_raw);
                description.attr('id', 'desc')
                $('#info').append(year, dev, description);
            })
            $('.boxdescription').css('height', 'auto');
        })
    }

    //This will append the game name and the image to the page
    function printGames(game) {
        let queryUrl = `https://rawg.io/api/games?search=${game}&platforms=23`;
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            let p = $('#results');
            p.empty();
            $('#info').empty();
            let array = response.results;
            for (let i = 0; i < array.length; i++) {
                let span = $('<span>');
                let name = $('<div>').text(array[i].name).attr('class','name');
                let image = $('<img>').attr({
                    'class': 'image thumbnail',
                    'src': array[i].background_image,
                    'alt': array[i].name
                });
                span.append(name, image);
                p.append(span);
            }
            listOfResults = response.results;
        })
        $('.boxdescription').css('height', '350px');

    }
})
