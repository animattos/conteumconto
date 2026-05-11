// Small interactions
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Scroll suave nos links do topo
  document.querySelectorAll('.nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth'});
        // fecha o menu ao clicar em um link no mobile
        const nav = document.getElementById('primary-nav');
        const hamburger = document.getElementById('hamburger');
        if (window.matchMedia('(max-width: 880px)').matches){
          nav.classList.remove('open');
          hamburger.classList.remove('is-open');
          hamburger.setAttribute('aria-expanded','false');
        }
      }
    });
  }); // <-- FECHA o forEach/callback aqui!

  // ======= Paginação (9 por página) =======
  (function setupPagination(){
    const grid = document.querySelector('.catalogo .grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.card'));
    const pageSize = 9;
    const totalPages = Math.ceil(cards.length / pageSize);

    // esconde a barra se tiver 9 ou menos
    let pager = document.getElementById('pager');
    if (totalPages <= 1){
      if (pager) pager.style.display = 'none';
      return;
    }

    // garante que o pager exista fora da grid
    if (!pager){
      pager = document.createElement('nav');
      pager.id = 'pager';
      pager.className = 'pager';
      grid.after(pager);
    }

    let currentPage = 1;

    function renderPage(page = 1){
      currentPage = Math.max(1, Math.min(page, totalPages));
      const start = (currentPage - 1) * pageSize;
      const end   = start + pageSize;

      cards.forEach((card, i) => {
        card.style.display = (i >= start && i < end) ? '' : 'none';
      });

      drawControls();

      const h = document.getElementById('titulo-catalogo');
      if (h) h.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function button(label, page, disabled = false, active = false){
      return `<button class="page-btn ${active ? 'is-active' : ''}" data-page="${page}" ${disabled ? 'disabled' : ''}>${label}</button>`;
    }

    function drawControls(){
      let html = '';
      html += button('« Anterior', currentPage - 1, currentPage === 1);
      for (let i = 1; i <= totalPages; i++){
        html += button(String(i), i, false, i === currentPage);
      }
      html += button('Próxima »', currentPage + 1, currentPage === totalPages);
      pager.innerHTML = html;

      pager.querySelectorAll('.page-btn').forEach(b => {
        b.addEventListener('click', () => {
          const p = parseInt(b.dataset.page, 10);
          if (!isNaN(p)) renderPage(p);
        });
      });
    }

    renderPage(1);
  })();

  // CTA (exemplo)
  document.getElementById('cta')?.addEventListener('click', () => {
    alert('Plano mensal: R$29,90 — (placeholder)');
  });

  // ---- Mobile menu toggle (fechado por padrão) ----
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('primary-nav');
  function resetOnDesktop(){
    if (!window.matchMedia('(max-width: 880px)').matches){
      nav.classList.remove('open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded','false');
    }
  }
  resetOnDesktop();
  window.addEventListener('resize', resetOnDesktop);

  hamburger?.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    hamburger.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-info');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close-button');
  
  // Informações que vão aparecer em cada menu
  const infoData = {
    'COMO FUNCIONA': 'Nossa biblioteca oferece leitura multimodal onde a criança interage com sons e animações enquanto lê.',
    'PARCEIRO DA ESCOLA': 'Oferecemos planos especiais para instituições de ensino. Entre em contato para integrar nossa biblioteca ao seu currículo.',
    'CONTATO': 'E-mail: suporte@conteumconto.com.br <br> WhatsApp: (21)  97374-3649'
  };

  // Seleciona os links do nav (exceto o INÍCIO se quiser que ele continue apenas voltando ao topo)
  const menuLinks = document.querySelectorAll('.nav a');

  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const textoMenu = link.textContent.trim();
      
      // Se tivermos informação para esse menu, abrimos o popup
      if (infoData[textoMenu]) {
        e.preventDefault(); // Impede o pulo da página
        modalTitle.innerText = textoMenu;
        modalBody.innerHTML = `<p>${infoData[textoMenu]}</p>`;
        modal.style.display = 'block';
      }
    });
  });

  // Fechar ao clicar no X
  closeBtn.onclick = () => modal.style.display = 'none';

  // Fechar ao clicar fora da caixa branca
  window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
  };
});