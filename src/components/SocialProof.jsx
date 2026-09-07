import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Gift, ShieldCheck, Zap } from 'lucide-react';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import proof1 from '../assets/proofs/proof-1-optimized.webp';
import proof2 from '../assets/proofs/proof-2-optimized.webp';
import proof3 from '../assets/proofs/proof-3-optimized.webp';
import proof4 from '../assets/proofs/proof-4-optimized.webp';
import proof5 from '../assets/proofs/proof-5-optimized.webp';
import proof6 from '../assets/proofs/proof-6-optimized.webp';

const proofs = [proof1, proof2, proof3, proof4, proof5, proof6];
const resultCarouselAutoplay = {
  delay: 0,
  disableOnInteraction: true,
  pauseOnMouseEnter: true,
  waitForTransition: false,
};
const resultAutoScrollSpeed = 7000;
const resultManualScrollSpeed = 450;
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
  const takeManualControl = (swiper = swiperRef.current) => {
    if (!swiper) return;
    if (!hasManualControlRef.current) {
      hasManualControlRef.current = true;
      swiper.el?.classList.add('is-user-controlled');
    }
    const currentTranslate = swiper.getTranslate();
    swiper.autoplay?.stop();
    swiper.params.speed = resultManualScrollSpeed;
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
            modules={[Autoplay, FreeMode]}
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
            autoplay={resultCarouselAutoplay}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onTouchStart={takeManualControl}
            onSliderFirstMove={takeManualControl}
            onDragStart={takeManualControl}
            onClick={takeManualControl}
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
            {proofs.map((src, index) => (
              <SwiperSlide key={src}>
                <div className="result-card">
                  <img
                    src={src}
                    alt={`Comissão recebida ${index + 1}`}
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
