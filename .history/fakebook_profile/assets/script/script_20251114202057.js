import { User } from './user.js';
import { Subscriber } from './subscriber.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('postForm');
  const text = document.getElementById('postText');
  const imgInput = document.getElementById('imageInput');
  const btn = document.getElementById('postBtn');
  const postsEl = document.getElementById('posts');

  const avatar = document.getElementById('headerAvatar');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const modalName = document.getElementById('modalName');
  const modalBio = document.getElementById('modalBio');
  const modalAvatar = document.getElementById('modalAvatar');

  const user = new Subscriber(
    101,
    "Harpreet Kaur",
    "harpreet123",
    "harpreet@example.com",
    ["Food Lovers", "Travel Diaries"],
    ["Winnipeg Students", "Punjabi Group"],
    true
  );

  const profile = {
    bio: "Hi! I love food and travel.",
    pic: "./assets/Profile pic.jpg"
  };

  class Post {
    constructor(userInfo, profile, txt, img) {
      this.user = userInfo;
      this.profile = profile;
      this.text = txt;
      this.img = img;
      this.time = new Date();
    }

    render() {
      const post = document.createElement('div');
      post.className = 'post';

      const header = document.createElement('div');
      header.className = 'post-header';

      const av = document.createElement('div');
      av.className = 'avatar';
      if (this.profile.pic) {
        av.style.backgroundImage = `url(${this.profile.pic})`;
        av.style.backgroundSize = 'cover';
        av.style.backgroundPosition = 'center';
      } else {
        av.textContent = this.user.name.charAt(0);
      }

      const info = document.createElement('div');
      const nameEl = document.createElement('div');
      nameEl.textContent = this.user.name;
      const timeEl = document.createElement('div');
      timeEl.className = 'post-meta';
      timeEl.textContent = this.time.toLocaleString();

      info.appendChild(nameEl);
      info.appendChild(timeEl);
      header.appendChild(av);
      header.appendChild(info);

      const body = document.createElement('div');
      body.className = 'post-body';
      if (this.text && this.text.trim() !== '') {
        const p = document.createElement('p');
        p.textContent = this.text;
        p.style.textAlign = 'center';
        body.appendChild(p);
      }
      if (this.img) {
        const i = document.createElement('img');
        i.src = this.img;
        i.alt = 'Post Image';
        body.appendChild(i);
      }

      post.appendChild(header);
      post.appendChild(body);
      return post;
    }
  }

  const posts = [];

  function toggleBtn() {
    btn.disabled = text.value.trim() === '' && imgInput.files.length === 0;
  }

  text.addEventListener('input', toggleBtn);
  imgInput.addEventListener('change', toggleBtn);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (imgInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => createPost(reader.result);
      reader.readAsDataURL(imgInput.files[0]);
    } else {
      createPost(null);
    }
  });

  function createPost(imgData) {
    const info = user.getInfo();
    const p = new Post(info, profile, text.value, imgData);
    posts.unshift(p);
    renderPosts();
    form.reset();
    toggleBtn();
  }

  function renderPosts() {
    postsEl.innerHTML = '';
    posts.forEach(p => {
      if (p.text || p.img) postsEl.appendChild(p.render());
    });
  }

  avatar.addEventListener('click', (e) => {
    e.preventDefault();
    const info = user.getInfo();
    modalName.textContent = info.name;
    modalBio.textContent = profile.bio;
    modalAvatar.innerHTML = '';
    if (profile.pic) {
      const i = document.createElement('img');
      i.src = profile.pic;
      i.alt = info.name;
      modalAvatar.appendChild(i);
    }
    const extra = document.createElement('div');
    extra.innerHTML = `<small>Pages: ${info.pages.join(', ')}</small><br>
                       <small>Groups: ${info.groups.join(', ')}</small><br>
                       <small>Can monetize: ${info.canMonetize}</small>`;
    modalAvatar.parentElement.appendChild(extra);
    modal.setAttribute('aria-hidden', 'false');
  });

  closeModal.addEventListener('click', () => {
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

  toggleBtn();
});
