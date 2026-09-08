import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Gift, ShieldCheck, Zap } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import proof1 from '../assets/proofs/proof-1-optimized.webp';
import proof2 from '../assets/proofs/proof-2-optimized.webp';
import proof3 from '../assets/proofs/proof-3-optimized.webp';
import proof4 from '../assets/proofs/proof-4-optimized.webp';
import proof5 from '../assets/proofs/proof-5-optimized.webp';
import proof6 from '../assets/proofs/proof-6-optimized.webp';

const proofs = [proof1, proof2, proof3, proof4, proof5, proof6];
// O loop do Swiper exige pelo menos o dobro dos slides visíveis na maior largura.
const loopedProofs = [...proofs, ...proofs];
const resultAutoScrollSpeed = 9000;
const resultResumeAutoplayDelay = 900;
const resultCarouselFreeMode = {
  enabled: true,
  momentum: true,
  momentumBounce: false,
  momentumRatio: 0.75,
  momentumVelocityRatio: 0.8,
  sticky: false,
};

const benefits = [
  { icon: Gift, title: 'Bônus exclusivo', text: 'Análise de perfil completa gratuitamente após a compra.', tone: 'cyan' },
  { icon: ShieldCheck, title: '7 dias de garantia', text: 'Conheça o treinamento e decida se ele é para você.', tone: 'cyan' },
  { icon: Zap, title: 'Acesso imediato', text: 'Com seu acesso liberado na hora, você já pode começar.', tone: 'pink' },
];

export default function SocialProof() {
  const swiperRef = useRef(null);
  const hasManualControlRef = useRef(false);
  const autoScrollTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);

  // Etapa 1: cada carrossel agenda seu próximo avanço sem depender do autoplay do Swiper.
  const startAutoScroll = useCallback(function scheduleAutoScroll(swiper = swiperRef.current) {
    if (!swiper || swiper.destroyed || hasManualControlRef.current) return;
    window.clearTimeout(autoScrollTimerRef.current);
    swiper.el?.classList.remove('is-user-controlled');
    swiper.params.speed = resultAutoScrollSpeed;
    const didMove = swiper.slideNext(resultAutoScrollSpeed, true, true);
    autoScrollTimerRef.current = window.setTimeout(
      () => scheduleAutoScroll(swiper),
      didMove ? resultAutoScrollSpeed + 80 : 180,
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
      swiper.params.speed = resultAutoScrollSpeed;
      swiper.setTransition(0);
      startAutoScroll(swiper);
    }, resultResumeAutoplayDelay);
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

  return (
    <section className="results-section px-5 py-20 sm:px-8" id="resultados">
      <div className="mx-auto max-w-[1480px]">
        <div className="results-heading">
          <h2 className="font-display font-black uppercase">Resultados reais com o <span className="gradient-text">TikTok Shop</span></h2>
          <p>Resultados reais que eu já conquistei trabalhando com vídeos.</p>
        </div>

        <div className="results-carousel-wrap">
          <button type="button" className="carousel-arrow carousel-arrow-prev" aria-label="Resultado anterior" onClick={(event) => moveCarousel('prev', event)}>
            <ChevronLeft aria-hidden="true" />
          </button>
          <Swiper
            modules={[FreeMode]}
            loop
            preventInteractionOnTransition={false}
            allowTouchMove
            simulateTouch
            freeMode={resultCarouselFreeMode}
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
            onTouchStart={takeManualControl}
            onSliderFirstMove={takeManualControl}
            onDragStart={takeManualControl}
            onTouchEnd={resumeAutoScroll}
            onTouchCancel={resumeAutoScroll}
            onDragEnd={resumeAutoScroll}
            speed={resultAutoScrollSpeed}
            spaceBetween={16}
            slidesPerView={1.12}
            breakpoints={{
            520: { slidesPerView: 2.1, spaceBetween: 14 },
            760: { slidesPerView: 3.1, spaceBetween: 16 },
            1080: { slidesPerView: 4.1, spaceBetween: 16 },
            1360: { slidesPerView: 5, spaceBetween: 18 },
            }}
            className="results-swiper"
          >
            {loopedProofs.map((src, index) => (
              <SwiperSlide key={`${src}-${index}`}>
                <div className="result-card">
                  <img
                    src={src}
                    alt={`Comissão recebida ${(index % proofs.length) + 1}`}
                    width="420"
                    height="911"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button type="button" className="carousel-arrow carousel-arrow-next" aria-label="Próximo resultado" onClick={(event) => moveCarousel('next', event)}>
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <p className="results-disclaimer">* Resultados reais obtidos pelo criador do treinamento. Resultados individuais podem variar.</p>

        <div className="results-benefits">
          {benefits.map(({ icon: Icon, title, text, tone }) => (
            <div className="result-benefit" key={title}>
              <div className={`result-benefit-icon ${tone}`}><Icon className="h-6 w-6" /></div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
