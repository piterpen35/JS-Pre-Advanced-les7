$('.serchBtn').click(function(e) {
    let serch = $('.serchArr').val()
    let url = 'http://www.omdbapi.com/?i=tt3896198&apikey=bc91fe78&s=*' +
    serch;
    async function get() {
        e.preventDefault();
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.Response == "False") {
                $('#movieList').empty();
                let error = '<h1>!!! NO ONE FOUND YOUR INQUIRY!!!<h1>'
                $('#error').html(error);
            } else {
                $('error').empty();
                let listCreat ='<ul>'
                $.each(data.Search,function(index, value) {
                    listCreat += '<li>';
                    if (value.Poster == 'N/A') {
                        listCreat += '<img src="/noposter.png"> ';
                    } else{
                        listCreat += '<img src="' + value.Poster + '"> ';
                    }
                    listCreat += '<div class="movie_titel">' + value.Title + '</div> ';
                    listCreat += '<p class="movie_type">' + value.Type + '</p> ';
                    listCreat += '<p class="movie_year">' + value.Year + '</p> ';
                    listCreat += ' <button class= "btn supBtn btn-success moreDetail" value="' + value.Title + '" type="submin">More details</button> ';
                    listCreat += '</li>';
                });
                listCreat += '</ul>';
                $('#movieList').html(listCreat);
            }
        } catch (err) {
            return console.log(error);
        }

        $('.moreDetail').click(function(e) {
            let titel = $(this).val()
            let url_detal = 'http://www.omdbapi.com/?i=tt3896198&apikey=bc91fe78&t=*' +
            titel +
            '&plot=full';
            $('.modal_win').addClass('modal_win_open')
            $('.modal_win').click(function() {
                $('.modal_win').removeClass('modal_win_open')
            });
            async function get_modal() {
                e.preventDefault();
                try {
                    const response = await fetch(url_detal);
                    const modal_deta = await response.json();

                    $.each(modal_deta, function(index, value) {
                        let content = '';
                        if (modal_deta.Poster == 'N/A') {
                            content += '<img src="/noposter.png"> ';
                        } else {
                            content += '<img src="' + modal_deta.Poster + '"> ';
                        }
                        content += '<div class="text_content">'
                        content += '<div class="movie_titel">' + modal_deta.Title + '</div> ';
                        content += '<p>' + modal_deta.Rated + ' ' + modal_deta.Year + ' ' + modal_deta.Genre + '</p>';
                        content += '<p>' + modal_deta.Plot + ' </p> ';
                        content += '<p> <span> Written by: </span> ' + modal_deta.Writer + ' </p> ';
                        content += '<p> <span> Directed by: </span> ' + modal_deta.Directed + ' </p> ';
                        content += '<p> <span> Starrimg by: </span> ' + modal_deta.Actors + ' </p> ';
                        content += '<p> <span> BoxOffice by: </span> ' + modal_deta.BoxOffice + ' </p> ';
                        content += '<p> <span> Awards by: </span> ' + modal_deta.Awards + ' </p> ';
                        content += '<p> <span> Ratings by: </span> </p>'
                        $.each(modal_deta.Ratings, function(index, value) {
                            content += '<p>' + value.Sourse + ' ' + value.Value + '</p> ';
                        })
                        content += '</div>'
                        $('.imfo_movie').html(content);
                    })
                    return console.log(modal_deta);
                    return console.log(modal_deta);
                } catch (err) {
                    return console.log(error);
                }
            }
            get_modal()
        });
    };
    get()
});
