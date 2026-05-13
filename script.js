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

    'O QUE É?': '<strong>O que é o Conte um Conto?</strong><br>É uma biblioteca digital viva que utiliza tecnologia multimodal para transformar a hora da leitura. Unimos ilustrações artísticas, narrações profissionais e design sonoro imersivo para resgatar a imaginação, acelerar a alfabetização e oferecer uma alternativa educativa ao uso passivo de telas. Descubra no menu (Benefícios) como estamos transformando o tempo de tela em desenvolvimento real para o seu filho. Somos mais do que um produto, somos uma experiência sonora e visual que estimula o cérebro, educa o coração e liberta a imaginação do seu filho. ',


    'COMO FUNCIONA?': '<strong>Plano Individual</strong><br>Ao assinar o plano individual, você recebe um código exclusivo. Basta validá-lo no menu (Ativar Código) para liberar seu acesso. Depois, é só escolher sua história favorita e entrar usando seu nome e código. Simples assim!<br><br><strong>Plano Escolar</strong><br>Este é um projeto de parceria educativa para escolas oferecerem uma ferramenta de ponta no currículo digital, para o suporte ao desenvolvimento infantil. Oferecemos planos especiais para instituições de ensino, entre em contato para integrar nossa biblioteca ao seu currículo. Confira no menu (Parceiro da Escola) os detalhes de como aderir ao plano e seus benefícios.',



     'BENEFICIOS': '<strong>1. Ampliação do Repertório Vocabular</strong><br> Ao ouvir histórias narradas com qualidade profissional, a criança é exposta a palavras e estruturas gramaticais que não costumam aparecer na fala cotidiana, enriquecendo a forma como ela se expressa.<br><br><strong>2. Estímulo à Imaginação Criativa</strong><br> Diferente dos desenhos animados, onde a imagem entrega tudo pronto, o áudio multimodal exige que o cérebro da criança "complete" a cena. Ela imagina as cores, os cheiros e os detalhes das ambientações, exercitando o músculo da criatividade.<br><br><strong>3. Facilitação da Alfabetização (Associação Fonética)</strong><br>O sistema multimodal permite que a criança conecte o som das palavras às imagens e, futuramente, aos textos. Isso cria uma base sólida para que ela aprenda a ler com muito mais facilidade e prazer.<br><br> <strong>4. Aumento da Capacidade de Concentração (Foco)</strong><br>Em um mundo de vídeos ultra-rápidos (como TikTok/Reels), ouvir uma história com início, meio e fim treina a "atenção sustentada". A criança aprende a manter o foco em uma narrativa por períodos mais longos.<br><br><strong>5. Desenvolvimento da Inteligência Emocional</strong><br>As histórias apresentam dilemas, medos e vitórias. Através dos personagens, a criança aprende a identificar e nomear as próprias emoções, desenvolvendo empatia e resiliência para lidar com situações do dia a dia.<br><br><strong>6. Aguçamento da Percepção Auditiva</strong><br>O uso de efeitos sonoros (o vento, o som de passos, a mudança de tom de voz) ensina a criança a distinguir sons e a interpretar camadas sonoras, o que é fundamental para o desenvolvimento cognitivo e até para o aprendizado de línguas estrangeiras.<br><br><strong>7. Redução da Ansiedade e Melhoria do Sono</strong>O ritmo da narração é pensado para ser acolhedor. Substituir a luz azul e o ritmo frenético dos vídeos por uma história contada ajuda a baixar os níveis de cortisol, preparando o cérebro para um sono profundo e reparador.<br><br><strong>8. Estímulo à Curiosidade Crítica</strong><br>Com uma história nova todos os dias, a criança desenvolve o hábito de questionar, prever o que vai acontecer e se interessar por novos temas, desde o funcionamento da natureza até lendas de culturas distantes.<br><br><strong>9. Autonomia Digital Segura</strong><br>A interface simples permite que a criança escolha sua própria aventura. Isso gera um sentimento de independência e confiança ("eu consigo escolher e ouvir sozinho"), dentro de um ambiente controlado e livre de riscos.<br><br><strong>10. Fortalecimento do Vínculo Cultural</strong><br>O acesso a um catálogo diversificado apresenta à criança diferentes realidades e valores morais, ajudando na formação de um cidadão com visão de mundo mais ampla e consciente.<br><br><strong>',


    'PARCEIRO DA ESCOLA': ' <strong>1. Quer ser nosso parceiro?</strong><br>Ao consolidar a parceria, sua instituição recebe um lote de 100 códigos personalizados (ex: escola001, escola002), facilitando o gerenciamento e o envio aos responsáveis. Esse modelo permite que a escola integre o acesso à plataforma diretamente na mensalidade por um preço abaixo do que oferecemos no plano individual, ou ofereça uma condição exclusiva grátis, tornando a biblioteca digital um benefício acessível e de alto valor agregado para os alunos. <br>Assine o Plano Escolar e descubra como podemos transformar o tempo de tela em um portal para a imaginação. Nosso projeto foi desenhado para apoiar a alfabetização real de forma lúdica e envolvente. Para entender nossa proposta em detalhes, faça o download do nosso projeto pedagógico em PDF.' + 
    '<div style="text-align: center; margin-top: 20px;">' +
      '<a href="assets/projeto_escola.pdf" target="_blank" download="Projeto_Escola_Conte_Um_Conto.pdf" class="btn btn-primary" style="font-size: 13px; padding: 10px 15px;">' +
        '📥 BAIXAR PROJETO' +
      '</a>' +
    '</div>',
    


    
    'CONTATO': 'E-mail: contato@conteumconto.com.br <br> WhatsApp: (21)  97374-3649'
  };







  

  // Seleciona os links do nav
const menuLinks = document.querySelectorAll('.nav a');

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const textoMenu = link.textContent.trim();
    
    // 1. LÓGICA ESPECÍFICA PARA O BOTÃO CADASTRAR
    if (textoMenu === 'ATIVAR CÓDIGO') {
      e.preventDefault(); // Impede o link de recarregar a página
      const modalCadastro = document.getElementById('modalCadastro');
      if (modalCadastro) {
        // Usamos 'flex' porque seu CSS usa align-items: center para centralizar o popup
        modalCadastro.style.display = 'flex'; 
      }
      return; // Encerra aqui para não tentar abrir o modal de informações
    }

    // 2. LÓGICA PARA OS OUTROS BOTÕES (COMO FUNCIONA, CONTATO, ETC)
    if (infoData[textoMenu]) {
      e.preventDefault();
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
function monitorarLike(idBotao, idTexto, caminho) {
    const btn = document.getElementById(idBotao);
    const label = document.getElementById(idTexto);
    if (!btn || !label) return;

    const ref = database.ref('likes/' + caminho);

    // Mostra o valor atual que vem do banco
    ref.on('value', (snap) => {
        label.innerText = snap.val() || 0;
    });

    // Soma +1 quando clica
    btn.onclick = (e) => {
        e.preventDefault();
        ref.transaction(atual => (atual || 0) + 1);
    };
}










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






  // =========================
  // MODAL CADASTRO
  // =========================
  const modalCadastro =
    document.getElementById('modalCadastro');

  const fecharCadastro =
    document.getElementById('fecharCadastro');

  const btnCadastrar =
    document.getElementById('btnCadastrar');

  const cadMsg =
    document.getElementById('cadMsg');


  // FECHAR
 // Aguarda o documento carregar completamente
document.addEventListener('DOMContentLoaded', () => {

  // Seleciona todos os modais e todos os botões de fechar
  const modais = document.querySelectorAll('.modal');
  const botoesFechar = document.querySelectorAll('.close-button, #fecharCadastro');

  // Adiciona a função de fechar para cada botão encontrado
  botoesFechar.forEach(botao => {
    botao.onclick = () => {
      modais.forEach(modal => {
        modal.style.display = 'none';
      });
    };
  });

  // Fecha o modal se o usuário clicar na parte escura (fora da caixa branca)
  window.onclick = (event) => {
    modais.forEach(modal => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  };
});


  // CADASTRAR
  btnCadastrar.onclick = async () => {

    const nome =
      document.getElementById('cadNome')
      .value
      .trim();

    const codigo =
      document.getElementById('cadCodigo')
      .value
      .trim();


    if (!nome || !codigo) {

      cadMsg.style.color =
        'red';

      cadMsg.textContent =
        'Preencha todos os campos.';

      return;
    }


    try {

      const snapshot = await database
        .ref('codigos/' + codigo)
        .once('value');


      // CÓDIGO NÃO EXISTE
      if (!snapshot.exists()) {

        cadMsg.style.color =
          'red';

        cadMsg.textContent =
          'Código inválido.';

        return;
      }


      const dados =
        snapshot.val();


      // JÁ UTILIZADO
      if (dados.status !== 'livre') {

        cadMsg.style.color =
          'red';

        cadMsg.textContent =
          'Código já utilizado.';

        return;
      }


      // SALVA USUÁRIO
      await database
        .ref('usuarios/' + codigo)
        .set({

          nome: nome,

          codigo: codigo

        });


      // ALTERA STATUS
      await database
        .ref('codigos/' + codigo + '/status')
        .set('usado');


      cadMsg.style.color =
        'green';

      cadMsg.textContent =
        'Cadastro realizado com sucesso!';


    }

    catch (err) {

      console.error(err);

      cadMsg.style.color =
        'red';

      cadMsg.textContent =
        'Erro ao cadastrar.';
    }
};

// --- NOVO BLOCO PARA O BOTÃO SEJA ASSINANTE ---
document.addEventListener('DOMContentLoaded', () => {
  const btnCta = document.getElementById('cta');
  const modalPlanos = document.getElementById('modalPlanos');
  const fecharPlanos = document.getElementById('fecharPlanos');

  if (btnCta && modalPlanos) {
    btnCta.addEventListener('click', (e) => {
      e.preventDefault(); // Evita qualquer comportamento padrão
      modalPlanos.style.display = 'flex'; // Abre o novo modal
    });
  }

  // Lógica para fechar este modal específico pelo botão "X"
  if (fecharPlanos) {
    fecharPlanos.addEventListener('click', () => {
      modalPlanos.style.display = 'none';
    });
  }
});





  


// ======= SOLUÇÃO PARA ABRIR PLANOS SEM CONFLITO =======
document.addEventListener('DOMContentLoaded', () => {
  const btnCta = document.getElementById('cta');
  const modalPlanos = document.getElementById('modalPlanos');

  if (btnCta && modalPlanos) {
    // Esta linha abaixo remove o "alert" antigo e qualquer outra função 
    // que estivesse presa ao botão antes
    btnCta.onclick = (e) => {
      e.stopImmediatePropagation(); // Impede que o alert antigo apareça
      e.preventDefault();
      modalPlanos.style.display = 'flex';
    };
  }
});





// ======= LOGICA PARA O FORMULÁRIO DE ASSINATURA =======
document.addEventListener('DOMContentLoaded', () => {
  const modalDados = document.getElementById('modalDadosAssinatura');
  const fecharDados = document.getElementById('fecharDados');
  
  // Seleciona todos os botões de assinar que estão DENTRO do modal de planos
  const botoesAssinar = document.querySelectorAll('#modalPlanos .btn-cta');

  botoesAssinar.forEach(botao => {
    botao.addEventListener('click', () => {
      // Opcional: fechar o modal de planos antes de abrir o de dados
      document.getElementById('modalPlanos').style.display = 'none';
      
      // Abrir o modal de dados
      modalDados.style.display = 'flex';
    });
  });

  if (fecharDados) {
    fecharDados.onclick = () => {
      modalDados.style.display = 'none';
    };
  }
});