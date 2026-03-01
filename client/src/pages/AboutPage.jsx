import React from 'react';
import { ShieldCheck, Zap, Award, Leaf, Heart, Target, Star, CheckCircle, Users, Trophy } from 'lucide-react';
import Button from '../components/Button';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden section-below-navbar" style={{ backgroundColor: '#F8F2E9' }}>
        <div className="content-container relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-block text-xs font-bold px-5 py-2 uppercase tracking-[0.2em] rounded-full border" style={{ backgroundColor: '#7B4A22', color: '#F8F2E9', borderColor: '#6B3F1D' }}>
              Premium Nutrition
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter" style={{ color: '#1A1A1A' }}>
              ABOUT <br/>
              <span style={{ color: '#7B4A22' }}>BALPRO</span>{' '}
              <span style={{ color: '#1D6B3A' }}>LIFE</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B5E50' }}>
              Discover the science behind our premium 20g Protein Shake – where nutrition meets innovation,
              delivering pure performance fuel for your active lifestyle.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ backgroundColor: '#7B4A22' }}></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full blur-3xl opacity-15" style={{ backgroundColor: '#1D6B3A' }}></div>
      </section>

      {/* Product Showcase */}
      <section className="py-32" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Product Image/Mockup */}
            <div className="relative">
              <div className="relative z-10 p-8 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #F4E8D3 0%, #E8DCC8 100%)' }}>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-32 mx-auto rounded-lg flex flex-col items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to bottom, #7B4A22, #5C3518)' }}>
                      <span className="font-black text-2xl text-white">BALPRO</span>
                      <span className="text-xs font-bold uppercase" style={{ color: '#F4E8D3' }}>LIFE</span>
                    </div>
                    <h3 className="font-bold text-lg" style={{ color: '#7B4A22' }}>20g Protein Shake</h3>
                    <p className="text-sm" style={{ color: '#6B5E50' }}>Sugar-Free • 200ml</p>
                    <div className="flex justify-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#D4EDDA', color: '#1D6B3A' }}>Zero Added Sugar</span>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#F4E8D3', color: '#7B4A22' }}>20g Protein</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl -z-10" style={{ backgroundColor: '#EAD8C0' }}></div>
            </div>

            {/* Product Description */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-black mb-6 uppercase tracking-tight" style={{ color: '#7B4A22' }}>
                  Premium Protein Nutrition
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#6B5E50' }}>
                  BALPRO LIFE – 20g Protein Shake is a high-protein nutritional drink crafted for health-conscious
                  individuals seeking premium nutrition. Each 200ml serving delivers 20g of pure protein from a perfect
                  blend of soy protein isolate and low-fat milk, naturally sweetened with stevia and zero added sugar.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border" style={{ backgroundColor: '#FBF7F0', borderColor: '#EAD8C0' }}>
                    <div className="text-3xl font-black mb-1" style={{ color: '#7B4A22' }}>20g</div>
                    <div className="text-sm font-bold uppercase tracking-wider" style={{ color: '#6B5E50' }}>Protein</div>
                  </div>
                  <div className="p-4 rounded-xl border" style={{ backgroundColor: '#F0F8F1', borderColor: '#C8E6C9' }}>
                    <div className="text-3xl font-black mb-1" style={{ color: '#1D6B3A' }}>0g</div>
                    <div className="text-sm font-bold uppercase tracking-wider" style={{ color: '#6B5E50' }}>Added Sugar</div>
                  </div>
                  <div className="p-4 rounded-xl border" style={{ backgroundColor: '#FBF7F0', borderColor: '#EAD8C0' }}>
                    <div className="text-3xl font-black mb-1" style={{ color: '#7B4A22' }}>215</div>
                    <div className="text-sm font-bold uppercase tracking-wider" style={{ color: '#6B5E50' }}>Calories</div>
                  </div>
                  <div className="p-4 rounded-xl border" style={{ backgroundColor: '#F0F8F1', borderColor: '#C8E6C9' }}>
                    <div className="text-3xl font-black mb-1" style={{ color: '#1D6B3A' }}>200ml</div>
                    <div className="text-sm font-bold uppercase tracking-wider" style={{ color: '#6B5E50' }}>Serving Size</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits - Stacked Scroll Animation */}
      <FeaturesSection />

      {/* Nutrition Facts */}
      <section className="py-32" style={{ backgroundColor: '#F8F2E9' }}>
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Nutrition Facts Panel */}
            <div className="text-white p-8 rounded-2xl" style={{ backgroundColor: '#2C1810' }}>
              <h3 className="text-3xl font-black mb-8 uppercase tracking-wide">Nutrition Facts</h3>
              <div className="space-y-4">
                <div className="pb-4" style={{ borderBottom: '1px solid #4A3228' }}>
                  <div className="text-sm mb-2" style={{ color: '#A08070' }}>Serving Size</div>
                  <div className="text-2xl font-bold">200 ml (1 Bottle)</div>
                </div>

                <div className="pb-4" style={{ borderBottom: '1px solid #4A3228' }}>
                  <div className="text-sm mb-2" style={{ color: '#A08070' }}>Calories</div>
                  <div className="text-3xl font-bold" style={{ color: '#D4A017' }}>215</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid #4A3228' }}>
                    <span className="font-bold">Total Fat</span>
                    <span>2.5g</span>
                  </div>
                  <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid #4A3228' }}>
                    <span className="font-bold">Protein</span>
                    <span className="font-bold" style={{ color: '#D4A017' }}>20g</span>
                  </div>
                  <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid #4A3228' }}>
                    <span className="font-bold">Total Carbohydrates</span>
                    <span>15g</span>
                  </div>
                  <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid #4A3228' }}>
                    <span className="font-bold">Dietary Fiber</span>
                    <span>3g</span>
                  </div>
                  <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid #4A3228' }}>
                    <span className="font-bold">Sugars</span>
                    <span style={{ color: '#4FAF5A' }}>0g Added</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-bold">Calcium</span>
                    <span>30% DV</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-black mb-6 uppercase tracking-wide" style={{ color: '#7B4A22' }}>Ingredients</h3>
                <div className="p-6 rounded-xl border" style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD8C0' }}>
                  <p className="leading-relaxed mb-4" style={{ color: '#6B5E50' }}>
                    <strong style={{ color: '#7B4A22' }}>Premium Blend:</strong> Low-fat milk, soy protein isolate, banana pulp, chia seeds,
                    natural stevia extract, natural flavors, and essential vitamins & minerals.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#1D6B3A' }} />
                      <span className="text-sm" style={{ color: '#6B5E50' }}>No Artificial Colors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#1D6B3A' }} />
                      <span className="text-sm" style={{ color: '#6B5E50' }}>No Artificial Flavors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#1D6B3A' }} />
                      <span className="text-sm" style={{ color: '#6B5E50' }}>No Preservatives</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#1D6B3A' }} />
                      <span className="text-sm" style={{ color: '#6B5E50' }}>Gluten-Free</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#7B4A22' }}>Key Features</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 mt-0.5" style={{ color: '#D4A017' }} />
                    <div>
                      <div className="font-bold" style={{ color: '#7B4A22' }}>Complete Protein Profile</div>
                      <div className="text-sm" style={{ color: '#6B5E50' }}>All essential amino acids for optimal muscle synthesis</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 mt-0.5" style={{ color: '#D4A017' }} />
                    <div>
                      <div className="font-bold" style={{ color: '#7B4A22' }}>Omega-3 Rich</div>
                      <div className="text-sm" style={{ color: '#6B5E50' }}>Chia seeds provide heart-healthy omega-3 fatty acids</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 mt-0.5" style={{ color: '#D4A017' }} />
                    <div>
                      <div className="font-bold" style={{ color: '#7B4A22' }}>Calcium Fortified</div>
                      <div className="text-sm" style={{ color: '#6B5E50' }}>Supports bone health and muscle function</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science & Quality */}
      <section className="py-32 text-white relative overflow-hidden" style={{ backgroundColor: '#2C1810' }}>
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="content-container relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8" style={{ color: '#D4A017' }}>
              <ShieldCheck size={48} strokeWidth={1.5} />
              <span className="text-sm font-bold uppercase tracking-[0.3em]">The Science</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              NOTHING TO HIDE.<br/>EVERYTHING TO GAIN.
            </h2>
            <p className="text-xl mb-12 leading-relaxed font-light max-w-4xl mx-auto" style={{ color: '#A08070' }}>
              In an industry full of proprietary blends and hidden ingredients, we stand naked. Every batch is tested,
              every ingredient is listed, and every serving is guaranteed to be pure. Our commitment to transparency
              ensures you get exactly what you expect – premium nutrition you can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#7B4A22' }}>
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Lab Tested</h3>
              <p style={{ color: '#A08070' }}>Every batch undergoes rigorous third-party testing for purity and potency.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#1D6B3A' }}>
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Trusted by Athletes</h3>
              <p style={{ color: '#A08070' }}>Professional athletes and fitness enthusiasts choose BALPRO LIFE for performance.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#D4A017' }}>
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Quality Certified</h3>
              <p style={{ color: '#A08070' }}>ISO certified manufacturing with GMP standards for consistent quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;