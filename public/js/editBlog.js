const updateBlogFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#blog-title').value;
    const content = document.querySelector('#blog-content').value;
    let x = window.location.href.split("/");
    let id = x[x.length-1];
    
    const response = await fetch(`/api/blog/${id}`,{
        method: 'PUT',
        body: JSON.stringify({  blog_id: id, title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log(response.statusText);
        alert(response.statusText);
      
    }
}
document
.querySelector('.blog-form')
.addEventListener('submit', updateBlogFormHandler);