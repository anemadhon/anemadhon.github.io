var base_url = "https://api.football-data.org/v2/competitions/2014/";
var base_url_team = "https://api.football-data.org/v2/teams/";

function fetchWithToken(url){
  return fetch(url, {
    headers: {
      'X-Auth-Token': '7e0fe825a3ba4e00a05053bc5e01ec8c'
    }
  })
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getStandings() {
  if ("caches" in window) {
    caches.match(base_url+"standings?standingType=TOTAL").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var standHTML = ``;
          var tabel = data.standings[0];
          console.log(tabel.table);
          standHTML += `
            <h5>HOME</h5>
            <table class="responsive-table highlight centered">
              <thead>
                <tr>
                  <th>No. Urut</th>
                  <th>Club</th>
                  <th>Tanding</th>
                  <th>Menang</th>
                  <th>Kalah</th>
                  <th>Seri</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>
          `;
          tabel.table.forEach(function(team) {
            console.log(team);
            standHTML += `
              <tr>
                <td>${team.position}</td>
                <td><a href="./team.html?id=${team.team.id}">${team.team.name}</a></td>
                <td>${team.playedGames}</td>
                <td>${team.won}</td>
                <td>${team.lost}</td>
                <td>${team.draw}</td>
                <td>${team.points}</td>
              </tr>
            `;
          });
          standHTML += `
              </tbody>
            </table>
          `;
          document.getElementById("myStand").innerHTML = standHTML;
        });
      }
    });

    caches.match(base_url+"standings?standingType=HOME").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var standHTMLHome = ``;
          var tabel = data.standings[0];
          standHTMLHome += `
            <h5>HOME</h5>
            <table class="responsive-table striped centered">
              <thead>
                <tr>
                  <th>No. Urut</th>
                  <th>Club</th>
                  <th>Tanding</th>
                  <th>Menang</th>
                  <th>Kalah</th>
                  <th>Seri</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>
          `;
          tabel.table.forEach(function(hteam) {
            standHTMLHome += `
              <tr>
                <td>${hteam.position}</td>
                <td><a href="./team.html?id=${hteam.team.id}">${hteam.team.name}</a></td>
                <td>${hteam.playedGames}</td>
                <td>${hteam.won}</td>
                <td>${hteam.lost}</td>
                <td>${hteam.draw}</td>
                <td>${hteam.points}</td>
              </tr>
            `;
          });
          standHTMLHome += `
              </tbody>
            </table>
          `;
          document.getElementById("myStandHome").innerHTML = standHTMLHome;
        });
      }
    });

    caches.match(base_url+"standings?standingType=AWAY").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var standHTMLAway = ``;
          var tabel = data.standings[0];
          standHTMLAway += `
            <h5>AWAY</h5>
            <table class="responsive-table centered">
              <thead>
                <tr>
                  <th>No. Urut</th>
                  <th>Club</th>
                  <th>Tanding</th>
                  <th>Menang</th>
                  <th>Kalah</th>
                  <th>Seri</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>
          `;
          tabel.table.forEach(function(ateam) {
            standHTMLAway += `
              <tr>
                <td>${ateam.position}</td>
                <td><a href="./team.html?id=${ateam.team.id}">${ateam.team.name}</a></td>
                <td>${ateam.playedGames}</td>
                <td>${ateam.won}</td>
                <td>${ateam.lost}</td>
                <td>${ateam.draw}</td>
                <td>${ateam.points}</td>
              </tr>
            `;
          });
          standHTMLAway += `
              </tbody>
            </table>
          `;
          document.getElementById("myStandAway").innerHTML = standHTMLAway;
        });
      }
    });
  }

  fetchWithToken(base_url+"standings?standingType=TOTAL")
    .then(status)
    .then(json)
    .then(function(data) {
      var standHTML = ``;
      var tabel = data.standings[0];
      console.log(tabel.table);
      standHTML += `
        <h5>TOTAL</h5>
        <table class="responsive-table highlight centered">
          <thead>
            <tr>
              <th>No. Urut</th>
              <th>Club</th>
              <th>Tanding</th>
              <th>Menang</th>
              <th>Kalah</th>
              <th>Seri</th>
              <th>Point</th>
            </tr>
          </thead>
          <tbody>
      `;
      tabel.table.forEach(function(team) {
        console.log(team);
        standHTML += `
          <tr>
            <td>${team.position}</td>
            <td><a href="./team.html?id=${team.team.id}">${team.team.name}</a></td>
            <td>${team.playedGames}</td>
            <td>${team.won}</td>
            <td>${team.lost}</td>
            <td>${team.draw}</td>
            <td>${team.points}</td>
          </tr>
        `;
      });
      standHTML += `
          </tbody>
        </table>
      `;
      document.getElementById("myStand").innerHTML = standHTML;
    })
    .catch(error);

    fetchWithToken(base_url+"standings?standingType=HOME")
    .then(status)
    .then(json)
    .then(function(data) {
      var standHTMLHome = ``;
      var tabel = data.standings[0];
      standHTMLHome += `
        <h5>HOME</h5>
        <table class="responsive-table striped centered">
          <thead>
            <tr>
              <th>No. Urut</th>
              <th>Club</th>
              <th>Tanding</th>
              <th>Menang</th>
              <th>Kalah</th>
              <th>Seri</th>
              <th>Point</th>
            </tr>
          </thead>
          <tbody>
      `;
      tabel.table.forEach(function(hteam) {
        standHTMLHome += `
          <tr>
            <td>${hteam.position}</td>
            <td><a href="./team.html?id=${hteam.team.id}">${hteam.team.name}</a></td>
            <td>${hteam.playedGames}</td>
            <td>${hteam.won}</td>
            <td>${hteam.lost}</td>
            <td>${hteam.draw}</td>
            <td>${hteam.points}</td>
          </tr>
        `;
      });
      standHTMLHome += `
          </tbody>
        </table>
      `;
      document.getElementById("myStandHome").innerHTML = standHTMLHome;
    })
    .catch(error);

    fetchWithToken(base_url+"standings?standingType=AWAY")
    .then(status)
    .then(json)
    .then(function(data) {
      var standHTMLAway = ``;
      var tabel = data.standings[0];
      standHTMLAway += `
        <h5>AWAY</h5>
        <table class="responsive-table centered">
          <thead>
            <tr>
              <th>No. Urut</th>
              <th>Club</th>
              <th>Tanding</th>
              <th>Menang</th>
              <th>Kalah</th>
              <th>Seri</th>
              <th>Point</th>
            </tr>
          </thead>
          <tbody>
      `;
      tabel.table.forEach(function(ateam) {
        standHTMLAway += `
          <tr>
            <td>${ateam.position}</td>
            <td><a href="./team.html?id=${ateam.team.id}">${ateam.team.name}</a></td>
            <td>${ateam.playedGames}</td>
            <td>${ateam.won}</td>
            <td>${ateam.lost}</td>
            <td>${ateam.draw}</td>
            <td>${ateam.points}</td>
          </tr>
        `;
      });
      standHTMLAway += `
          </tbody>
        </table>
      `;
      document.getElementById("myStandAway").innerHTML = standHTMLAway;
    })
    .catch(error);
}

function getMatches() {
  if ("caches" in window) {
    caches.match(base_url+"matches?status=SCHEDULED&matchday=14").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var matchHTML14 = ``;
          console.log(data.matches);
          matchHTML14 += `
            <h5>PEKAN 14</h5>
            <table class="responsive-table highlight centered">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Waktu</th>
                  <th>VS</th>
                  <th>Tuan Rumah</th>
                  <th>Penantang</th>
                </tr>
              </thead>
              <tbody>
          `;
          data.matches.forEach(function(matcha, idxa) {
            console.log(matcha);
            matchHTML14 += `
              <tr>
                <td>${idxa+1}</td>
                <td>${matcha.utcDate}</td>
                <td>${matcha.homeTeam.name} VS ${matcha.awayTeam.name}</td>
                <td><a href="./team.html?id=${matcha.homeTeam.id}">${matcha.homeTeam.name}</a></td>
                <td><a href="./team.html?id=${matcha.awayTeam.id}">${matcha.awayTeam.name}</a></td>
              </tr>
            `;
          });
          matchHTML14 += `
              </tbody>
            </table>
          `;
          document.getElementById("myMatch14").innerHTML = matchHTML14;
        });
      }
    });

    caches.match(base_url+"matches?status=SCHEDULED&matchday=15").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var matchHTML15 = ``;
          matchHTML15 += `
            <h5>PEKAN 15</h5>
            <table class="responsive-table striped centered">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Waktu</th>
                  <th>VS</th>
                  <th>Tuan Rumah</th>
                  <th>Penantang</th>
                </tr>
              </thead>
              <tbody>
          `;
          data.matches.forEach(function(matchb, idxb) {
            matchHTML15 += `
              <tr>
                <td>${idxb+1}</td>
                <td>${matchb.utcDate}</td>
                <td>${matchb.homeTeam.name} VS ${matchb.awayTeam.name}</td>
                <td><a href="./team.html?id=${matchb.homeTeam.id}">${matchb.homeTeam.name}</a></td>
                <td><a href="./team.html?id=${matchb.awayTeam.id}">${matchb.awayTeam.name}</a></td>
              </tr>
            `;
          });
          matchHTML15 += `
              </tbody>
            </table>
          `;
          document.getElementById("myMatch15").innerHTML = matchHTML15;
        });
      }
    });
  }

  fetchWithToken(base_url+"matches?status=SCHEDULED&matchday=14")
    .then(status)
    .then(json)
    .then(function(data) {
      var matchHTML14 = ``;
      console.log(data.matches);
      matchHTML14 += `
        <h5>PEKAN 14</h5>
        <table class="responsive-table highlight centered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Waktu</th>
              <th>VS</th>
              <th>Tuan Rumah</th>
              <th>Penantang</th>
            </tr>
          </thead>
          <tbody>
      `;
      data.matches.forEach(function(matcha, idxa) {
        console.log(matcha);
        matchHTML14 += `
          <tr>
            <td>${idxa+1}</td>
            <td>${matcha.utcDate}</td>
            <td>${matcha.homeTeam.name} VS ${matcha.awayTeam.name}</td>
            <td><a href="./team.html?id=${matcha.homeTeam.id}">${matcha.homeTeam.name}</a></td>
            <td><a href="./team.html?id=${matcha.awayTeam.id}">${matcha.awayTeam.name}</a></td>
          </tr>
        `;
      });
      matchHTML14 += `
          </tbody>
        </table>
      `;
      document.getElementById("myMatch14").innerHTML = matchHTML14;
    })
    .catch(error);

    fetchWithToken(base_url+"matches?status=SCHEDULED&matchday=15")
    .then(status)
    .then(json)
    .then(function(data) {
      var matchHTML15 = ``;
      matchHTML15 += `
        <h5>PEKAN 15</h5>
        <table class="responsive-table striped centered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Waktu</th>
              <th>VS</th>
              <th>Tuan Rumah</th>
              <th>Penantang</th>
            </tr>
          </thead>
          <tbody>
      `;
      data.matches.forEach(function(matchb, idxb) {
        matchHTML15 += `
          <tr>
            <td>${idxb+1}</td>
            <td>${matchb.utcDate}</td>
            <td>${matchb.homeTeam.name} VS ${matchb.awayTeam.name}</td>
            <td><a href="./team.html?id=${matchb.homeTeam.id}">${matchb.homeTeam.name}</a></td>
            <td><a href="./team.html?id=${matchb.awayTeam.id}">${matchb.awayTeam.name}</a></td>
          </tr>
        `;
      });
      matchHTML15 += `
          </tbody>
        </table>
      `;
      document.getElementById("myMatch15").innerHTML = matchHTML15;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url_team+idParam).then(function(response) {
        if (response) {
          var teamHTML = ``;
          response.json().then(function(data) {
            var urlImg = data.crestUrl.replace(/^http:\/\//i, 'https://');
            var urlWeb = data.website.replace(/^http:\/\//i, 'https://');
            teamHTML += `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="responsive-img" src="${urlImg}"/>
                </div>
                <div class="card-content">
                  <span class="card-title">${data.name}</span>
                  <p>${data.shortName} (${data.tla})</p>
                  <p>Berdiri pada Tahun ${data.founded} dengan warna khas nya, yaitu ${data.clubColors} merupakan team asuhan dari pelatih ${data.squad[(data.squad.length-1)].name}.</p>
                  <p>Team yang dikenal dengan ${data.shortName} ini pun sekarang dilengkapi dengan para pemain handal, yaitu :</p>
                  <div class="divider"></div>
                  <table class="responsive-table striped">
            `;
            data.squad.slice(0,(data.squad.length-1)).forEach(function(player) {
              teamHTML += `
                <tr>
                  <td>${player.name}</td>
                  <td>${player.nationality}</td>
                  <td>${player.position}</td>
                  <td>${player.shirtNumber}</td>
                </tr>
              `;
            });
            teamHTML += `      
                  </table>
                  <div class="divider"></div>
                  <p>Lebih Lengkap tentang ${data.shortName} :</p>
                  <p>Alamat : ${data.address}</p>
                  <p>No.Tlp : ${data.phone}</p>
                  <p>email : ${data.email}</p>
                  <p><a href="${urlWeb}">${urlWeb}</a></p>
                </div>
              </div>
            `;
            document.getElementById("bodyTeamInfo").innerHTML = teamHTML;
            resolve(data);
          });
        }
      });

      caches.match(base_url_team+idParam+"/matches?status=SCHEDULED").then(function(response) {
        if (response) {
          var teamMHTML = ``;
          response.json().then(function(dataM) {
            teamMHTML += `
              Jadwal Pertandingan Sementara yang akan dihadapi : 
              <div class="divider"></div>
              <table class="responsive-table striped">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Waktu</th>
                    <th>VS</th>
                    <th>Tuan Rumah</th>
                    <th>Penantang</th>
                  </tr>
                </thead>
                <tbody>
            `;
            dataM.matches.forEach(function(m,i){
              teamMHTML += `
                <tr>
                  <td>${i+1}</td>
                  <td>${m.utcDate}</td>
                  <td>${(m.homeTeam.id==idParam) ? '<strong>'+m.homeTeam.name+'</strong>' : m.homeTeam.name} VS ${(m.awayTeam.id==idParam) ? '<strong>'+m.awayTeam.name+'</strong>' : m.awayTeam.name}</td>
                  <td>${(m.homeTeam.id==idParam) ? '<strong>'+m.homeTeam.name+'</strong>' : m.homeTeam.name}</td>
                  <td>${(m.awayTeam.id==idParam) ? '<strong>'+m.awayTeam.name+'</strong>' : m.awayTeam.name}</td>
                </tr>
              `;
            });
            teamMHTML += `
                </tbody>
              </table>
            `;
            document.getElementById("bodyTeamMatch").innerHTML = teamMHTML;
          });
        }
      });
    }

    fetchWithToken(base_url_team+idParam)
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);
        var teamHTML = ``;
        var urlImg = data.crestUrl.replace(/^http:\/\//i, 'https://');
        var urlWeb = data.website.replace(/^http:\/\//i, 'https://');
        teamHTML += `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="responsive-img" src="${urlImg}"/>
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              <p>${data.shortName} (${data.tla})</p>
              <p>Berdiri pada Tahun ${data.founded} dengan warna khas nya, yaitu ${data.clubColors} merupakan team asuhan dari pelatih ${data.squad[(data.squad.length-1)].name}.</p>
              <p>Team yang dikenal dengan ${data.shortName} ini pun sekarang dilengkapi dengan para pemain handal, yaitu :</p>
              <div class="divider"></div>
              <table class="responsive-table striped">
        `;
        data.squad.slice(0,(data.squad.length-1)).forEach(function(player) {
          teamHTML += `
            <tr>
              <td>${player.name}</td>
              <td>${player.nationality}</td>
              <td>${player.position}</td>
              <td>${player.shirtNumber}</td>
            </tr>
          `;
        });
        teamHTML += `      
              </table>
              <div class="divider"></div>
              <p>Lebih Lengkap tentang ${data.shortName} :</p>
              <p>Alamat : ${data.address}</p>
              <p>No.Tlp : ${data.phone}</p>
              <p>email : ${data.email}</p>
              <p><a href="${urlWeb}">${urlWeb}</a></p>
            </div>
          </div>
        `;
        document.getElementById("bodyTeamInfo").innerHTML = teamHTML;
        resolve(data);
      });

    fetchWithToken(base_url_team+idParam+"/matches?status=SCHEDULED")
      .then(status)
      .then(json)
      .then(function(dataM) {
        var teamMHTML = ``;
        console.log(dataM);
        teamMHTML += `
          Jadwal Pertandingan Sementara yang akan dihadapi : 
          <div class="divider"></div>
          <table class="responsive-table striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Waktu</th>
                <th>VS</th>
                <th>Tuan Rumah</th>
                <th>Penantang</th>
              </tr>
            </thead>
            <tbody>
        `;
        dataM.matches.forEach(function(m,i){
          teamMHTML += `
            <tr>
              <td>${i+1}</td>
              <td>${m.utcDate}</td>
              <td>${(m.homeTeam.id==idParam) ? '<strong>'+m.homeTeam.name+'</strong>' : m.homeTeam.name} VS ${(m.awayTeam.id==idParam) ? '<strong>'+m.awayTeam.name+'</strong>' : m.awayTeam.name}</td>
              <td>${(m.homeTeam.id==idParam) ? '<strong>'+m.homeTeam.name+'</strong>' : m.homeTeam.name}</td>
              <td>${(m.awayTeam.id==idParam) ? '<strong>'+m.awayTeam.name+'</strong>' : m.awayTeam.name}</td>
            </tr>
          `;
        });
        teamMHTML += `
            </tbody>
          </table>
        `;
        document.getElementById("bodyTeamMatch").innerHTML = teamMHTML;
      });
  });
}

function getFavClubs() {
  getAll().then(function(teams) {
    console.log(teams.length);
    var teamsHTML = ``;
    teams.forEach(function(team) {
      var urlImg = team.crestUrl.replace(/^http:\/\//i, 'https://');
      var urlWeb = team.website.replace(/^http:\/\//i, 'https://');
      teamsHTML += `
        <div class="card">
          <a href="./team.html?id=${team.id}&saved=true">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="responsive-img" src="${urlImg}"/>
            </div>
          </a>
          <div class="card-content">
            <span class="card-title">${team.name}</span>
            <p>${team.shortName} (${team.tla})</p>
            <p>Berdiri pada Tahun ${team.founded} dengan warna khas nya, yaitu ${team.clubColors} merupakan team asuhan dari pelatih ${team.squad[(team.squad.length-1)].name}.</p>
            <p>Team yang dikenal dengan ${team.shortName} ini pun sekarang dilengkapi dengan para pemain handal, yaitu :</p>
            <div class="divider"></div>
            <table class="responsive-table striped">
      `;
      team.squad.slice(0,(team.squad.length-1)).forEach(function(player) {
        teamsHTML += `
          <tr>
            <td>${player.name}</td>
            <td>${player.nationality}</td>
            <td>${player.position}</td>
            <td>${player.shirtNumber}</td>
          </tr>
        `;
      });
      teamsHTML += `      
            </table>
            <div class="divider"></div>
            <p>Lebih Lengkap tentang ${team.shortName} :</p>
            <p>Alamat : ${team.address}</p>
            <p>No.Tlp : ${team.phone}</p>
            <p>email : ${team.email}</p>
            <p><a href="${urlWeb}">${urlWeb}</a></p>
          </div>
        </div>
      `;
    });
    document.getElementById("myFav").innerHTML = teamsHTML;
    document.getElementById("myFavLength").innerHTML = teams.length;
  });
}

function getFavById() {
  return new Promise(function(resolve, reject) {
    var urls = new URLSearchParams(window.location.search);
    var idTeam = parseInt(urls.get("id"));
    getById(idTeam).then(function(teamBy) {
      console.log(teamBy);
      var teamByHTML = ``;
      var urlImg = teamBy.crestUrl.replace(/^http:\/\//i, 'https://');
      var urlWeb = teamBy.website.replace(/^http:\/\//i, 'https://');
      teamByHTML += `
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="responsive-img" src="${urlImg}"/>
          </div>
          <div class="card-content">
            <span class="card-title">${teamBy.name}</span>
            <p>${teamBy.shortName} (${teamBy.tla})</p>
            <p>Berdiri pada Tahun ${teamBy.founded} dengan warna khas nya, yaitu ${teamBy.clubColors} merupakan team asuhan dari pelatih ${teamBy.squad[(teamBy.squad.length-1)].name}.</p>
            <p>Team yang dikenal dengan ${teamBy.shortName} ini pun sekarang dilengkapi dengan para pemain handal, yaitu :</p>
            <div class="divider"></div>
            <table class="responsive-table striped">
      `;
      teamBy.squad.slice(0,(teamBy.squad.length-1)).forEach(function(player) {
        teamByHTML += `
          <tr>
            <td>${player.name}</td>
            <td>${player.nationality}</td>
            <td>${player.position}</td>
            <td>${player.shirtNumber}</td>
          </tr>
        `;
      });
      teamByHTML += `      
            </table>
            <div class="divider"></div>
            <p>Lebih Lengkap tentang ${teamBy.shortName} :</p>
            <p>Alamat : ${teamBy.address}</p>
            <p>No.Tlp : ${teamBy.phone}</p>
            <p>email : ${teamBy.email}</p>
            <p><a href="${urlWeb}">${urlWeb}</a></p>
          </div>
        </div>
      `;
      document.getElementById("bodyTeamInfo").innerHTML = teamByHTML;
      resolve(teamBy);
    });
  });
}