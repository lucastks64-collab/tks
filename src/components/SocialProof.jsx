import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ChevronLeft, ChevronRight, Gift, ShieldCheck, Zap } from 'lucide-react';
import { useMemo } from 'react';
import proof1 from '../assets/proofs/proof-1-optimized.webp';
import proof2 from '../assets/proofs/proof-2-optimized.webp';
import proof3 from '../assets/proofs/proof-3-optimized.webp';
import proof4 from '../assets/proofs/proof-4-optimized.webp';
import proof5 from '../assets/proofs/proof-5-optimized.webp';
import proof6 from '../assets/proofs/proof-6-optimized.webp';

const proofs = [proof1, proof2, proof3, proof4, proof5, proof6];
const loopedProofs = [...proofs, ...proofs];
const benefits = [
  { icon: Gift, title: 'Bônus exclusivo', text: 'Análise de perfil completa gratuitamente após a compra.', tone: 'cyan' },
  { icon: ShieldCheck, title: '7 dias de garantia', text: 'Conheça o treinamento e decida se ele é para você.', tone: 'cyan' },
  { icon: Zap, title: 'Acesso imediato', text: 'Com seu acesso liberado na hora, você já pode começar.', tone: 'pink' },
];

export default function SocialProof() {
  const autoScroll = useMemo(() => AutoScroll({
    speed: 0.5,
    startDelay: 80,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
    stopOnFocusIn: false,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
  }), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: false,
    dragFree: true,
    loop: true,
  }, [autoScroll]);

  return (
    <section className="results-section px-5 py-20 sm:px-8" id="resultados">
      <div className="mx-auto max-w-[1480px]">
        <div className="results-heading">
          <h2 className="font-display font-black uppercase">Resultados reais com o <span className="gradient-text">TikTok Shop</span></h2>
          <p>Resultados reais que eu já conquistei trabalhando com vídeos.</p>
        </div>

        <div className="results-carousel-wrap">
          <button type="button" className="carousel-arrow carousel-arrow-prev" aria-label="Resultado anterior" onClick={() => emblaApi?.scrollPrev()}>
            <ChevronLeft aria-hidden="true" />
          </button>
          <div className="results-embla-viewport" ref={emblaRef}>
            <div className="results-embla-container">
              {loopedProofs.map((src, index) => (
                <div className="results-embla-slide" key={`${src}-${index}`}>
                  <div className="result-card">
                    <img src={src} alt={`Comissão recebida ${(index % proofs.length) + 1}`} width="420" height="911" loading="lazy" decoding="async" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="carousel-arrow carousel-arrow-next" aria-label="Próximo resultado" onClick={() => emblaApi?.scrollNext()}>
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
