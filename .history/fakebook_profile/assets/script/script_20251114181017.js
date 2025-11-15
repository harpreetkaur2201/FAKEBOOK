import { User } from './user.js';
import { Subscriber } from './subscriber.js';

document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('postForm');
  const postText = document.getElementById('postText');
  const imageInput = document.getElementById('imageInput');
  const postBtn = document.getElementById('postBtn');
  const postsContainer = document.getElementById('posts');

  const headerAvatar = document.getElementById('headerAvatar');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalName = document.getElementById('modalName');
  const modalBio = document.getElementById('modalBio');
  const modalAvatar = document.getElementById('modalAvatar');

  // Current user
  const user = {
    name: "Harpreet Kaur",
    bio: "Hi! I love food and travel.",
    profilePic: "./assets/Profile pic.jpg"
  };

  // Post constructor
  function Post(user, text, image) {
    this.user = user;
    this.text = text;
    this.image = image;
    this.time = new Date();

    this.render = function() {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';

      // Header
      const headerDiv = document.createElement('div');
      headerDiv.className = 'post-header';

      const avatarDiv = document.createElement('div');
      avatarDiv.className = 'avatar';
      if (user.profilePic) {
        avatarDiv.style.backgroundImage = `url(${user.profilePic})`;
        avatarDiv.style.backgroundSize = 'cover';
        avatarDiv.style.backgroundPosition = 'center';
      } else {
        avatarDiv.textContent = user.name.charAt(0);
      }

      const nameDiv = document.createElement('div');
      const nameEl = document.createElement('div');
      nameEl.textContent = user.name;

      const timeEl = document.createElement('div');
      timeEl.className = 'post-meta';
      timeEl.textContent = this.time.toLocaleString();

      nameDiv.appendChild(nameEl);
      nameDiv.appendChild(timeEl);
      headerDiv.appendChild(avatarDiv);
      headerDiv.appendChild(nameDiv);

      // Body
      const bodyDiv = document.createElement('div');
      bodyDiv.className = 'post-body';
      const textP = document.createElement('p');
      textP.textContent = this.text;
      textP.style.textAlign = 'center';
      bodyDiv.appendChild(textP);

      if (this.image) {
        const img = document.createElement('img');
        img.src = this.image;
        bodyDiv.appendChild(img);
      }

      postDiv.appendChild(headerDiv);
      postDiv.appendChild(bodyDiv);

      return postDiv;
    }
  }

  const posts = [];

  // Enable/disable post button
  function togglePostBtn() {
    postBtn.disabled = postText.value.trim() === '' && imageInput.files.length === 0;
  }

  postText.addEventListener('input', togglePostBtn);
  imageInput.addEventListener('change', togglePostBtn);

  // Submit post
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        createPost(reader.result);
      }
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      createPost(null);
    }
  });

  function createPost(image) {
    const newPost = new Post(user, postText.value, image);
    posts.unshift(newPost);
    renderPosts();
    postForm.reset();
    togglePostBtn();
  }

  function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
      if (post.text || post.image) {
        postsContainer.appendChild(post.render());
      }
    });
  }

  // Modal logic
  headerAvatar.addEventListener('click', () => {
    modalName.textContent = user.name;
    modalBio.textContent = user.bio;
    modalAvatar.innerHTML = '';
    if (user.profilePic) {
      const img = document.createElement('img');
      img.src = user.profilePic;
      img.alt = user.name;
      modalAvatar.appendChild(img);
    }
    modal.setAttribute('aria-hidden', 'false');
  });

  closeModalBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
  });

});
