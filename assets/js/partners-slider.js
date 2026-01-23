// create partner cards
const track = document.getElementById("partnerTrack");

function createCards(data) {
  return data
    .map(
      (item) => `
    <div class="partner-card">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <h5>${item.name}</h5>
        <h6>${item.org}</h6>
        <small>${item.address}</small>
    </div>`,
    )
    .join("");
}

// original + duplicate for infinite scroll
track.innerHTML = createCards(partners) + createCards(partners);

// blood bank cards code
const bloodTrack = document.getElementById("bloodTrack");

function renderBloodCards(list) {
  return list
    .map(
      (bb) => `
    <div class="partner-card">
      <img src="${bb.image}" alt="${bb.name}" loading="lazy">
      <h5>${bb.name}</h5>
      <small>${bb.address}</small>
      <p class="mb-0"><strong>Phone:</strong> ${bb.phone}</p>
    </div>`,
    )
    .join("");
}

// original + duplicate for smooth infinite scroll
bloodTrack.innerHTML =
  renderBloodCards(bloodBanks) + renderBloodCards(bloodBanks);

// Valunteer scolling functionality
const volunteerTrack = document.getElementById("volunteerTrack");

function renderVolunteers(list) {
  return list
    .map(
      (name) => `
    <h6 class="volunteer-item">
      ${name}
    </h6>
  `,
    )
    .join("");
}

// duplicate for infinite scroll
volunteerTrack.innerHTML =
  renderVolunteers(volunteers) + renderVolunteers(volunteers);
