// Partners, blood banks, volunteers – only run when DOM and data exist (fixes SPA + direct load)
function initPartnersSlider() {
  const track = document.getElementById("partnerTrack");
  const bloodTrack = document.getElementById("bloodTrack");
  const volunteerTrack = document.getElementById("volunteerTrack");
  if (!track || typeof partners === "undefined") return;
  if (!bloodTrack || typeof bloodBanks === "undefined") return;
  if (!volunteerTrack || typeof volunteers === "undefined") return;

  function createCards(data) {
    return (data || [])
      .map(
        (item) => `
    <div class="partner-card">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <h5>${item.name}</h5>
        <h6>${item.org}</h6>
        <small>${item.address}</small>
    </div>
  `
      )
      .join("");
  }
  track.innerHTML = createCards(partners) + createCards(partners);

  function renderBloodCards(list) {
    return (list || [])
      .map(
        (bb) => `
    <div class="partner-card">
      <img src="${bb.image}" alt="${bb.name}" loading="lazy">
      <h5>${bb.name}</h5>
      <small>${bb.address}</small>
      <p class="mb-0"><strong>Phone:</strong> ${bb.phone}</p>
    </div>
  `
      )
      .join("");
  }
  bloodTrack.innerHTML = renderBloodCards(bloodBanks) + renderBloodCards(bloodBanks);

  function renderVolunteers(list) {
    return (list || [])
      .map((name) => `<h6 class="volunteer-item">${name}</h6>`)
      .join("");
  }
  volunteerTrack.innerHTML = renderVolunteers(volunteers) + renderVolunteers(volunteers);
}

initPartnersSlider();
