const deleteBlogFormHandler = async (event) => {
    event.preventDefault();
   
    let x = window.location.href.split("/");
    let id = x[x.length-1];
    
    const response = await fetch(`/api/blog/${id}`,{
        method: 'DELETE',
        // body: JSON.stringify({ blog_id: id }),
        // headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log(response.statusText);
        alert(response.statusText);
      
    }
}
document
.querySelector('.delete-blog')
.addEventListener('click', deleteBlogFormHandler);