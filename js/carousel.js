async function fetchBlogPosts() {
  const response = await fetch("https://www.emilhalvorsen.no/wordpress-blog/wp-json/wp/v2/posts?_embed");
  const posts = await response.json();
  populateCarousel(posts);
}

function populateCarousel(posts) {
  const carousel = document.querySelector('.carousel');

  posts.forEach((post, index) => {
    if (post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
      const carouselSlide = document.createElement('div');
      carouselSlide.classList.add('carousel-slide');
      if (index === 0) carouselSlide.classList.add('active');

      const carouselContent = document.createElement('div');
      carouselContent.classList.add('carousel-content');

      const title = document.createElement('h3');
      title.textContent = post.title.rendered;
      title.classList.add('carousel-title');

      const image = document.createElement('img');
      image.src = post._embedded['wp:featuredmedia'][0].source_url;
      image.alt = post.title.rendered;
      image.classList.add('carousel-image');

      const postLink = document.createElement('a');
      postLink.href = `post.html?post_id=${post.id}`;
      postLink.classList.add('post-link');

      postLink.appendChild(title);
      postLink.appendChild(image);

      carouselContent.appendChild(postLink);

      carouselSlide.appendChild(carouselContent);
      carousel.appendChild(carouselSlide);
    }
  });
}


fetchBlogPosts();

const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

prevButton.addEventListener('click', () => changeSlide(-1));
nextButton.addEventListener('click', () => changeSlide(1));

function changeSlide(direction) {
  const activeSlide = document.querySelector('.carousel-slide.active');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  let newIndex = Array.from(carouselSlides).indexOf(activeSlide) + direction;

  if (newIndex < 0) newIndex = carouselSlides.length - 1;
  if (newIndex >= carouselSlides.length) newIndex = 0;

  activeSlide.classList.remove('active');
  carouselSlides[newIndex].classList.add('active');
}
