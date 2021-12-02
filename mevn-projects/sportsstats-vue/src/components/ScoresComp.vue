<template>
    <div class="container">
      <div id="main" class="card card-body">
         <h2 class="title mb-3 mx-auto">Games from Sep 27-Oct 3</h2>
         <div class="btn-toolbar mb-3 mx-auto" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group me-2" role="group" aria-label="First group">
              <button type="button" class="btn btn-outline-secondary" id="d2021-09-27" @click="createScores('2021-09-27')">Sep. 27</button>
              <button type="button" class="btn btn-outline-secondary" id="d2021-09-28" @click="createScores('2021-09-28')">Sep. 28</button>
              <button type="button" class="btn btn-outline-secondary" id="d2021-09-29" @click="createScores('2021-09-29')">Sep. 29</button>
              <button type="button" class="btn btn-outline-secondary" id="d2021-09-30" @click="createScores('2021-09-30')">Sep. 30</button>
              <button type="button" class="btn btn-outline-secondary" id="d2021-10-01" @click="createScores('2021-10-01')">Oct. 1</button>
              <button type="button" class="btn btn-outline-secondary" id="d2021-10-02" @click="createScores('2021-10-02')">Oct. 2</button>
              <button type="button" class="btn btn-outline-secondary" id="d2021-10-03" @click="createScores('2021-10-03')">Oct. 3</button>
            </div>
        </div>
         <table id='scores-table' class="table table-striped mx-auto text-center">
            <thead>
               <tr>
                  <th scope="col" class="width-lg text-start">Team</th>
                  <th scope="col" class="width-sm">R</th>
                  <th scope="col" class="width-sm">H</th>
                  <th scope="col" class="width-sm">E</th>
               </tr>
            </thead>
            <tbody id="games">
            </tbody>
         </table>
      </div>
   </div>
</template>

<script>
export default {
    name: 'Scores',
    data() {
        return {
            scores: [],
            scoresByDate: [],
            currentDate: String,
        }
    },
    methods: {
        async getScores() {
            const res = await fetch('http://localhost:5000/scores');
            const data = await res.json();
            return data;
        },
        createScores(date) {
            document.querySelector('#games').innerHTML = '';
            this.activeDateButton();
            let tempDate = this.currentDate;
            this.scoresByDate = this.scores.filter(score => (score.Day === `${date}T00:00:00`));
            this.currentDate = date;
            this.scoresByDate.forEach(score => {
                let game = this.createGame(score);
                document.querySelector('#games').appendChild(game);
            });
            this.inactiveDateButton(tempDate);
            console.log(this.scoresByDate);
        },
        createGame(score) {
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
        },
        activeDateButton() {
            let id = `d${this.currentDate}`;
            document.querySelector(`#${id}`).setAttribute("class", "btn btn-outline-secondary active");
        },
        inactiveDateButton(tempDate) {
            let id = `d${tempDate}`;
            document.querySelector(`#${id}`).setAttribute("class", "btn btn-outline-secondary");
        }  
    },
    async mounted() {
        this.scores = await this.getScores();
        this.currentDate = '2021-09-27';
        this.createScores(this.currentDate);
    },
}
</script>

<style>
    .width-lg{
        width: 70%;
    }

    .width-sm{
        width: 10%;
    }

    @media(min-width: 768px) {
        #scores-table{
            width: 50%;
        }
    }
</style>