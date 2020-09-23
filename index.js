'use strict';

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  if (responseJson.length >= 1) {
    for (let i = 0; i < responseJson.length; i++) {
      if (responseJson[i].description != null) {
        $('#results-list').append(
          `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
        <p>${responseJson[i].description}</p>
        <p>By ${responseJson[i].owner.login}</p>
        </li>`
        );
      } else {
        $('#results-list').append(
          `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
        <p>By ${responseJson[i].owner.login}</p>
        </li>`
        );
      }
    }
  } else {
    $('#results-list').text('No Repos Found');
  }
  $('#results').removeClass('hidden');
}

function getRepos(searchURL) {
  fetch(searchURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) =>
      $('#results-list').text(`Something went wrong: ${err.message}`)
    );
}

function watchForm() {
  $('form').submit((event) => {
    event.preventDefault();
    const username = $('#js-search-term').val();
    const searchURL = 'https://api.github.com/users/' + username + '/repos';
    getRepos(searchURL);
  });
}

$(watchForm);
