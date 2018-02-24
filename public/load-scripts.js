function loadScripts(scripts) {
  for (let i = 0; i < scripts.length; i++) {
    const script = document.createElement('script');
    script.src = scripts[i];
    document.body.appendChild(script);
  }
}

module.exports = { loadScripts };
