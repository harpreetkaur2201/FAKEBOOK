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

  const account = new Subscriber(
    101,
    "Harpreet Kaur",
    "harpreet123",
    "harpreet@example.com",
    ["Food Lovers", "Travel Diaries"],
    ["Winnipeg Students", "Punjabi Group"],
    true
  );

  const accountProfile = {
    bio: "Hi! I love food and travel.",
    profilePic: "./assets/Profile pic.jpg"
  };

  class Post {
    constructor(userInfo, profile, text, image) {
      this.userInfo = userInfo;
      this.profile = profile;
      this.text = text;
      this.image = image;
      this.time = new Date();
    }

    render() {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';

      const headerDiv = document.createElement('div');
      headerDiv.className = 'post-header';

      const avatarDiv = document.createElement('div');
      avatarDiv.className = 'avatar';
      if (this.profile.profilePic) {
        avatarDiv.style.backgroundImage = `url(${this.profile.profilePic})`;
        avatarDiv.style.backgroundSize = 'cover';
        avatarDiv.style.backgroundPosition = 'center';
      } else {
        avatarDiv.textContent = this.userInfo.name.charAt(0);
      }

      const nameDiv = document.createElement('div');
      const nameEl = document.createElement('div');
      nameEl.textContent = this.userInfo.name;

      const timeEl = document.createElement('div');
      timeEl.className = 'post-meta';
      timeEl.textContent = this.time.toLocaleString();

      nameDiv.appendChild(nameEl);
      nameDiv.appendChild(timeEl);
      headerDiv.appendChild(avatarDiv);
      headerDiv.appendChild(nameDiv);

      const bodyDiv = document.createElement('div');
      bodyDiv.className = 'post-body';
      if (this.text && this.text.trim() !== '') {
        const textP = document.createElement('p');
        textP.textContent = this.text;
        textP.style.textAlign = 'center';
        bodyDiv.appendChild(textP);
      }
      if (this.image) {
        const img = document.createElement('img');
        img.src = this.image;
        img.alt = 'Posted image';
        bodyDiv.appendChild(img);
      }

      postDiv.appendChild(headerDiv);
      postDiv.appendChild(bodyDiv);
      return postDiv;
    }
  }

  const posts = [];

  function togglePostBtn() {
    postBtn.disabled = postText.value.trim() === '' && imageInput.files.length === 0;
  }

  postText.addEventListener('input', togglePostBtn);
  imageInput.addEventListener('change', togglePostBtn);

  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => createPost(reader.result);
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      createPost(null);
    }
  });

  function createPost(imageData) {
    const userInfo = account.getInfo();
    const newPost = new Post(userInfo, accountProfile, postText.value, imageData);
    posts.unshift(newPost);
    renderPosts();
    postForm.reset();
    togglePostBtn();
  }

  function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach(p => {
      if (p.text || p.image) postsContainer.appendChild(p.render());
    });
  }

  headerAvatar.addEventListener('click', (e) => {
    e.preventDefault();
    const info = account.getInfo();
    modalName.textContent = info.name;
    modalBio.textContent = accountProfile.bio;
    modalAvatar.innerHTML = '';
    if (accountProfile.profilePic) {
      const img = document.createElement('img');
      img.src = accountProfile.profilePic;
      img.alt = info.name;
      modalAvatar.appendChild(img);
    }
    modal.setAttribute('aria-hidden', 'false');
});

    const extra = document.createElement('div');
    extra.innerHTML = `<small>Pages: ${info.pages.join(', ')}</small><br>
                       <small>Groups: ${info.groups.join(', ')}</small><br>
                       <small>Can monetize: ${info.canMonetize}</small>`;
    modalAvatar.parentElement.appendChild(extra);

    modal.setAttribute('aria-hidden', 'false');
  });

  closeModalBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    const parent = modalAvatar.parentElement;
    if (parent.lastElementChild && parent.lastElementChild.tagName === 'DIV' &&
        parent.lastElementChild.innerHTML.includes('Can monetize')) {
      parent.removeChild(parent.lastElementChild);
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
  });

  togglePostBtn();
});
