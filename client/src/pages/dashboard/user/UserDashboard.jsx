import React from 'react';

const UserDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="h-full w-72 fixed left-0 top-0 bg-[#221a17]/80 dark:bg-[#221a17]/80 backdrop-blur-xl flex flex-col py-8 px-6 z-[60] shadow-[40px_0_60px_-10px_rgba(0,0,0,0.12)] font-headline tracking-tight">
        <div className="mb-12 px-2">
          <h1 className="text-xl font-bold tracking-tighter text-[#efbf70]">The Liquid Curator</h1>
          <p className="text-xs text-primary-fixed-dim uppercase tracking-widest mt-1 opacity-60">Premium Member</p>
        </div>
        <nav className="flex-1 space-y-2">
          <a className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 text-[#e2bfb2] hover:text-[#efbf70] hover:bg-[#3c332f]" href="#">
            <span className="material-symbols-outlined" data-icon="home">home</span>
            <span className="text-sm font-medium">Home</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 text-[#efbf70] font-bold border-r-2 border-[#efbf70] bg-[#3c332f]/40" href="#">
            <span className="material-symbols-outlined" data-icon="military_tech" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            <span className="text-sm">Rewards</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 text-[#e2bfb2] hover:text-[#efbf70] hover:bg-[#3c332f]" href="#">
            <span className="material-symbols-outlined" data-icon="package_2">package_2</span>
            <span className="text-sm">Orders</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 text-[#e2bfb2] hover:text-[#efbf70] hover:bg-[#3c332f]" href="#">
            <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
            <span className="text-sm">Rituals</span>
          </a>
          <a className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 text-[#e2bfb2] hover:text-[#efbf70] hover:bg-[#3c332f]" href="#">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
            <span className="text-sm">Settings</span>
          </a>
        </nav>
        <div className="mt-auto pt-8 border-t border-outline-variant/10 space-y-4">
          <button className="w-full gold-shimmer-btn text-on-tertiary font-bold py-3 rounded-full text-sm uppercase tracking-widest hover:scale-105 transition-transform">
            Shop Cacao
          </button>
          <div className="space-y-1">
            <a className="flex items-center gap-4 px-4 py-2 text-sm text-[#e2bfb2] hover:text-[#efbf70] transition-colors" href="#">
              <span className="material-symbols-outlined" data-icon="help_outline">help_outline</span>
              <span>Help</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-2 text-sm text-[#e2bfb2] hover:text-[#efbf70] transition-colors" href="#">
              <span className="material-symbols-outlined" data-icon="logout">logout</span>
              <span>Sign Out</span>
            </a>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="ml-72 min-h-screen w-full">
        {/* TopNavBar */}
        <header className="fixed top-0 right-0 w-[calc(100%-18rem)] z-50 bg-[#19120f]/70 dark:bg-[#19120f]/70 backdrop-blur-md flex justify-between items-center px-12 h-24">
          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex gap-8">
              <a className="font-headline text-sm uppercase tracking-widest text-[#e2bfb2] hover:text-[#efbf70] transition-opacity" href="#">Our Story</a>
              <a className="font-headline text-sm uppercase tracking-widest text-[#e2bfb2] hover:text-[#efbf70] transition-opacity" href="#">Benefits</a>
              <a className="font-headline text-sm uppercase tracking-widest text-[#e2bfb2] hover:text-[#efbf70] transition-opacity" href="#">Subscription</a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <input className="bg-surface-container-low border-none rounded-full px-6 py-2 text-sm w-64 focus:ring-1 focus:ring-tertiary/30 text-on-surface" placeholder="Search Rituals..." type="text" />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant" data-icon="search">search</span>
            </div>
            <button className="text-[#efbf70] hover:scale-105 transition-transform duration-500">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button className="text-[#efbf70] hover:scale-105 transition-transform duration-500 relative">
              <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
              <span className="absolute -top-1 -right-1 bg-tertiary text-on-tertiary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-tertiary/20">
              <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0Z6rb2r8YeFUgOD_YtnS-CDFE1lNICOsPrRIr5uLS1BSNPPKwgF4jYOL_9vg0cEpi-T07IY8BOL1Tj3gSqb0V-UMzwUgQPfi_7wQhHzoOhjF1yPUR544bg2FhpWFMlETHJoeZ-tXxQ2iYWGbjrCC5H514jEFzW5temp7wFevnsdAFkuR-04ucQeC86Ahru4A9fNE6QV3J44KSGRb-Ulkk2FRbK4Cs0YlSDj4TBgSYlW7Tnh3Jfvh6AhhUXwluKyzKiNiCxmvF8A" />
            </div>
          </div>
        </header>
        {/* Content Canvas */}
        <div className="pt-32 pb-24 px-12 max-w-7xl mx-auto space-y-16">
          {/* Welcome Hero Section */}
          <section className="relative overflow-hidden rounded-xl p-12 bg-surface-container-low">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-tertiary/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
              <div>
                <span className="text-tertiary font-headline font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Dashboard Overview</span>
                <h2 className="text-6xl font-headline font-black tracking-tighter mb-6 leading-none">
                  Welcome Back,<br />
                  <span className="gold-gradient-text">Julian Vane</span>
                </h2>
                <p className="text-primary-fixed-dim body-lg max-w-md mb-8 leading-relaxed">
                  Your evening ritual is scheduled in 3 hours. We've prepared a new focus insight based on your recent activity.
                </p>
                <div className="flex gap-4">
                  <button className="gold-shimmer-btn text-on-tertiary font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2">
                    Start Ritual <span className="material-symbols-outlined" data-icon="play_circle">play_circle</span>
                  </button>
                </div>
              </div>
              <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-tertiary/20 blur-[100px] rounded-full scale-75"></div>
                <img className="relative z-20 w-80 h-auto transform -rotate-12 hover:rotate-0 transition-transform duration-700" alt="Product" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu-tfUksSeoQ9JWOEVCXfwuBxN-3hA_Sa95uEf8dcYYhkXV78jyVKSPYU4Yhe6HqypIcZKHvAJ3mZvmcSB5BCBLCwCw50ltWq1Ie7QymCI2krX9x2IL9LLWJeq1zsHGM12gq_J90hCi04KKTQpXvITh_qqwkyDWppVitfO_CoJiUYFBI4pCbJD_Eq1mV4WIJ98IhaNdzrwqE53pvRnIN9EW76ApaFjJtcnZg_Err_WHO83KvRGr0XGnal4PEX08UY3KoCCjw6xdg" />
              </div>
            </div>
          </section>
          {/* Rewards & Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reward Overview */}
            <div className="md:col-span-2 glass-panel rounded-xl p-8 border border-outline-variant/5">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-headline font-bold mb-1">Liquid Gold Rewards</h3>
                  <p className="text-sm text-on-surface-variant">Your journey to the next tier</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-tertiary">2,450</span>
                  <span className="text-xs uppercase tracking-widest block text-on-surface-variant">Total Points</span>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium">Curator Elite Progress</span>
                    <span className="text-tertiary">85%</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden p-[2px]">
                    <div className="h-full bg-gradient-to-r from-tertiary to-on-tertiary-container rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-surface-container/40 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined" data-icon="redeem">redeem</span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">Available Reward</p>
                      <p className="font-bold">Free Tetra Pack</p>
                    </div>
                  </div>
                  <div className="bg-surface-container/40 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">Tier Perk</p>
                      <p className="font-bold">Priority Shipping</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Personalized Wellness Insights */}
            <div className="bg-tertiary-container rounded-xl p-8 flex flex-col justify-between border border-tertiary/10">
              <div>
                <span className="material-symbols-outlined text-tertiary text-4xl mb-4" data-icon="psychology">psychology</span>
                <h3 className="text-xl font-headline font-bold mb-4">Wellness Insight</h3>
                <p className="text-on-tertiary-container/80 text-sm leading-relaxed mb-6">
                  "Based on your 8 PM consumption pattern, adding 5 minutes of focused breathing can increase Ashwagandha absorption by 22%."
                </p>
              </div>
              <button className="text-tertiary font-bold text-sm uppercase tracking-widest flex items-center gap-2 group hover:gap-4 transition-all">
                Learn More <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
              </button>
            </div>
          </div>
          {/* Active Rituals Section */}
          <section>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-3xl font-headline font-black tracking-tighter">Active Rituals</h3>
                <p className="text-on-surface-variant">Consistent engagement for maximum bioavailability</p>
              </div>
              <button className="text-sm uppercase tracking-widest text-[#e2bfb2] border-b border-outline-variant/30 pb-1">View Library</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Ritual Card 1 */}
              <div className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-container">
                <img className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt="Morning yoga" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjwMd2Poi6mTltqCJ9HsnOt4_5tr0hWdGZ5XVJf7xSjNTogP9BTt2PwTUCpT4YXuvXEdjszDt-LPyOs8K7iert3WiuzhmkIQNKc2nrjSTkPpKjIMRWuLSTmq2ET5SkhUSLNBXhwEGa8QMR7Vag8sCy8GKYoiEdnE-Wu4cWSFWjXcH5Eu1v4MOLgFlZnG_uxpJ9MdqTsI59_tRP1XrbSDn_a7yWpDlA-AQkGPeS6y0YWlmh7uE0NuxLcYoExHozHwmrYHTjcsDdEQ" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                <div className="absolute bottom-0 p-6 w-full">
                  <span className="text-[10px] uppercase tracking-widest text-tertiary font-bold mb-2 block">07:00 AM</span>
                  <h4 className="text-lg font-headline font-bold leading-tight mb-2">Daily Focus Ritual</h4>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm" data-icon="timer">timer</span>
                    15 Mins
                  </div>
                </div>
              </div>
              {/* Ritual Card 2 */}
              <div className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-container">
                <img className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt="Essential oils" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEIW5XFEmz6eA8TeT7GzIqoZ4w97d7MIe4E1O0HQa1qeBxdI5vJQngL5phU2fK9WRLipDL1DLMzTzLDwdpRt8JBKgWdbRddUKkyxCfDEZve-o6zb73v_69l6NtoEVhpj3gUrKiVaRzAsHsDHzxmoUu7X-Zdtc5EVPlcSVadW7z0dj-RMGktoshkiQ1GU4baqDDzzOxFH_L2zZgUK9L9-cy5otdS_qp7eAlqGDQeodcpfl62nFBzMJV_u6CnMsexBJ5zm4pS-81qg" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                <div className="absolute bottom-0 p-6 w-full">
                  <span className="text-[10px] uppercase tracking-widest text-tertiary font-bold mb-2 block">09:00 PM</span>
                  <h4 className="text-lg font-headline font-bold leading-tight mb-2">Evening Calm Path</h4>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm" data-icon="timer">timer</span>
                    20 Mins
                  </div>
                </div>
              </div>
              {/* Ritual Card 3 */}
              <div className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-container">
                <img className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt="Chocolate bar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2zCmIvCcSHHbNYhd45fxcnGBTq63BNc_b-iWAndAKijnAPmWTJT8MxqwCngS_PgsHNg_IZkx5bFDSg3f8e5KZTlpDQGPAJ9W2BlZhvpEyEveZjfF3A6u6bPFYm-Z7Ce8EqqstfLxGjl5mTLcUnTTfPua6Lyja9pGsHtMApxg2wAmSvyTEy5I86CM8QvFB1wd0NhwTQHxcfNG--sop0CHx9fsYD4h7s0m6Wti_42xa5Cj3CnYI5TjOAOu4aD9ORUE-a2xELvKiHA" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                <div className="absolute bottom-0 p-6 w-full">
                  <span className="text-[10px] uppercase tracking-widest text-tertiary font-bold mb-2 block">As Needed</span>
                  <h4 className="text-lg font-headline font-bold leading-tight mb-2">Deep Work Boost</h4>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm" data-icon="bolt">bolt</span>
                    Bio-Active
                  </div>
                </div>
              </div>
              {/* Add Ritual Card */}
              <button className="aspect-[4/5] rounded-xl border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center gap-4 hover:border-tertiary/40 hover:bg-surface-container/20 transition-all">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary" data-icon="add">add</span>
                </div>
                <span className="text-sm font-bold uppercase tracking-widest">New Ritual</span>
              </button>
            </div>
          </section>
          {/* Recent Orders Section */}
          <section>
            <div className="mb-8">
              <h3 className="text-3xl font-headline font-black tracking-tighter">Order History</h3>
            </div>
            <div className="overflow-hidden rounded-xl bg-surface-container-low">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-highest/30">
                    <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-on-surface-variant">Product</th>
                    <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-on-surface-variant">Order ID</th>
                    <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-on-surface-variant">Date</th>
                    <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-on-surface-variant">Status</th>
                    <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-on-surface-variant">Amount</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {/* Example Order Row 1 */}
                  <tr className="hover:bg-surface-container/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center overflow-hidden">
                          <img className="w-full h-full object-cover" alt="Product thumbnail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApurMwsGL_K084zQjlj490gSFkNvKJ0Cy2pQ2VDKif6h9QF0SyZso5TAKr1jO0GpcrVI183mZMeLtNQODKzLrNXpG-OfWFfb9HkX8-756eneeO8gVR41POU9-f1BAzX21-vDn0peeCzIj19ceZVB7-jm8OvbIXwFy-AYkF5h3bv8v0MZvv-ko8VphghPp_Iq11cFGD8cubUmoL6LTlFin8wBP5OJzMIi33YjX9hLiPKmzXVae0cQS-G9kUfrtRQ8FxsneGXkDBOQ" />
                        </div>
                        <span className="font-bold">Chocolate Tetra 12-Pack</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-on-surface-variant">#BC-98231</td>
                    <td className="px-8 py-6 text-sm">Oct 24, 2023</td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tertiary/10 text-tertiary">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                        Shipped
                      </span>
                    </td>
                    <td className="px-8 py-6 font-bold">$144.00</td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-on-surface-variant hover:text-tertiary">
                        <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Example Order Row 2 */}
                  <tr className="hover:bg-surface-container/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center overflow-hidden">
                          <img className="w-full h-full object-cover" alt="Product thumbnail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjjuwLgKJJKfQ26HYzsXpIUxSr2HrgV9tfnZdOYDSbj7ZCwMb7-ARzQSqcBooa7HWkU4uVevtTU2_q5hqKW_JEf1KdndOqYRmphZ3nB11iibRY_nrsIzXeDgA8xqZ3QVrKxZAizRpKRgERKzxU7FSAh-IpJn2FOVZSHODMURg237-sWa3c5V_KTp3svW_1c8YH6I9M-kbjOULytWTiwGPuck1Vc5NrZoZu4KTZxxxO7sZnhqmn2JBnapfL0jlT5IR4jpQAxHoJNg" />
                        </div>
                        <span className="font-bold">Chocolate Tetra 12-Pack</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-on-surface-variant">#BC-98104</td>
                    <td className="px-8 py-6 text-sm">Sep 12, 2023</td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary-container/20 text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Delivered
                      </span>
                    </td>
                    <td className="px-8 py-6 font-bold">$144.00</td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-on-surface-variant hover:text-tertiary">
                        <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        {/* Footer */}
        <footer className="bg-surface-container-lowest py-12 px-12 border-t border-outline-variant/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-headline font-black text-xl tracking-tighter text-tertiary">THE LIQUID CURATOR</h4>
              <p className="text-xs text-on-surface-variant mt-2 tracking-widest uppercase">The Gold Standard of Functional Cacao</p>
            </div>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              <a className="hover:text-tertiary transition-colors" href="#">Privacy</a>
              <a className="hover:text-tertiary transition-colors" href="#">Terms</a>
              <a className="hover:text-tertiary transition-colors" href="#">Support</a>
            </div>
            <div className="text-xs text-on-surface-variant/50">
              © 2024 Balpro Life. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default UserDashboard;
