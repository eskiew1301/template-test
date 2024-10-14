const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
totalImages = 0;
let photosArray = [];

// API
const count = 5;
const type = "photo";
const term = "nature+birds";
const apiKey = "46473251-ca4dc2963449a96f956207e80";
const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${term}&image_type=${type}&per_page=${count}`;

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

// Helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links & photos & Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // Run function for each object in photosArray

  photosArray.forEach((photo) => {
    // Create <a> to link to pixaby
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.pageURL,
      target: "_blank",
    });
    // item.setAttribute("href", photo.pageURL);
    // item.setAttribute("target", "_blank");

    // create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.previewURL);
    // img.setAttribute("alt", photo.tags);
    // img.setAttribute("title", photo.tags);

    setAttributes(img, {
      src: photo.previewURL,
      alt: photo.tags,
      title: photo.tags,
    });
    //event listener, check whwn each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, the put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//  Get photos form the site

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    data = await res.json();
    photosArray = data.hits;
    displayPhotos();
  } catch (error) {
    // Catch error
  }
}
// check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//  on load
getPhotos();
