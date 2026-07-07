// =======================================
// BANEUIRE GALLERY
// =======================================

const galleryImages = document.querySelectorAll(".gallery-item img");

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.querySelector(".close");

let currentIndex = 0;

// =======================================
// OPEN IMAGE
// =======================================

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentIndex = index;

        lightbox.style.display = "flex";

        lightboxImage.src = item.querySelector("img").src;

        document.body.style.overflow = "hidden";

    });

});

// =======================================
// CLOSE LIGHTBOX
// =======================================

function closeLightbox(){

    lightbox.style.display = "none";

    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", closeLightbox);

// =======================================
// CLICK OUTSIDE IMAGE
// =======================================

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        closeLightbox();

    }

});

// =======================================
// SHOW IMAGE
// =======================================

function showImage(index){

    if(index < 0){

        currentIndex = galleryImages.length - 1;

    }

    else if(index >= galleryImages.length){

        currentIndex = 0;

    }

    else{

        currentIndex = index;

    }

    lightboxImage.src = galleryImages[currentIndex].src;

}

// =======================================
// KEYBOARD CONTROLS
// =======================================

document.addEventListener("keydown",(e)=>{

    if(lightbox.style.display !== "flex") return;

    if(e.key === "Escape"){

        closeLightbox();

    }

    if(e.key === "ArrowRight"){

        showImage(currentIndex + 1);

    }

    if(e.key === "ArrowLeft"){

        showImage(currentIndex - 1);

    }

});

// =======================================
// PRELOAD IMAGES
// =======================================

galleryImages.forEach(img=>{

    const preload = new Image();

    preload.src = img.src;

});