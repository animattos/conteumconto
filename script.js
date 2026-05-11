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