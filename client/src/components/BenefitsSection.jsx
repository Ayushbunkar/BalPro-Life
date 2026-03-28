import React from 'react';

const BenefitsSection = () => {
  const benefits = [
    {
      number: '01',
      title: 'Steady Energy',
      description: 'No sugar spikes. Just sustained fuel from healthy fats and complex minerals.'
    },
    {
      number: '02',
      title: 'Deep Recovery',
      description: 'Magnesium and Zinc support overnight muscle repair and nervous system calm.'
    },
    {
      number: '03',
      title: 'Cognitive Edge',
      description: 'Polyphenols crossing the blood-brain barrier to keep you sharp and focused.'
    }
  ];

  return (
    <section className="py-10 md:py-14 min-h-[calc(100svh-6rem)] flex items-center" id="benefits">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                alt="Person Drinking"
                className="w-full h-[340px] md:h-[460px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFuimltsyeWIrQbPrj9iQ6l7elbPkWpZ0IE23IRHBvZ22vnV2gMtfi4TiIdjZqse-Yxk9trcagkSr_Yiyz0ta96aSga8rNmvYMrJVtzURJQESxSbUurZRDdUUDnxD17OAxRkdMBbp3cnsmfjIaq8cP8jnIKaoRBh3X18D22zoo4BcGLrjC6jxXvBPVwUa8VpM37P2vt1NWLxLIF1mConVI_D-fYD5bi4jjb0GaCRcookZww-oZUr1unSB-qsiOlIZgSJXbdpj5QA"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 glass-panel p-8 rounded-xl shadow-2xl border border-tertiary/20 hidden md:block">
              <div className="text-tertiary font-bold text-4xl">100%</div>
              <div className="text-sm uppercase tracking-tighter">Plant Based Integrity</div>
            </div>
          </div>

          <div className="space-y-7">
            <h2 className="font-headline text-4xl lg:text-5xl font-bold leading-tight">Elevate Every Aspect.</h2>
            <div className="space-y-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full border border-tertiary flex items-center justify-center text-tertiary font-bold">
                    {benefit.number}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                    <p className="text-on-surface-variant">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
