

// $("#links").load("/Main_Page #jq-p-Getting-Started li");
// $('.table_results').each(function(index, element){
//     companiesList[index] = {};
//     var tbody = $(element).find('tbody');

//     companiesList[index]['team1'] = $(tbody).find('[class=team]').text();

// });
// console.log(companiesList);
$.get('http://quantofa.net/team/Terza-Categoria-Bergamo-Girone-C', function(data) {
    alert(data);

});