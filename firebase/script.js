function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

$(document).ready(function(){
  //initialize the firebase app
  var config = {
    apiKey: "AIzaSyBmb0Iv8b80B4iuzIH0RYzxT4oFyovXtDA",
    authDomain: "asd-realbolgare.firebaseapp.com",
    databaseURL: "https://asd-realbolgare.firebaseio.com",
    projectId: "asd-realbolgare",
    storageBucket: "asd-realbolgare.appspot.com",
    messagingSenderId: "752510844392"
    };
  firebase.initializeApp(config);

  //create firebase references
  var Auth = firebase.auth(); 
  var dbRef = firebase.database();
  var contactsRef = dbRef.ref('contacts')
  var usersRef = dbRef.ref('users')
  var auth = null;

  //Login
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    $('#loginModal').modal('hide');
    $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
    $('#messageModal').modal('show');

    if( $('#email').val() != '' && $('#password').val() != '' ){
      //login the user
      var data = {
        email: $('#email').val(),
        password: $('#password').val()
      };
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(function(authData) {
          auth = authData;
          $("#spanButton").html('<a class="round-btn" href="lastscore.html">Ultima Partita</a>')
          $('#messageModalLabel').html(spanText('Successo!' + 'Benvenuto, '  + auth.email, ['center', 'success']))
        })
        .catch(function(error) {
          $('#messageModalLabel').html(spanText('Utente non trovato', ['danger']))
        });
    } //TODO: add two different modals, one for success with two bottons for add news and change last result
  }); // one for failure with only 'close' button <3

  $('#logout').on('click', function(e) {
    e.preventDefault();
    firebase.auth().signOut()
  });
  dbRef.ref('/lastscores/').once('value').then(function(snapshot) {
    console.log(snapshot.val())
    $("b#homeScore").text(snapshot.val().homeScore);
    $("b#homeTeam").text(snapshot.val().homeTeam);
    $("b#outScore").text(snapshot.val().outScore);
    $("b#outTeam").text(snapshot.val().outTeam);
    $("span#date").text(snapshot.val().date);
    $("span#location").text(snapshot.val().location);

 });
 function writeLastScoreData(homeTeam, homeScore, outTeam, outScore, date, location) {
  dbRef.ref('lastscores/').set({
    homeTeam: homeTeam,
    homeScore: homeScore,
    outTeam : outTeam,
    outScore: outScore,
    date: date,
    location: location
  });
}

$('#lastScoreButton').on('click', function(e) {
  e.preventDefault();
  var homeTeam = $('#homeTeam').val()
  var outTeam = $('#outTeam').val()
  var homeScore = $('#homeScore').val()
  var outScore = $('#outScore').val()
  var date = $('#date').val()
  var location = $('#location').val()
  try{
    writeLastScoreData(homeTeam, homeScore,  outTeam, outScore, date, location)
    $("#spanMessage").html('<b style="color: green; margin:auto;">Ultimo risultato modificato con successo</b>')
  }
  catch(error) {
    console.log(error);
    $("#spanMessage").html('<b style="color: red; text-align:center;">Errore: ultimo risultato non cambiato :( </b>')

  }

});

});

function spanText(textStr, textClasses) {
  var classNames = textClasses.map(c => 'text-'+c).join(' ');
  return '<span class="'+classNames+'">'+ textStr + '</span>';
};







