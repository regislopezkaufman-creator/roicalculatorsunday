import React, { useState, useEffect } from 'react';
import { Share2, ArrowRight, Printer, Star, Clock, DollarSign, TrendingUp, Sun, Moon } from 'lucide-react';

// Using Google Fonts to approximate Europa Grotesk SH Extd
const FontLink = () => (
    <style>
        {`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      
      body {
        font-family: 'Space Grotesk', sans-serif;
      }
      
      .font-grotesk {
        font-family: 'Space Grotesk', sans-serif;
      }

      /* Custom Range Slider Styling */
      input[type=range] {
        -webkit-appearance: none; 
        background: transparent; 
      }
      
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: #ff48ed;
        cursor: pointer;
        margin-top: -10px; 
        box-shadow: 0 0 10px #ff48ed;
      }
      
      /* Light Mode Track */
      input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: #e5e7eb; /* gray-200 */
        border-radius: 2px;
      }

      /* Dark Mode Track Toggle */
      .dark input[type=range]::-webkit-slider-runnable-track {
        background: #333;
      }

      .neon-shadow {
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      }
      .dark .neon-shadow {
        box-shadow: 0 4px 30px rgba(255, 72, 237, 0.15);
      }

      .receipt-pattern {
        background-image: radial-gradient(#f3f4f6 15%, transparent 16%), radial-gradient(#f3f4f6 15%, transparent 16%);
        background-size: 20px 20px;
        background-position: 0 0, 10px 10px;
      }
      .dark .receipt-pattern {
        background-image: radial-gradient(#131313 15%, transparent 16%), radial-gradient(#131313 15%, transparent 16%);
      }
      
      .shimmer {
        animation: shimmer 2s infinite linear;
        background: linear-gradient(to right, #ff48ed 4%, #ff8bf5 25%, #ff48ed 36%);
        background-size: 1000px 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }

      .receipt-tear-top {
        background: radial-gradient(circle at 10px bottom, transparent 10px, #ffffff 10.5px) top left / 20px 20px repeat-x;
      }
      .receipt-tear-bottom {
        background: radial-gradient(circle at 10px top, transparent 10px, #ffffff 10.5px) bottom left / 20px 20px repeat-x;
      }
    `}
    </style>
);

const translations = {
    en: {
        restaurantProfile: "Restaurant Profile",
        restaurantType: "Restaurant Type",
        types: {
            "Fine Dining": "Fine Dining",
            "Casual": "Casual",
            "Fast Food": "Fast Food",
            "Bar/Pub": "Bar/Pub"
        },
        monthlyTurnover: "Monthly Turnover",
        volumeTraffic: "Volume & Traffic",
        tablesPerDay: "Tables Per Day",
        avgTicket: "Avg Ticket Size",
        ctaMobile: "Get this ROI",
        receiptHeader: "Your ROI Report",
        timeSaved: "Time Saved",
        timeSavedSub: "12min x tables",
        reviewBoost: "Review Boost",
        reviewBoostSub: "5x Multiplier Active",
        tipsSurge: "Tips Surge",
        tipsSurgeSub: "Staff Retention Impact",
        estValue: "Est. Value",
        perMonth: "Per Month",
        poweredBy: "Powered by Sunday",
        startSaving: "Start Saving Now",
        disclaimer: "*Estimates based on average Sunday performance metrics.",
        footerTitle: "Ready to optimize \n your restaurant?",
        getStarted: "Get Started",
        heroTitle: "Turn Tables \n Into Treasure",
        heroSubtitle: "Stop losing 12 minutes per table. Calculate how much time and money you're leaving on the table with legacy payments.",
        new: "New",
        hrsMo: "hrs/mo",
        vol: "Vol"
    },
    fr: {
        restaurantProfile: "Profil du Restaurant",
        restaurantType: "Type de Restaurant",
        types: {
            "Fine Dining": "Gastronomique",
            "Casual": "Bistrot / Casual",
            "Fast Food": "Restauration Rapide",
            "Bar/Pub": "Bar / Pub"
        },
        monthlyTurnover: "Chiffre d'Affaires Mensuel",
        volumeTraffic: "Volume & Trafic",
        tablesPerDay: "Tables par Jour",
        avgTicket: "Ticket Moyen",
        ctaMobile: "Obtenir ce ROI",
        receiptHeader: "Votre Rapport ROI",
        timeSaved: "Temps Gagné",
        timeSavedSub: "12min x tables",
        reviewBoost: "Boost d'Avis",
        reviewBoostSub: "Multiplicateur x5 Actif",
        tipsSurge: "Hausse Pourboires",
        tipsSurgeSub: "Impact Rétention Staff",
        estValue: "Valeur Est.",
        perMonth: "Par Mois",
        poweredBy: "Propulsé par Sunday",
        startSaving: "Économisez Maintenant",
        disclaimer: "*Estimations basées sur les moyennes de performance Sunday.",
        footerTitle: "Prêt à optimiser \n votre restaurant ?",
        getStarted: "Commencer",
        heroTitle: "Transformez vos tables \n en trésor",
        heroSubtitle: "Ne perdez plus 12 minutes par table. Calculez le temps et l'argent que vous laissez sur la table avec les paiements traditionnels.",
        new: "Nouv.",
        hrsMo: "h/mois",
        vol: "Vol"
    }
};

const App = () => {
    // --- State ---
    const [lang, setLang] = useState('en');
    const [theme, setTheme] = useState('light');
    const t = translations[lang];

    const [inputs, setInputs] = useState({
        restaurantType: 'Casual Dining',
        tablesPerDay: 40,
        monthlyTurnover: 80000,
        avgTicket: 45,
    });

    const [results, setResults] = useState({
        timeSavedHours: 0,
        extraTips: 0,
        extraReviews: 0,
        totalValue: 0,
    });

    // --- Constants & Logic ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: name === 'restaurantType' ? value : Number(value)
        }));
    };

    useEffect(() => {
        calculateROI();
    }, [inputs]);

    const calculateROI = () => {
        const minutesSavedPerMonth = inputs.tablesPerDay * 12 * 30;
        const hoursSaved = Math.round(minutesSavedPerMonth / 60);

        const baselineTips = inputs.monthlyTurnover * 0.10;
        const newTips = baselineTips * 1.4;
        const extraTips = inputs.monthlyTurnover * 0.15;

        const estimatedReviews = Math.floor((inputs.tablesPerDay * 30) * 0.05);
        const boostedReviews = estimatedReviews * 5;
        const extraReviews = boostedReviews - estimatedReviews;

        const laborSavings = hoursSaved * 15;
        const revenueBoost = inputs.monthlyTurnover * 0.10;

        setResults({
            timeSavedHours: hoursSaved,
            extraTips: Math.round(extraTips),
            extraReviews: extraReviews,
            totalValue: Math.round(revenueBoost + laborSavings)
        });
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
            style: 'currency',
            currency: lang === 'fr' ? 'EUR' : 'USD',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className={theme}>
            <div className="min-h-screen bg-[#f3f4f6] dark:bg-[#131313] text-gray-900 dark:text-white overflow-x-hidden selection:bg-[#ff48ed] selection:text-black relative transition-colors duration-300">
                <FontLink />

                {/* Sunday Logo */}
                <div className="absolute top-2 left-6 z-50">
                    <img
                        src={theme === 'dark' ? "/sunday-logo-white.png" : "/sunday-logo-black.png"}
                        alt="Sunday"
                        className="h-16 md:h-28 w-auto object-contain transition-all duration-300"
                    />
                </div>

                {/* Controls */}
                <div className="absolute top-6 right-6 z-50 flex items-center gap-4">

                    {/* Language Toggle */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setLang('en')}
                            className={`px-3 py-1 rounded-full text-sm font-bold transition-all border ${lang === 'en' ? 'bg-[#ff48ed] text-black border-[#ff48ed]' : 'bg-white dark:bg-[#1a1a1a] text-gray-400 border-gray-200 dark:border-gray-700'}`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLang('fr')}
                            className={`px-3 py-1 rounded-full text-sm font-bold transition-all border ${lang === 'fr' ? 'bg-[#ff48ed] text-black border-[#ff48ed]' : 'bg-white dark:bg-[#1a1a1a] text-gray-400 border-gray-200 dark:border-gray-700'}`}
                        >
                            FR
                        </button>
                    </div>
                </div>

                {/* --- Main Content --- */}
                <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-16">

                    {/* Header Section */}
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-none whitespace-pre-line">
                            {t.heroTitle.split('\n')[0]} <br />
                            <span className="shimmer">{t.heroTitle.split('\n')[1]}</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light transition-colors">
                            {t.heroSubtitle}
                        </p>
                    </div>

                    {/* Calculator Grid */}
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-20">

                        {/* LEFT COLUMN: Inputs */}
                        <div className="lg:col-span-7 space-y-10">

                            {/* Theme Toggle - Positioned before Profile */}
                            <div className="flex justify-end -mb-4 relative z-10">
                                <div className="flex p-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] transition-colors shadow-sm">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-[#ff48ed] text-black shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                        title="Light Mode"
                                    >
                                        <Sun size={14} />
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-[#ff48ed] text-black shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                        title="Dark Mode"
                                    >
                                        <Moon size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Input Group 1: Basics */}
                            <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-gray-200 dark:border-gray-800 neon-shadow relative overflow-hidden group transition-colors duration-300">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#ff48ed] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="text-[#ff48ed]">01.</span> {t.restaurantProfile}
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider font-semibold">{t.restaurantType}</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {Object.keys(translations.en.types).map((typeKey) => (
                                                <button
                                                    key={typeKey}
                                                    onClick={() => handleInputChange({ target: { name: 'restaurantType', value: translations.en.types[typeKey] } })}
                                                    className={`px-2 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${inputs.restaurantType === translations.en.types[typeKey]
                                                        ? 'bg-[#ff48ed] text-black border-[#ff48ed]'
                                                        : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                                                        }`}
                                                >
                                                    {t.types[typeKey]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">{t.monthlyTurnover}</label>
                                            <span className="text-[#ff48ed] font-bold">{formatCurrency(inputs.monthlyTurnover)}</span>
                                        </div>
                                        <input
                                            type="range"
                                            name="monthlyTurnover"
                                            min="10000"
                                            max="500000"
                                            step="5000"
                                            value={inputs.monthlyTurnover}
                                            onChange={handleInputChange}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 dark:text-gray-600 mt-2">
                                            <span>{formatCurrency(10000)}</span>
                                            <span>{formatCurrency(500000)}+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Input Group 2: Volume */}
                            <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-gray-200 dark:border-gray-800 neon-shadow relative overflow-hidden group transition-colors duration-300">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#ff48ed] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="text-[#ff48ed]">02.</span> {t.volumeTraffic}
                                </h3>

                                <div className="space-y-8">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">{t.tablesPerDay}</label>
                                            <span className="text-[#ff48ed] font-bold">{inputs.tablesPerDay}</span>
                                        </div>
                                        <input
                                            type="range"
                                            name="tablesPerDay"
                                            min="10"
                                            max="300"
                                            value={inputs.tablesPerDay}
                                            onChange={handleInputChange}
                                            className="w-full"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">{t.avgTicket}</label>
                                            <span className="text-[#ff48ed] font-bold">{formatCurrency(inputs.avgTicket)}</span>
                                        </div>
                                        <input
                                            type="range"
                                            name="avgTicket"
                                            min="15"
                                            max="300"
                                            value={inputs.avgTicket}
                                            onChange={handleInputChange}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CTA Mobile Only */}
                            <div className="block lg:hidden">
                                <a
                                    href="https://sundayapp.com/fr/essayer-sunday/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center w-full bg-[#ff48ed] text-black py-4 rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white transition-colors"
                                >
                                    {t.ctaMobile}
                                </a>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: The Receipt Twist */}
                        <div className="lg:col-span-5 relative">
                            <div className="sticky top-10">

                                {/* Receipt Visual */}
                                <div className="relative mx-auto w-full max-w-md perspective-1000">

                                    {/* Receipt Paper */}
                                    <div className="bg-white text-black p-0 relative shadow-2xl transform transition-transform duration-500 hover:rotate-1 origin-top">

                                        {/* Jagged Top */}
                                        <div className="h-4 w-full bg-white relative -top-3 receipt-tear-top"></div>

                                        <div className="px-8 pt-4 pb-8 space-y-6">

                                            {/* Receipt Header */}
                                            <div className="text-center border-b-2 border-dashed border-gray-300 pb-6">
                                                <div className="w-12 h-12 bg-black rounded-full text-white flex items-center justify-center mx-auto mb-3 font-bold text-xl italic">S</div>
                                                <h2 className="text-2xl font-bold tracking-tight uppercase">{t.receiptHeader}</h2>
                                                <p className="text-gray-500 text-sm font-mono mt-1">{new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}</p>
                                                <p className="text-gray-500 text-sm font-mono uppercase">Merchant ID: #{Math.floor(Math.random() * 90000) + 10000}</p>
                                            </div>

                                            {/* Receipt Body */}
                                            <div className="space-y-4 font-mono text-sm">

                                                {/* Item 1 */}
                                                <div className="flex justify-between items-center group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#ff48ed] group-hover:text-black transition-colors">
                                                            <Clock size={16} />
                                                        </div>
                                                        <div>
                                                            <span className="block font-bold uppercase">{t.timeSaved}</span>
                                                            <span className="text-xs text-gray-500">{t.timeSavedSub.replace('tables', inputs.tablesPerDay)}</span>
                                                        </div>
                                                    </div>
                                                    <span className="font-bold text-lg">{results.timeSavedHours} {t.hrsMo}</span>
                                                </div>

                                                {/* Item 2 */}
                                                <div className="flex justify-between items-center group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#ff48ed] group-hover:text-black transition-colors">
                                                            <Star size={16} />
                                                        </div>
                                                        <div>
                                                            <span className="block font-bold uppercase">{t.reviewBoost}</span>
                                                            <span className="text-xs text-gray-500">{t.reviewBoostSub}</span>
                                                        </div>
                                                    </div>
                                                    <span className="font-bold text-lg">+{results.extraReviews} {t.new}</span>
                                                </div>

                                                {/* Item 3 */}
                                                <div className="flex justify-between items-center group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#ff48ed] group-hover:text-black transition-colors">
                                                            <TrendingUp size={16} />
                                                        </div>
                                                        <div>
                                                            <span className="block font-bold uppercase">{t.tipsSurge}</span>
                                                            <span className="text-xs text-gray-500">{t.tipsSurgeSub}</span>
                                                        </div>
                                                    </div>
                                                    <span className="font-bold text-lg">3x {t.vol}</span>
                                                </div>

                                                {/* Divider */}
                                                <div className="border-t-2 border-black my-4"></div>

                                                {/* Total */}
                                                <div className="flex justify-between items-end">
                                                    <span className="font-bold text-xl uppercase tracking-tighter">{t.estValue}</span>
                                                    <div className="text-right">
                                                        <span className="block text-4xl font-extrabold tracking-tighter leading-none">
                                                            {formatCurrency(results.totalValue)}
                                                        </span>
                                                        <span className="text-xs text-gray-500 uppercase font-semibold">{t.perMonth}</span>
                                                    </div>
                                                </div>

                                                {/* Barcode Mock */}
                                                <div className="pt-6 text-center opacity-80">
                                                    <div className="h-12 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAAFklEQVR4AWP4z8DwHwwDhuBwIwwDAwAAAP//hQz52wAAAABJRU5ErkJggg==')] bg-repeat-x bg-contain w-full mb-2"></div>
                                                    <p className="text-[10px] uppercase tracking-[0.2em]">{t.poweredBy}</p>
                                                </div>

                                            </div>
                                        </div>

                                        {/* Jagged Bottom */}
                                        <div className="h-4 w-full bg-white relative top-3 receipt-tear-bottom"></div>
                                    </div>

                                    {/* Floating "Print" Action */}
                                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
                                        <button className="bg-[#ff48ed] p-4 rounded-full text-black shadow-lg hover:bg-white transition-colors" title="Download Report">
                                            <Printer size={20} />
                                        </button>
                                        <button className="bg-[#1a1a1a] p-4 rounded-full text-white shadow-lg border border-gray-700 hover:border-[#ff48ed] transition-colors" title="Share">
                                            <Share2 size={20} />
                                        </button>
                                    </div>

                                </div>

                                {/* Call to Action below Receipt */}
                                <div className="mt-12 text-center">
                                    <a
                                        href="https://sundayapp.com/fr/essayer-sunday/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#ff48ed] text-black w-full py-4 rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,72,237,0.4)] hover:shadow-[0_0_40px_rgba(255,72,237,0.6)] flex items-center justify-center gap-3"
                                    >
                                        {t.startSaving} <ArrowRight size={24} />
                                    </a>
                                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                        {t.disclaimer}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* --- Footer / Final CTA Section --- */}
                    <section className="mt-20 md:mt-32 text-center border-t border-gray-200 dark:border-gray-800 pt-16 pb-12 transition-colors duration-300">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter whitespace-pre-line">
                            {t.footerTitle}
                        </h2>
                        <a
                            href="https://sundayapp.com/fr/essayer-sunday/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wider hover:bg-[#ff48ed] hover:text-white dark:hover:bg-[#ff48ed] dark:hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                            {t.getStarted} <ArrowRight size={20} />
                        </a>
                    </section>

                </main>
            </div>
        </div>
    );
};

export default App;
