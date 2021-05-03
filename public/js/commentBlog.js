const commentBlogFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#inputcomment').value.trim();
    console.log(comment_text);

    let x = window.location.href.split("/");
    let id = x[x.length-1];

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ blog_id : id, comment_text }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.reload();
      } else {
        console.log(response.statusText);
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentBlogFormHandler);
