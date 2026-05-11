// 1. Configuração (Verificada)
const firebaseConfig = {
  apiKey: "AIzaSyAs_F8_Y0_uM3nC6_z8_v1_L0_vE",
  authDomain: "conteumconto-f4f8e.firebaseapp.com",
  databaseURL: "https://conteumconto-f4f8e-default-rtdb.firebaseio.com",
  projectId: "conteumconto-f4f8e",
  storageBucket: "conteumconto-f4f8e.firebasestorage.app",
  messagingSenderId: "841077071051",
  appId: "1:841077071051:web:1286e3ae640dc9ef934f4e"
};

// 2. Inicialização Segura
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('code');
    const btn = document.getElementById('go');
    const msg = document.getElementById('msg');

    console.log("Sistema pronto. Aguardando código...");

    function check() {
        const code = (input.value || '').trim();
        if (!code) {
            msg.textContent = 'Digite seu código.';
            return;
        }

        console.log("Verificando código:", code);

        // Referência exata ao seu banco
        database.ref('acessos/' + code).once('value')
        .then((snapshot) => {
            const status = snapshot.val();
            console.log("Status recebido do banco:", status);

            if (status === "livre") {
                database.ref('acessos/' + code).set("usado");
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
                msg.textContent = 'Código inválido (não encontrado no banco).';
            }
        })
        .catch((err) => {
            console.error("Erro detalhado:", err);
            msg.textContent = 'Erro de conexão: ' + err.message;
        });
    }

    if (btn) btn.onclick = check;
    input?.addEventListener('keypress', (e) => { if (e.key === 'Enter') check(); });
});