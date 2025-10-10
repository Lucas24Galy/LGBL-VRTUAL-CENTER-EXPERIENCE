// Menu mobile
const toggle = document.querySelector('.mobile-toggle');
const links = document.querySelector('nav .links');
if (toggle){
  toggle.addEventListener('click', ()=>{
    if (!links) return;
    links.style.display = links.style.display === 'block' ? 'none' : 'block';
  });
}

// Lightbox simple (pour les galeries si tu en ajoutes)
document.querySelectorAll('.gallery img').forEach(img=>{
  img.addEventListener('click', ()=>{
    const o = document.createElement('div');
    o.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;z-index:9999';
    const big = document.createElement('img');
    big.src = img.src;
    big.style.cssText = 'max-width:92vw;max-height:90vh;border-radius:12px;border:1px solid rgba(255,255,255,.15)';
    o.appendChild(big);
    o.addEventListener('click', ()=>document.body.removeChild(o));
    document.body.appendChild(o);
  });
});
