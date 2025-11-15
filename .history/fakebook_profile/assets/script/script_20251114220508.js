/* 
========================================
STEP 1: IMPORTS
Purpose:
- Import Subscriber class for user account info
*/
import { Subscriber } from './subscriber.js';

/* 
========================================
STEP 2: DOM ELEMENTS
Purpose:
- Get references to all elements needed for posts and modal
*/
document.addEventListener('DOMContentLoaded', () => {
  // Post elements
  const postForm = document.getElementById('postForm');
  const postText = document.getElementById('postText');
  const imageInput = document.getElementById('imageInput');
  const postBtn = document.getElementById('postBtn');
  const postsContainer = document.getElementById('posts');

  // Modal elements
  const profileLink = document.getElementById('headerAvatar'); // clickable avatar
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalName = document.getElementById('modalName');
  const modalBio = document.getElementById('modalBio');
  const modalAvatar = document.getElementById('modalAvatar');

  /* 
  STEP 3: ACCOUNT INFO
  Purpose:
  - Create a user account object with info and profile picture
  */
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
    profilePic: "./assets/Profile pic.jpg",
    personality: "Energetic & Curious",
    motivation: "Keep exploring every day!"
  };

  /* 
  STEP 4: POST CLASS
  Purpose:
  - Define structure for each post
  - Render posts with header, text, and optional image/video
  */
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

  /* 
  STEP 5: POST HANDLING
  Purpose:
  - Store posts
  - Enable/disable Post button based on content
  - Create posts with text and optional image
  - Render posts with spacing between them
  */
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
    posts.unshift(newPost); // newest first
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

  /* 
  STEP 6: MODAL FUNCTIONALITY
  Purpose:
  - Show profile info when avatar clicked
  - Bio now includes personality and motivation
  - Close modal when clicking close button or overlay
  */
  profileLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Name
    modalName.textContent = account.getName();

    // Bio + personality + motivation
    modalBio.textContent = `${accountProfile.bio} | ${accountProfile.personality} | "${accountProfile.motivation}"`;

    // Avatar
    modalAvatar.innerHTML = '';
    if (accountProfile.profilePic) {
      const img = document.createElement('img');
      img.src = accountProfile.profilePic;
      img.alt = account.getName();
      modalAvatar.appendChild(img);
    }

    // Show modal
    modal.setAttribute('aria-hidden', 'false');
  });

  closeModalBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
  });

  togglePostBtn(); // initialize post button state
});
