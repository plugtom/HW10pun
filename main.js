const userList = document.querySelector('.user-list');
const postList = document.querySelector('.post-info');

function makeElement(tag, attr_n, attr_v, content) {
  let output = document.createElement(tag);
  (!!attr_n) && output.setAttribute(attr_n, attr_v);
  output.textContent = content;
  return output;
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = `${user.name} ${user.email}`;
      listItem.addEventListener('click', () => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
          .then(response => response.json())
          .then(posts => {
            postList.textContent = ''; 
            posts.forEach(post => {
              const postElement = document.createElement('div');
              postElement.textContent = `${post.title} ${post.body}`;
              postElement.classList.add('post');
              postList.appendChild(postElement);
            });
          })
          .catch(error => console.error('Error fetching posts:', error));
      });
      userList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Error fetching users:', error));
