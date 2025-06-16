document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const nav = document.querySelector('nav');
  const navButtons = nav.querySelectorAll('button');
  const sections = {
    hero: document.getElementById('hero'),
    about: document.getElementById('about'),
    coffees: document.getElementById('coffees'),
    chat: document.getElementById('chat'),
    barista: document.getElementById('barista'),
    bookshelf: document.getElementById('bookshelf'),
    contact: document.getElementById('contact')
  };

  nav.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      navButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      Object.values(sections).forEach(sec => sec.hidden = true);
      const section = sections[e.target.dataset.section];
      if (section) {
        section.hidden = false;
        section.focus();
      }
    }
  });

  // Portfolio (เมนูผลงาน)
  const menuItems = document.querySelectorAll('.menu-item');
  const coffeeDetail = document.querySelector('.coffee-detail');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      coffeeDetail.innerHTML = `<h4>${item.querySelector('h3').textContent}</h4><p>${item.querySelector('p').textContent}</p>`;
    });
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') item.click();
    });
  });

  // Chat
  const chatWindow = document.getElementById('chatWindow');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = chatForm.querySelector('.chat-send-button');
  const clearBtn = document.getElementById('clearChat');
  const typingIndicator = document.getElementById('typingIndicator');
  let messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');

  function renderMessages() {
    chatWindow.innerHTML = '';
    messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'chat-message ' + (msg.role === 'user' ? 'user' : '');
      div.textContent = msg.text;
      chatWindow.appendChild(div);
    });
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  function addMessage(role, text) {
    messages.push({ role, text });
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    renderMessages();
  }
  function typing(show) {
    typingIndicator.textContent = show ? 'บาริสต้ากำลังพิมพ์...' : '';
  }
  renderMessages();

  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage('user', text);
    chatInput.value = '';
    sendBtn.disabled = true;
    typing(true);
    setTimeout(() => {
      typing(false);
      const replies = [
        "ขอบคุณที่แชร์ครับ รู้สึกดีที่ได้พูดคุยกับคุณ",
        "ขอเป็นกำลังใจให้นะครับ ทุกอย่างจะผ่านไปได้",
        "ขอบคุณที่ไว้วางใจร้านกาแฟฮีลใจ",
        "หากอยากพูดคุยเพิ่มเติม ยินดีรับฟังเสมอครับ"
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      addMessage('barista', reply);
      sendBtn.disabled = false;
    }, 1800);
  });

  clearBtn.addEventListener('click', () => {
    messages = [];
    localStorage.setItem('chatMessages', '[]');
    renderMessages();
    addMessage('barista', 'ยินดีต้อนรับสู่ "ร้านกาแฟฮีลใจ" พิมพ์ข้อความด้านล่างนี้เพื่อพูดคุยกันนะครับ :)');
  });
});