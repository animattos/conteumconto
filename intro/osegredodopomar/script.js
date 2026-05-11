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

// 2. Inicialização Global
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('code');
  const btn = document.getElementById('go');
  const msg = document.getElementById('msg');
  const y = document.getElementById('year');

  if (y) y.textContent = new Date().getFullYear();

  // 3. Função de Verificação
  function check() {
    const code = (input.value || '').trim();
    if (!code) {
      msg.style.color = '#b91c1c';
      msg.textContent = 'Digite seu código.';
      return;
    }

    database.ref('acessos/' + code).once('value').then((snapshot) => {
      const status = snapshot.val();

      if (status === "livre") {
        database.ref('acessos/' + code).set("usado");
        msg.style.color = '#15803d';
        msg.textContent = 'Código válido! Entrando...';
        sessionStorage.setItem('acessoOK', '1');
        setTimeout(() => { window.location.href = 'livro/index.html'; }, 600);
      } else if (status === "usado") {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Este código já foi utilizado.';
      } else {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Código inválido.';
      }
    }).catch((err) => {
      console.error(err);
      msg.textContent = 'Erro ao conectar ao banco.';
    });
  }

  // 4. Eventos de clique e tecla
  if (btn) btn.onclick = check;
  input?.addEventListener('keypress', (e) => { if (e.key === 'Enter') check(); });
});