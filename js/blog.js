document.addEventListener("DOMContentLoaded", () => {
    let currentPage = 1;
    const postsPerPage = 10;
  
    async function fetchBlogPosts() {
        try {
          const response = await fetch(`https://www.emilhalvorsen.no/wordpress-blog/wp-json/wp/v2/posts?_embed&page=${currentPage}&per_page=${postsPerPage}`);
          if (response.ok) {
            const posts = await response.json();
            const totalPosts = parseInt(response.headers.get('X-WP-Total'), 10);
            const totalPages = Math.ceil(totalPosts / postsPerPage);
            return { posts, totalPages };
          } else {
            return { posts: [], totalPages: 0 };
          }
        } catch (error) {
          console.error('Error fetching blog posts:', error);
          return { posts: [], totalPages: 0 };
        }
      }
  
    async function addBlogPostsToPage() {
  const { posts: blogPosts, totalPages } = await fetchBlogPosts();
  const blogPostsList = document.querySelector('.blog-posts-list');

  blogPosts.forEach(post => {
    if (post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
      const postElement = document.createElement('div');
      postElement.classList.add('blog-post');
      postElement.innerHTML = generateBlogPostHTML(post);
      blogPostsList.appendChild(postElement);
    }
  });

if (currentPage >= totalPages) {
    viewMorePostsButton.style.display = "none";
    blogPostsList.style.marginBottom = '50px';
  } else {
    viewMorePostsButton.style.display = "block";
    blogPostsList.style.marginBottom = ''; 
  }  
}
  
    function generateBlogPostHTML(blogPost) {
      const postId = blogPost.id;
      const title = blogPost.title.rendered;
      const imageUrl = blogPost._embedded['wp:featuredmedia'][0].source_url;
  
      return `
      <a href="post.html?post_id=${postId}">
        <h3 class="blog-post-title">${title}</h3>
        <img src="${imageUrl}" alt="${title}" class="blog-image" />
      </a>`;
    }
  
    const viewMorePostsButton = document.createElement('button');
    viewMorePostsButton.classList.add('view-more-posts');
    viewMorePostsButton.textContent = "View More Posts";
  
    const blogPostsSection = document.querySelector('.blog-posts');
    blogPostsSection.appendChild(viewMorePostsButton);
  
    viewMorePostsButton.addEventListener('click', () => {
      currentPage++;
      addBlogPostsToPage();
    });
  
    addBlogPostsToPage(); 
  });
  