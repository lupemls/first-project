// Updated site for atari 2600 search
$(document).ready(function () {
    let listOfResults;

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
        })
    })

    //this will allow a user to click one of the images, searching the youtube API
    //user might get ERR_BLOCKED_BY_CLIENT if they have an adblocker
    $('body').on('click','.image', function(){
        console.log($(this).attr('alt'));
        let game = $(this).attr('alt');
        let queryUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCBZbc5OhnbOKL7oKitbYrGa0F6_P5kLQU&part=snippet&q=${game}+atari+2600`;
        
        $.ajax({
            url: queryUrl,
            method:'GET'
        }).then(function(response) {
            printMoreInfo(game, response);
        })
    })

    //this will append the additional images and the 5 youtube video results of the game to the page
    function printMoreInfo(game, response){
        let info = $('#info');
        //clears previous click's results
        info.empty();
        let picDiv = $('<div>');
        picDiv.attr('class', 'screenshots')
        let picArray;
        // adds additional screenshots of the game
        for(let i = 0; i < listOfResults.length; i++){
            console.log(listOfResults[0].name, game)
            if(listOfResults[i].name == game){
                picArray = listOfResults[i].short_screenshots;                
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
    }

    //This will append the game name and the image to the page
    function printGames(response){
        console.log(response);
        let p = $('p');
        p.empty();
        $('#info').empty();
        let array = response.results;
    
        for(let i = 0; i<array.length; i++){
            let name = $('<div>').text(array[i].name)
            let image = $('<img>').attr({
                'class': 'image',
                'src': array[i].background_image,
                'alt': array[i].name
            });
            p.append(name, image);
        }
    }

})

