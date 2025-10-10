
// Mobile nav toggle
const toggle = document.querySelector('.mobile-toggle');
const links = document.querySelector('nav .links');
if (toggle){
  toggle.addEventListener('click', ()=>{
    if (links.style.display === 'block'){ links.style.display = 'none' } else { links.style.display = 'block' }
  })
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
      if (window.innerWidth < 980 && links) links.style.display='none';
    }
  })
})

// Simple lightbox
document.querySelectorAll('.gallery img').forEach(img=>{
  img.addEventListener('click', ()=>{
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;z-index:9999';
    const big = document.createElement('img');
    big.src = img.src;
    big.style.cssText = 'max-width:92vw;max-height:90vh;border-radius:12px;border:1px solid rgba(255,255,255,.15)';
    overlay.appendChild(big);
    overlay.addEventListener('click', ()=>document.body.removeChild(overlay));
    document.body.appendChild(overlay);
  })
})
