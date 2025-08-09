// Mostrar seções com animação ao scroll
const sections = document.querySelectorAll('section');
function animaScroll() {
  const windowTop = window.pageYOffset + window.innerHeight * 0.85;
  sections.forEach(section => {
    if(windowTop > section.offsetTop) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', animaScroll);
animaScroll();

// Navbar muda cor ao scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50){
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Galeria - slider simples
const imgs = document.querySelectorAll('.gallery-img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function showImage(index) {
  imgs.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imgs.length;
  showImage(currentIndex);
});

showImage(currentIndex);

// FAQ toggle
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
  btn.addEventListener('click', () => {
    const active = btn.classList.contains('active');
    faqQuestions.forEach(b => {
      b.classList.remove('active');
      b.nextElementSibling.style.maxHeight = null;
    });
    if(!active) {
      btn.classList.add('active');
      const answer = btn.nextElementSibling;
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Modo claro e escuro
const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Salvar preferência
  if(document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Aplicar tema salvo ao carregar
if(localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// Funções simuladas envio formulários com alertas e reset
function enviarOrcamento(event) {
  event.preventDefault();
  alert('Orçamento enviado com sucesso! Em breve entraremos em contato.');
  event.target.reset();
  return false;
}
function enviarNewsletter(event) {
  event.preventDefault();
  alert('Obrigado por assinar a newsletter!');
  event.target.reset();
  return false;
}
function enviarFormulario(event) {
  event.preventDefault();
  alert('Mensagem enviada com sucesso! Responderei em breve.');
  event.target.reset();
  return false;
}

// Carregar notícias tecnologia via NewsAPI
async function carregarNoticias() {
  const newsList = document.getElementById('news-list');
  const apiKey = 'fa00cc36653c42329e5e1180adf4a3e1'; // Sua chave
  const url = `https://newsapi.org/v2/top-headlines?category=technology&language=pt&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if(data.articles && data.articles.length > 0) {
      newsList.innerHTML = '';
      data.articles.slice(0, 5).forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${article.url}" target="_blank" rel="noopener">${article.title}</a>`;
        newsList.appendChild(li);
      });
    } else {
      newsList.textContent = 'Nenhuma notícia encontrada.';
    }
  } catch (error) {
    newsList.textContent = 'Erro ao carregar notícias.';
    console.error(error);
  }
}
window.addEventListener('load', carregarNoticias);

// Botões Whatsapp nos formulários Orçamento e Contato
const whatsappBudgetBtn = document.getElementById('whatsappBudget');
const whatsappContactBtn = document.getElementById('whatsappContact');

whatsappBudgetBtn.addEventListener('click', () => {
  const text = encodeURIComponent('Olá, gostaria de solicitar um orçamento detalhado.');
  window.open(`https://wa.me/5581993030148?text=${text}`, '_blank');
});

whatsappContactBtn.addEventListener('click', () => {
  const text = encodeURIComponent('Olá, quero entrar em contato.');
  window.open(`https://wa.me/5581993030148?text=${text}`, '_blank');
});
