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

  // Load codes from codes.json
  let validCodes = [];
  fetch('codes.json')
    .then(res => res.json())
    .then(data => { validCodes = (data && data.codes) ? data.codes.map(String) : []; })
    .catch(() => { validCodes = ['mattos123','mattos321']; });

  function check(){
    const code = (input.value || '').trim();
    if (!code){
      msg.textContent = 'Digite seu código.';
      input.focus();
      return;
    }
    const ok = validCodes.includes(code);
    if (ok){
      msg.style.color = '#15803d';
      msg.textContent = 'Código válido! Redirecionando...';
      // libera acesso nesta aba/janela
      try { sessionStorage.setItem('acessoOK', '1'); } catch(e) {}
      // redireciona para a página protegida
      setTimeout(() => { window.location.href = 'livro/index.html'; }, 400);
    }else{
      msg.style.color = '#b91c1c';
      msg.textContent = 'Código inválido. Tente novamente.';
      input.focus();
      input.select();
    }
  }

  btn.addEventListener('click', check);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') check();
  });
});
