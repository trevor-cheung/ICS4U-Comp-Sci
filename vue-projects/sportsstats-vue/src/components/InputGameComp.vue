<template>
    <div class="container" id="addGame">
      <div id="row1">
        <div id="main" class="card card-body">
          <h2 class="title">Input A Game</h2>
          <form class="row g-3">
            <div class="col-md-4">
              <label for="inputAwayTeam" class="form-label">Away Team</label>
              <input type="text" class="form-control" id="inputAwayTeam">
            </div>
            <div class="col-md-4">
              <label for="inputHomeTeam" class="form-label">Home Team</label>
              <input type="text" class="form-control" id="inputHomeTeam">
            </div>
            <div class="col-md-4">
              <label for="inputDate" class="form-label">Date (currently only works for Sep 27-Oct 3)</label>
              <input type="text" class="form-control" placeholder="yyyy-mm-dd" id="inputDate">
            </div>
            <div class="col-md-4">
              <label for="inputAwayRuns" class="form-label">Away Team Runs</label>
              <input type="text" class="form-control" id="inputAwayRuns">
            </div>
            <div class="col-md-4">
              <label for="inputAwayHits" class="form-label">Hits</label>
              <input type="text" class="form-control" id="inputAwayHits">
            </div>
            <div class="col-md-4">
              <label for="inputAwayErrors" class="form-label">Errors</label>
              <input type="text" class="form-control" id="inputAwayErrors">
            </div>
            <div class="col-md-4">
              <label for="inputHomeRuns" class="form-label">Home Team Runs</label>
              <input type="text" class="form-control" id="inputHomeRuns">
            </div>
            <div class="col-md-4">
              <label for="inputHomeHits" class="form-label">Hits</label>
              <input type="text" class="form-control" id="inputHomeHits">
            </div>
            <div class="col-md-4">
              <label for="inputHomeErrors" class="form-label">Errors</label>
              <input type="text" class="form-control" id="inputHomeErrors">
            </div>
            <button class="btn btn-dark ms-2 mt-3 col-md-2" type="button" @click="inputGame()">Submit</button>
          </form>
          <hr>
          <form class="row g-3">
            <div class="col-md-4">
              <label for="deleteID" class="form-label">Game ID To Delete</label>
              <input type="text" class="form-control" id="deleteID">
            </div>
            <button class="btn btn-dark ms-2 mt-3 col-md-2" type="button" @click="deleteGame()">Delete</button>
          </form>  
        </div>
      </div>
   </div>
</template>

<script>
export default {
    name: 'InputGame',
    data() {
      return {
        teams: [],
        scores: [],
      }
    },
    methods: {
      async getStandings() {
         const res = await fetch('http://localhost:5000/standings')
         const data = await res.json()
         return data
      },
      async getScores() {
          const res = await fetch('http://localhost:5000/scores');
          const data = await res.json();
          return data;
      },
      async inputGame() {
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
        this.teams.forEach(team => {
            if (`${team.City} ${team.Name}` === aTeam)
                awayTeam = team;
        });

        let homeTeam;
        this.teams.forEach(team => {
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
        else if (!(date.indexOf('2021') >= 0)) {
            container.insertBefore(createErrorMsg('Error: Please enter a valid date in 2021'), row1);
        }
        // creates a new game
        else {
            let game = {
              id: Math.floor(Math.random() * 100000) + 63778,
              Day: `${date}T00:00:00`,
              AwayTeam: awayTeam.Key,
              HomeTeam: homeTeam.Key,
              AwayTeamID: awayTeam.id,
              HomeTeamID: homeTeam.id,
              AwayTeamRuns: aTeamRuns,
              HomeTeamRuns: hTeamRuns,
              AwayTeamHits: aTeamHits,
              HomeTeamHits: hTeamHits,
              AwayTeamErrors: aTeamErrors,
              HomeTeamErrors: hTeamErrors,
            }
            this.addGame(game);

            // updates the standings
            if (aTeamRuns > hTeamRuns) {
                awayTeam.Wins += 1;
                homeTeam.Losses += 1;
            } else {
                homeTeam.Wins += 1;
                awayTeam.Losses += 1;
            }
            awayTeam.Percentage = parseFloat((awayTeam.Wins / (awayTeam.Wins + awayTeam.Losses)).toFixed(3));
            homeTeam.Percentage = parseFloat((homeTeam.Wins / (homeTeam.Wins + homeTeam.Losses)).toFixed(3));
        
            await this.updateStandings(awayTeam);
            await this.updateStandings(homeTeam);
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
      },
      createErrorMsg(msg) {
        let errorMsg = document.createElement('h4');
        errorMsg.appendChild(document.createTextNode(msg));
        errorMsg.className = 'text-danger errorMsg pt-3 pl-2';
        return errorMsg;
      },
      async addGame(game) {
        const res = await fetch('http://localhost:5000/scores', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(game),
        });
        const data = await res.json();
        this.scores = [...this.scores, data];
      },
      async deleteGame() {
        let id = document.querySelector('#deleteID').value;

        let gameToDelete;
        this.scores.forEach((score) => {
          if (score.id == id)
            gameToDelete = score;
        })
        console.log(gameToDelete);
        
        let awayTeam;
        this.teams.forEach((team) => {
          if (team.id === gameToDelete.AwayTeamID)
            awayTeam = team;
        })
        console.log(awayTeam);
        let homeTeam;
        this.teams.forEach((team) => {
          if (team.id === gameToDelete.HomeTeamID)
            homeTeam = team;
        })
        console.log(homeTeam);
        
        // updates the standings
        if (gameToDelete.AwayTeamRuns > gameToDelete.HomeTeamRuns) {
            awayTeam.Wins -= 1;
            homeTeam.Losses -= 1;
        } else {
            homeTeam.Wins -= 1;
            awayTeam.Losses -= 1;
        }
        awayTeam.Percentage = parseFloat((awayTeam.Wins / (awayTeam.Wins + awayTeam.Losses)).toFixed(3));
        homeTeam.Percentage = parseFloat((homeTeam.Wins / (homeTeam.Wins + homeTeam.Losses)).toFixed(3));
    
        await this.updateStandings(awayTeam);
        await this.updateStandings(homeTeam);

        if (confirm('Are you sure?')) {
          const res = await fetch(`http://localhost:5000/scores/${id}`, {
            method: 'DELETE',
          })
          res.status === 200
            ? (this.scores = this.scores.filter((score) => score.id !== id))
            : alert('Error deleting task')
        }
        document.querySelector('#deleteID').value = '';
      },
      async updateStandings(team) {
        console.log(team.id);
        const res = await fetch(`http://localhost:5000/standings/${team.id}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(team),
        });
        const data = await res.json();
        this.scores = [...this.scores, data];
      }
    },
    async mounted() {
      this.teams = await this.getStandings();
      this.scores = await this.getScores();
    }
}
</script>