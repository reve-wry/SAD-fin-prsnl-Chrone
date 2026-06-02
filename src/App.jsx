import React, { useState, useMemo } from 'react';

// 1. 模擬系統底層的資料庫 (對應 UML 中的 Event 類別實體)
const timelineData = [
  {
    id: 1,
    year: "2020s - 至今",
    sortYear: 2024,
    title: "引領全球 AI 革命",
    role: "NVIDIA CEO",
    description: "隨著生成式 AI（如 ChatGPT）的爆發，NVIDIA 的 GPU 成為訓練 AI 的全球算力基礎。帶領公司市值突破兆美元，並接連發表 Hopper、Blackwell 等次世代 AI 晶片架構，被譽為「AI 教父」。",
    tags: ["AI", "Hardware", "Leadership"]
  },
  {
    id: 2,
    year: "2006",
    sortYear: 2006,
    title: "發布 CUDA 運算架構",
    role: "NVIDIA CEO & Visionary",
    description: "做出公司史上最具風險但也最成功的決策：推出 CUDA 程式設計模型。這項技術讓 GPU 不僅能處理 3D 圖形，更能處理通用的平行運算（GPGPU），為後來的深度學習與人工智慧爆發奠定了底層基礎。",
    tags: ["Software", "Architecture", "AI"]
  },
  {
    id: 3,
    year: "1999",
    sortYear: 1999,
    title: "發明 GPU 與公司上市",
    role: "NVIDIA Co-founder & CEO",
    description: "NVIDIA 正式在納斯達克上市（NASDAQ: NVDA）。同年發表了 GeForce 256，這是世界上第一款被正式定義為「GPU（圖形處理器）」的產品，徹底改變了電腦圖形與遊戲產業。",
    tags: ["Hardware", "Business", "Graphics"]
  },
  {
    id: 4,
    year: "1993",
    sortYear: 1993,
    title: "創立 NVIDIA (輝達)",
    role: "Entrepreneur",
    description: "看準 3D 圖形處理將是未來的計算趨勢，與 Chris Malachowsky 及 Curtis Priem 兩位工程師，在加州丹尼的連鎖餐廳（Denny's）討論並創立了 NVIDIA，初期專注於電腦圖形晶片設計。",
    tags: ["Startup", "Business", "Graphics"]
  },
  {
    id: 5,
    year: "1984 - 1993",
    sortYear: 1984,
    title: "早期工程職涯",
    role: "Microprocessor Designer",
    description: "大學畢業後，先後進入巨積（LSI Logic）與超微半導體（AMD）擔任微處理器設計工程師。在職期間，利用業餘時間於史丹佛大學（Stanford University）攻讀並取得了電機工程碩士學位。",
    tags: ["Engineering", "Education"]
  }
];

// 提取所有不重複的標籤，用於生成篩選按鈕
const allTags = Array.from(new Set(timelineData.flatMap(item => item.tags)));

// 單一經歷卡片的 UI 元件
const TimelineItem = ({ year, title, role, description, tags }) => {
  return (
    <div className="relative pl-8 py-6 group animate-fade-in-up">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-700 group-last:bg-transparent"></div>
      <div className="absolute left-[-5px] top-8 h-3 w-3 rounded-full border-2 border-green-500 bg-zinc-900 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
      
      <div className="bg-zinc-800/60 rounded-xl shadow-lg border border-zinc-700/50 p-6 hover:border-green-500/50 hover:bg-zinc-800/80 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm font-medium text-green-400 mt-1">{role}</p>
          </div>
          <span className="text-sm text-zinc-400 font-mono mt-2 sm:mt-0 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-700 w-fit">
            {year}
          </span>
        </div>
        <p className="text-zinc-300 text-sm leading-relaxed mb-6">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 text-xs font-medium text-green-300 bg-green-900/20 rounded-md border border-green-500/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// 系統主控台 (Controller / View)
export default function App() {
  // 系統狀態管理 (對應活動圖中的篩選與排序邏輯)
  const [activeTag, setActiveTag] = useState('All');
  const [isAscending, setIsAscending] = useState(false); // false: 最新到最舊, true: 最舊到最新

  // 根據狀態動態計算要顯示的資料 (Filter & Sort)
  const filteredAndSortedData = useMemo(() => {
    let result = timelineData;
    
    // 1. 執行標籤篩選 (filterByTag)
    if (activeTag !== 'All') {
      result = result.filter(item => item.tags.includes(activeTag));
    }
    
    // 2. 執行時間排序
    result = [...result].sort((a, b) => {
      return isAscending ? a.sortYear - b.sortYear : b.sortYear - a.sortYear;
    });

    return result;
  }, [activeTag, isAscending]);

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 text-zinc-100 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header 區塊 */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-4">
            黃仁勳 <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Jensen Huang</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            NVIDIA 創辦人暨執行長 | 從矽谷車庫到兆美元 AI 帝國的科技歷程
          </p>
        </div>

        {/* 系統功能控制列 (Toolbar) */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-4 z-10 backdrop-blur-sm">
          
          {/* 標籤篩選器 */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveTag('All')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTag === 'All' ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
              }`}
            >
              全部 (All)
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTag === tag ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 排序切換鈕 */}
          <button
            onClick={() => setIsAscending(!isAscending)}
            className="flex items-center gap-2 px-4 py-1.5 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-full text-sm font-medium transition-colors border border-zinc-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            {isAscending ? '正序 (最舊到最新)' : '倒序 (最新到最舊)'}
          </button>
        </div>

        {/* 年譜內容渲染區塊 */}
        <div className="space-y-4">
          {filteredAndSortedData.length > 0 ? (
            filteredAndSortedData.map((item) => (
              <TimelineItem 
                key={item.id}
                year={item.year}
                title={item.title}
                role={item.role}
                description={item.description}
                tags={item.tags}
              />
            ))
          ) : (
            <div className="text-center py-12 text-zinc-500">
              找不到符合該標籤的紀錄
            </div>
          )}
        </div>

      </div>
    </div>
  );
}