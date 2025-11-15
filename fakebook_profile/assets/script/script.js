// assets/script/script.js  (make sure index.html uses this file path with type="module")
import { User } from './user.js';
import { Subscriber } from './subscriber.js';

document.addEventListener('DOMContentLoaded', () => {
  // DOM
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

  // Create Subscriber with all required properties (manually provided)
  const account = new Subscriber(
    101,                                  // id
    "Harpreet Kaur",                      // name
    "harpreet123",                        // userName
    "harpreet@example.com",               // email
    ["Food Lovers", "Travel Diaries"],    // pages (array)
    ["Winnipeg Students", "Punjabi Group"], // groups (array)
    true                                  // canMonetize (boolean)
  );

  // UI-only profile (bio + profile pic) — NOT part of the User required fields
  const accountProfile = {
    bio: "Hi! I love food and travel.",
    profilePic: "./assets/Profile pic.jpg"
  };

  // Post class uses account.getInfo() for header name
  class Post {
    constructor(userInfo, profile, text, image) {
      this.userInfo = userInfo; // object from getInfo()
      this.profile = profile;   // UI fields
      this.text = text;
      this.image = image;
      this.time = new Date();
    }

    render() {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';

      // Header: avatar, name, time
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

      // Body
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

  // Toggle Post button: require text OR image
  function togglePostBtn() {
    postBtn.disabled = postText.value.trim() === '' && imageInput.files.length === 0;
  }

  postText.addEventListener('input', togglePostBtn);
  imageInput.addEventListener('change', togglePostBtn);

  // Submit
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
    const userInfo = account.getInfo(); // Subscriber.getInfo() calls super.getInfo()
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

  // Modal logic — USE getInfo() to populate
  headerAvatar.addEventListener('click', () => {
    const info = account.getInfo();  // <-- must come from getInfo()
    modalName.textContent = info.name;
    modalBio.textContent = accountProfile.bio || '';
    modalAvatar.innerHTML = '';
    if (accountProfile.profilePic) {
      const img = document.createElement('img');
      img.src = accountProfile.profilePic;
      img.alt = info.name;
      modalAvatar.appendChild(img);
    }

    // OPTIONAL: show subscriber details inside modal too (pages/groups)
    // Example: append below bio:
    const extra = document.createElement('div');
    extra.innerHTML = `<small>Pages: ${info.pages.join(', ') || '—'}</small><br>
                       <small>Groups: ${info.groups.join(', ') || '—'}</small><br>
                       <small>Can monetize: ${info.canMonetize}</small>`;
    modalAvatar.parentElement.appendChild(extra);

    modal.setAttribute('aria-hidden', 'false');
  });

  closeModalBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    // remove appended extra if present (clean)
    const parent = modalAvatar.parentElement;
    if (parent.lastElementChild && parent.lastElementChild.tagName === 'DIV' &&
        parent.lastElementChild.innerHTML.includes('Can monetize')) {
      parent.removeChild(parent.lastElementChild);
    }
  });

  modal.addEventListener('click', (e) => { if (e.target === modal) modal.setAttribute('aria-hidden', 'true'); });

  // initial
  togglePostBtn();
}); // end DOMContentLoaded
