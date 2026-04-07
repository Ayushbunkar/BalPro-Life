import React from 'react';
import { Link } from 'react-router-dom';

const reviewVideos = [
  {
    name: 'Sarah J.',
    role: 'Wellness Coach',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD604VAPW3GY7K0aqmevuOkHNvvJ-jgNvdzGaPd0yn4ejbA9owqQq35_n1nX7wWoTDVSFgbhjxjqGPgg3ZK1aibsLn0yMEK4los1LzXZKv10-SGuqzvxCi6sJrPJYV1A9No7ZRzumwd_65ZXi3y9QGw4TB0DoTylM6HlabEk8HYxxd1y05hm38BKiOsVBBrmtSMXQHlVrwrj3JfUn2NZkgmpB1PB_6hznYPP-8Uq6P1LmlbDMoJ_reT83KbkSK8ebrYwWiysmm_Qw',
  },
  {
    name: 'Mark R.',
    role: 'Creative Director',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD68GhWjriNhhyBMhv48QocUrquix6KS2aDMuPzB_GMKUfr-pNQju7FY6pvZMjGJlfDlR_7N0Cquiokr7jclNvegRsi5vbK3DGX3_TGUxrpCmbsIrCaibnxji1zfLS2V7sbW5NP7ifVFAa8xD-fh0kbXKq7stIY80AQ67zhnNvZYBLOpUBujp69m_kEBPRGkd9XQ_QUlkKbHZHA_6b_6ORSTISBuiJUrDaMJBJVzM5tNC2RtQ2aLr4LsQx-h_I7LqGiPQuGnPyxBw',
  },
  {
    name: 'James P.',
    role: 'Ultra Marathoner',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHF0J-K5lpgOBjyhvKArbLeCIAN7kK86jV49jxfh5jG3aZ3EoK3Z5jzVhvocK6npZU6EShVbj1AGGpIlY6rM5A0zUKSF8sl-20hE409uN40-x44WZ5PrnE4V4eYDbCBwc4Bt5AwJ1MR_KQ_znsxiyl_tnYPJUtYTMM-9kb7NdFxIfUXoghxiCbM0QGPrOjQHrWbOiGjAgIBbghowHL7bPJ1EnBJ69DwVxlfcMRZ2ujlcyb7plXYteWTci8KXENCX2RvrepaIUPbg',
  },
  {
    name: 'Elena K.',
    role: 'Sommelier',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBx9C-N1ojDQPFDZG95PFz36r0D03IRXj_ShnLOKwpt_ZPT42xpRfmKBOBVUXzTPhMXKVwrR-Fc-rEduFxlX6XpTQx3O3z-kI-qZL2UyIaNT4j6qeVFrqMIWFtCQcEvy2Ka05QU_nIbxTt9gcilK9Xg2CsLc6CU5B14-vK0zSVCf48j9tfp19Jp-EifSogkiD2oOVcTrH6LQlbjKKPDpAQL_KaIdLJXk796PFyuMSsANT6Ms143btsW2qNkm5UxNRXnssxjskfTgw',
  },
];

const quotes = [
  {
    text: 'Balpro has completely replaced my morning coffee. The ritual of whisking the cacao is meditative, and the focus I get is clean-no jitters, just pure flow.',
    name: 'Amara Williams',
    role: 'Architect, Brooklyn',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfcxRdQJTaXYd6-2uZ6MK0Jcc88xNj7a_TUaMIqPQmFGOb7I5v4t4ArN02g20hXCZuc3y2QnNpsRJvEXlGMGHVsMS6329kbBh6LCqM6Oe0Oglhe2rLzxkaqHg-zT2qaugmBHpCOMC3RmgyEPUCciVjzSOFqYumdtJsST0W9AyahV0m7pgpPojAJgKXO1qFFBAL4EviT1XhXJbOXHlV6XYwH2lJRt9A8nnMEgEyHJP5D2VCi6qgoU7m2Z_4hH8ux7yvQdPvhCMJ2g',
  },
  {
    text: "I've tried every functional drink on the market. Most taste like dirt. Balpro tastes like a $15 luxury dessert but leaves me feeling like I just meditated for an hour.",
    name: 'Julian Voss',
    role: 'Tech Founder',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA3XnSabqgpwLMFQ3yoAoECuq5Ryd4uVQZUmHw_p4cdQEORPrcGfXTn7fbfzC3FoSBfEKdwhGCLcfq6vxDXN_ZzL9KvlqqPLP8YhSkmskSo81_ml-9H3HPY_B_2CrXyPEN2eWQXTQfptkOVNKM3KQ0UsQPeYvqvcmsD0K6z_xY603mLC2asuE9VvDA7VUUuhDFMC2snG6fd6h5q0eQYHXB9TZxceoCOei45HvrvexEOCQgnYkaNVVvmdpmZJAyL2McIRmicZuVOmg',
  },
  {
    text: "The transparency is what sold me. I know exactly what adaptogens I'm getting. My sleep has improved significantly since switching my late-night snack for a Balpro hot cacao.",
    name: 'Sophie Chen',
    role: 'Yoga Instructor',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApS2j-GmkAq045oJwQwurO8KhrW7APb3H-zr18APhHhQUGQBgAeDSeniC1cL07VMitF7kTc0E9U8JidN8OYskNmrvBzlnWM4hp9ZjjKg4RMHpHR5FuziTXUEro4-5LlFr1-as5_frYGY1vBw0inWVbHk3kmFJ9ufqhVVpH-CaLtvX2vLQ-Uvc5lIfDiOvekJo9AE2AW8oj_7gmdxM9M8MlENZP0iLWJRsJZCQ2P5Hzy5Yci-einQtoQeoWrFo1KoYkI64lBR5wlQ',
  },
  {
    text: "Finally, a 'healthy' product that actually feels premium. From the packaging to the silkiness of the powder, Balpro is pure luxury.",
    name: 'Daniel Graham',
    role: 'Venture Capitalist',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8JPlGHnqKI4yzuydv09tv7eq_WfFp0PfSC2s0bEjaEEvRcf6FjRsSVr6KYviipGLNd205ymuwXl4GMAAGM6bA1SsN7rHmcZd2ZhK2g3MUYUOIOQ5zAJF3JwyBDm6OGBjM8Oz3JUPOKPKPPSgs6od8PQnCTZHXY7E6H9VbPz9mFJfC08ZaDDMuyPaZr8u6S8uQ3zO4xtvjS68gWdtiSa1CXPb0iB6BsTSWsHj2Gt0Hkz3MXwMjWn7K-0ge4TpD9DdrqQE5cK1dgw',
  },
  {
    text: 'From taste to energy lift, this is the first functional drink that feels like a luxury ritual. I look forward to it every evening.',
    name: 'Leah Morgan',
    role: 'Product Designer',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfcxRdQJTaXYd6-2uZ6MK0Jcc88xNj7a_TUaMIqPQmFGOb7I5v4t4ArN02g20hXCZuc3y2QnNpsRJvEXlGMGHVsMS6329kbBh6LCqM6Oe0Oglhe2rLzxkaqHg-zT2qaugmBHpCOMC3RmgyEPUCciVjzSOFqYumdtJsST0W9AyahV0m7pgpPojAJgKXO1qFFBAL4EviT1XhXJbOXHlV6XYwH2lJRt9A8nnMEgEyHJP5D2VCi6qgoU7m2Z_4hH8ux7yvQdPvhCMJ2g',
  },
  {
    text: 'Three weeks in and my afternoon crashes are gone. Smooth focus, great flavor, and the packaging is genuinely premium.',
    name: 'Ryan Patel',
    role: 'Performance Coach',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA3XnSabqgpwLMFQ3yoAoECuq5Ryd4uVQZUmHw_p4cdQEORPrcGfXTn7fbfzC3FoSBfEKdwhGCLcfq6vxDXN_ZzL9KvlqqPLP8YhSkmskSo81_ml-9H3HPY_B_2CrXyPEN2eWQXTQfptkOVNKM3KQ0UsQPeYvqvcmsD0K6z_xY603mLC2asuE9VvDA7VUUuhDFMC2snG6fd6h5q0eQYHXB9TZxceoCOei45HvrvexEOCQgnYkaNVVvmdpmZJAyL2McIRmicZuVOmg',
  },
];

const ReviewsPage = () => {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary-fixed">
      <main className="pt-32 pb-32">
        <section className="px-8 mb-24 max-w-7xl mx-auto text-center">
          <span className="text-tertiary uppercase tracking-[0.3em] font-semibold text-xs mb-4 block">Authentic Feedback</span>
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-surface tracking-tighter mb-8 max-w-4xl mx-auto">
            The Standard for <span className="italic font-light">Daily Indulgence.</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-surface-container-low p-10 rounded-xl border border-outline-variant/10">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-2">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
              </div>
              <div className="text-5xl font-headline font-bold text-on-surface">4.9/5</div>
              <div className="text-primary-fixed-dim text-sm uppercase tracking-widest mt-2">Verified Rating</div>
            </div>
            <div className="h-px w-24 md:h-16 md:w-px bg-outline-variant/30"></div>
            <div className="flex flex-wrap justify-center gap-8 max-w-xl">
              <div className="text-center">
                <div className="text-2xl font-headline font-bold">12,400+</div>
                <div className="text-primary-fixed-dim text-xs uppercase tracking-tighter">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-headline font-bold">98%</div>
                <div className="text-primary-fixed-dim text-xs uppercase tracking-tighter">Repeat Purchase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-headline font-bold">450+</div>
                <div className="text-primary-fixed-dim text-xs uppercase tracking-tighter">5-Star Video Reviews</div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 mb-32 max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-headline text-4xl font-bold tracking-tight">
              Real People. <br />Real Performance.
            </h2>
            <p className="text-primary-fixed-dim max-w-xs text-sm leading-relaxed mb-2">Watch how the world's most discerning palates experience the functional cacao revolution.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviewVideos.map((item, idx) => (
              <div key={item.name} className={`relative aspect-9/16 rounded-lg overflow-hidden group cursor-pointer ${idx % 2 === 1 ? 'lg:mt-12' : ''}`}>
                <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.image} alt={item.name} />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[rgba(34,26,23,0.6)] backdrop-blur-[20px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-on-surface font-semibold mb-1">{item.name}</div>
                  <div className="text-tertiary text-xs uppercase tracking-widest">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-8 mb-32 bg-surface-container-low py-24 rounded-xl">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl font-bold mb-4">The Wall of Indulgence</h2>
              <p className="text-primary-fixed-dim">Join the collective of those who refuse to compromise.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quotes.map((item) => (
                <div key={item.name} className="bg-[rgba(34,26,23,0.6)] backdrop-blur-[20px] p-8 rounded-lg border border-outline-variant/10 h-full">
                  <div className="flex gap-1 mb-6">
                    <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                  <p className="text-on-surface text-lg leading-relaxed font-light mb-8 italic">&quot;{item.text}&quot;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{item.name}</div>
                      <div className="text-primary-fixed-dim text-xs">{item.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-8 mb-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-4/5 rounded-xl overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  alt="Lifestyle overhead shot of a healthy bowl and drink"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPHURQLu5Ahl-n3S_-zXxEEP7_OcXuGfaWjmAPN4wID-IOL5eRU8-eydzpR9a-kTTBGKM6Xg3IuqVHmSJl-FpY5cvfZxauqk_jROS8hu2jW8d1ISbAPgh-hqmFLOiTd3Hc6DOKUZrMIdhZZHQwXiVqkkMJOsifWMEVsvJqPVACm0bglxmUrnc3bWwicsVXJ14wyg2Qb-SkJtruGOn5Y14JRvleR4F7c9LgS5wHFgyykF9V-RfZzN-0BOUGrKqreLP7os_ppQvmOA"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[rgba(34,26,23,0.6)] backdrop-blur-[20px] p-6 rounded-lg border border-outline-variant/20 max-w-60">
                <div className="text-tertiary text-xs uppercase tracking-widest mb-2 font-bold">Clinical Impact</div>
                <p className="text-sm font-light">&quot;Cortisol levels stabilized after 21 days of consistent use.&quot;</p>
                <div className="mt-4 flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[8px]">DR</div>
                  <div className="w-8 h-8 rounded-full border-2 border-surface bg-tertiary flex items-center justify-center text-[8px] text-on-tertiary">LV</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-headline text-5xl font-bold tracking-tight mb-8">
                Beyond the Cup: <br />
                <span className="text-tertiary">Lifestyle Evolutions</span>
              </h2>
              <div className="space-y-12">
                {[
                  ['01', 'Sustained Vitality', "Users report a 40% increase in productivity during the 2-4 PM 'slump' window without the subsequent crash common with sugar-heavy alternatives."],
                  ['02', 'Cognitive Clarity', "Our Lion's Mane and Ashwagandha blend works cumulatively. After 3 weeks, 85% of users noted significantly improved mental focus during complex tasks."],
                  ['03', 'The Zen Shift', "Functional cacao isn't just about energy; it's about mood. L-Theanine helps transition the body into a flow state, reducing environmental stress impact."],
                ].map((item) => (
                  <div key={item[0]} className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-full border border-tertiary/30 flex items-center justify-center font-headline text-tertiary font-bold">{item[0]}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item[1]}</h3>
                      <p className="text-primary-fixed-dim leading-relaxed">{item[2]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 pb-32">
          <div className="max-w-5xl mx-auto bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] rounded-xl p-16 text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[24px_24px]"></div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-[#2a1a08] mb-6 tracking-tighter relative z-10">Start Your Own Story.</h2>
            <p className="text-[#3f2b12] text-lg mb-12 max-w-lg mx-auto font-semibold relative z-10">Join 12,000+ others who have elevated their daily ritual. Experience Balpro risk-free.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Link className="bg-[#2a1a08] text-[#f5ddb1] px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 shadow-xl" to="/products">
                Shop The Collection
              </Link>
              <Link className="bg-transparent border border-[#6d4b1f]/40 text-[#2a1a08] px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#2a1a08] hover:text-[#f5ddb1] transition-all duration-300" to="/ingredients">
                Compare Blends
              </Link>
            </div>
            <p className="mt-8 text-[#4f3717] text-xs uppercase tracking-widest font-bold">30-Day Happiness Guarantee • Free Shipping Over $50</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReviewsPage;
