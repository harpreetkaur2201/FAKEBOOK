// script.js
import { Subscriber } from './subscriber.js';

document.addEventListener('DOMContentLoaded', () => {
  // ======= DOM ELEMENTS =======
  const postForm = document.getElementById('postForm');
  const postText = document.getElementById('postText');
  const imageInput = document.getElementById('imageInput');
  const postBtn = document.getElementById('postBtn');
  const postsContainer = document.getElementById('posts');

  const profileLink = document.getElementById('profileLink');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalName = document.getElementById('modalName');
  const modalBio = document.getElementById('modalBio');
  const modalPersonality = document.getElementById('modalPersonality');
  const modalMotivation = document.getElementById('modalMotivation');
  const modalAvatar = document.getElementById('modalAvatar'); // <img> tag

  // ======= ACCOUNT DATA =======
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
    profilePic: "./assets/Profile pic.jpg", // ✅ Correct path
    personality: "Energetic & Curious",
    motivation: "Keep exploring every day!"
  };

  // ======= POST CLASS =======
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

      // Header
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

  // ======= POST BUTTON LOGIC =======
  function togglePostBtn() {
    postBtn.disabled = postText.value.trim() === '' && imageInput.files.length === 0;
  }

  postText.addEventListener('input', togglePostBtn);
  imageInput.addEventListener('change', togglePostBtn);

  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInfo = account.getInfo();

    if (imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => createPost(reader.result, userInfo);
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      createPost(null, userInfo);
    }
  });

  function createPost(imageData, userInfo) {
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

  togglePostBtn(); // initialize post button

  // ======= PROFILE MODAL LOGIC =======
  profileLink.addEventListener('click', (e) => {
    e.preventDefault();

    modalName.textContent = account.getInfo().name;
    modalBio.textContent = accountProfile.bio;
    modalPersonality.textContent = `Personality: ${accountProfile.personality}`;
    modalMotivation.textContent = `Motivation: ${accountProfile.motivation}`;

    // Set <img> src for modal
    modalAvatar.src = accountProfile.profilePic;
    modalAvatar.style.width = '100px';
    modalAvatar.style.height = '100px';
    modalAvatar.style.borderRadius = '50%';

    modal.setAttribute('aria-hidden', 'false'); // show modal
  });

  closeModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.setAttribute('aria-hidden', 'true'); // hide modal
  });
});
