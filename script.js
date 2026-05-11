document.addEventListener('DOMContentLoaded', () => {
  // Configuração do ano no rodapé
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const input = document.getElementById('code');
  const btn   = document.getElementById('go');
  const msg   = document.getElementById('msg');

  // ---- CONFIGURAÇÃO ATUALIZADA DO SEU FIREBASE ----
  const firebaseConfig = {
    apiKey: "AIzaSyAs_F8_Y0_uM3nC6_z8_v1_L0_vE", // Atualizado conforme imagem
    authDomain: "conteumconto-f4f8e.firebaseapp.com",
    databaseURL: "https://conteumconto-f4f8e-default-rtdb.firebaseio.com",
    projectId: "conteumconto-f4f8e",
    storageBucket: "conteumconto-f4f8e.firebasestorage.app",
    messagingSenderId: "841077071051",
    appId: "1:841077071051:web:1286e3ae640dc9ef934f4e",
    measurementId: "G-S644M4GX7T"
  };

  // Inicializa o Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const database = firebase.database();

  // ---- FUNÇÃO DE ACESSO ÚNICO VIA BANCO DE DADOS ----
  function check() {
    const code = (input.value || '').trim();
    
    if (!code) {
      msg.style.color = '#b91c1c';
      msg.textContent = 'Por favor, digite seu código.';
      input.focus();
      return;
    }

    // Procura o código na pasta 'acessos'
    const acessoRef = database.ref('acessos/' + code);

    acessoRef.once('value').then((snapshot) => {
      const status = snapshot.val();

      if (status === "livre") {
        // Bloqueia o código no banco mudando para 'usado'
        acessoRef.set("usado"); 
        
        msg.style.color = '#15803d';
        msg.textContent = 'Código válido! Liberando seu acesso...';
        
        // Mantém a sessão ativa
        try { sessionStorage.setItem('acessoOK', '1'); } catch(e) {}
        
        setTimeout(() => { 
          window.location.href = 'livro/index.html'; 
        }, 600);

      } else if (status === "usado") {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Este código já foi utilizado por outra pessoa.';
      } else {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Código inválido ou inexistente.';
      }
    }).catch((error) => {
      console.error("Erro no Firebase:", error);
      msg.textContent = 'Erro de conexão. Verifique sua internet.';
    });
  }

  // Ativação por clique ou tecla Enter
  if (btn) btn.onclick = check;
  input?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') check();
  });

  // ---- FUNÇÃO DOS LIKES (Mantida para o Segredo do Pomar) ----
  function monitorarLike(idBotao, idTexto, caminho) {
    const b = document.getElementById(idBotao);
    const l = document.getElementById(idTexto);
    if (!b || !l) return;

    const ref = database.ref('likes/' + caminho);

    ref.on('value', (snap) => {
      l.innerText = snap.val() || 0;
    });

    b.onclick = (e) => {
      e.preventDefault();
      ref.transaction(atual => (atual || 0) + 1);
    };
  }

  monitorarLike('like-btn-pomar', 'like-count-pomar', 'pomar');
  monitorarLike('like-btn-floresta', 'like-count-floresta', 'floresta');
  monitorarLike('like-btn-dragon', 'like-count-dragon', 'dragon');
});