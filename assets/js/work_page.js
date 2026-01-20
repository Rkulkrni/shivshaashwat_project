// 12 Years of Selfless Service photos
const galleryContainer = document.getElementById("galleryCards");

galleryData.forEach((item, index) => {
  galleryContainer.innerHTML += `
    <div class="col-md-4">
      <div class="card shadow-sm h-100">
        <div id="galleryCarousel${index}" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${item.images.map((img, i) => `
              <div class="carousel-item ${i === 0 ? "active" : ""}">
                <img src="assets/images/gallery/${img}" class="d-block w-100" loading="lazy">
              </div>
            `).join("")}
          </div>
        </div>
        <div class="card-body text-center">
          <h6 class="fw-bold mb-0">${item.title}</h6>
        </div>
      </div>
    </div>
  `;
});

// Media / Newspaper Cards

const mediaContainer = document.getElementById("mediaCards");

mediaData.forEach((item, index) => {
  mediaContainer.innerHTML += `
    <div class="col-md-4">
      <div class="card shadow-sm h-100">
        <div id="mediaCarousel${index}" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${item.images.map((img, i) => `
              <div class="carousel-item ${i === 0 ? "active" : ""}">
                <img src="assets/images/media/${img}" class="d-block w-100" loading="lazy">
              </div>
            `).join("")}
          </div>
        </div>
        <div class="card-body text-center">
          <h6 class="fw-bold mb-0">${item.title}</h6>
        </div>
      </div>
    </div>
  `;
});

const workContainer = document.getElementById("workCards");

workData.forEach(item => {
  workContainer.innerHTML += `
    <div class="col-md-4">
      <div class="card h-100 shadow-sm text-center">
        <div class="card-body">
          <img src="assets/images/work/${item.img}" width="60" class="mb-3">
          <h5 class="fw-bold">${item.title}</h5>
          <p class="text-muted">${item.text}</p>
        </div>
      </div>
    </div>
  `;
});


const activityContainer = document.getElementById("activityCards");

activityData.forEach(item => {
  activityContainer.innerHTML += `
    <div class="col-md-6">
      <div class="p-4 border rounded h-100">
        <h5 class="fw-bold">${item.title}</h5>
        <p class="text-muted">${item.text}</p>
      </div>
    </div>
  `;
});

