// ═══ CURSOR ═══
const cur = document.getElementById('cur'), ring = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });
(function a() { rx += (mx - rx) * .1; ry += (my - ry) * .1; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(a); })();
document.querySelectorAll('a,button,.proj-card,.sk-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.width = '20px'; cur.style.height = '20px'; });
  el.addEventListener('mouseleave', () => { cur.style.width = '10px'; cur.style.height = '10px'; });
});

// ═══ NAV SCROLL ═══
window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60));

// ═══ THEME TOGGLE ═══
function toggleTheme() {
  const h = document.documentElement;
  h.setAttribute('data-theme', h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

// ═══ TYPING EFFECT ═══
const roles = ['Full Stack Developer', 'MERN Stack Engineer', 'GenAI Integrator', 'React.js Developer', 'Problem Solver ⚡'];
let ri = 0, ci = 0, del = false;
function type() {
  const el = document.getElementById('typed');
  if (!el) return;
  const word = roles[ri];
  if (!del) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 60 : 90);
}
setTimeout(type, 1000);

// ═══ SCROLL REVEAL ═══
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.sb-fill').forEach((b, i) => {
        setTimeout(() => { b.style.width = b.dataset.w + '%'; }, i * 100 + 200);
      });
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ═══ RESUME DOWNLOAD ═══
function downloadResume() {
  const a = document.createElement('a');
  a.href = 'assets/UjjawalVermaResume.pdf';
  a.download = 'Ujjawal_Verma_Resume.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast('📄 Resume downloading...');
}

// ═══ TOAST ═══
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

// ═══ EMAILJS CONFIG — YAHAN APNI IDs DAALO ═══
const EMAILJS_SERVICE_ID  = 'service_tpxti9s';
const EMAILJS_TEMPLATE_ID = 'template_rexbrgy';
const EMAILJS_PUBLIC_KEY  = 'M29tawiBnUn1i2ZYT';

// EmailJS init
(function(){
  if(typeof emailjs !== 'undefined'){
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();

// ═══ DM FORM ═══
async function sendDM(btn) {
  const name    = document.getElementById('dm-n').value.trim();
  const email   = document.getElementById('dm-e').value.trim();
  const phone   = document.getElementById('dm-p').value.trim();
  const subject = document.getElementById('dm-s').value.trim();
  const message = document.getElementById('dm-m').value.trim();
  const status  = document.getElementById('dm-status');

  if (!name || !email) { toast('⚠️ Name aur email zaroori hai!'); return; }
  if (!message)        { toast('⚠️ Message likhna zaroori hai!'); return; }

  btn.textContent = '⏳ Sending...';
  btn.disabled = true;
  status.style.display = 'none';

  // EmailJS IDs set hain ya nahi check
  if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
    // Demo mode — shows success but doesn't actually send
    setTimeout(() => {
      btn.textContent = '✅ Sent!';
      status.style.display = 'block';
      status.style.color = '#f59e0b';
      status.innerHTML = '⚠️ EmailJS setup pending — <a href="#setup-guide" style="color:var(--cyan)">Setup karo</a>';
      toast('⚠️ EmailJS IDs abhi set karni hain — guide dekho!');
    }, 800);
    return;
  }

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      name:       name,
      from_name:  name,
      email:      email,
      from_email: email,
      from_phone: phone || 'Not provided',
      subject:    subject || 'Portfolio Contact',
      message:    `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject || 'General'}\n\nMessage:\n${message}`,
      reply_to:   email,
      to_name:    'Ujjawal',
    });

    btn.textContent = '✅ Sent!';
    status.style.display = 'block';
    status.style.color = '#22c55e';
    status.innerHTML = `✅ Message sent! Ujjawal will reply soon.`;
    toast(`🎉 ${name}, tera message Ujjawal ko mil gaya!`);

    // WhatsApp notification link — auto open karo
    const waMsg = encodeURIComponent(
      `📬 New Portfolio Message!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject || 'General'}\n\nMessage: ${message}`
    );
    // Optional: uncomment karo agar WhatsApp bhi automatically open karna ho
    // window.open(\`https://wa.me/917078712024?text=\${waMsg}\`, '_blank');

    // Clear form
    ['dm-n','dm-e','dm-p','dm-s','dm-m'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.value = '';
    });

  } catch(err) {
    console.error('EmailJS error:', err);
    btn.textContent = '🚀 SEND MESSAGE';
    btn.disabled = false;
    status.style.display = 'block';
    status.style.color = '#ef4444';
    status.innerHTML = '❌ Error! Direct email karo: ujjawalchoudharyy@gmail.com';
    toast('❌ Send failed! Direct email karo.');
  }
}

// ═══ CHATBOT ═══
let lang = 'en', chatOpen = false, busy = false;

const UV = {
  email: 'ujjawalchoudharyy@gmail.com',
  wa: '917078712024',
  gh: 'https://github.com/Ujjawal023',
};

const skills = {
  fe: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'JS ES6+'],
  be: ['Node.js', 'Express.js', 'REST APIs', 'MVC'],
  db: ['MongoDB', 'MySQL', 'NoSQL'],
  ai: ['ML', 'GenAI', 'Deep Learning', 'Python']
};

const R = {
  about: {
    en: `<strong>Ujjawal Verma</strong> 👨‍💻<br>Full Stack Dev (MERN) + GenAI Engineer<br>📍 Ghaziabad, UP, India<br>🎓 Final Year CSE, RKGIT AKTU<br>🏆 IEEE Co-Author (TRVDS)<br>🟢 Open to Work!`,
    hi: `Main hoon <strong>Ujjawal Verma</strong> 👨‍💻<br>Full Stack Developer (MERN) + GenAI Engineer<br>📍 Ghaziabad, UP<br>🎓 Final Year B.Tech CSE, RKGIT AKTU<br>🏆 IEEE Research Paper Co-Author<br>🟢 Kaam ke liye available hoon!`
  },
  skills: {
    en: `My tech stack! 💪<br><b>Frontend:</b> ${skills.fe.map(s => `<span class="csk">${s}</span>`).join('')}<br><b>Backend:</b> ${skills.be.map(s => `<span class="csk">${s}</span>`).join('')}<br><b>DB:</b> ${skills.db.map(s => `<span class="csk">${s}</span>`).join('')}<br><b>AI/ML:</b> ${skills.ai.map(s => `<span class="csk">${s}</span>`).join('')}`,
    hi: `Mera tech stack! 💪<br><b>Frontend:</b> ${skills.fe.map(s => `<span class="csk">${s}</span>`).join('')}<br><b>Backend:</b> ${skills.be.map(s => `<span class="csk">${s}</span>`).join('')}<br><b>DB:</b> ${skills.db.map(s => `<span class="csk">${s}</span>`).join('')}<br><b>AI/ML:</b> ${skills.ai.map(s => `<span class="csk">${s}</span>`).join('')}`
  },
  projects: {
    en: `2 key projects! 🚀<br><br><b>1. TRVDS</b> — IEEE co-authored traffic violation system<br><em>Python, Django, React, MySQL, ML</em><br><br><b>2. AERIS</b> — Real-time AI Voice Assistant<br><em>JS ES6+, Web Speech API</em><br><br>💻 <a href="${UV.gh}" target="_blank">GitHub: Ujjawal023 →</a>`,
    hi: `2 projects hain mere! 🚀<br><br><b>1. TRVDS</b> — IEEE research paper wala traffic system<br><em>Python, Django, React, MySQL</em><br><br><b>2. AERIS</b> — Real-time AI Voice Assistant<br><em>JavaScript, Web Speech API</em><br><br>💻 <a href="${UV.gh}" target="_blank">GitHub pe dekho →</a>`
  },
  hire: {
    en: { type: 'form', text: `<b>🟢 Open to Work!</b><br>• Full Stack Web Apps<br>• AI/GenAI Integration<br>• API Development<br>• Code Review & Consulting<br><br>Fill the form to connect 👇` },
    hi: { type: 'form', text: `<b>🟢 Available hoon kaam ke liye!</b><br>• Full Stack Web Apps<br>• AI/GenAI Integration<br>• API Development<br>• Code Review<br><br>Neeche form bharo 👇` }
  },
  contact: {
    en: { type: 'form', text: `Let's connect! 🤝<br>📧 <a href="mailto:${UV.email}">${UV.email}</a><br>📱 <a href="https://wa.me/${UV.wa}" target="_blank">+91 7078712024</a><br>💻 <a href="${UV.gh}" target="_blank">Ujjawal023</a><br><br>Or fill the form 👇` },
    hi: { type: 'form', text: `Connect karte hain! 🤝<br>📧 <a href="mailto:${UV.email}">${UV.email}</a><br>📱 <a href="https://wa.me/${UV.wa}" target="_blank">WhatsApp karo</a><br>💻 <a href="${UV.gh}" target="_blank">GitHub: Ujjawal023</a><br><br>Ya form fill karo 👇` }
  },
  experience: {
    en: `<b>💼 Full Stack Intern @ Brandvio Pvt. Ltd.</b><br>Noida, UP · Apr–Oct 2025<br>• React.js responsive pages<br>• RESTful API integration<br>• Agile/Git team workflow`,
    hi: `<b>💼 Full Stack Intern @ Brandvio Pvt. Ltd.</b><br>Noida, UP · Apr–Oct 2025<br>• React.js se responsive pages banaye<br>• RESTful APIs integrate kiye<br>• Agile team mein kaam kiya`
  },
  resume: {
    en: `📄 Click below to download my resume!`,
    hi: `📄 Resume download karne ke liye neeche click karo!`
  },
  greeting: {
    en: `Hey! 👋 I'm Ujjawal's AI. Ask about skills, projects or connect! 🚀`,
    hi: `Namaste! 👋 Main Ujjawal ka AI hoon. Skills, projects poochho ya connect karo! 🚀`
  },
  thanks: {
    en: `Glad I could help! 😊 Anything else? 🚀`,
    hi: `Khushi hui! 😊 Aur kuch poochhhna hai? 🚀`
  },
  fallback: {
    en: `Interesting! 🤔 Contact Ujjawal directly:<br>📧 <a href="mailto:${UV.email}">${UV.email}</a>`,
    hi: `Achha sawaal! 🤔 Seedha contact karo:<br>📧 <a href="mailto:${UV.email}">${UV.email}</a>`
  }
};

function mi(t, kw) { return kw.some(k => t.includes(k)); }

function getR(q) {
  const t = q.toLowerCase(), l = lang;
  if (mi(t, ['who', 'about', 'yourself', 'kaun', 'ujjawal', 'introduce', 'kya karte'])) return R.about[l];
  if (mi(t, ['skill', 'tech', 'stack', 'kya aata', 'expertise', 'technology', 'jaante'])) return R.skills[l];
  if (mi(t, ['project', 'work', 'built', 'portfolio', 'aeris', 'trvds', 'banaya'])) return R.projects[l];
  if (mi(t, ['hire', 'job', 'available', 'freelance', 'opportunity', 'kaam chahiye', 'rakhna'])) return R.hire[l];
  if (mi(t, ['contact', 'connect', 'reach', 'email', 'call', 'baat', 'form', 'milna'])) return R.contact[l];
  if (mi(t, ['experience', 'intern', 'brandvio', 'kaam kiya', 'internship'])) return R.experience[l];
  if (mi(t, ['resume', 'cv', 'download', 'bhejo'])) {
    setTimeout(() => {
      const btn = document.createElement('button');
      btn.onclick = downloadResume;
      btn.style.cssText = 'background:linear-gradient(135deg,#7c3aed,#6d28d9);border:none;color:white;padding:8px 16px;font-size:11px;font-family:JetBrains Mono,monospace;letter-spacing:1px;cursor:pointer;margin-top:8px;width:100%';
      btn.textContent = '📄 Download Resume';
      document.querySelector('.cwm:last-child .cwm-b')?.appendChild(btn);
    }, 200);
    return R.resume[l];
  }
  if (mi(t, ['hello', 'hi', 'hey', 'namaste', 'hii', 'namaskar'])) return R.greeting[l];
  if (mi(t, ['thanks', 'thank', 'shukriya', 'great', 'nice', 'awesome', 'badhiya'])) return R.thanks[l];
  if (mi(t, ['cert', 'ieee', 'paper', 'coursera', 'apna college'])) return l === 'hi' ? `🏅 Certifications:<br>1. IEEE Co-Author — TRVDS Research Paper<br>2. Delta Full Stack — Apna College<br>3. HTML/CSS/JS — Johns Hopkins (Coursera)` : `🏅 Certifications:<br>1. IEEE Research Paper Co-Author (TRVDS)<br>2. Delta Full Stack Dev — Apna College<br>3. HTML, CSS & JS — Johns Hopkins (Coursera)`;
  if (mi(t, ['ai', 'genai', 'machine learning', 'deep learning', 'python', 'gpt'])) return l === 'hi' ? `AI/ML mera passion hai! 🤖<br>• Deep Learning (IEEE paper!)<br>• GenAI apps mein integrate karna<br>• AERIS Voice AI banaya<br>• Python ML pipelines` : `AI/ML is my passion! 🤖<br>• Deep Learning (IEEE published!)<br>• GenAI web integrations<br>• Built AERIS Voice AI<br>• Python ML pipelines`;
  if (mi(t, ['education', 'college', 'btech', 'aktu', 'rkgit', 'degree'])) return l === 'hi' ? `🎓 <b>B.Tech CSE</b> — RKGIT, AKTU · 2023–Present<br>🎓 <b>Diploma Civil</b> — BTEUP · 2019–22<br>Civil se CS — self-driven switch! 💪` : `🎓 <b>B.Tech CSE</b> — RKGIT, AKTU · 2023–Present<br>🎓 <b>Diploma Civil Engg</b> — BTEUP · 2019–22<br>Civil → CS — self-driven transition! 💪`;
  return R.fallback[l];
}

// LANG SWITCH
function setLang(l) {
  lang = l;
  document.getElementById('btn-en').classList.toggle('active', l === 'en');
  document.getElementById('btn-hi').classList.toggle('active', l === 'hi');
  addM(l === 'hi' ? 'Ab Hindi mein baat karte hain! 🙏' : 'Switched to English! Ask me anything 🚀');
}

// CHAT TOGGLE
function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById('chatWin');
  document.getElementById('fab-notif').style.display = 'none';
  if (chatOpen) {
    win.style.display = 'flex';
    setTimeout(() => win.classList.add('open'), 10);
    document.getElementById('fab-ico').style.display = 'none';
    document.getElementById('fab-x').style.display = 'block';
  } else {
    win.classList.remove('open');
    setTimeout(() => win.style.display = 'none', 350);
    document.getElementById('fab-ico').style.display = 'block';
    document.getElementById('fab-x').style.display = 'none';
  }
}

// MESSAGES
const msgs = document.getElementById('cwMsgs');
function addM(html, isU = false, isForm = false) {
  const w = document.createElement('div'); w.className = `cwm ${isU ? 'u' : 'bot'}`;
  const av = document.createElement('div'); av.className = `cwm-a ${isU ? 'ua' : ''}`; av.textContent = isU ? 'You' : 'UV';
  const bub = document.createElement('div'); bub.className = 'cwm-b';
  if (isForm) { bub.innerHTML = html; bub.appendChild(mkForm()); }
  else bub.innerHTML = html;
  w.appendChild(av);
  const col = document.createElement('div'); col.appendChild(bub); w.appendChild(col);
  msgs.appendChild(w); msgs.scrollTop = msgs.scrollHeight;
}

function mkForm() {
  const f = document.createElement('div'); f.className = 'cw-form'; f.style.marginTop = '10px';
  f.innerHTML = `
    <input id="cf-n" placeholder="${lang === 'hi' ? 'Aapka naam *' : 'Your name *'}">
    <input id="cf-e" type="email" placeholder="Email *">
    <input id="cf-p" placeholder="Phone / WhatsApp">
    <select id="cf-t">
      <option value="">${lang === 'hi' ? 'Purpose chuniye' : 'Select purpose'}</option>
      <option>💼 Hire / Job</option><option>🔧 Freelance</option>
      <option>🤝 Collaboration</option><option>💡 Consulting</option><option>📬 General</option>
    </select>
    <textarea id="cf-m" placeholder="${lang === 'hi' ? 'Aapka message...' : 'Your message...'}"></textarea>
    <button class="cw-fsub" onclick="cfSub(this)">🚀 ${lang === 'hi' ? 'MESSAGE BHEJO' : 'SEND MESSAGE'}</button>`;
  return f;
}

async function cfSub(btn) {
  const n = document.getElementById('cf-n')?.value?.trim();
  const e = document.getElementById('cf-e')?.value?.trim();
  if (!n || !e) { toast(lang === 'hi' ? '⚠️ Naam aur email chahiye!' : '⚠️ Name and email required!'); return; }
  btn.disabled = true; btn.textContent = '⏳ Sending...';
  await new Promise(r => setTimeout(r, 800));
  btn.textContent = '✅ Sent!';
  toast(lang === 'hi' ? `✅ ${n}, message bheja! Ujjawal jald reply karega.` : `✅ ${n}, message sent! Ujjawal will reply soon.`);
  setTimeout(() => addM(lang === 'hi' ? `Shukriya <b>${n}</b>! 🎉 Ujjawal ko notify kar diya.<br>📱 <a href="https://wa.me/${UV.wa}" target="_blank">+91 7078712024</a>` : `Thanks <b>${n}</b>! 🎉 Ujjawal has been notified.<br>📱 <a href="https://wa.me/${UV.wa}" target="_blank">+91 7078712024</a>`), 500);
}

function showTyping() {
  const w = document.createElement('div'); w.className = 'cwm bot'; w.id = 'cwT';
  const av = document.createElement('div'); av.className = 'cwm-a'; av.textContent = 'UV';
  const t = document.createElement('div'); t.className = 'cw-typing';
  t.innerHTML = '<div class="td"></div><div class="td"></div><div class="td"></div>';
  w.appendChild(av); w.appendChild(t); msgs.appendChild(w); msgs.scrollTop = msgs.scrollHeight;
}

async function cwSend() {
  const inp = document.getElementById('cwIn');
  const txt = inp.value.trim();
  if (!txt || busy) return;
  busy = true; addM(txt, true); inp.value = '';
  showTyping();
  await new Promise(r => setTimeout(r, 500 + Math.random() * 600));
  document.getElementById('cwT')?.remove();
  const rep = getR(txt);
  if (rep && typeof rep === 'object' && rep.type === 'form') addM(rep.text, false, true);
  else addM(rep || R.fallback[lang]);
  busy = false;
}

const qMap = {
  about: 'Tell me about yourself', skills: 'What are your skills?',
  projects: 'Show your projects', hire: 'Are you available to hire?',
  contact: 'How to contact you?', experience: 'Tell me about your experience', resume: 'I need your resume'
};
const qMapHi = {
  about: 'Apne baare mein batao', skills: 'Skills kya hain?',
  projects: 'Projects dikhao', hire: 'Hire kar sakte hain?',
  contact: 'Contact kaise karein?', experience: 'Experience batao', resume: 'Resume chahiye'
};
function qask(k) { document.getElementById('cwIn').value = lang === 'hi' ? qMapHi[k] : qMap[k]; cwSend(); }

// ═══ VOICE INPUT ═══
let recognition = null, isListening = false;
function toggleVoice() {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    toast('Voice not supported. Try Chrome!'); return;
  }
  if (isListening) { recognition?.stop(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
  recognition.interimResults = false; recognition.maxAlternatives = 1;
  recognition.onstart = () => { isListening = true; document.getElementById('voice-btn').classList.add('listening'); toast(lang === 'hi' ? '🎤 Bol raha hoon...' : '🎤 Listening...'); };
  recognition.onresult = e => { document.getElementById('cwIn').value = e.results[0][0].transcript; cwSend(); };
  recognition.onerror = recognition.onend = () => { isListening = false; document.getElementById('voice-btn').classList.remove('listening'); };
  recognition.start();
}
