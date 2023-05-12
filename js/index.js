fetch("https://www.emilhalvorsen.no/wordpress-blog/wp-json/wp/v2/posts?_embed")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(blogPosts => {
    addBlogPostsToPage(blogPosts);
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });

function addBlogPostsToPage(blogPosts) {
  const latestPostSection = document.querySelector(".latest-post");
  const secondLatestPostSection = document.querySelector(".second-latest-post");
  const thirdLatestPostSection = document.querySelector(".third-latest-post");

  latestPostSection.innerHTML = generateBlogPostHTML(blogPosts[0]);

  secondLatestPostSection.innerHTML = generateBlogPostHTML(blogPosts[1]);

  thirdLatestPostSection.innerHTML = generateBlogPostHTML(blogPosts[2]);
}

function generateBlogPostHTML(blogPost) {
  const postId = blogPost.id; 
  const title = blogPost.title.rendered;
  const imageUrl = blogPost._embedded['wp:featuredmedia'][0].source_url;

  return `
    <a href="post.html?post_id=${postId}">
      <h3>${title}</h3>
      <img src="${imageUrl}" alt="${title}" class="blog-image" />
    </a>`;
}

document.getElementById("view-more-posts").addEventListener("click", () => {
  document.getElementById("carousel-section").style.display = "block";
  document.getElementById("view-more-posts").style.display = "none";
});




