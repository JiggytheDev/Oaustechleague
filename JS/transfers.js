fetch('/league_clubs.json/transfer_players.json')
   .then(res => res.json())
   .then(data => {
      const tbody = document.getElementById("transfers");

      data.transfers.forEach(transfer => {
        const row = document.createElement('tr');
        row.classList.add("transfTable");

        row.innerHTML = `
            <td class="player-details">
              <img src="${transfer.playerIcon}">
              <h3>${transfer.playerName}</h3>
            </td>
            <td class="transfer-type">
               ${transfer.transferType}
            </td>
            <td class="outgoingClub">
               <img src="${transfer.prevClubLogo}">
               ${transfer.transferredFrom}
            </td>
            <td class="incomingClub"> 
               <img src="${transfer.newClubLogo}">
               ${transfer.transferredTo}
            </td>
        `;

        tbody.append(row);
      })
   })