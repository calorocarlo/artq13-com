(function () {
  var gate = document.getElementById('extended-gate');
  var content = document.getElementById('extended-content');
  if (!gate || !content) return;

  var HASH = document.documentElement.dataset.extHash;
  var KEY = 'artq13_unlocked';

  if (localStorage.getItem(KEY) === HASH) {
    reveal();
  }

  function reveal() {
    gate.style.display = 'none';
    content.style.display = 'block';
  }

  window.lockExtended = function () {
    localStorage.removeItem(KEY);
    content.style.display = 'none';
    gate.style.display = '';
  };

  window.showUnlockPrompt = function () {
    var pw = prompt('Enter password to view extended content:');
    if (!pw) return;
    crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw))
      .then(function (buf) {
        var hash = Array.from(new Uint8Array(buf))
          .map(function (b) { return b.toString(16).padStart(2, '0'); })
          .join('');
        if (hash === HASH) {
          localStorage.setItem(KEY, HASH);
          reveal();
        } else {
          alert('Incorrect password.');
        }
      });
  };
})();
