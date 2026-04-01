import React from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from './UserSidebar';

const UserRewards = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <UserSidebar />

      <main className="ml-72 min-h-screen p-12 bg-surface">
        <header className="flex justify-between items-end mb-16">
          <div>
            <span className="text-tertiary font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Loyalty Program</span>
            <h2 className="text-6xl font-black font-headline tracking-tighter leading-none">Liquid Gold Rewards</h2>
          </div>
          <div className="text-right">
            <p className="text-primary-fixed-dim text-sm uppercase tracking-widest mb-1">Status</p>
            <p className="text-2xl font-bold font-headline text-tertiary">Master Curator</p>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8 mb-24">
          <div className="col-span-12 lg:col-span-7 relative overflow-hidden rounded-xl bg-surface-container-low p-12 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/5 rounded-full blur-[100px] -mr-32 -mt-32 transition-all group-hover:bg-tertiary/10"></div>
            <div>
              <p className="text-primary-fixed-dim uppercase tracking-widest text-xs mb-2">Available Balance</p>
              <div className="flex items-baseline gap-4">
                <span className="text-8xl font-black font-headline tracking-tighter text-tertiary">4,250</span>
                <span className="text-2xl font-bold text-on-surface-variant uppercase tracking-widest">Drops</span>
              </div>
            </div>
            <div className="mt-12 flex gap-8">
              <button className="bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">redeem</span>
                Redeem Now
              </button>
              <button className="border border-outline-variant/30 text-on-surface px-8 py-4 rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors">
                Earn More
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 rounded-xl bg-surface-container-high p-12 flex flex-col items-center justify-center relative group">
            <div className="relative w-48 h-48 mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
                <circle className="text-surface-variant" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-tertiary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="138" strokeLinecap="round" strokeWidth="8"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black font-headline">75%</span>
                <span className="text-[10px] uppercase tracking-widest text-primary-fixed-dim">To Obsidian Tier</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium mb-1">750 Drops away from Obsidian</p>
              <p className="text-xs text-primary-fixed-dim leading-relaxed">Unlocked: Free Global Shipping, Early Access, Monthly Samples</p>
            </div>
          </div>
        </div>

        <section className="mb-24">
          <div className="flex justify-between items-end mb-12">
            <h3 className="text-3xl font-black font-headline tracking-tight">Available Rewards</h3>
            <Link className="text-tertiary text-sm font-bold uppercase tracking-widest hover:underline" to="/products">View All Gallery</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Signature Cacao Tetra Pack',
                points: '500 D',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC04IbUJOeaCvUHwj01oY_nGOv518bTLfxkwmbJM5dyYHOX8v2xGsqkTcJVAITP0qP7Eb83COlBZJXPz7Cdfiplc14gWGYg5oz7rgxk18met-oickyoT88KkPyDhs3LCHx2TQbS3A_dJEb-mm0MYIM5IzXu5Ut2QqUK_8cnsd_BiXcAslegeJzefSGfp4hQqdGLFtPtSp4WUUuho_bufIWvlfMpC_ospwFtToiqgfAVXsblib3j5jhFgB1nZ31efn7un9CWQGKTEA',
                desc: 'Our classic formula infused with ashwagandha and dark Ghanaian cocoa.'
              },
              {
                title: 'Priority White-Glove Shipping',
                points: '250 D',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCodSJSwH5VWYFyohIn05Mq4dwqBxipsgwh8LNjcqLSm2NHLMhfEc9nw0CFPeF26D9AmLgPEGsd0lp9qvbyJ74BU2T1Tn1jUMNP7yfMeYJfdmHtPUnIh8xpa1J1KAS2ZQTKhXMfltjbHNob_PY51luLlbW9c8nrlF7NSv1HL2GiHv9bK76eCwjFBLa6C3_D91nBieGn2k0pwFf5FQHj386E9ndE0AKOczI9_1EIomEuc69MSQRwCi1RL_8P7dz8OpEhd_3tUPy1g',
                desc: 'Next-day delivery with premium sustainable packaging and real-time curation updates.'
              },
              {
                title: 'Ceramic Ritual Vessel',
                points: '1200 D',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr72I39za40YOYL-cUQxeoMv3p0aBJ4B_aSQrTz2Yvn2pToJDCoRbCFN1F34KdEXYB0lrDKMZq3vo3mZrtUICghCoIo8NamSR2nacpanwLiha4Hmo1O2nuaSfYBDNc4UNS8GEFN_jn-4LOpU5NEWpndOgwVmQOam6kkHaup4YEYvBYw3dCiJjdCgzci-OFLSuz_BbfggH-1CLLxib6Z5nCa0TsU0CbroWfxmf4D_kk5sOXdNaev_hFmp8K8suRvmiySvpzJqsmiw',
                desc: 'A limited-edition vessel designed by Japanese artisans specifically for Balpro drinks.'
              }
            ].map((item) => (
              <div key={item.title} className="group rounded-lg bg-surface-container-low overflow-hidden hover:-translate-y-2 transition-all duration-500">
                <div className="h-64 overflow-hidden relative">
                  <img alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src={item.img} />
                  <div className="absolute inset-0 bg-linear-to-t from-surface-container-low via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4 gap-3">
                    <h4 className="text-xl font-bold font-headline leading-tight">{item.title}</h4>
                    <span className="text-tertiary font-bold shrink-0">{item.points}</span>
                  </div>
                  <p className="text-sm text-primary-fixed-dim mb-8">{item.desc}</p>
                  <button className="w-full border border-outline-variant/20 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] group-hover:bg-tertiary group-hover:text-on-tertiary transition-all">Redeem</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl">
          <div className="flex justify-between items-end mb-12">
            <h3 className="text-3xl font-black font-headline tracking-tight">Reward History</h3>
            <span className="text-primary-fixed-dim text-[10px] uppercase tracking-widest">Last 90 Days</span>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Quarterly Bonus', date: 'Nov 12, 2023', value: '+1,000 Drops', sub: 'Loyalty Reward', icon: 'celebration', valueClass: 'text-tertiary', iconBg: 'bg-tertiary/10', iconClass: 'text-tertiary' },
              { label: 'Priority Shipping', date: 'Oct 28, 2023', value: '-250 Drops', sub: 'Redemption', icon: 'local_shipping', valueClass: 'text-on-surface-variant', iconBg: 'bg-primary-container', iconClass: 'text-primary' },
              { label: 'Monthly Ritual Box', date: 'Oct 15, 2023', value: '+450 Drops', sub: 'Purchase', icon: 'shopping_basket', valueClass: 'text-tertiary', iconBg: 'bg-tertiary/10', iconClass: 'text-tertiary' }
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between p-6 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-full ${row.iconBg} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined ${row.iconClass}`}>{row.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold">{row.label}</p>
                    <p className="text-xs text-primary-fixed-dim uppercase tracking-tighter">{row.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-black font-headline ${row.valueClass}`}>{row.value}</p>
                  <p className="text-[10px] text-primary-fixed-dim uppercase tracking-widest">{row.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserRewards;
