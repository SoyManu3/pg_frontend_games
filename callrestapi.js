var url = "https://pg-restapi-games.onrender.com/api/games";

function postGames() {
  console.log(url);

  var myName = $('#name').val();
  var myLaunch_year = $('#launch_year').val();
  var myPlatforms = $('#platforms').val();
  var myGenre = $('#genre').val();
  var myDevelopers = $('#developers').val();
  var myModes = $('#modes').val();

  var myGame = {
    name: myName,
    launch_year: myLaunch_year,
    platforms: myPlatforms,
    genre: myGenre,
    developers: myDevelopers,
    modes: myModes
  };
  console.log(myGame);

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      resetForm();
      $('#resultado').html(JSON.stringify(data));
    },
    data: JSON.stringify(myGame)
  });
}

function getGames() {
  console.log(url);

  $.getJSON(url, function(json) {
    console.log(json);

    var arrGames = json.games;

    var htmlTable = '<table border="1">';
    htmlTable += '<tr><th>ID</th><th>Nombre</th><th>Año</th><th>Plataformas</th><th>Género</th><th>Desarrolladores</th><th>Modos</th><th>Acciones</th></tr>';

    arrGames.forEach(function(item) {
      htmlTable += '<tr>' +
        '<td>' + item.id + '</td>' +
        '<td>' + item.name + '</td>' +
        '<td>' + item.launch_year + '</td>' +
        '<td>' + item.platforms + '</td>' +
        '<td>' + item.genre + '</td>' +
        '<td>' + item.developers + '</td>' +
        '<td>' + item.modes + '</td>' +
        '<td>' +
          '<button onclick="fillForm(' + item.id + ')">Editar</button> ' +
          '<button onclick="deleteGame(' + item.id + ')">Eliminar</button>' +
        '</td>' +
        '</tr>';
    });

    htmlTable += '</table>';

    $('#resultado').html(htmlTable);
  });
}

function updateGame() {
  const gameId = $('#name').data('game-id');
  console.log(gameId);

  if (!gameId) {
    alert('Primero selecciona un juego con el botón Editar.');
    return;
  }

  const myGame = {
    name: $('#name').val(),
    launch_year: $('#launch_year').val(),
    platforms: $('#platforms').val(),
    genre: $('#genre').val(),
    developers: $('#developers').val(),
    modes: $('#modes').val()
  };

  $.ajax({
    url: url + '/' + gameId,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(myGame),
    success: function (data) {
      alert('Juego actualizado correctamente');
      resetForm();
      getGames();
    },
    error: function (err) {
      $('#resultado').html('Error: ' + JSON.stringify(err.responseJSON));
    }
  });
}

function fillForm(id) {
  $.getJSON(url + '/' + id, function(data) {
    const game = data.game;
    if (game) {
      $('#name').val(game.name);
      $('#launch_year').val(game.launch_year);
      $('#platforms').val(game.platforms);
      $('#genre').val(game.genre);
      $('#developers').val(game.developers);
      $('#modes').val(game.modes);

      $('#name').data('game-id', game.id);
    } else {
      alert('Juego no encontrado');
    }
  });
}

function deleteGame(id) {
  if (confirm('¿Estás seguro de que quieres eliminar este juego?')) {
    $.ajax({
      url: url + '/' + id,
      type: 'DELETE',
      success: function (response) {
        alert('Juego eliminado correctamente');
        getGames();
      },
      error: function (err) {
        $('#resultado').html('Error: ' + JSON.stringify(err.responseJSON));
      }
    });
  }
}

function resetForm() {
  console.log('Form reset');
  $('#name').val('');
  $('#launch_year').val('');
  $('#platforms').val('');
  $('#genre').val('');
  $('#developers').val('');
  $('#modes').val('');
  $('#name').removeData('game-id');
}
