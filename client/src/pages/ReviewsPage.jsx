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
    text: 'Balpro has completely replaced my morning coffee. The ritual of whisking the cacao is meditative, and the focus I get is clean with no jitters.',
    name: 'Amara Williams',
    role: 'Architect, Brooklyn',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfcxRdQJTaXYd6-2uZ6MK0Jcc88xNj7a_TUaMIqPQmFGOb7I5v4t4ArN02g20hXCZuc3y2QnNpsRJvEXlGMGHVsMS6329kbBh6LCqM6Oe0Oglhe2rLzxkaqHg-zT2qaugmBHpCOMC3RmgyEPUCciVjzSOFqYumdtJsST0W9AyahV0m7pgpPojAJgKXO1qFFBAL4EviT1XhXJbOXHlV6XYwH2lJRt9A8nnMEgEyHJP5D2VCi6qgoU7m2Z_4hH8ux7yvQdPvhCMJ2g',
  },
  {
    text: 'I have tried every functional drink on the market. Most taste like dirt. Balpro tastes like luxury dessert and feels deeply grounding.',
    name: 'Julian Voss',
    role: 'Tech Founder',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA3XnSabqgpwLMFQ3yoAoECuq5Ryd4uVQZUmHw_p4cdQEORPrcGfXTn7fbfzC3FoSBfEKdwhGCLcfq6vxDXN_ZzL9KvlqqPLP8YhSkmskSo81_ml-9H3HPY_B_2CrXyPEN2eWQXTQfptkOVNKM3KQ0UsQPeYvqvcmsD0K6z_xY603mLC2asuE9VvDA7VUUuhDFMC2snG6fd6h5q0eQYHXB9TZxceoCOei45HvrvexEOCQgnYkaNVVvmdpmZJAyL2McIRmicZuVOmg',
  },
  {
    text: 'The transparency sold me. I know exactly what adaptogens I am getting. My sleep improved after switching my evening snack for Balpro hot cacao.',
    name: 'Sophie Chen',
    role: 'Yoga Instructor',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApS2j-GmkAq045oJwQwurO8KhrW7APb3H-zr18APhHhQUGQBgAeDSeniC1cL07VMitF7kTc0E9U8JidN8OYskNmrvBzlnWM4hp9ZjjKg4RMHpHR5FuziTXUEro4-5LlFr1-as5_frYGY1vBw0inWVbHk3kmFJ9ufqhVVpH-CaLtvX2vLQ-Uvc5lIfDiOvekJo9AE2AW8oj_7gmdxM9M8MlENZP0iLWJRsJZCQ2P5Hzy5Yci-einQtoQeoWrFo1KoYkI64lBR5wlQ',
  },
  {
    text: 'Finally, a healthy product that actually feels premium. From packaging to texture, Balpro feels like pure luxury.',
    name: 'Daniel Graham',
    role: 'Venture Capitalist',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8JPlGHnqKI4yzuydv09tv7eq_WfFp0PfSC2s0bEjaEEvRcf6FjRsSVr6KYviipGLNd205ymuwXl4GMAAGM6bA1SsN7rHmcZd2ZhK2g3MUYUOIOQ5zAJF3JwyBDm6OGBjM8Oz3JUPOKPKPPSgs6od8PQnCTZHXY7E6H9VbPz9mFJfC08ZaDDMuyPaZr8u6S8uQ3zO4xtvjS68gWdtiSa1CXPb0iB6BsTSWsHj2Gt0Hkz3MXwMjWn7K-0ge4TpD9DdrqQE5cK1dgw',
  },
];

const ReviewsPage = () => {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary-fixed pb-28 md:pb-0">
      <header className="relative pt-32 pb-24 overflow-hidden bg-[radial-gradient(circle_at_center,#221a17_0%,#19120f_100%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <span className="text-tertiary font-label tracking-[0.2em] text-xs uppercase mb-6 block">The Superior Standard</span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-surface leading-[1.1] mb-8 tracking-tighter">
              Indulgence <br />
              <span className="text-tertiary italic">Redefined.</span>
            </h1>
            <p className="text-primary-fixed-dim text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              We did not just make another chocolate drink. We curated a functional ritual that bridges the gap between
              high-performance nutrition and artisanal luxury.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link className="rounded-full px-8 py-4 bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary font-semibold hover:scale-105 transition-transform duration-300 shadow-xl" to="/products">
                Shop Flagship Pack
              </Link>
            </div>
          </div>

          <div className="relative">
            <img
              alt="Premium Chocolate Packaging"
              className="relative z-10 w-full h-auto rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUOs1BVxnN1jZHN3gXBjX4UTCRx1K7W1tF3oEx9Hl8WJCVvRB8uinhsGDWqWfA_YtbnuIJC2FRhHjFYK2aHnb-ykA9z7MnoFjJcZMWFwbfiGXcAVR0bm5mZahgexbN3bvs8JeHPuFlbxd_utcfclSMCiyf7CXzRscpS24AvH_UlImHxj6CXBa0ovh068G_yoA1Xj0Qs-oC0j_RbDDwgyn45VLdqLpVxkPAxREAiXMRBh0id5UeO1E5Q0vJnKKzozXct96QGE8ayA"
            />
          </div>
        </div>
      </header>

      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              ['verified', 'GMP Certified'],
              ['eco', '100% Organic'],
              ['science', 'Lab Tested'],
              ['potted_plant', 'Vegan Friendly'],
            ].map((badge) => (
              <div key={badge[1]} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-tertiary border border-outline-variant/20">
                  <span className="material-symbols-outlined text-3xl">{badge[0]}</span>
                </div>
                <span className="font-headline font-bold text-on-surface">{badge[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight">The Analysis</h2>
            <p className="text-primary-fixed-dim max-w-2xl mx-auto">
              A transparent look at how Balpro Life compares to the industry standard. No fillers, no compromises.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-outline-variant/10 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-highest">
                  <th className="p-8 font-headline text-lg text-on-surface border-b border-outline-variant/10">Key Metric</th>
                  <th className="p-8 font-headline text-lg text-tertiary border-b border-outline-variant/10 bg-surface-container/50">Balpro Life</th>
                  <th className="p-8 font-headline text-lg text-on-surface-variant border-b border-outline-variant/10">Standard Drinks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {[
                  ['Sugar Content', '0g Added', '24g - 32g'],
                  ['Functional Adaptogens', 'Ashwagandha + Reishi', 'None'],
                  ['Cocoa Origin', 'Single Origin Heirloom', 'Mass Commodity Blend'],
                  ['Protein Source', 'Bio-available Pea & Seed', 'Whey Isolate (Processed)'],
                  ['Bioavailability', '94% Retention', 'Less than 40%'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="p-8 font-medium">{row[0]}</td>
                    <td className="p-8 text-tertiary font-bold bg-surface-container/30">{row[1]}</td>
                    <td className="p-8 text-on-surface-variant">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface-container-low">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-headline text-4xl font-bold text-on-surface mb-4">Common Enquiries</h2>
            <div className="w-20 h-1 bg-tertiary rounded-full"></div>
          </div>

          <div className="space-y-6">
            {[
              'What makes the Life formula unique?',
              'Is this suitable for ketogenic lifestyles?',
              'How often should I consume Balpro Life?',
            ].map((question, index) => (
              <div key={question} className="bg-surface p-8 rounded-lg border border-outline-variant/10 hover:border-tertiary/30 transition-colors">
                <div className="flex justify-between items-center">
                  <h3 className="font-headline text-xl font-semibold text-on-surface">{question}</h3>
                  <span className="material-symbols-outlined text-tertiary">expand_more</span>
                </div>
                {index === 0 && (
                  <p className="mt-4 text-primary-fixed-dim leading-relaxed">
                    Our formula integrates ceremonial-grade cacao, adaptogenic mushrooms for cognitive support, and a
                    mineral complex designed for rapid absorption.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 mb-32 max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <h2 className="font-headline text-4xl font-bold tracking-tight">Real People. <br />Real Performance.</h2>
          <p className="text-primary-fixed-dim max-w-xs text-sm leading-relaxed mb-2">
            Watch how the world&apos;s most discerning palates experience the functional cacao revolution.
          </p>
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

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {quotes.map((item) => (
              <div key={item.name} className="bg-[rgba(34,26,23,0.6)] backdrop-blur-[20px] p-8 rounded-lg border border-outline-variant/10 break-inside-avoid">
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

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury Cacao Background"
            className="w-full h-full object-cover opacity-20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2V8Vk2HkKtnm6G4VCxHRaATGvaA80bOx_n_x8ed1E2ytw3VX3tAA8nvHUKrmJ-18xJDrNS5TN_ZLFmucXs-Uil12fsR2W9fBMPBRn_PKIhCUpK0_alAOvi-dbPTPZggBvNdoJk2AG7UzTUw6VAfgTry1tlNzZuaQyMM98T-8A0RJdOHGMkC9Kg9ssKLv0epIenhqYWleK7sGVI4xhEpXlaAh1JdO_h-ADKgYqQh7Thmujz-DCbTPW5DKqZn_C9A2J0dW3r-Lu-Q"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-on-surface mb-8 tracking-tighter">
            Ready to elevate your <br />
            <span className="text-tertiary">daily ritual?</span>
          </h2>
          <p className="text-primary-fixed-dim text-xl mb-12 max-w-2xl mx-auto">
            Experience the flagship blend that redefined the category. Limited batches crafted monthly for peak potency.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link className="w-full md:w-auto px-12 py-5 bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] rounded-full text-on-tertiary font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl" to="/products">
              Get The Flagship Pack
            </Link>
            <Link className="w-full md:w-auto px-12 py-5 rounded-full border border-outline-variant/30 text-on-surface font-semibold text-lg hover:bg-surface-container-highest transition-all duration-300" to="/ingredients">
              Explore Ingredients
            </Link>
          </div>
        </div>
      </section>

      <nav className="fixed bottom-0 w-full z-50 rounded-t-3xl md:hidden bg-[#19120f]/90 backdrop-blur-2xl border-t border-[#4f4440]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-20 pb-safe px-6">
          <Link className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform active:bg-[#3c332f] rounded-full" to="/products">
            <span className="material-symbols-outlined">local_mall</span>
            <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Shop</span>
          </Link>
          <Link className="flex flex-col items-center justify-center text-[#efbf70] bg-[#3c332f] rounded-full py-2 px-4 scale-95 active:scale-90 transition-transform" to="/about">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Why Choose Us</span>
          </Link>
          <button className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform active:bg-[#3c332f] rounded-full" type="button">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Cart</span>
          </button>
          <Link className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform active:bg-[#3c332f] rounded-full" to="/login">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default ReviewsPage;
