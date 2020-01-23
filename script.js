$(document).ready(function(){
    
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

    $('body').on('click','img', function(){
        console.log($(this).attr('alt'));
        let game = $(this).attr('alt');
    })

})