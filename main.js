
    
    //upon searching, this will display the results by printing the name followed by a thumbnail of the game, currently adding newer searches above the previous ones
    $('#search').on('submit', function(event){
        event.preventDefault();
        // let p = $('p');
        // let game = $('#game').val();
        // let queryUrl = "https://www.giantbomb.com/api/games/?api_key=dfa7b8ab7f470e538ad4a4cf3c93b1715090b783"
        // let queryUrl = "https://api-v3.igdb.com/games"
        const makeRequest = 
        $.ajax({

            url: $("<script>").attr(src="https://www.giantbomb.com/api/games/?api_key=dfa7b8ab7f470e538ad4a4cf3c93b1715090b783"),
            method:'GET'
        }).then(function(response) {
            console.log(response);
            // let array = response.results;
            let divEl = $('<div>');
            
            // for(let i = 0; i<array.length; i++){
            //     // console.log(array[i]);
            //     // console.log(game.toLowerCase() === array[i].name.toLowerCase() )
            //     // if (game.toLowerCase() === array[i].name.toLowerCase()) {
                let name = $('<div>').text(response.description_raw)
                
            //     let image = $('<img>').attr({
            //         'class': 'image',
            //         'src': array[i].background_image,
            //         'alt': array[i].name
            //     });
                divEl.append(name);
            //     }
            // }
            
            p.prepend(divEl);
        })
    
    })
    