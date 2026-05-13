document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // ANO FOOTER
  // =========================
  const y = document.getElementById('year');

  if (y) {
    y.textContent = new Date().getFullYear();
  }


  // =========================
  // MENU MOBILE
  // =========================
  const hamburger =
    document.getElementById('hamburger');

  const nav =
    document.getElementById('primary-nav');


  function resetOnDesktop() {

    if (!window.matchMedia('(max-width: 880px)').matches) {

      nav?.classList.remove('open');

      hamburger?.classList.remove('is-open');

      hamburger?.setAttribute(
        'aria-expanded',
        'false'
      );
    }
  }

  resetOnDesktop();

  window.addEventListener(
    'resize',
    resetOnDesktop
  );


  hamburger?.addEventListener('click', () => {

    const open =
      !nav.classList.contains('open');

    nav.classList.toggle('open', open);

    hamburger.classList.toggle(
      'is-open',
      open
    );

    hamburger.setAttribute(
      'aria-expanded',
      String(open)
    );

  });


  // FECHAR MENU MOBILE
  nav?.querySelectorAll('a').forEach(a => {

    a.addEventListener('click', () => {

      if (
        window.matchMedia('(max-width: 880px)')
        .matches
      ) {

        nav.classList.remove('open');

        hamburger.classList.remove('is-open');

        hamburger.setAttribute(
          'aria-expanded',
          'false'
        );
      }

    });

  });


  // =========================
  // MODAL INFO
  // =========================
  const modalInfo =
    document.getElementById('modal-info');

  const modalTitle =
    document.getElementById('modal-title');

  const modalBody =
    document.getElementById('modal-body');

  const closeBtn =
    document.querySelector('.close-button');


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



  const menuLinks =
    document.querySelectorAll('.nav a');


  menuLinks.forEach(link => {

    link.addEventListener('click', (e) => {

      const textoMenu =
        link.textContent.trim();


      // =========================
      // ABRIR MODAL CADASTRO
      // =========================
      if (textoMenu === 'ATIVAR CÓDIGO') {

        e.preventDefault();

        const modalCadastro =
          document.getElementById('modalCadastro');

        modalCadastro.style.display = 'flex';

        return;
      }


      // =========================
      // MODAL INFO
      // =========================
      if (infoData[textoMenu]) {

        e.preventDefault();

        modalTitle.innerText =
          textoMenu;

        modalBody.innerHTML =
          infoData[textoMenu];

        modalInfo.style.display =
          'block';
      }

    });

  });


  // FECHAR MODAL INFO
  closeBtn.onclick = () => {

    modalInfo.style.display =
      'none';

  };


  window.onclick = (event) => {

    if (event.target == modalInfo) {

      modalInfo.style.display =
        'none';
    }

  };



  // =========================
  // FIREBASE
  // =========================
  const firebaseConfig = {

    apiKey:
      "AIzaSyAs_F8_Y0_uM3nC6_z8_v1_L0_vE",

    authDomain:
      "conteumconto-f4f8e.firebaseapp.com",

    databaseURL:
      "https://conteumconto-f4f8e-default-rtdb.firebaseio.com",

    projectId:
      "conteumconto-f4f8e",

    storageBucket:
      "conteumconto-f4f8e.firebasestorage.app",

    messagingSenderId:
      "841077071051",

    appId:
      "1:841077071051:web:1286e3ae640dc9ef934f4e"
  };


  if (!firebase.apps.length) {

    firebase.initializeApp(
      firebaseConfig
    );
  }

  const database =
    firebase.database();




// =========================
// LOGIN COM NOME + CÓDIGO
// =========================

const loginNome =
  document.getElementById('loginNome');

const loginCodigo =
  document.getElementById('loginCodigo');

const btn =
  document.getElementById('go');

const msg =
  document.getElementById('msg');


async function validar() {

  const nome =
    loginNome.value.trim();

  const codigo =
    loginCodigo.value.trim();


  // CAMPOS VAZIOS
  if (!nome || !codigo) {

    msg.style.color = 'red';

    msg.textContent =
      'Preencha nome e código.';

    return;
  }


  try {

    // PROCURA O USUÁRIO
    const snapshot = await database
      .ref('usuarios/' + codigo)
      .once('value');


    // NÃO EXISTE
    if (!snapshot.exists()) {

      msg.style.color = 'red';

      msg.textContent =
        'Cadastro não encontrado.';

      return;
    }


    const dados =
      snapshot.val();


    // VERIFICA NOME
    if (dados.nome !== nome) {

      msg.style.color = 'red';

      msg.textContent =
        'Nome ou código inválido.';

      return;
    }


    // LOGIN OK
    msg.style.color = '#15803d';

    msg.textContent =
      'Acesso liberado!';


    sessionStorage.setItem(
      'acessoOK',
      '1'
    );


    setTimeout(() => {

      window.location.href =
        'livro/index.html';

    }, 800);

  }

  catch (err) {

    console.error(err);

    msg.style.color = 'red';

    msg.textContent =
      'Erro ao acessar.';
  }

}


// BOTÃO
if (btn) {

  btn.onclick = validar;
}


// ENTER
loginCodigo?.addEventListener(
  'keypress',
  (e) => {

    if (e.key === 'Enter') {

      validar();
    }

  }
);


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
  // Localize todos os botões de fechar e todos os modais
const closeButtons = document.querySelectorAll('.close-button, #fecharCadastro');
const allModals = document.querySelectorAll('.modal');

// Fecha qualquer modal ao clicar em qualquer "X"
closeButtons.forEach(btn => {
  btn.onclick = () => {
    allModals.forEach(m => m.style.display = 'none');
  };
});

// Fecha ao clicar fora da caixa branca
window.onclick = (event) => {
  allModals.forEach(m => {
    if (event.target == m) {
      m.style.display = 'none';
    }
  });
};


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

});



