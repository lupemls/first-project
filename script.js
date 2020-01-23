

$(document).ready(function(){
    
    //upon searching, this will display the results by printing the name followed by a thumbnail of the game, currently adding newer searches above the previous ones
    $('#search').on('submit', function(event){
        event.preventDefault();
        let p = $('p');
        let game = $('#game').val();
        let queryUrl = `https://rawg.io/api/games?search=${game}`;
        
        $.ajax({

            url: queryUrl,
            method:'GET'
        }).then(function(response) {
            console.log(response);
            let array = response.results;
            let divEl = $('<div>');

            for(let i = 0; i<array.length; i++){
                // console.log(array[i]);
                let name = $('<div>').text(array[i].name)
                let image = $('<img>').attr({
                    'class': 'image',
                    'src': array[i].background_image,
                    'alt': array[i].name
                });
                divEl.append(name, image);
            }
            p.prepend(divEl);
        })
    
    })

    //this will allow a user to click one of the images, searching the youtube API, and will embed 5 videos to the top of the page
    //user might get ERR_BLOCKED_BY_CLIENT if they have an adblocker
    $('body').on('click','img', function(){
        console.log($(this).attr('alt'));
        let game = $(this).attr('alt');
        let queryUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAnOFnUw0G81BnJj2mpFBAbBe8QStxPUzs&part=snippet&q=${game}`;
        $.ajax({
            url: queryUrl,
            method:'GET'
        }).then(function(response) {
            console.log(response);
            let vid = $('#video');
            vid.empty();
            for(let i = 0; i < response.items.length; i++){
                let videoUrl = `https://www.youtube.com/embed/${response.items[i].id.videoId}`;
                let video = $('<iframe>');
                video.attr('src', videoUrl);
                vid.append(video);
            }

        })
    })

})