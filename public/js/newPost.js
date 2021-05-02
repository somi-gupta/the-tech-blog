const newBlogFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#blog-title').value;
    const content = document.querySelector('#blog-content').value;

    const response = await fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log(response.statusText);
        alert(response.statusText);
      }
    };  

    document
    .querySelector('.blog-form')
    .addEventListener('submit', newBlogFormHandler);