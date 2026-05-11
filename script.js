// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Configuração do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAs_F8_Y0_uM3nC6_z8_v1_L0_vE",
    authDomain: "conteumconto-f4f8e.firebaseapp.com",
    databaseURL: "https://conteumconto-f4f8e-default-rtdb.firebaseio.com",
    projectId: "conteumconto-f4f8e",
    storageBucket: "conteumconto-f4f8e.firebasestorage.app",
    messagingSenderId: "841077071051",
    appId: "1:841077071051:web:1286e3ae640dc9ef934f4e",
    measurementId: "G-S644M4GX7T"
  };

  // 2. Inicialização
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const database = firebase.database();

  // 3. Referências dos elementos da página
  const input = document.getElementById('code');
  const btn = document.getElementById('go');
  const msg = document.getElementById('msg');

  // 4. Função de Verificação
  function check() {
    const code = (input.value || '').trim();

    if (!code) {
      msg.style.color = '#b91c1c';
      msg.textContent = 'Por favor, digite seu código.';
      return;
    }

    // Busca no Firebase na pasta 'acessos'
    database.ref('acessos/' + code).once('value').then((snapshot) => {
      const status = snapshot.val();

      if (status === "livre") {
        // Marca como usado imediatamente
        database.ref('acessos/' + code).set("usado");

        msg.style.color = '#15803d';
        msg.textContent = 'Código válido! Liberando acesso...';

        sessionStorage.setItem('acessoOK', '1');

        setTimeout(() => {
          window.location.href = 'livro/index.html';
        }, 600);

      } else if (status === "usado") {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Este código já foi utilizado.';
      } else {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Código inválido.';
      }
    }).catch((error) => {
      console.error("Erro Firebase:", error);
      msg.textContent = 'Erro de conexão com o banco.';
    });
  }

  // 5. Eventos
  if (btn) btn.onclick = check;
  input?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') check();
  });
});