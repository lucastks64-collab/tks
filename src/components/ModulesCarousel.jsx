import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { modules } from '../data/content';
import module1 from '../assets/carrosel/1-optimized.webp';
import module2 from '../assets/carrosel/2-optimized.webp';
import module3 from '../assets/carrosel/3-optimized.webp';
import module4 from '../assets/carrosel/4-optimized.webp';
import module5 from '../assets/carrosel/5-optimized.webp';
import module6 from '../assets/carrosel/6-optimized.webp';
import module7 from '../assets/carrosel/7-optimized.webp';
import module8 from '../assets/carrosel/8-optimized.webp';
import module9 from '../assets/carrosel/9-optimized.webp';

const moduleImages = { 1: module1, 2: module2, 3: module3, 4: module4, 5: module5, 6: module6, 7: module7, 8: module8, 9: module9 };
// O loop do Swiper exige pelo menos o dobro dos slides visíveis na maior largura.
const loopedModules = [...modules, ...modules];
const autoScrollSpeed = 9000;
const resumeAutoplayDelay = 900;
const carouselFreeMode = {
  enabled: true,
  momentum: true,
  momentumBounce: false,
  momentumRatio: 0.75,
  momentumVelocityRatio: 0.8,
  sticky: false,
};

function Checkmark() {
  return <span className="module-check">✓</span>;
}

export default function ModulesCarousel() {
  const [openModules, setOpenModules] = useState(() => new Set());
  const swiperRef = useRef(null);
  const hasManualControlRef = useRef(false);
  const autoScrollTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);

  // Etapa 1: cada carrossel agenda seu próximo avanço sem depender do autoplay do Swiper.
  const startAutoScroll = useCallback(function scheduleAutoScroll(swiper = swiperRef.current) {
    if (!swiper || swiper.destroyed || hasManualControlRef.current) return;
    window.clearTimeout(autoScrollTimerRef.current);
    swiper.el?.classList.remove('is-user-controlled');
    swiper.params.speed = autoScrollSpeed;
    const didMove = swiper.slideNext(autoScrollSpeed, true, true);
    autoScrollTimerRef.current = window.setTimeout(
      () => scheduleAutoScroll(swiper),
      didMove ? autoScrollSpeed + 80 : 180,
    );
  }, []);

  // Etapa 2: interrompe só este ciclo e congela na posição exata do toque.
  const takeManualControl = (swiper = swiperRef.current) => {
    if (!swiper) return;
    window.clearTimeout(autoScrollTimerRef.current);
    window.clearTimeout(resumeTimerRef.current);
    if (!hasManualControlRef.current) {
      hasManualControlRef.current = true;
      swiper.el?.classList.add('is-user-controlled');
    }
    const currentTranslate = swiper.getTranslate();
    swiper.setTranslate(currentTranslate);
    swiper.setTransition(0);
    swiper.updateProgress();
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  };

  // Etapa 3: ao soltar, espera pouco e inicia um novo ciclo da posição atual.
  const resumeAutoScroll = useCallback((swiper = swiperRef.current) => {
    if (!swiper || !hasManualControlRef.current) return;
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      if (swiper.destroyed) return;
      hasManualControlRef.current = false;
      swiper.el?.classList.remove('is-user-controlled');
      swiper.params.speed = autoScrollSpeed;
      swiper.setTransition(0);
      startAutoScroll(swiper);
    }, resumeAutoplayDelay);
  }, [startAutoScroll]);

  useEffect(() => {
    const handlePointerRelease = () => resumeAutoScroll();
    const handleVisibilityChange = () => {
      if (!document.hidden && !hasManualControlRef.current) startAutoScroll();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pointerup', handlePointerRelease, { passive: true });
    window.addEventListener('pointercancel', handlePointerRelease, { passive: true });
    window.addEventListener('touchend', handlePointerRelease, { passive: true });
    window.addEventListener('touchcancel', handlePointerRelease, { passive: true });
    startAutoScroll();

    return () => {
      window.clearTimeout(autoScrollTimerRef.current);
      window.clearTimeout(resumeTimerRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointerup', handlePointerRelease);
      window.removeEventListener('pointercancel', handlePointerRelease);
      window.removeEventListener('touchend', handlePointerRelease);
      window.removeEventListener('touchcancel', handlePointerRelease);
    };
  }, [resumeAutoScroll, startAutoScroll]);

  const moveCarousel = (direction, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    const swiper = swiperRef.current;
    if (!swiper) return;
    takeManualControl(swiper);
    const nextIndex = swiper.realIndex + (direction === 'next' ? 1 : -1);
    swiper.slideToLoop(nextIndex, 700, true);
    resumeAutoScroll(swiper);
  };

  const toggleModule = (moduleId) => {
    setOpenModules((current) => {
      const next = new Set(current);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  return (
    <section className="modules-section px-5 py-20 sm:px-8" id="modulos">
      <div className="mx-auto max-w-[1480px]">
        <div className="modules-heading">
          <span className="section-kicker">CONHEÇA OS MÓDULOS</span>
          <h2 className="font-display font-black uppercase">O conteúdo que você vai <span className="gradient-text">desbloquear</span></h2>
          <p>Clique em cada módulo e veja um spoiler do que tem dentro.</p>
        </div>

        <div className="modules-carousel-wrap">
          <button type="button" className="carousel-arrow carousel-arrow-prev" aria-label="Módulo anterior" onClick={(event) => moveCarousel('prev', event)}>
            <ChevronLeft aria-hidden="true" />
          </button>
          <Swiper
            modules={[FreeMode]}
            loop
            preventInteractionOnTransition={false}
            allowTouchMove
            simulateTouch
            freeMode={carouselFreeMode}
            touchStartPreventDefault={false}
            touchRatio={1}
            threshold={0}
            followFinger
            shortSwipes
            longSwipes
            longSwipesRatio={0.15}
            resistanceRatio={0.35}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              startAutoScroll(swiper);
            }}
            onSliderFirstMove={takeManualControl}
            onDragStart={takeManualControl}
            onTouchEnd={resumeAutoScroll}
            onTouchCancel={resumeAutoScroll}
            onDragEnd={resumeAutoScroll}
            speed={autoScrollSpeed}
            spaceBetween={16}
            slidesPerView={1.15}
            breakpoints={{
            520: { slidesPerView: 2.15, spaceBetween: 14 },
            760: { slidesPerView: 3.2, spaceBetween: 16 },
            1080: { slidesPerView: 4.25, spaceBetween: 16 },
            1360: { slidesPerView: 5.25, spaceBetween: 18 },
            1640: { slidesPerView: 6.1, spaceBetween: 18 },
            }}
            className="modules-swiper"
          >
            {loopedModules.map((mod, index) => (
              <SwiperSlide key={`${mod.id}-${index}`}>
                {mod.isLocked ? (
                  <div className="module-card module-locked-card">
                    <div className="module-lock-icon"><Lock className="h-7 w-7" /></div>
                    <h3>CONTEÚDO<br />BLOQUEADO</h3>
                    <p>Isso é apenas uma parte do treinamento.</p>
                    <a href="https://pay.kiwify.com.br/fxhc0Y8" className="module-unlock">DESBLOQUEAR <ArrowRight className="h-4 w-4" /></a>
                  </div>
                ) : (
                  <article className={`module-card ${mod.isAdvanced ? 'module-featured' : ''}`}>
                    <div className="module-cover-wrap">
                      <img
                        src={moduleImages[mod.id]}
                        alt={mod.title}
                        width="540"
                        height="810"
                        className="module-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      {!mod.isCommunity && <span className="module-number">MÓDULO {mod.id}</span>}
                      {mod.isAdvanced && <span className="module-advanced">DESTAQUE</span>}
                    </div>
                    <div className="module-details">
                      <h3 className="sr-only">{mod.title}</h3>
                      <ul>{mod.lessons.slice(0, 1).map((lesson) => <li key={lesson}><Checkmark />{lesson}</li>)}</ul>
                      <div className={`module-spoiler ${openModules.has(mod.id) ? 'is-open' : ''}`}>
                        <div>
                          <ul>{mod.lessons.slice(1).map((lesson) => <li key={lesson}><Checkmark />{lesson}</li>)}</ul>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="module-more-button"
                        aria-expanded={openModules.has(mod.id)}
                        onClick={() => toggleModule(mod.id)}
                      >
                        {openModules.has(mod.id) ? 'VER MENOS' : 'VER MAIS'}
                        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      {mod.isAdvanced && <strong className="module-more">+ aulas exclusivas</strong>}
                    </div>
                  </article>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <button type="button" className="carousel-arrow carousel-arrow-next" aria-label="Próximo módulo" onClick={(event) => moveCarousel('next', event)}>
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className="modules-offer-strip" aria-label="Bônus do treinamento">
          <p><strong>Compre o treinamento e ganhe</strong><span>uma análise de perfil completa <b>gratuitamente!</b></span></p>
          <a href="https://pay.kiwify.com.br/fxhc0Y8">QUERO GARANTIR MEU ACESSO <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}
