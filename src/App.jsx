import React, { useState, useMemo, useEffect } from 'react';

// 黃仁勳的預設資料
const defaultData = [
  {
    id: 1,
    year: "2020s - 至今",
    sortYear: 2024,
    title: "引領全球 AI 革命",
    role: "NVIDIA CEO",
    description: "隨著生成式 AI（如 ChatGPT）的爆發，NVIDIA 的 GPU 成為訓練 AI 的全球算力基礎。帶領公司市值突破兆美元，並接連發表 Hopper、Blackwell 等次世代 AI 晶片架構，被譽為「AI 教父」。",
    tags: ["Generative AI", "Blackwell", "Omniverse", "Trillion Dollar Company"]
  },
  {
    id: 2,
    year: "2006",
    sortYear: 2006,
    title: "發布 CUDA 運算架構",
    role: "NVIDIA CEO & Visionary",
    description: "做出公司史上最具風險但也最成功的決策：推出 CUDA 程式設計模型。這項技術讓 GPU 不僅能處理 3D 圖形，更能處理通用的平行運算（GPGPU），為後來的深度學習與人工智慧爆發奠定了底層基礎。",
    tags: ["CUDA", "GPGPU", "Parallel Computing"]
  },
  {
    id: 3,
    year: "1999",
    sortYear: 1999,
    title: "發明 GPU 與公司上市",
    role: "NVIDIA Co-founder & CEO",
    description: "NVIDIA 正式在納斯達克上市（NASDAQ: NVDA）。同年發表了 GeForce 256，這是世界上第一款被正式定義為「GPU（圖形處理器）」的產品，徹底改變了電腦圖形與遊戲產業。",
    tags: ["GPU", "GeForce 256", "IPO", "3D Graphics"]
  },
  {
    id: 4,
    year: "1993",
    sortYear: 1993,
    title: "創立 NVIDIA (輝達)",
    role: "Entrepreneur",
    description: "看準 3D 圖形處理將是未來的計算趨勢，與 Chris Malachowsky 及 Curtis Priem 兩位工程師，在加州丹尼的連鎖餐廳（Denny's）討論並創立了 NVIDIA，初期專注於電腦圖形晶片設計。",
    tags: ["Startup", "Silicon Valley", "Graphics Chips"]
  },
  {
    id: 5,
    year: "1984 - 1993",
    sortYear: 1984,
    title: "早期工程職涯",
    role: "Microprocessor Designer",
    description: "大學畢業後，先後進入巨積（LSI Logic）與超微半導體（AMD）擔任微處理器設計工程師。在職期間，利用業餘時間於史丹佛大學（Stanford University）攻讀並取得了電機工程碩士學位。",
    tags: ["AMD", "LSI Logic", "Chip Design", "Stanford M.S."]
  }
];

export default function App() {
  const [timelineData, setTimelineData] = useState(() => {
    try {
      const savedData = localStorage.getItem('jensenTimelineData');
      return savedData ? JSON.parse(savedData) : defaultData;
    } catch (e) {
      // 萬一 JSON 解析失敗，退回預設值
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem('jensenTimelineData', JSON.stringify(timelineData));
  }, [timelineData]);

  const [activeTag, setActiveTag] = useState('All');
  const [isAscending, setIsAscending] = useState(false);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    year: '', sortYear: '', title: '', role: '', description: '', tags: ''
  });

  // 防呆機制 1：確保 tags 是陣列才進行展開，否則略過
  const allTags = useMemo(() => {
    return Array.from(new Set(
      timelineData.flatMap(item => Array.isArray(item.tags) ? item.tags : [])
    ));
  }, [timelineData]);

  // 防呆機制 2：確保過濾時 tags 是陣列
  const filteredAndSortedData = useMemo(() => {
    let result = timelineData;
    if (activeTag !== 'All') {
      result = result.filter(item => Array.isArray(item.tags) && item.tags.includes(activeTag));
    }
    result = [...result].sort((a, b) => {
      return isAscending ? a.sortYear - b.sortYear : b.sortYear - a.sortYear;
    });
    return result;
  }, [timelineData, activeTag, isAscending]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    // 防呆機制 3：確保即使用戶沒填標籤，也能轉成空陣列而不會壞掉
    const tagsArray = formData.tags 
      ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "") 
      : [];

    const newEvent = {
      id: Date.now(),
      year: formData.year,
      sortYear: parseInt(formData.sortYear) || new Date().getFullYear(),
      title: formData.title,
      role: formData.role,
      description: formData.description,
      tags: tagsArray
    };
    setTimelineData([...timelineData, newEvent]);
    setIsFormOpen(false);
    setFormData({ year: '', sortYear: '', title: '', role: '', description: '', tags: '' });
  };

  const handleDelete = (id) => {
    if(window.confirm('確定要刪除這筆經歷嗎？')) {
      setTimelineData(timelineData.filter(item => item.id !== id));
    }
  };

  const handleReset = () => {
    if(window.confirm('這將會清除所有自訂資料，還原成預設年譜，確定嗎？')) {
       setTimelineData(defaultData);
       localStorage.removeItem('jensenTimelineData'); // 強制清空記憶
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 text-zinc-100 font-sans relative">
      
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-4">
         {isAdmin ? (
           <button onClick={handleReset} className="text-xs text-red-500 hover:text-red-400 border border-red-900 rounded px-2 py-1">
             還原預設資料 (清除錯誤)
           </button>
         ) : <div></div>}
         
        <label className="flex items-center cursor-pointer gap-2">
          <span className="text-sm text-zinc-400">管理員模式</span>
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
            <div className={`block w-10 h-6 rounded-full transition-colors ${isAdmin ? 'bg-green-500' : 'bg-zinc-700'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isAdmin ? 'transform translate-x-4' : ''}`}></div>
          </div>
        </label>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-4">
            黃仁勳 <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Jensen Huang</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
             NVIDIA 創辦人暨執行長 | 人工智慧與 GPU 革命的推手
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-4 z-10 backdrop-blur-md">
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => setActiveTag('All')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTag === 'All' ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'}`}>
              全部 (All)
            </button>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTag === tag ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'}`}>
                {tag}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={() => setIsAscending(!isAscending)} className="px-4 py-1.5 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-full text-sm font-medium transition-colors border border-zinc-700">
              {isAscending ? '正序 ↓' : '倒序 ↑'}
            </button>
            {isAdmin && (
              <button onClick={() => setIsFormOpen(true)} className="px-4 py-1.5 bg-green-600 text-white hover:bg-green-500 rounded-full text-sm font-bold transition-colors shadow-lg shadow-green-900/50">
                + 新增事件
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {filteredAndSortedData.length > 0 ? (
            filteredAndSortedData.map((item) => (
              <div key={item.id} className="relative pl-8 py-6 group animate-fade-in-up">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-700 group-last:bg-transparent"></div>
                <div className="absolute left-[-5px] top-8 h-3 w-3 rounded-full border-2 border-green-500 bg-zinc-900 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                
                <div className="bg-zinc-800/60 rounded-xl shadow-lg border border-zinc-700/50 p-6 relative hover:border-green-500/50 hover:bg-zinc-800/80 transition-all duration-300">
                  
                  {isAdmin && (
                    <button onClick={() => handleDelete(item.id)} className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-colors">
                      刪除
                    </button>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pr-10">
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-sm font-medium text-green-400 mt-1">{item.role}</p>
                    </div>
                    <span className="text-sm text-zinc-400 font-mono mt-2 sm:mt-0 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-700 w-fit">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {/* 防呆機制 4：確保是陣列才渲染標籤 UI */}
                    {Array.isArray(item.tags) && item.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 text-xs font-medium text-green-300 bg-green-900/20 rounded-md border border-green-500/20">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-zinc-500">尚無事件紀錄</div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">新增年譜事件</h2>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">顯示年份</label>
                  <input required type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">排序用數字</label>
                  <input required type="number" value={formData.sortYear} onChange={e => setFormData({...formData, sortYear: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">事件標題</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">角色或副標題</label>
                <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">技術標籤 (用逗號隔開)</label>
                <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">內容描述</label>
                <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded-lg transition-colors">
                  取消
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white hover:bg-green-500 rounded-lg font-bold transition-colors">
                  儲存發布
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}