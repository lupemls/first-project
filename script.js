$(document).ready(function () {
    //This will search for the game name and a platfrom that the user submits, and append results to the page
    $('#search').on('submit', function (e) {
        e.preventDefault();
        let platform = platformSearcher();

        let game = $('#game').val();
        let queryUrl = 'https://rawg.io/api/games';
        if(game == null){
            return;
        }else if(platform == null){
            queryUrl = `${queryUrl}?search=${game}`
        }else{
            queryUrl = `https://rawg.io/api/games?search=${game}&parent_platforms=${platform}`;
        }
        // console.log(queryUrl);

        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(response){
            printGames(response);
        })
    })

    //this will allow a user to click one of the images, searching the youtube API
    //user might get ERR_BLOCKED_BY_CLIENT if they have an adblocker
    $('body').on('click','.image', function(){
        console.log($(this).attr('alt'));
        let game = $(this).attr('alt');
        let queryUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAnOFnUw0G81BnJj2mpFBAbBe8QStxPUzs&part=snippet&q=${game}`;
        $.ajax({
            url: queryUrl,
            method:'GET'
        }).then(function(response) {
            // console.log(response);
            videoSearcher(response);
        })
    })

    //this will append the 5 youtube video results of the game to the page
    function videoSearcher(response){
            let vid = $('#video');
            vid.empty();
            for(let i = 0; i < response.items.length; i++){
                let videoUrl = `https://www.youtube.com/embed/${response.items[i].id.videoId}`;
                let video = $('<iframe>');
                video.attr('src', videoUrl);
                vid.append(video);
            }
    }

    //This will append the game name and the image to the page
    function printGames(response){
            console.log(response);
            let p = $('p');
            p.empty();
            $('#video').empty();
            let array = response.results;
        
            for(let i = 0; i<array.length; i++){
                // console.log(array[i]);
                let name = $('<div>').text(array[i].name)
                let image = $('<img>').attr({
                    'class': 'image',
                    'src': array[i].background_image,
                    'alt': array[i].name
                });
                p.append(name, image);
            }
    }

    //This allows the user to search the RAWG API by platform as well as name
    function platformSearcher(){
        let platform;
        let value = $('#platform').val().toLowerCase();
        let split = value.split(' ');
        let keys = Object.keys(platforms);
        for (let i = 0; i < split.length; i++) {

            if (keys.includes(split[i].toLowerCase())) {
                if (platform == null) {
                    platform = platforms[split[i]];
                } else {
                    platform = `${platform},${platforms[split[i]]}`;
                }
            }
        }
        // console.log('platforms', platform);
        return platform;
    }

})

//RAWG parent platforms are coded so that they correspond to numbers, so this is a list of the different parent platforms that is not easily attainable through the API
let platforms = {
    pc: 1,
    playstation: 2,
    xbox: 3,
    ios: 4,
    // 'apple macintosh': 5,
    linux: 6,
    nintendo: 7,
    android: 8,
    atari: 9,
    // 'commodore/amiga': 10,
    sega: 11,
    // '3d0': 12,
    // 'neo geo': 13,
    web: 14
}