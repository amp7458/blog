document.addEventListener('DOMContentLoaded', () => {
    const postLinks = document.querySelectorAll('#postsList a');
    
    postLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const postId = link.getAttribute('data-id');
        
        fetch(`/posts/${postId}`)
          .then(response => response.json())
          .then(post => {
            document.getElementById('postContent').innerHTML = `
              <h1>${post.title}</h1>
              <p>${post.content}</p>
              <p>Posted on: ${new Date(post.createdAt).toDateString()}</p>
            `;
          })
          .catch(error => console.error('Error fetching post:', error));
      });
    });
  });
  