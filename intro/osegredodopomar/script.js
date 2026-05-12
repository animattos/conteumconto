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

        modalCadastro.style.display =
          'block';

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
  // LOGIN COM CÓDIGO
  // =========================
  const input =
    document.getElementById('code');

  const btn =
    document.getElementById('go');

  const msg =
    document.getElementById('msg');


  async function validar() {

    const code =
      (input.value || '').trim();


    if (!code) {

      msg.textContent =
        'Digite seu código.';

      return;
    }


    try {

      const snapshot = await database
        .ref('likes/acessos/' + code)
        .once('value');


      const status =
        snapshot.val();


      if (status === 'livre') {

        await database
          .ref('likes/acessos/' + code)
          .set('usado');


        msg.style.color =
          '#15803d';

        msg.textContent =
          'Código válido! Entrando...';


        sessionStorage.setItem(
          'acessoOK',
          '1'
        );


        setTimeout(() => {

          window.location.href =
            'livro/index.html';

        }, 800);

      }

      else if (status === 'usado') {

        msg.style.color =
          '#b91c1c';

        msg.textContent =
          'Este código já foi utilizado.';
      }

      else {

        msg.style.color =
          '#b91c1c';

        msg.textContent =
          'Código inválido.';
      }

    }

    catch (err) {

      console.error(err);

      msg.textContent =
        'Erro de ligação ao banco.';
    }

  }


  if (btn) {

    btn.onclick = validar;
  }


  input?.addEventListener(
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
  fecharCadastro.onclick = () => {

    modalCadastro.style.display =
      'none';

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