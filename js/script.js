/*============================================================================
  NEXORA WEB v3 — Scripts
============================================================================*/
(function(){
  'use strict';

  /*----------  PRELOADER  ----------*/
  const loader = document.getElementById('preloader');
  function hideLoader(){
    if(!loader) return;
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }
  window.addEventListener('load',function(){setTimeout(hideLoader,700)});
  setTimeout(hideLoader,5000);

  /*----------  NAV  ----------*/
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  let ticking = false;
  window.addEventListener('scroll',function(){
    if(!ticking){
      requestAnimationFrame(function(){
        navbar.classList.toggle('scrolled',window.pageYOffset>50);
        ticking=false;
      });
      ticking=true;
    }
  },{passive:true});

  if(hamburger){
    hamburger.addEventListener('click',function(){
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active')?'hidden':'';
    });
  }
  navAnchors.forEach(function(l){
    l.addEventListener('click',function(){
      if(hamburger) hamburger.classList.remove('active');
      if(navLinks) navLinks.classList.remove('active');
      document.body.style.overflow='';
    });
  });

  const page = window.location.pathname.split('/').pop()||'index.html';
  navAnchors.forEach(function(l){
    if(l.getAttribute('href')===page) l.classList.add('active');
  });

  window.addEventListener('resize',function(){
    if(window.innerWidth>768&&hamburger&&navLinks){
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow='';
    }
  });

  /*----------  SCROLL REVEAL  ----------*/
  const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
  const ro = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        ro.unobserve(e.target);
      }
    });
  },{threshold:0.1,rootMargin:'0px 0px -30px 0px'});
  revealEls.forEach(function(el){ro.observe(el)});

  /*----------  COUNTER  ----------*/
  function animateCounter(el){
    const target = parseInt(el.getAttribute('data-target'),10);
    if(isNaN(target)) return;
    const duration = 2000;
    const start = performance.now();
    function update(now){
      const p = Math.min((now-start)/duration,1);
      const v = Math.floor((1-Math.pow(1-p,3))*target);
      el.textContent = v + (el.getAttribute('data-suffix')||'');
      if(p<1) requestAnimationFrame(update);
      else el.textContent = target + (el.getAttribute('data-suffix')||'');
    }
    requestAnimationFrame(update);
  }
  const co = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        const c = e.target.querySelector('.counter');
        if(c&&!c.dataset.animated){c.dataset.animated='true';animateCounter(c);}
        co.unobserve(e.target);
      }
    });
  },{threshold:0.5});
  document.querySelectorAll('.stat-item').forEach(function(it){co.observe(it)});

  /*----------  3D HERO PARALLAX  ----------*/
  const heroScene = document.querySelector('.hero-scene-inner');
  const heroWrap = document.querySelector('.hero-scene');
  if(heroScene&&heroWrap&&window.innerWidth>768){
    heroWrap.addEventListener('mousemove',function(e){
      const r = heroWrap.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-0.5;
      const y = (e.clientY-r.top)/r.height-0.5;
      heroScene.style.transform =
        'rotateY('+(x*6)+'deg) rotateX('+(-y*6)+'deg)';
    });
    heroWrap.addEventListener('mouseleave',function(){
      heroScene.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  /*----------  SMOOTH ANCHORS  ----------*/
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      const id = this.getAttribute('href');
      if(id==='#') return;
      const t = document.querySelector(id);
      if(t){e.preventDefault();
        window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-90,behavior:'smooth'});
      }
    });
  });

  /*----------  FAQ  ----------*/
  document.querySelectorAll('.faq-question').forEach(function(q){
    q.addEventListener('click',function(){
      this.parentElement.classList.toggle('open');
    });
  });

  /*----------  FORM  ----------*/
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent='Sending...';btn.disabled=true;
      setTimeout(function(){
        btn.textContent='Sent ✓';
        btn.style.background='#3a7d6c';
        setTimeout(function(){
          btn.textContent=orig;
          btn.style.background='';
          btn.disabled=false;
        },3000);
        form.reset();
      },1500);
    });
  }

  /*----------  WHATSAPP  ----------*/
  const wp = '919909374016';
  const waMsg = 'Hello Nexora Web, I would like a website for my business. Please share details.';
  function openWA(msg){
    window.open('https://wa.me/'+wp+'?text='+encodeURIComponent(msg||waMsg),'_blank');
  }
  document.querySelectorAll('.whatsapp-btn').forEach(function(b){
    b.addEventListener('click',function(e){e.preventDefault();openWA(this.dataset.message);});
  });
  const waFloat = document.querySelector('.whatsapp-float');
  if(waFloat) waFloat.addEventListener('click',function(e){e.preventDefault();openWA();});

})();
