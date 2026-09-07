import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useRef, useState } from 'react';
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
const carouselAutoplay = {
  delay: 0,
  disableOnInteraction: true,
  pauseOnMouseEnter: true,
  waitForTransition: false,
};
const autoScrollSpeed = 7000;
const manualScrollSpeed = 450;
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
  const takeManualControl = (swiper = swiperRef.current) => {
    if (!swiper) return;
    if (!hasManualControlRef.current) {
      hasManualControlRef.current = true;
      swiper.el?.classList.add('is-user-controlled');
    }
    const currentTranslate = swiper.getTranslate();
    swiper.autoplay?.stop();
    swiper.params.speed = manualScrollSpeed;
    swiper.setTranslate(currentTranslate);
    swiper.setTransition(0);
    swiper.updateProgress();
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  };
  const moveCarousel = (direction, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    const swiper = swiperRef.current;
    if (!swiper) return;
    takeManualControl(swiper);
    const nextIndex = swiper.realIndex + (direction === 'next' ? 1 : -1);
    swiper.slideToLoop(nextIndex, 700, true);
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
            modules={[Autoplay, FreeMode]}
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
            autoplay={carouselAutoplay}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onTouchStart={takeManualControl}
            onSliderFirstMove={takeManualControl}
            onDragStart={takeManualControl}
            onClick={takeManualControl}
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
            {modules.map((mod) => (
              <SwiperSlide key={mod.id}>
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
