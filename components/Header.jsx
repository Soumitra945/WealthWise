
import { SignedOut,SignUpButton,SignInButton,SignedIn,UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { LayoutDashboard, PenBox } from 'lucide-react';
import { checkUser } from '@/lib/checkuser';
import { Router } from 'next/navigation';

const Header = async () => {

  await checkUser();

  return (
    <div className="mb-25 fixed top-0 w-full h-auto bg-gradient-to-brbg-gradient-to-br from-gray-900 via-blue-900 to-slate-800 backdrop-blur-md z-50 border-b">
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
    {/* Logo */}
    <div className="text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-blue-400 transition duration-300 ">
      <a href="/" className="text-4xl font-bold text-cyan-400 hover:text-cyan-300">
          WealthWise
      </a>
    </div>
    {/* Right Section */}
    <div className="flex items-center space-x-4">
          <SignedIn>
          <button className="bg-gradient-to-r from-red-400 to-black-100 text-white px-6 py-3 rounded-full font-bold hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30 transition-all">
            <a href="/dashboard">Dashboard</a>
          </button>
          <button className="bg-gradient-to-r from-red-400 to-white-500 text-white px-6 py-3 rounded-full font-bold hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30 transition-all">
            <a href="/transaction/create">Add transaction</a>
          </button>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-full font-bold hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30 transition-all">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
  </nav>
</div>
  )
}

export default Header;

// /*
// import React, { useState, useEffect } from 'react';

// const TradingPlatform = () => {
//   const [activeTimeframe, setActiveTimeframe] = useState('1W');
//   const [tickerData, setTickerData] = useState([
//     { symbol: 'AAPL', price: 175.43, change: 2.34 },
//     { symbol: 'GOOGL', price: 2847.22, change: 1.87 },
//     { symbol: 'TSLA', price: 248.56, change: -3.21 },
//     { symbol: 'AMZN', price: 3234.78, change: 0.95 },
//     { symbol: 'MSFT', price: 367.89, change: 1.45 }
//   ]);

//   // Update ticker prices randomly
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTickerData(prev => prev.map(item => ({
//         ...item,
//         price: parseFloat((item.price + (Math.random() - 0.5) * 10).toFixed(2)),
//         change: parseFloat(((Math.random() - 0.5) * 6).toFixed(2))
//       })));
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleTimeframeChange = (timeframe) => {
//     setActiveTimeframe(timeframe);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-slate-800 text-white overflow-x-hidden">
//       {/* Header */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md py-5 border-b border-cyan-400/20">
//         <nav className="max-w-7xl mx-auto px-5 flex justify-between items-center">
//           <a href="#" className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-all duration-300 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
//             TradePro
//           </a>
//           <ul className="hidden md:flex space-x-8">
//             <li><a href="#dashboard" className="hover:text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] relative group">
//               Dashboard
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
//             </a></li>
//             <li><a href="#trading" className="hover:text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] relative group">
//               Trading
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
//             </a></li>
//             <li><a href="#portfolio" className="hover:text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] relative group">
//               Portfolio
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
//             </a></li>
//             <li><a href="#analytics" className="hover:text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] relative group">
//               Analytics
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
//             </a></li>
//           </ul>
//           <button className="bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 rounded-full font-bold hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.7)] animate-pulse">
//             Start Trading
//           </button>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="pt-24">
//         {/* Hero Section */}
//         <section className="py-16 text-center relative overflow-hidden">
//           <div className="absolute inset-0 bg-radial-gradient from-cyan-400/20 via-blue-500/10 to-transparent"></div>
//           <div className="absolute top-0 left-0 w-full h-full">
//             {[...Array(20)].map((_, i) => (
//               <div
//                 key={i}
//                 className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-twinkle"
//                 style={{
//                   top: `${Math.random() * 100}%`,
//                   left: `${Math.random() * 100}%`,
//                   animationDelay: `${Math.random() * 3}s`,
//                   animationDuration: `${2 + Math.random() * 3}s`
//                 }}
//               />
//             ))}
//           </div>
//           <div className="max-w-4xl mx-auto px-5 relative z-10">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">
//               Advanced Trading Platform
//             </h1>
//             <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
//               Experience the future of trading with our AI-powered platform. Real-time data, advanced analytics, and seamless execution.
//             </p>
//             <button className="bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.8)] relative group overflow-hidden">
//               <span className="relative z-10">Get Started Free</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </button>
//           </div>
//         </section>

//         {/* Ticker */}
//         <section className="bg-black/50 py-4 overflow-hidden border-y border-cyan-400/30">
//           <div className="flex animate-scroll">
//             {[...tickerData, ...tickerData].map((item, index) => (
//               <div key={index} className="flex-shrink-0 mx-10 whitespace-nowrap hover:scale-110 transition-all duration-300">
//                 <span className="text-cyan-400 font-bold mr-3 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">{item.symbol}</span>
//                 <span className="text-green-400 mr-3 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">${item.price.toFixed(2)}</span>
//                 <span className={`${item.change >= 0 ? 'text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]' : 'text-red-400 drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]'}`}>
//                   {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
//                 </span>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Dashboard */}
//         <section id="dashboard" className="py-20 bg-white/5 backdrop-blur-md">
//           <div className="max-w-7xl mx-auto px-5">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">Trading Dashboard</h2>
//               <p className="text-xl opacity-90">Monitor your portfolio and execute trades with precision</p>
//             </div>
            
//             {/* Market Analysis Card */}
//             <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-400/30 transition-all duration-500 mb-10 relative overflow-hidden group">
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
//               <div className="flex justify-between items-center mb-6 relative z-10">
//                 <h3 className="text-2xl font-bold drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">Market Analysis</h3>
//                 <div className="flex items-center space-x-4">
//                   <span className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] animate-pulse">$2,847.22</span>
//                   <span className="text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)] px-3 py-1 bg-green-400/20 rounded-full border border-green-400/30">+1.87% (+$52.14)</span>
//                 </div>
//               </div>
              
//               <div className="flex justify-between items-center mb-6 relative z-10">
//                 <div className="flex space-x-3">
//                   {['1D', '1W', '1M', '3M', '1Y'].map((timeframe) => (
//                     <button
//                       key={timeframe}
//                       onClick={() => handleTimeframeChange(timeframe)}
//                       className={`px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105 ${
//                         activeTimeframe === timeframe
//                           ? 'bg-gradient-to-r from-cyan-400 to-blue-600 border-cyan-400 shadow-lg shadow-cyan-400/50 drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]'
//                           : 'bg-white/10 border-white/20 hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-600/30 hover:border-cyan-400/50'
//                       }`}
//                     >
//                       {timeframe}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="text-cyan-400 text-sm drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] animate-pulse">
//                   GOOGL • Real-time
//                 </div>
//               </div>
              
//               {/* Simplified Chart Display */}
//               <div className="h-96 bg-black/30 rounded-2xl relative overflow-hidden border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-500">
//                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-600/10"></div>
                
//                 {/* Animated Grid Lines */}
//                 <div className="absolute inset-0">
//                   {[...Array(8)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse"
//                       style={{
//                         top: `${(i + 1) * 12.5}%`,
//                         animationDelay: `${i * 0.2}s`
//                       }}
//                     />
//                   ))}
//                   {[...Array(10)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-pulse"
//                       style={{
//                         left: `${(i + 1) * 10}%`,
//                         animationDelay: `${i * 0.1}s`
//                       }}
//                     />
//                   ))}
//                 </div>
                
//                 {/* Animated Chart Line */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="relative w-full h-full">
//                     <svg className="w-full h-full" viewBox="0 0 400 200">
//                       <defs>
//                         <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                           <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
//                           <stop offset="50%" stopColor="#00ff88" stopOpacity="0.6" />
//                           <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
//                         </linearGradient>
//                         <filter id="glow">
//                           <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
//                           <feMerge>
//                             <feMergeNode in="coloredBlur"/>
//                             <feMergeNode in="SourceGraphic"/>
//                           </feMerge>
//                         </filter>
//                       </defs>
//                       <path
//                         d="M 20 150 Q 80 100 120 120 T 200 80 T 280 90 T 360 70"
//                         fill="none"
//                         stroke="url(#chartGradient)"
//                         strokeWidth="3"
//                         filter="url(#glow)"
//                         className="animate-draw"
//                       />
//                       {/* Animated data points */}
//                       {[{x: 20, y: 150}, {x: 120, y: 120}, {x: 200, y: 80}, {x: 280, y: 90}, {x: 360, y: 70}].map((point, i) => (
//                         <circle
//                           key={i}
//                           cx={point.x}
//                           cy={point.y}
//                           r="4"
//                           fill="#00d4ff"
//                           filter="url(#glow)"
//                           className="animate-pulse"
//                           style={{ animationDelay: `${i * 0.3}s` }}
//                         />
//                       ))}
//                     </svg>
//                   </div>
//                 </div>
                
//                 {/* Floating Data Points */}
//                 <div className="absolute inset-0">
//                   {[...Array(6)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="absolute w-3 h-3 bg-cyan-400 rounded-full animate-float shadow-lg shadow-cyan-400/50"
//                       style={{
//                         top: `${20 + i * 10}%`,
//                         left: `${10 + i * 15}%`,
//                         animationDelay: `${i * 0.8}s`
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Dashboard Cards */}
//             <div className="grid md:grid-cols-2 gap-10">
//               {/* Portfolio Overview */}
//               <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-green-400/30 hover:border-green-400/60 hover:transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-green-400/30 transition-all duration-500 relative overflow-hidden group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
//                 <div className="absolute -top-2 -right-2 w-20 h-20 bg-green-400/20 rounded-full blur-xl group-hover:bg-green-400/40 transition-all duration-500"></div>
                
//                 <div className="flex justify-between items-center mb-6 relative z-10">
//                   <h3 className="text-2xl font-bold drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">Portfolio Overview</h3>
//                   <span className="bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-green-400/50 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)] animate-pulse">
//                     +12.34%
//                   </span>
//                 </div>
                
//                 <div className="h-48 bg-black/30 rounded-xl relative overflow-hidden mb-6 border border-green-400/20 group-hover:border-green-400/40 transition-all duration-500">
//                   <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-600/10"></div>
                  
//                   {/* Animated Success Indicators */}
//                   <div className="absolute inset-0">
//                     {[...Array(8)].map((_, i) => (
//                       <div
//                         key={i}
//                         className="absolute w-2 h-2 bg-green-400 rounded-full animate-bounce shadow-lg shadow-green-400/50"
//                         style={{
//                           top: `${20 + (i % 4) * 20}%`,
//                           left: `${15 + (i % 4) * 25}%`,
//                           animationDelay: `${i * 0.3}s`
//                         }}
//                       />
//                     ))}
//                   </div>
                  
//                   {/* Pulsing Center Element */}
//                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
//                 </div>
                
//                 <div className="grid grid-cols-3 gap-4 relative z-10">
//                   <div className="text-center p-4 bg-white/5 rounded-xl border border-green-400/20 hover:border-green-400/40 hover:bg-green-400/10 transition-all duration-300 group/stat">
//                     <div className="text-2xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)] group-hover/stat:scale-110 transition-transform duration-300">$247,832</div>
//                     <div className="text-sm opacity-80 mt-1">Total Value</div>
//                   </div>
//                   <div className="text-center p-4 bg-white/5 rounded-xl border border-green-400/20 hover:border-green-400/40 hover:bg-green-400/10 transition-all duration-300 group/stat">
//                     <div className="text-2xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)] group-hover/stat:scale-110 transition-transform duration-300">+$27,450</div>
//                     <div className="text-sm opacity-80 mt-1">Today's P&L</div>
//                   </div>
//                   <div className="text-center p-4 bg-white/5 rounded-xl border border-green-400/20 hover:border-green-400/40 hover:bg-green-400/10 transition-all duration-300 group/stat">
//                     <div className="text-2xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)] group-hover/stat:scale-110 transition-transform duration-300">15</div>
//                     <div className="text-sm opacity-80 mt-1">Positions</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Active Trades */}
//               <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-orange-400/30 hover:border-orange-400/60 hover:transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-orange-400/30 transition-all duration-500 relative overflow-hidden group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
//                 <div className="absolute -top-2 -right-2 w-20 h-20 bg-orange-400/20 rounded-full blur-xl group-hover:bg-orange-400/40 transition-all duration-500"></div>
                
//                 <div className="flex justify-between items-center mb-6 relative z-10">
//                   <h3 className="text-2xl font-bold drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]">Active Trades</h3>
//                   <span className="bg-gradient-to-r from-orange-400 to-red-600 px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-orange-400/50 drop-shadow-[0_0_10px_rgba(255,165,0,0.5)] animate-pulse">
//                     8 Open
//                   </span>
//                 </div>
                
//                 <div className="h-48 bg-black/30 rounded-xl relative overflow-hidden mb-6 border border-orange-400/20 group-hover:border-orange-400/40 transition-all duration-500">
//                   <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-600/10"></div>
                  
//                   {/* Dynamic Trading Indicators */}
//                   <div className="absolute inset-0">
//                     {[...Array(10)].map((_, i) => (
//                       <div
//                         key={i}
//                         className={`absolute w-1 h-1 rounded-full animate-ping ${
//                           i % 3 === 0 ? 'bg-red-400' : i % 3 === 1 ? 'bg-orange-400' : 'bg-yellow-400'
//                         }`}
//                         style={{
//                           top: `${10 + Math.random() * 80}%`,
//                           left: `${10 + Math.random() * 80}%`,
//                           animationDelay: `${i * 0.4}s`
//                         }}
//                       />
//                     ))}
//                   </div>
                  
//                   {/* Central Activity Hub */}
//                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-600 rounded-full animate-spin shadow-lg shadow-orange-400/50"></div>
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full animate-pulse"></div>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-3 gap-4 relative z-10">
//                   <div className="text-center p-4 bg-white/5 rounded-xl border border-orange-400/20 hover:border-orange-400/40 hover:bg-orange-400/10 transition-all duration-300 group/stat">
//                     <div className="text-2xl font-bold text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.5)] group-hover/stat:scale-110 transition-transform duration-300">$89,234</div>
//                     <div className="text-sm opacity-80 mt-1">Open Value</div>
//                   </div>
//                   <div className="text-center p-4 bg-white/5 rounded-xl border border-orange-400/20 hover:border-orange-400/40 hover:bg-orange-400/10 transition-all duration-300 group/stat">
//                     <div className="text-2xl font-bold text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.5)] group-hover/stat:scale-110 transition-transform duration-300">+$5,670</div>
//                     <div className="text-sm opacity-80 mt-1">Unrealized P&L</div>
//                   </div>
//                   <div className="text-center p-4 bg-white/5 rounded-xl border border-orange-400/20 hover:border-orange-400/40 hover:bg-orange-400/10 transition-all duration-300 group/stat">
//                     <div className="text-2xl font-bold text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.5)] group-hover/stat:scale-110 transition-transform duration-300">92%</div>
//                     <div className="text-sm opacity-80 mt-1">Win Rate</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features */}
//         <section className="py-20 relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-600/5"></div>
//           <div className="max-w-7xl mx-auto px-5 relative z-10">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">Why Choose TradePro?</h2>
//               <p className="text-xl opacity-90">Advanced features designed for professional traders</p>
//             </div>
            
//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 text-center border border-cyan-400/30 hover:border-cyan-400/60 hover:transform hover:-translate-y-6 hover:shadow-2xl hover:shadow-cyan-400/40 transition-all duration-500 relative overflow-hidden group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl group-hover:bg-cyan-400/40 transition-all duration-500"></div>
                
//                 <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg shadow-cyan-400/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10">
//                   ⚡
//                 </div>
//                 <h3 className="text-xl font-bold text-cyan-400 mb-4 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] relative z-10">Lightning Fast Execution</h3>
//                 <p className="opacity-90 relative z-10">Execute trades in milliseconds with our advanced order management system.</p>
//               </div>
              
//               <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 text-center border border-purple-400/30 hover:border-purple-400/60 hover:transform hover:-translate-y-6 hover:shadow-2xl hover:shadow-purple-400/40 transition-all duration-500 relative overflow-hidden group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl group-hover:bg-purple-400/40 transition-all duration-500"></div>
                
//                 <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg shadow-purple-400/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10">
//                   🔍
//                 </div>
//                 <h3 className="text-xl font-bold text-purple-400 mb-4 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)] relative z-10">Advanced Analytics</h3>
//                 <p className="opacity-90 relative z-10">Get deep insights with AI-powered market analysis and risk assessment tools.</p>
//               </div>
              
//               <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 text-center border border-emerald-400/30 hover:border-emerald-400/60 hover:transform hover:-translate-y-6 hover:shadow-2xl hover:shadow-emerald-400/40 transition-all duration-500 relative overflow-hidden group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-400/20 rounded-full blur-xl group-hover:bg-emerald-400/40 transition-all duration-500"></div>
                
//                 <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg shadow-emerald-400/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10">
//                   🛡️
//                 </div>
//                 <h3 className="text-xl font-bold text-emerald-400 mb-4 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] relative z-10">Secure Trading</h3>
//                 <p className="opacity-90 relative z-10">Bank-grade security with multi-factor authentication and encrypted data.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Additional Stats Section */}
//         <section className="py-20 bg-black/30 border-y border-cyan-400/20">
//           <div className="max-w-7xl mx-auto px-5">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//               <div className="text-center group">
//                 <div className="text-4xl font-bold text-cyan-400 mb-2 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] group-hover:scale-110 transition-all duration-300">$2.4B+</div>
//                 <div className="text-sm opacity-80">Daily Volume</div>
//               </div>
//               <div className="text-center group">
//                 <div className="text-4xl font-bold text-green-400 mb-2 drop-shadow-[0_0_15px_rgba(0,255,0,0.5)] group-hover:scale-110 transition-all duration-300">99.9%</div>
//                 <div className="text-sm opacity-80">Uptime</div>
//               </div>
//               <div className="text-center group">
//                 <div className="text-4xl font-bold text-purple-400 mb-2 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:scale-110 transition-all duration-300">50K+</div>
//                 <div className="text-sm opacity-80">Active Traders</div>
//               </div>
//               <div className="text-center group">
//                 <div className="text-4xl font-bold text-orange-400 mb-2 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)] group-hover:scale-110 transition-all duration-300">0.01ms</div>
//                 <div className="text-sm opacity-80">Latency</div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <style jsx>{`
//         @keyframes scroll {
//           0% { transform: translateX(100%); }
//           100% { transform: translateX(-100%); }
//         }
//         .animate-scroll {
//           animation: scroll 30s linear infinite;
//         }
//         .bg-radial-gradient {
//           background: radial-gradient(circle at 30% 50%, rgba(0, 212, 255, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%);
//         }
//         @keyframes bounce {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-bounce {
//           animation: bounce 2s ease-in-out infinite;
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(180deg); }
//         }
//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(0.8); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }
//         .animate-twinkle {
//           animation: twinkle 2s ease-in-out infinite;
//         }
//         @keyframes draw {
//           0% { stroke-dasharray: 0, 1000; }
//           100% { stroke-dasharray: 1000, 0; }
//         }
//         .animate-draw {
//           animation: draw 3s ease-in-out infinite;
//         }
//         @keyframes ping {
//           0% { transform: scale(1); opacity: 1; }
//           75%, 100% { transform: scale(2); opacity: 0; }
//         }
//         .animate-ping {
//           animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         .animate-spin {
//           animation: spin 2s linear infinite;
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//         .animate-pulse {
//           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TradingPlatform;
//  */