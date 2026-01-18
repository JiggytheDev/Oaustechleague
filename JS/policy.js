fetch('/league_clubs.json/policy.json')
  .then (res => res.json())
  .then(data => {
    /* const container = document.getElementById("policy"); */
    console.log(data);
  })
  .catch(error) 
;  