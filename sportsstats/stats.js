// Standings
let currentSortField = 'losses';
let sortDirection = 'DESC';

// for local storage
let allTeams = []; // a local array of all the teams, including any changes made when adding new games
let allScores = []; // a local array of all the games, including any changes made when adding new games

// gets the data from standings.json
async function getStandings() {
    const res = await fetch('standings.json');
    const data = await res.json();
    return data;
}

let teams = []; // the array that stores the data from standings.json
let categorizedTeams = []; // the array that changes to only show one league/conference/division
let filteredTeams = []; // the array that has all the teams (after categorizing and sorting) that also match the filter value

let currentPage = 'MLB';

// creates the standings in the document
// for some reason, when the page is initialized, it is sorted once automatically, but when immediately switching leagues/conferences/divisions after without any sorting, the standings are not sorted anymore
// however, when the page is initialized and the user sorts the array by clicking on one of the sorting categories, the standings remain sorted
function createStandings(category) {
    document.querySelector('#output').innerHTML = '';
    activeButton();
    let temp = currentPage;
    filterValue = document.querySelector('#filter').value;
    if (filterValue != '') { // creates and filters the standings for only the specified league/conference/division using the sorted teams when something is present in the filter form
        currentPage = category;
        filteredTeams.forEach(team => {
            let output = createRow(team);
            document.querySelector('#output').appendChild(output);
        })
    } else { // creates the standings for only the specified league/conference/division using the sorted teams
        if (category === 'MLB') {
            categorizedTeams = allTeams;
            currentPage = category;
            categorizedTeams.forEach(team => {
                let output = createRow(team);
                document.querySelector('#output').appendChild(output);
            })
        } else if (category === 'AL' || category === 'NL') {
            categorizedTeams = allTeams.filter(team => (team.League === category));
            currentPage = category;
            categorizedTeams.forEach(team => {
                let output = createRow(team);
                document.querySelector('#output').appendChild(output);
            })
        } else {
            categorizedTeams = allTeams.filter(team => (`${team.League}-${team.Division}` === category));
            currentPage = category;
            categorizedTeams.forEach(team => {
                let output = createRow(team);
                document.querySelector('#output').appendChild(output);
            })
        }
    }
    inactiveButton(temp);
}

// creates a new row with all the selected teams' important attributes
function createRow(team) {
    let newRow = document.createElement('tr');
    newRow.setAttribute('scope', 'row');
    let newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(`${team.City} ${team.Name}`));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.Wins));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.Losses));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.Percentage.toFixed(3)));
    newRow.appendChild(newCell);
    /*newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.GamesBehind));
    newRow.appendChild(newCell);*/

    return newRow;
}

// sorts the array according to the category that is passed in (name, wins, losses, percentage, games back)
function sort(field) {
    if (field === undefined) {
        // called from filter
        field = currentSortField;
    } else if (field === currentSortField) {
        sortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
        currentSortField = field;
    } else {
        sortDirection = 'ASC';
        currentSortField = field;
    }

    if (sortDirection === 'ASC') {
        if (field === 'team') {
            allTeams.sort((a, b) => a.City.localeCompare(b.City));
        } else if (field === 'wins') {
            allTeams.sort((a, b) => a.Wins - b.Wins);
        } else if (field === 'losses') {
            allTeams.sort((a, b) => a.Losses - b.Losses);
        } else if (field === 'pct') {
            allTeams.sort((a, b) => a.Percentage - b.Percentage);
        }
    } else if (sortDirection === 'DESC') {
        if (field === 'team') {
            allTeams.sort((a, b) => b.City.localeCompare(a.City));
        } else if (field === 'wins') {
            allTeams.sort((a, b) => b.Wins - a.Wins);
        } else if (field === 'losses') {
            allTeams.sort((a, b) => b.Losses - a.Losses);
        } else if (field === 'pct') {
            allTeams.sort((a, b) => b.Percentage - a.Percentage);
        }
    }

    createStandings(currentPage);
}

// filters the teams according to the "filter" form
function filterTeams() {
    let filterValue = document.querySelector('#filter').value;
    filteredTeams = categorizedTeams.filter(team => (`${team.City} ${team.Name}`.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0));

    sort(); // field in sort will be undefined

    createStandings(currentPage);
}

// makes the button of the current page active
function activeButton() {
    let id = currentPage.toLowerCase();
    document.querySelector(`#${id}`).setAttribute("class", "btn btn-outline-secondary active");
}

// deactivates the button of the page that was just left
function inactiveButton(temp) {
    let id = temp.toLowerCase();
    document.querySelector(`#${id}`).setAttribute("class", "btn btn-outline-secondary");
}

// // tries to run the initializing line for the standings section of the JS but it will only run properly on the index.html page, if it is not, then it will just catch the error and move on
try {
    getStandings().then(data => { teams = data; initLocalStorage(); createStandings(currentPage); sort('losses'); });

} catch (error) {

}







// Scores

let scores = [];
let scoresByDate = [];

let currentDate = '2021-09-27';

// gets the data from scores.json
async function getScores() {
    const res = await fetch('scores.json');
    const data = await res.json();
    return data;
}

// creates the scores in the document with a parameter of the date
function createScores(date) {
    document.querySelector('#games').innerHTML = '';
    activeDateButton();
    let tempDate = currentDate;
    scoresByDate = allScores.filter(score => (score.Day === `${date}T00:00:00`));
    currentDate = date;
    scoresByDate.forEach(score => {
        let game = createGame(score);
        document.querySelector('#games').appendChild(game);
    });
    inactiveDateButton(tempDate);
}

// creates a new game with all the game's important attributes using nested tables
// also adds gives an extra run to the away team if there is a tie in the data in order to clearly get a winning team
function createGame(score) {
    let winningTeam = '';
    if (score.AwayTeamRuns - score.HomeTeamRuns === 0) {
        score.AwayTeamRuns += 1;
        winningTeam = score.AwayTeam;
    } else
        winningTeam = score.AwayTeamRuns - score.HomeTeamRuns > 0 ? score.AwayTeam : score.HomeTeam;

    let newRow = document.createElement('tr');
    newRow.setAttribute('scope', 'row');

    let newTableCell = document.createElement('td');
    newTableCell.setAttribute('colSpan', 4);
    newTableCell.classList.add('px-0');

    let newTable = document.createElement('table');
    newTable.setAttribute('scope', 'body');
    newTable.classList.add('table', 'mb-0', 'table-borderless', 'text-center');

    let newBody = document.createElement('tbody');
    newBody.setAttribute('scope', 'body');

    let firstNewRow = document.createElement('tr');
    firstNewRow.setAttribute('scope', 'row');
    firstNewRow.classList.add('justify-content-between');
    if (winningTeam === score.AwayTeam)
        firstNewRow.classList.add('fw-bold')
    let newCell = document.createElement('td');
    newCell.classList.add('width-lg', 'text-start');
    newCell.appendChild(document.createTextNode(`${score.AwayTeam}`));
    firstNewRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.classList.add('width-sm');
    newCell.appendChild(document.createTextNode(score.AwayTeamRuns));
    firstNewRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.classList.add('width-sm');
    newCell.appendChild(document.createTextNode(score.AwayTeamHits));
    firstNewRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.classList.add('width-sm');
    newCell.appendChild(document.createTextNode(score.AwayTeamErrors));
    firstNewRow.appendChild(newCell);
    newBody.appendChild(firstNewRow);

    let secondNewRow = document.createElement('tr');
    secondNewRow.setAttribute('scope', 'row');
    secondNewRow.classList.add('justify-content-between');
    if (winningTeam === score.HomeTeam)
        secondNewRow.classList.add('fw-bold')
    newCell = document.createElement('td');
    newCell.classList.add('width-lg', 'text-start');
    newCell.appendChild(document.createTextNode(`${score.HomeTeam}`));
    secondNewRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.classList.add('width-sm');
    newCell.appendChild(document.createTextNode(score.HomeTeamRuns));
    secondNewRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.classList.add('width-sm');
    newCell.appendChild(document.createTextNode(score.HomeTeamHits));
    secondNewRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.classList.add('width-sm');
    newCell.appendChild(document.createTextNode(score.HomeTeamErrors));
    secondNewRow.appendChild(newCell);
    newBody.appendChild(secondNewRow);

    newTable.appendChild(newBody);
    newTableCell.appendChild(newTable);
    newRow.appendChild(newTableCell);

    return newRow;
}

// makes the button of the current page active
function activeDateButton() {
    let id = `d${currentDate}`;

    document.querySelector(`#${id}`).setAttribute("class", "btn btn-outline-secondary active");
}

// deactivates the button of the page that was just left
function inactiveDateButton(tempDate) {
    let id = `d${tempDate}`;
    document.querySelector(`#${id}`).setAttribute("class", "btn btn-outline-secondary");
}

// tries to run the initializing line for the scores section of the JS but it will only run properly on the scores.html page, if it is not, then it will just catch the error and move on
try {
    getScores().then(data => { scores = data; initLocalStorage(); createScores(currentDate); })
} catch (error) {

}






// Local Storage

// initializes the local storage
// assigns whatever is in the local storage to allTeams and allScores, unless the local storage is null, then it just initializes allTeams and allScores by assigning the respective JSON data to it
function initLocalStorage() {
    const teamString = localStorage.getItem('storedTeams');
    allTeams = teamString != null ? JSON.parse(teamString) : teams;

    const gameString = localStorage.getItem('storedGames');
    allScores = gameString != null ? JSON.parse(gameString) : scores;

    storeData();
}

// assigns the data in allTeams and allScores (usually after pushing a new game) to their respective keys in local storage to save the new game in local storage
function storeData() {
    localStorage.setItem('storedTeams', JSON.stringify(allTeams));
    localStorage.setItem('storedGames', JSON.stringify(allScores));
    console.log(allScores);
}

// clears local storage and resets allTeams and allScores back to their respective JSON data arrays
function clearLocalStorage() {
    localStorage.clear();
    initLocalStorage();
}

// adds a new game to allGames, updates the standings due to the new game, and updates the local storage
function inputGame() {
    let aTeam = document.querySelector('#inputAwayTeam').value;
    let hTeam = document.querySelector('#inputHomeTeam').value;
    let date = document.querySelector('#inputDate').value;
    let aTeamRuns = document.querySelector('#inputAwayRuns').value;
    let aTeamHits = document.querySelector('#inputAwayHits').value;
    let aTeamErrors = document.querySelector('#inputAwayErrors').value;
    let hTeamRuns = document.querySelector('#inputHomeRuns').value;
    let hTeamHits = document.querySelector('#inputHomeHits').value;
    let hTeamErrors = document.querySelector('#inputHomeErrors').value;

    let error = document.querySelector('.errorMsg');
    if (error != null)
        error.remove();

    let container = document.querySelector('#addGame');
    let row1 = document.querySelector('#row1');

    // finds the teams of the new game in standings.json
    let awayTeam;
    allTeams.forEach(team => {
        if (`${team.City} ${team.Name}` === aTeam)
            awayTeam = team;
    });

    let homeTeam;
    allTeams.forEach(team => {
        if (`${team.City} ${team.Name}` === hTeam)
            homeTeam = team;
    });

    // displays an error message if a field is left empty
    if (aTeam === '' || hTeam === '' || date === '' || aTeamRuns === '' || aTeamHits === '' || aTeamErrors === '' || hTeamRuns === '' || hTeamHits === '' || hTeamErrors === '') {
        container.insertBefore(createErrorMsg('Error: Please fill out all required fields'), row1);
    } 
    // if an invalid team is inputted
    else if (homeTeam === undefined || awayTeam === undefined) {
        container.insertBefore(createErrorMsg('Error: Please enter a valid team'), row1);
    }
    // if a date from an invalid year is inputted
    else if (date.indexOf('2021') >= 0) {
        container.insertBefore(createErrorMsg('Error: Please enter a valid date'), row1);
    }
    // creates a new game
    else {
        let game = {
            Day: `${date}T00:00:00`,
            AwayTeam: awayTeam.Key,
            HomeTeam: homeTeam.Key,
            AwayTeamRuns: aTeamRuns,
            HomeTeamRuns: hTeamRuns,
            AwayTeamHits: aTeamHits,
            HomeTeamHits: hTeamHits,
            AwayTeamErrors: aTeamErrors,
            HomeTeamErrors: hTeamErrors
        }
        allScores.push(game);

        storeData();

        // updates the standings
        if (aTeamRuns > hTeamRuns) {
            awayTeam.Wins += 1;
            homeTeam.Losses += 1;
        } else {
            homeTeam.Wins += 1;
            awayTeam.Losses += 1;
        }
        awayTeam.Percentage = (awayTeam.Wins / (awayTeam.Wins + awayTeam.Losses)).toFixed(3);
        homeTeam.Percentage = (homeTeam.Wins / (homeTeam.Wins + homeTeam.Losses)).toFixed(3);
    }

    document.querySelector('#inputAwayTeam').value = '';
    document.querySelector('#inputHomeTeam').value = '';
    document.querySelector('#inputDate').value = '';
    document.querySelector('#inputAwayRuns').value = '';
    document.querySelector('#inputAwayHits').value = '';
    document.querySelector('#inputAwayErrors').value = '';
    document.querySelector('#inputHomeRuns').value = '';
    document.querySelector('#inputHomeHits').value = '';
    document.querySelector('#inputHomeErrors').value = '';
}

//Creates a text element with the style of an error from given text
function createErrorMsg(msg) {
    let errorMsg = document.createElement('h4');
    errorMsg.appendChild(document.createTextNode(msg));
    errorMsg.className = 'text-danger errorMsg pt-3 pl-2';
    return errorMsg;
}




