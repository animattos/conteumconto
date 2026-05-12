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


  const infoData = {

    'COMO FUNCIONA':
      'Nossa biblioteca oferece leitura multimodal onde a criança interage com sons e animações enquanto lê.',

    'PARCEIRO DA ESCOLA':
      'Oferecemos planos especiais para instituições de ensino. Entre em contato para integrar nossa biblioteca ao seu currículo.',

    'CONTATO':
      'E-mail: suporte@conteumconto.com.br <br> WhatsApp: (21) 97374-3649'

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
      if (textoMenu === 'CADASTRAR') {

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




//...................NÃO CURTIR DUAS X.........................//

const btnLike = document.getElementById('btn-like');
const curtidasTexto = document.getElementById('contagem-likes');
const livroID = 'segredo_do_pomar'; // O ID que você criou no Firebase

// 1. Ao carregar a página, verifica se o usuário já curtiu antes
const jaCurtiu = localStorage.getItem('curtiu_' + livroID);

if (jaCurtiu) {
  btnLike.disabled = true;
  btnLike.innerText = "✅ Já Curtido";
  btnLike.style.opacity = "0.5";
}

// 2. Lógica do clique
btnLike.onclick = async () => {
  // Verifica novamente por segurança
  if (localStorage.getItem('curtiu_' + livroID)) return;

  try {
    // Aumenta o contador no Firebase
    await database.ref('likes/' + livroID).transaction((current) => {
      return (current || 0) + 1;
    });

    // Salva no navegador que este aparelho/PC já curtiu
    localStorage.setItem('curtiu_' + livroID, 'true');

    // Desativa o botão na hora
    btnLike.disabled = true;
    btnLike.innerText = "✅ Obrigado!";
    
    alert("Curtida registrada!");
  } catch (error) {
    console.error("Erro ao curtir:", error);
  }
};