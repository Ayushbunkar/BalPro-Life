import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Lalit Pawar',
      role: 'Verified Collector',
      text: '"Finally, a protein drink that doesn\'t taste like chalk. It\'s my daily afternoon luxury that actually gives me energy."',
      stars: 5
    },
    {
      name: 'Kaustybh Soni',
      role: 'Peak Performance Coach',
      text: '“BalProLife keeps me energized and focused throughout the day. It’s now part of my daily routine.”',
      stars: 5,
      marginTop: true
    },
    {
      name: 'Sahil Singh',
      role: 'Wellness Editor',
      text: '“Smooth taste and real energy. You can feel the difference from the first sip.”',
      stars: 5
    }
  ];

  return (
    <section className="py-32 overflow-hidden" id="testimonials">
      <div className="container mx-auto px-6">
        <h2 className="font-headline text-4xl font-bold text-center mb-24">The Verdict.</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className={`glass-panel p-10 rounded-xl flex-1 border border-outline-variant/10 ${testimonial.marginTop ? 'md:-translate-y-8' : ''}`}
            >
              <div className="flex text-tertiary mb-6">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                ))}
              </div>
              <p className="text-lg mb-8 italic">{testimonial.text}</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest"></div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-xs text-outline">
{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
