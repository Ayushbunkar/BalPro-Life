import React from 'react';
import { ShieldCheck, Zap, Award, Leaf, Heart, Target, Star, CheckCircle, Users, Trophy } from 'lucide-react';
import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-linear-to-br from-yellow-50 via-cream-50 to-green-50 overflow-hidden section-below-navbar">
        <div className="content-container relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-block bg-black text-white text-xs font-bold px-4 py-2 uppercase tracking-[0.2em] rounded-full">
              Premium Nutrition
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              ABOUT <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-600 to-green-600">BALPRO LIFE</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover the science behind our premium 20g Protein Shake – where nutrition meets innovation,
              delivering pure performance fuel for your active lifestyle.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* Product Showcase */}
      <section className="py-32 bg-white">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Product Image/Mockup */}
            <div className="relative">
              <div className="relative z-10 bg-linear-to-br from-yellow-100 to-green-100 p-8 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-32 bg-linear-to-b from-yellow-400 to-yellow-600 mx-auto rounded-lg flex flex-col items-center justify-center shadow-lg">
                      <span className="font-black text-2xl text-white">BALPRO</span>
                      <span className="text-xs font-bold text-yellow-100 uppercase">LIFE</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">20g Protein Shake</h3>
                    <p className="text-sm text-slate-500">Sugar-Free • 200ml</p>
                    <div className="flex justify-center gap-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Zero Added Sugar</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">20g Protein</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-yellow-200 rounded-3xl -z-10"></div>
            </div>

            {/* Product Description */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                  Premium Protein Nutrition
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  BALPRO LIFE – 20g Protein Shake is a high-protein nutritional drink crafted for health-conscious
                  individuals seeking premium nutrition. Each 200ml serving delivers 20g of pure protein from a perfect
                  blend of soy protein isolate and low-fat milk, naturally sweetened with stevia and zero added sugar.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-3xl font-black text-yellow-600 mb-1">20g</div>
                    <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Protein</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-3xl font-black text-green-600 mb-1">0g</div>
                    <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Added Sugar</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-3xl font-black text-blue-600 mb-1">215</div>
                    <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Calories</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-3xl font-black text-purple-600 mb-1">200ml</div>
                    <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Serving Size</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-32 bg-slate-50">
        <div className="content-container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
              Why Choose BALPRO LIFE?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the perfect blend of science-backed nutrition and natural ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Muscle Recovery</h3>
              <p className="text-slate-600">20g of high-quality protein supports muscle repair and recovery after intense workouts.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Plant + Dairy Blend</h3>
              <p className="text-slate-600">Perfect combination of soy protein isolate and low-fat milk for complete amino acid profile.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Energy Booster</h3>
              <p className="text-slate-600">Natural energy from chia seeds and balanced nutrition to fuel your active lifestyle.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Heart Healthy</h3>
              <p className="text-slate-600">Omega-3 fatty acids from chia seeds support cardiovascular health and wellness.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Naturally Sweetened</h3>
              <p className="text-slate-600">Zero added sugar, naturally sweetened with stevia for guilt-free indulgence.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Quality Assured</h3>
              <p className="text-slate-600">Rigorous testing ensures purity, potency, and safety in every serving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition Facts */}
      <section className="py-32 bg-white">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Nutrition Facts Panel */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl">
              <h3 className="text-3xl font-black mb-8 uppercase tracking-wide">Nutrition Facts</h3>
              <div className="space-y-4">
                <div className="border-b border-slate-700 pb-4">
                  <div className="text-sm text-slate-400 mb-2">Serving Size</div>
                  <div className="text-2xl font-bold">200 ml (1 Bottle)</div>
                </div>

                <div className="border-b border-slate-700 pb-4">
                  <div className="text-sm text-slate-400 mb-2">Calories</div>
                  <div className="text-3xl font-bold text-yellow-400">215</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="font-bold">Total Fat</span>
                    <span>2.5g</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="font-bold">Protein</span>
                    <span className="text-yellow-400 font-bold">20g</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="font-bold">Total Carbohydrates</span>
                    <span>15g</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="font-bold">Dietary Fiber</span>
                    <span>3g</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="font-bold">Sugars</span>
                    <span className="text-green-400">0g Added</span>
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
                <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-wide">Ingredients</h3>
                <div className="bg-slate-50 p-6 rounded-xl">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    <strong>Premium Blend:</strong> Low-fat milk, soy protein isolate, banana pulp, chia seeds,
                    natural stevia extract, natural flavors, and essential vitamins & minerals.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">No Artificial Colors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">No Artificial Flavors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">No Preservatives</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Gluten-Free</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Features</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Complete Protein Profile</div>
                      <div className="text-slate-600 text-sm">All essential amino acids for optimal muscle synthesis</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Omega-3 Rich</div>
                      <div className="text-slate-600 text-sm">Chia seeds provide heart-healthy omega-3 fatty acids</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Calcium Fortified</div>
                      <div className="text-slate-600 text-sm">Supports bone health and muscle function</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science & Quality */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="content-container relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8 text-yellow-400">
              <ShieldCheck size={48} strokeWidth={1.5} />
              <span className="text-sm font-bold uppercase tracking-[0.3em]">The Science</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              NOTHING TO HIDE.<br/>EVERYTHING TO GAIN.
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-4xl mx-auto">
              In an industry full of proprietary blends and hidden ingredients, we stand naked. Every batch is tested,
              every ingredient is listed, and every serving is guaranteed to be pure. Our commitment to transparency
              ensures you get exactly what you expect – premium nutrition you can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Lab Tested</h3>
              <p className="text-slate-400">Every batch undergoes rigorous third-party testing for purity and potency.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Trusted by Athletes</h3>
              <p className="text-slate-400">Professional athletes and fitness enthusiasts choose BALPRO LIFE for performance.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Quality Certified</h3>
              <p className="text-slate-400">ISO certified manufacturing with GMP standards for consistent quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-linear-to-r from-yellow-400 to-green-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-white mb-8 uppercase tracking-tight">
            Ready to Fuel Your Performance?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Experience the difference that premium, transparent nutrition can make in your fitness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="dark" className="bg-black text-white hover:bg-slate-900">
              Shop Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;