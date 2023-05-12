const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("post_id");

const apiURL = `https://www.emilhalvorsen.no/wordpress-blog/wp-json/wp/v2/posts/${postId}?_embed`;

fetch(apiURL)
  .then((response) => response.json())
  .then((post) => {
    displayPost(post);
  })
  .catch((error) => {
    console.error("Error fetching post:", error);
  });

  function displayPost(post) {
    document.getElementById("post-title").textContent = post.title.rendered;
    document.getElementById("post-content").innerHTML = post.content.rendered;
  
    const postContentImages = document.querySelectorAll("#post-content img");
    postContentImages.forEach((image) => {
      image.addEventListener("click", () => {
        openImageModal(image.src);
      });
    });
  
    if (post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
      const image = document.createElement("img");
      image.src = post._embedded['wp:featuredmedia'][0].source_url;
      image.alt = post.title.rendered;
      image.classList.add("post-image");
  
      const postImageContainer = document.getElementById("post-image");
      postImageContainer.appendChild(image);
  
      image.addEventListener("click", () => {
        openImageModal(image.src);
      });
    }
  }
  
function openImageModal(src) {
  const imageModal = document.createElement("div");
  imageModal.id = "image-modal";
  imageModal.classList.add("image-modal");
  imageModal.innerHTML = `
    <img id="modal-image" class="modal-image" src="${src}" alt="Expanded view" />
  `;
  document.body.appendChild(imageModal);

  imageModal.addEventListener("click", (event) => {
    if (event.target !== document.getElementById("modal-image")) {
      closeImageModal();
    }
  });
}

function closeImageModal() {
  const imageModal = document.getElementById("image-modal");
  if (imageModal) {
    imageModal.remove();
  }
}
