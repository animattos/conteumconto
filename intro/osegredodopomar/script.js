document.addEventListener('DOMContentLoaded', () => {
  // footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const input = document.getElementById('code');
  const btn   = document.getElementById('go');
  const msg   = document.getElementById('msg');

  // ---- Mobile menu toggle (igual ao index) ----
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('primary-nav');

  function resetOnDesktop(){
    if (!window.matchMedia('(max-width: 880px)').matches){
      nav?.classList.remove('open');
      hamburger?.classList.remove('is-open');
      hamburger?.setAttribute('aria-expanded','false');
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

  // fecha o menu ao clicar em um link, no mobile
  nav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 880px)').matches){
        nav.classList.remove('open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded','false');
      }
    });
  });


  btn.addEventListener('click', validar);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') validar();
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

  'CONTATO': 'E-mail: suporte@conteumconto.com.br <br> WhatsApp: (21) 97374-3649',

  'CADASTRAR': `

  <div class="cadastro-box">

    <input
      type="text"
      id="cadNome"
      placeholder="Digite seu nome"
      class="cad-input"
    >

    <input
      type="text"
      id="cadCodigo"
      placeholder="Digite seu código"
      class="cad-input"
    >

    <button id="btnCadastrar" class="cad-btn">
      VALIDAR CADASTRO
    </button>

    <p id="cadMsg"></p>

  </div>

`
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
        modalBody.innerHTML = infoData[textoMenu];
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

// ........................................BANCODADOS......................................................................)
const firebaseConfig = {
  apiKey: "AIzaSyAs_F8_Y0_uM3nC6_z8_v1_L0_vE",
  authDomain: "conteumconto-f4f8e.firebaseapp.com",
  databaseURL: "https://conteumconto-f4f8e-default-rtdb.firebaseio.com",
  projectId: "conteumconto-f4f8e",
  storageBucket: "conteumconto-f4f8e.firebasestorage.app",
  messagingSenderId: "841077071051",
  appId: "1:841077071051:web:1286e3ae640dc9ef934f4e"
};

// 2. Inicialização
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('code');
  const btn = document.getElementById('go');
  const msg = document.getElementById('msg');

  // Função para validar
  function validar() {
    const code = (input.value || '').trim();
    if (!code) {
      msg.textContent = 'Digite seu código.';
      return;
    }

    // Procura no Realtime Database
   database.ref('likes/acessos/' + code).once('value')
      .then((snapshot) => {
        const status = snapshot.val();

        if (status === "livre") {
          // Muda para usado
          database.ref('likes/acessos/' + code).set("usado");
          msg.style.color = '#15803d';
          msg.textContent = 'Código válido! Entrando...';
          sessionStorage.setItem('acessoOK', '1');
          
          setTimeout(() => { 
            window.location.href = 'livro/index.html'; 
          }, 800);
        } else if (status === "usado") {
          msg.style.color = '#b91c1c';
          msg.textContent = 'Este código já foi utilizado.';
        } else {
          msg.style.color = '#b91c1c';
          msg.textContent = 'Código inválido.';
        }
      })
      .catch((err) => {
        console.error(err);
        msg.textContent = 'Erro de ligação ao banco.';
      });
  }

  if (btn) btn.onclick = validar;
  input?.addEventListener('keypress', (e) => { if (e.key === 'Enter') validar(); });
});

// ..............................VALIDAR CADASTRO ..........................................//

document.addEventListener('click', (e) => {

  // BOTÃO VALIDAR CADASTRO
  if (e.target && e.target.id === 'btnCadastrar') {

    const nome =
      document.getElementById('cadNome').value.trim();

    const codigo =
      document.getElementById('cadCodigo').value.trim();

    const msg =
      document.getElementById('cadMsg');


    // CAMPOS VAZIOS
    if (!nome || !codigo) {

      msg.style.color = 'red';

      msg.textContent =
        'Preencha todos os campos.';

      return;
    }


    // PROCURA O CÓDIGO
    database.ref('codigos/' + codigo)
      .once('value')

      .then((snapshot) => {

        // NÃO EXISTE
        if (!snapshot.exists()) {

          msg.style.color = 'red';

          msg.textContent =
            'Código inválido.';

          return;
        }

        const dados = snapshot.val();


        // JÁ USADO
        if (dados.status !== 'livre') {

          msg.style.color = 'red';

          msg.textContent =
            'Código já utilizado.';

          return;
        }


        // SALVA USUÁRIO
        database.ref('usuarios/' + codigo).set({

          nome: nome,
          codigo: codigo

        });


        // MUDA STATUS
        database.ref(
          'codigos/' + codigo + '/status'
        ).set('usado');


        msg.style.color = 'green';

        msg.textContent =
          'Cadastro realizado com sucesso!';

      })

      .catch((err) => {

        console.error(err);

        msg.style.color = 'red';

        msg.textContent =
          'Erro ao validar código.';
      });
  }

});

document.addEventListener('click', async (e) => {

  // BOTÃO VALIDAR
  if (e.target.id === 'btnCadastrar') {

    const nome =
      document.getElementById('cadNome').value.trim();

    const codigo =
      document.getElementById('cadCodigo').value.trim();

    const msg =
      document.getElementById('cadMsg');


    // CAMPOS VAZIOS
    if (!nome || !codigo) {

      msg.style.color = 'red';

      msg.textContent =
        'Preencha todos os campos.';

      return;
    }


    try {

      // PROCURA CÓDIGO
      const snapshot = await database
        .ref('codigos/' + codigo)
        .once('value');


      // NÃO EXISTE
      if (!snapshot.exists()) {

        msg.style.color = 'red';

        msg.textContent =
          'Código inválido.';

        return;
      }

      const dados = snapshot.val();


      // JÁ USADO
      if (dados.status !== 'livre') {

        msg.style.color = 'red';

        msg.textContent =
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


      msg.style.color = 'green';

      msg.textContent =
        'Cadastro realizado com sucesso!';


    } catch (err) {

      console.error(err);

      msg.style.color = 'red';

      msg.textContent =
        'Erro ao cadastrar.';
    }

  }

});