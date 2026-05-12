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
    'COMO FUNCIONA': '<strong>1. Ampliação do Repertório Vocabular</strong><br> Ao ouvir histórias narradas com qualidade profissional, a criança é exposta a palavras e estruturas gramaticais que não costumam aparecer na fala cotidiana, enriquecendo a forma como ela se expressa.',






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










// CONFIGURAÇÃO DO SEU FIREBASE (Copiado da sua imagem 37c793.png)
const firebaseConfig = {
  apiKey: "AIzaSyCgwOnJCZh7UwD2ojJLeFT7L-2QdqFLqUk",
  authDomain: "conteumconto-f4f8e.firebaseapp.com",
  databaseURL: "https://conteumconto-f4f8e-default-rtdb.firebaseio.com",
  projectId: "conteumconto-f4f8e",
  storageBucket: "conteumconto-f4f8e.firebasestorage.app",
  messagingSenderId: "841077071051",
  appId: "1:841077071051:web:1286e3ae640dc9ef934f4e",
  measurementId: "G-S644M4GX7T"
};

// INICIALIZAÇÃO (O segredo está aqui para não dar erro)
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// FUNÇÃO QUE CONTROLA OS LIKES
// Procura as linhas onde tens as funções de monitorarLike e substitui/acrescenta esta lógica:

function monitorarLikeComTrava(btnId, countId, livroID) {
    const btnLike = document.getElementById(btnId);
    const countText = document.getElementById(countId);

    if (!btnLike) return;

    // 1. Verifica logo ao carregar se este aparelho já curtiu este livro
    if (localStorage.getItem('voto_' + livroID)) {
        btnLike.disabled = true;
        btnLike.style.opacity = "0.5";
        btnLike.style.cursor = "not-allowed";
        btnLike.title = "Tu já curtiste esta história!";
    }

    btnLike.onclick = async () => {
        // 2. Bloqueio extra caso o botão seja clicado
        if (localStorage.getItem('voto_' + livroID)) {
            alert("Já registaste a tua curtida nesta história!");
            return;
        }

        try {
            // 3. Atualiza o Firebase (Transação para evitar erros de contagem)
            await database.ref('likes/' + livroID).transaction((current) => {
                return (current || 0) + 1;
            });

            // 4. Salva a "marca" no navegador (PC ou Telemóvel)
            localStorage.setItem('voto_' + livroID, 'true');

            // 5. Feedback visual imediato
            btnLike.disabled = true;
            btnLike.style.opacity = "0.5";
            alert("Obrigado pelo teu like!");

        } catch (error) {
            console.error("Erro ao curtir:", error);
        }
    };
}

// Chamas a função para cada um dos teus livros:
monitorarLikeComTrava('like-btn-pomar', 'like-count-pomar', 'pomar');
monitorarLikeComTrava('like-btn-floresta', 'like-count-floresta', 'floresta');
// ... e assim por diante

// .........................................................................ATIVAÇÃO PARA CADA BOTÃO LIKE.................................................//
monitorarLike('like-btn-pomar', 'like-count-pomar', 'pomar');
monitorarLike('like-btn-floresta', 'like-count-floresta', 'floresta');
monitorarLike('like-btn-dragon', 'like-count-dragon', 'dragon');
monitorarLike('like-btn-abelha', 'like-count-abelha', 'abelha');




function check() {
  const code = (input.value || '').trim();
  if (!code) {
    msg.textContent = 'Digite seu código.';
    input.focus();
    return;
  }

  // Acessa o Firebase para verificar o código em tempo real
  const acessoRef = database.ref('acessos/' + code);

  acessoRef.once('value').then((snapshot) => {
    const status = snapshot.val();

    if (status === "livre") {
      // Seta como "usado" no Firebase na mesma hora
      acessoRef.set("usado"); 
      
      msg.style.color = '#15803d';
      msg.textContent = 'Código válido! Liberando acesso...';
      
      // Salva na sessão do navegador para o usuário não ser barrado enquanto lê
      try { sessionStorage.setItem('acessoOK', '1'); } catch(e) {}
      
      setTimeout(() => { 
        window.location.href = 'livro/index.html'; 
      }, 500);

    } else if (status === "usado") {
      msg.style.color = '#b91c1c';
      msg.textContent = 'Este código já foi utilizado por outra pessoa.';
    } else {
      msg.style.color = '#b91c1c';
      msg.textContent = 'Código inválido ou inexistente.';
    }
  }).catch((error) => {
    console.error("Erro ao acessar o Firebase:", error);
    msg.textContent = 'Erro de conexão. Tente novamente.';
  });
}