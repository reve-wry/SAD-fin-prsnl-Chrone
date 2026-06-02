import React from 'react';

// 單一經歷卡片的元件 (暗黑版)
const TimelineItem = ({ year, title, role, description, tags }) => {
  return (
    <div className="relative pl-8 py-6 group">
      {/* 垂直線 (改成深灰色) */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-700 group-last:bg-transparent"></div>

      {/* 時間節點的小圓點 (NVIDIA 螢光綠) */}
      <div className="absolute left-[-5px] top-8 h-3 w-3 rounded-full border-2 border-green-500 bg-zinc-900"></div>

      {/* 卡片本體 (深色背景，微弱邊框) */}
      <div className="bg-zinc-800/50 rounded-xl shadow-lg border border-zinc-700/50 p-6 hover:border-green-500/30 transition-colors duration-300">
        
        {/* 年份與標題區塊 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm font-medium text-green-400 mt-1">{role}</p>
          </div>
          <span className="text-sm text-zinc-400 font-mono mt-2 sm:mt-0 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700 w-fit">
            {year}
          </span>
        </div>

        {/* 內文描述 (淺灰色) */}
        <p className="text-zinc-300 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* 技術標籤 (Tags) 區塊 */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 text-xs font-medium text-green-300 bg-green-500/10 rounded-md border border-green-500/20 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};

// 整個網頁的主元件 (暗黑版)
export default function App() {
  return (
    // 背景改為最深的 zinc-900
    <div className="min-h-screen bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* 網頁標題 */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            黃仁勳 (Jensen Huang)
          </h1>
          <p className="mt-3 text-lg text-green-400">
            NVIDIA 創辦人暨執行長 | 人工智慧與 GPU 革命的推手
          </p>
        </div>

        {/* 時間軸容器 */}
        <div className="space-y-4">
          <TimelineItem 
            year="2020s - 至今"
            title="引領全球 AI 革命"
            role="NVIDIA CEO"
            description="隨著生成式 AI（如 ChatGPT）的爆發，NVIDIA 的 GPU 成為訓練 AI 的全球算力基礎。帶領公司市值突破兆美元，並接連發表 Hopper、Blackwell 等次世代 AI 晶片架構，被譽為「AI 教父」。"
            tags={["Generative AI", "Blackwell", "Omniverse", "Trillion Dollar Company"]}
          />
          <TimelineItem 
            year="2006"
            title="發布 CUDA 運算架構"
            role="NVIDIA CEO & Visionary"
            description="做出公司史上最具風險但也最成功的決策：推出 CUDA 程式設計模型。這項技術讓 GPU 不僅能處理 3D 圖形，更能處理通用的平行運算（GPGPU），為後來的深度學習與人工智慧爆發奠定了底層基礎。"
            tags={["CUDA", "GPGPU", "Parallel Computing"]}
          />
          <TimelineItem 
            year="1999"
            title="發明 GPU 與公司上市"
            role="NVIDIA Co-founder & CEO"
            description="NVIDIA 正式在納斯達克上市（NASDAQ: NVDA）。同年發表了 GeForce 256，這是世界上第一款被正式定義為「GPU（圖形處理器）」的產品，徹底改變了電腦圖形與遊戲產業。"
            tags={["GPU", "GeForce 256", "IPO", "3D Graphics"]}
          />
           <TimelineItem 
            year="1993"
            title="創立 NVIDIA (輝達)"
            role="Entrepreneur"
            description="看準 3D 圖形處理將是未來的計算趨勢，與 Chris Malachowsky 及 Curtis Priem 兩位工程師，在加州丹尼的連鎖餐廳（Denny's）討論並創立了 NVIDIA，初期專注於電腦圖形晶片設計。"
            tags={["Startup", "Silicon Valley", "Graphics Chips"]}
          />
          <TimelineItem 
            year="1984 - 1993"
            title="早期工程職涯"
            role="Microprocessor Designer"
            description="大學畢業後，先後進入巨積（LSI Logic）與超微半導體（AMD）擔任微處理器設計工程師。在職期間，利用業餘時間於史丹佛大學（Stanford University）攻讀並取得了電機工程碩士學位。"
            tags={["AMD", "LSI Logic", "Chip Design", "Stanford M.S."]}
          />
        </div>

      </div>
    </div>
  );
}