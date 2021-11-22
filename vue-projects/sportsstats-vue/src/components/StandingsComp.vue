<template>
    <div class="container">
      <div id="main" class="card card-body">
         <form class="form-inline mb-3 align-self-lg-end">
            <input id="filter" type="text" class="form-control mr-2" placeholder="Filter" @keyup="filterTeams();">
         </form>
         <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group me-2 mb-3" role="group" aria-label="First group">
              <button type="button" class="btn btn-outline-secondary" id="mlb" @click="createStandings('MLB')">MLB</button>
              <button type="button" class="btn btn-outline-secondary" id="al" @click="createStandings('AL')">AL Conference</button>
              <button type="button" class="btn btn-outline-secondary" id="nl" @click="createStandings('NL')">NL Conference</button>
            </div>
            <div class="btn-group me-2 mb-3" role="group" aria-label="Second group">
              <button type="button" class="btn btn-outline-secondary" id="al-west" @click="createStandings('AL-West')">AL West</button>
              <button type="button" class="btn btn-outline-secondary" id="al-central" @click="createStandings('AL-Central')">AL Central</button>
              <button type="button" class="btn btn-outline-secondary" id="al-east" @click="createStandings('AL-East')">AL East</button>
              <button type="button" class="btn btn-outline-secondary" id="nl-west" @click="createStandings('NL-West')">NL West</button>
              <button type="button" class="btn btn-outline-secondary" id="nl-central" @click="createStandings('NL-Central')">NL Central</button>
              <button type="button" class="btn btn-outline-secondary" id="nl-east" @click="createStandings('NL-East')">NL East</button>
            </div>
        </div>
         <h2 class="title mb-3">Standings</h2>
         <table class="table table-striped">
            <thead>
               <tr>
                  <th scope="col" @click="sort('team');">Team</th>
                  <th scope="col" @click="sort('wins');">Wins</th>
                  <th scope="col" @click="sort('losses');">Losses</th>
                  <th scope="col" @click="sort('pct');">PCT</th>
               </tr>
            </thead>
            <tbody id="output">
            </tbody>
         </table>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Standings',
   data() {
      return {
         currentSortField: String,
         sortDirection: String,
         currentPage: String,
         teams: [],
         categorizedTeams: [],
         filteredTeams: [],
      }
   },
   methods: {
      async getStandings() {
         const res = await fetch('http://localhost:5000/standings')

         const data = await res.json()
         console.log(data)
         return data
         
      },
      createStandings(category) {
         document.querySelector('#output').innerHTML = '';
         this.activeButton();
         let temp = this.currentPage;
         this.filterValue = document.querySelector('#filter').value;
         if (this.filterValue != '') { // creates and filters the standings for only the specified league/conference/division using the sorted teams when something is present in the filter form
            this.currentPage = category;
            this.filteredTeams.forEach(team => {
                  let output = this.createRow(team);
                  document.querySelector('#output').appendChild(output);
            })
         } else { // creates the standings for only the specified league/conference/division using the sorted teams
            if (category === 'MLB') {
                  this.categorizedTeams = this.teams;
                  this.currentPage = category;
                  this.categorizedTeams.forEach(team => {
                     let output = this.createRow(team);
                     document.querySelector('#output').appendChild(output);
                  })
            } else if (category === 'AL' || category === 'NL') {
                  this.categorizedTeams = this.teams.filter(team => (team.League === category));
                  this.currentPage = category;
                  this.categorizedTeams.forEach(team => {
                     let output = this.createRow(team);
                     document.querySelector('#output').appendChild(output);
                  })
            } else {
                  this.categorizedTeams = this.teams.filter(team => (`${team.League}-${team.Division}` === category));
                  this.currentPage = category;
                  this.categorizedTeams.forEach(team => {
                     let output = this.createRow(team);
                     document.querySelector('#output').appendChild(output);
                  })
            }
         }
         this.inactiveButton(temp);
      },
      createRow(team) {
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
         
         return newRow;
      },
      sort(field) {
         if (field === undefined) {
            // called from filter
            field = this.currentSortField;
         } else if (field === this.currentSortField) {
            this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
            this.currentSortField = field;
         } else {
            this.sortDirection = 'ASC';
            this.currentSortField = field;
         }

         if (this.sortDirection === 'ASC') {
            if (field === 'team') {
                  this.teams.sort((a, b) => a.City.localeCompare(b.City));
            } else if (field === 'wins') {
                  this.teams.sort((a, b) => a.Wins - b.Wins);
            } else if (field === 'losses') {
                  this.teams.sort((a, b) => a.Losses - b.Losses);
            } else if (field === 'pct') {
                  this.teams.sort((a, b) => a.Percentage - b.Percentage);
            }
         } else if (this.sortDirection === 'DESC') {
            if (field === 'team') {
                  this.teams.sort((a, b) => b.City.localeCompare(a.City));
            } else if (field === 'wins') {
                  this.teams.sort((a, b) => b.Wins - a.Wins);
            } else if (field === 'losses') {
                  this.teams.sort((a, b) => b.Losses - a.Losses);
            } else if (field === 'pct') {
                  this.teams.sort((a, b) => b.Percentage - a.Percentage);
            }
         }

         this.createStandings(this.currentPage);
      },
      filterTeams() {
         let filterValue = document.querySelector('#filter').value;
         this.filteredTeams = this.categorizedTeams.filter(team => (`${team.City} ${team.Name}`.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0));

         this.sort(); // field in sort will be undefined

         this.createStandings(this.currentPage);
      },
      activeButton() {
         let id = this.currentPage.toLowerCase();
         document.querySelector(`#${id}`).setAttribute("class", "btn btn-outline-secondary active");
      },
      inactiveButton(temp) {
         let id = temp.toLowerCase();
         document.querySelector(`#${id}`).setAttribute("class", "btn btn-outline-secondary");
      },
      
   },
   async mounted() {
      this.teams = await this.getStandings();
      console.log(this.teams);
      this.currentSortField = 'losses';
      this.sortDirection = 'DESC';
      this.currentPage = 'MLB';
      this.createStandings(this.currentPage);
      this.sort(this.currentSortField);
   }
}
</script>