(async () => {
  const grid = document.getElementById('igGrid');

  function cardFor(item){
    const link = item.permalink;
    const cap  = item.caption || '';
    const date = new Date(item.timestamp);

    const wrap  = document.createElement('a');
    wrap.href = link; wrap.target = '_blank'; wrap.rel = 'noopener';
    wrap.className = 'ig-card';

    const meta = document.createElement('div');
    meta.className = 'ig-meta';
    meta.textContent = date.toLocaleDateString('fr-FR', { year:'2-digit', month:'2-digit', day:'2-digit' });

    const capDiv = document.createElement('div');
    capDiv.className = 'ig-cap';
    capDiv.textContent = cap;

    if(item.media_type === 'VIDEO' || item.media_type === 'REEL'){
      const v = document.createElement('video');
      v.src = item.media_url;
      v.muted = true;
      v.playsInline = true;
      v.preload = 'metadata';
      // Affiche juste l’aperçu statique
      v.poster = item.thumbnail_url || '';
      wrap.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = item.media_url; img.loading = 'lazy';
      wrap.appendChild(img);
    }

    wrap.appendChild(meta);
    if(cap) wrap.appendChild(capDiv);
    return wrap;
  }

  try {
    const res = await fetch('/.netlify/functions/instagram-feed');
    if(!res.ok) throw new Error('bad status');
    const data = await res.json();

    grid.innerHTML = '';
    if(!data || !Array.isArray(data) || data.length === 0){
      grid.innerHTML = '<div class="ig-empty">Aucun post à afficher pour le moment.</div>';
      return;
    }

    data.forEach(item => {
      try { grid.appendChild(cardFor(item)); } catch {}
    });
  } catch (e) {
    console.error('IG error', e);
    grid.innerHTML = '<div class="ig-empty">Impossible de charger Instagram pour le moment.</div>';
  }
})();
