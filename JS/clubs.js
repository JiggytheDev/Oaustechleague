fetch('/league_clubs.json/clubs.json')
  .then(res => res.json())
  .then(data => {
    const clubss = document.getElementById("showClubs");

    data.clubs.forEach(club => {
      const row = document.createElement('div');

      row.innerHTML = `
        <a class="oplClubs" data-id="${club.id}" href="/html/clubs-info.html">
          <img src="${club.clubLogo}" alt="">
          <h3>${club.clubname}</h3>
        </a>
      `;

      row.querySelector('.oplClubs').addEventListener("click", () => {
         localStorage.setItem('selectedClubId', club.id);
      });

      clubss.append(row);

    });
  });
;  