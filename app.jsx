import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
    Sun, Zap, Clock, ShieldCheck, 
    TrendingUp, Facebook, Globe, PieChart, CheckCircle2,
    CalendarDays, Lightbulb, PenTool, Target, LineChart, 
    AlertTriangle, ArrowRight, Battery, Users, Frown, Smile, Award
} from 'lucide-react';

function App() {
    const [billValue, setBillValue] = useState(3500000);
    const [activeTab, setActiveTab] = useState('website'); 
    const [systemType, setSystemType] = useState('zero-export');

    // THUẬT TOÁN TÍNH TOÁN
    const avgPricePerKwh = systemType === 'zero-export' ? 3500 : 4000; 
    const monthlyConsumption = billValue / avgPricePerKwh; 
    const dailyConsumption = monthlyConsumption / 30;
    
    const dailyGenerationPerKwp = 4; 
    const panelPower = 0.625; 
    
    let panelsRequired = 5; 
    let chosenBatteryPack = 0;
    let estimatedCost = 0;
    let isOptimalPackage = false; 

    if (systemType === 'zero-export') {
        const targetDailySavings = dailyConsumption * 0.6; 
        const requiredKwp = targetDailySavings / dailyGenerationPerKwp;
        panelsRequired = Math.max(5, Math.ceil(requiredKwp / panelPower));
        estimatedCost = (panelsRequired * panelPower) * 10000000; 
    } else {
        const targetDailySavings = dailyConsumption * 0.85; 
        const requiredKwp = targetDailySavings / dailyGenerationPerKwp;
        const rawPanels = Math.max(5, Math.ceil(requiredKwp / panelPower));

        if (rawPanels <= 8) {
            panelsRequired = Math.max(5, rawPanels);
            chosenBatteryPack = 5; 
            estimatedCost = (panelsRequired * panelPower * 11000000) + (chosenBatteryPack * 4000000);
        } else if (rawPanels <= 12) {
            panelsRequired = 10; 
            chosenBatteryPack = 14; 
            estimatedCost = 122000000;
            isOptimalPackage = true;
        } else if (rawPanels <= 18) {
            panelsRequired = 15; 
            chosenBatteryPack = 16; 
            estimatedCost = 185000000;
            isOptimalPackage = true;
        } else {
            panelsRequired = rawPanels;
            chosenBatteryPack = 20; 
            estimatedCost = (panelsRequired * panelPower * 11000000) + (chosenBatteryPack * 4000000);
        }
    }
    
    const systemSizeNum = panelsRequired * panelPower;
    const systemSize = systemSizeNum.toFixed(3); 
    const dailyGeneration = systemSizeNum * dailyGenerationPerKwp;

    let actualDailySavings = 0;
    if (systemType === 'zero-export') {
        actualDailySavings = Math.min(dailyGeneration, dailyConsumption * 0.6); 
    } else {
        const dayUsage = dailyConsumption * 0.4;
        const actualDayUsage = Math.min(dailyGeneration, dayUsage); 
        const remainingGenForBattery = dailyGeneration - actualDayUsage;
        const storedEnergy = Math.min(remainingGenForBattery, chosenBatteryPack);
        const dischargedEnergy = storedEnergy * 0.9; 
        actualDailySavings = Math.min(actualDayUsage + dischargedEnergy, dailyConsumption * 0.9); 
    }
    
    const monthlySavingsVnd = actualDailySavings * 30 * avgPricePerKwh;
    const yearlySavingsVnd = monthlySavingsVnd * 12;
    const paybackYears = yearlySavingsVnd > 0 ? (estimatedCost / yearlySavingsVnd).toFixed(1) : 0;

    const tabs = [
        { id: 'market', label: '1. Insight Thị Trường', icon: LineChart },
        { id: 'overview', label: '2. Chiến Lược Lõi', icon: Target },
        { id: 'facebook', label: '3. Facebook Ads', icon: Facebook },
        { id: 'website', label: '4. Lead Gen (Web)', icon: Globe },
        { id: 'plan', label: '5. Action Plan', icon: CalendarDays }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
        
        {/* HEADER / HERO SECTION */}
        <header className="bg-[#0f2852] text-white py-16 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 pattern-grid-lg"></div>
            </div>
            <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Sun className="w-10 h-10 text-yellow-400" />
                <h1 className="text-4xl font-bold tracking-tight">NCSE</h1>
                </div>
                <h2 className="text-2xl md:text-3xl font-light mb-2 text-blue-200">STRATEGIC PROPOSAL 2026</h2>
                <p className="text-lg text-slate-300 max-w-xl mb-6">
                Chiến lược Marketing & Thu thập Lead phân khúc Hộ gia đình tại TP.HCM.
                </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 w-full md:w-[450px]">
                <p className="text-xs text-blue-200 mb-3 uppercase tracking-wider font-semibold flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" /> Key Message (Tùy chọn chiến dịch)
                </p>
                <div className="space-y-3">
                <div className="border-l-2 border-yellow-400 pl-3">
                    <span className="text-xs text-slate-300 block mb-0.5">Opt 1 (Đánh vào Tài chính / ROI):</span>
                    <p className="text-sm font-bold text-yellow-400">"Nắng Lên Sinh Lời - Thảnh Thơi Tiền Điện"</p>
                </div>
                <div className="border-l-2 border-blue-400 pl-3">
                    <span className="text-xs text-slate-300 block mb-0.5">Opt 2 (Đánh vào Nỗi đau mùa nóng):</span>
                    <p className="text-sm font-bold text-white">"Bật Mát Thả Ga - Tránh Xa Bậc Sáu"</p>
                </div>
                <div className="border-l-2 border-green-400 pl-3">
                    <span className="text-xs text-slate-300 block mb-0.5">Opt 3 (Đánh vào Thẩm mỹ & An tâm):</span>
                    <p className="text-sm font-bold text-white">"Kiến Trúc Vẹn Nguyên - Sinh Lời Triền Miên"</p>
                </div>
                </div>
            </div>
            </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 md:px-6 -mt-8 relative z-20">
            
            {/* TAB NAVIGATION PANEL */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 mb-6 overflow-x-auto custom-scrollbar">
            <div className="flex w-max md:w-full">
                {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                    <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 flex-1 px-5 py-4 font-bold text-sm md:text-base transition-all border-b-4 whitespace-nowrap ${
                        isActive
                        ? 'border-[#0f2852] bg-blue-50/50 text-[#0f2852]'
                        : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-blue-700'
                    }`}
                    >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-yellow-500' : 'text-slate-400'}`} />
                    {tab.label}
                    </button>
                );
                })}
            </div>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="min-h-[500px]">
            
            {/* TAB 1: THỊ TRƯỜNG & INSIGHT */}
            {activeTab === 'market' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#0f2852]">Bối Cảnh Thị Trường 2026</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                        <AlertTriangle className="w-8 h-8 text-red-500 mb-3" />
                        <h4 className="font-bold text-red-900 mb-2">Biểu Giá Điện Tăng</h4>
                        <p className="text-sm text-slate-700">Khung giá bậc 5, 6 duy trì mức cao. Tạo áp lực chi phí lớn cho các hộ gia đình sử dụng thiết bị làm mát tại TP.HCM.</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <Zap className="w-8 h-8 text-blue-500 mb-3" />
                        <h4 className="font-bold text-[#0f2852] mb-2">Xu Hướng Tự Tiêu Thụ</h4>
                        <p className="text-sm text-slate-700">Dừng mua điện FIT. Thị trường chuyển dịch 100% sang giải pháp Bám tải (Zero-Export) và Lưu trữ (Hybrid).</p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                        <Battery className="w-8 h-8 text-yellow-600 mb-3" />
                        <h4 className="font-bold text-yellow-800 mb-2">Chi Phí Đầu Tư Tối Ưu</h4>
                        <p className="text-sm text-slate-700">Vật tư Tier 1 giảm giá, chi phí hệ bám tải ~10tr/kWp. Rút ngắn thời gian hoàn vốn (ROI) xuống mức 2-3 năm.</p>
                    </div>
                    </div>
                </div>

                <div className="bg-[#0f2852] text-white p-8 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-blue-800 pb-4">
                    <Users className="w-8 h-8 text-yellow-400" />
                    <div>
                        <h3 className="text-2xl font-bold text-white">Phân Tích Đối Tượng Mục Tiêu</h3>
                        <p className="text-blue-200 text-sm">Chủ nhà phố, biệt thự tại TP.HCM</p>
                    </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                        <h4 className="flex items-center gap-2 text-lg font-bold text-red-300 mb-4">
                        <Frown className="w-6 h-6" /> Điểm Đau (Pain Points)
                        </h4>
                        <ul className="space-y-4 text-sm text-slate-200">
                        <li className="flex gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            <span><strong>Áp lực tài chính:</strong> Chi trả hóa đơn 3-10 triệu/tháng, thường xuyên chạm mốc giá điện bậc 6.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            <span><strong>Ngại rủi ro thi công:</strong> Sợ thủ tục pháp lý rườm rà, thi công gây thấm dột, ồn ào và ảnh hưởng kết cấu.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            <span><strong>Yêu cầu thẩm mỹ:</strong> Lo ngại hệ thống pin và dây dẫn làm phá vỡ kiến trúc, giảm giá trị bất động sản.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            <span><strong>Rủi ro thiết bị:</strong> E ngại các sự cố cháy nổ do sử dụng vật tư kém chất lượng, trôi nổi trên thị trường.</span>
                        </li>
                        </ul>
                    </div>

                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                        <h4 className="flex items-center gap-2 text-lg font-bold text-green-300 mb-4">
                        <Smile className="w-6 h-6" /> Nhu Cầu Lõi (Needs)
                        </h4>
                        <ul className="space-y-4 text-sm text-slate-200">
                        <li className="flex gap-3">
                            <span className="text-green-400 font-bold">✓</span>
                            <span><strong>Minh bạch số liệu kinh tế:</strong> Yêu cầu bảng tính rõ ràng về chi phí đầu tư, mức tiết kiệm hàng tháng và số năm hoàn vốn.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-green-400 font-bold">✓</span>
                            <span><strong>Triển khai nhanh gọn:</strong> Ưu tiên đơn vị cam kết thi công 2-3 ngày, quy trình chuẩn hóa, vệ sinh chuyên nghiệp.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-green-400 font-bold">✓</span>
                            <span><strong>Cam kết chất lượng:</strong> Vật tư chuẩn Tier 1 Quốc tế, đầy đủ CO/CQ, bảo hành hiệu suất dài hạn.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-green-400 font-bold">✓</span>
                            <span><strong>Quản lý thông minh:</strong> Cung cấp ứng dụng di động giám sát sản lượng và tình trạng hệ thống theo thời gian thực.</span>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {/* TAB 2: TỔNG QUAN CHIẾN LƯỢC */}
            {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="mb-8 border-l-4 border-yellow-400 pl-4">
                    <h3 className="text-2xl font-bold text-[#0f2852] mb-1">Định Vị Truyền Thông (Positioning)</h3>
                    <p className="text-slate-600">Định vị NCSE là "Chuyên gia giải pháp tối ưu kinh tế", vượt trên vai trò nhà cung cấp thiết bị.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <h4 className="text-lg font-bold text-[#0f2852] mb-4 flex items-center gap-2">
                        <PenTool className="text-yellow-500 w-5 h-5" /> Định Hướng Nội Dung
                        </h4>
                        <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                            <span><strong>Dựa trên dữ liệu:</strong> Sử dụng ROI, kWh và biểu giá điện làm ngôn ngữ thuyết phục cốt lõi.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                            <span><strong>Giải quyết rào cản:</strong> Xử lý dứt điểm rào cản tâm lý về thi công đục phá và thủ tục kéo dài.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                            <span><strong>Cam kết thực tế:</strong> Khẳng định năng lực "Thi công hoàn thiện 2-3 ngày".</span>
                        </li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <h4 className="text-lg font-bold text-[#0f2852] mb-4 flex items-center gap-2">
                        <Lightbulb className="text-yellow-500 w-5 h-5" /> Định Hướng Hình Ảnh
                        </h4>
                        <div className="space-y-3">
                        <div>
                            <div className="flex gap-2">
                            <div className="w-1/2 bg-[#0f2852] text-white p-2 rounded text-center text-xs font-semibold">Xanh Đậm (Trust)</div>
                            <div className="w-1/2 bg-yellow-400 text-[#0f2852] p-2 rounded text-center text-xs font-semibold">Vàng Nắng (Energy)</div>
                            </div>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-600 mt-2">
                            <li>• Minimalist, Typography làm nổi bật số liệu.</li>
                            <li>• Ưu tiên hình ảnh thực tế thi công tại Việt Nam (hạn chế ảnh Stock).</li>
                            <li>• Nhấn mạnh sự đồng bộ và tính thẩm mỹ của dàn pin trên mái.</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </section>

                <section className="bg-[#0f2852] text-white rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10">
                    <PieChart className="w-64 h-64 -mt-10 -mr-10" />
                    </div>
                    <div className="relative z-10 mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">Cấu Trúc Phân Bổ Nội Dung (4-3-2-1)</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                    {[
                        { percent: '40%', title: 'Hiệu Quả Kinh Tế', desc: 'Phân tích ROI, lợi ích dài hạn 25 năm.', color: 'bg-white/10' },
                        { percent: '30%', title: 'Chất Lượng SP', desc: 'Chuẩn Tier 1, Inverter cao cấp, chính sách bảo hành.', color: 'bg-white/10' },
                        { percent: '20%', title: 'Năng Lực Thi Công', desc: 'Case study, testimonial, quy trình 3 ngày.', color: 'bg-white/10' },
                        { percent: '10%', title: 'Chuyển Đổi (Lead)', desc: 'Call-to-Action, ưu đãi khảo sát & báo giá.', color: 'bg-yellow-400', text: 'text-[#0f2852]' }
                    ].map((pillar, idx) => (
                        <div key={idx} className={`${pillar.color} ${pillar.text || 'text-white'} p-5 rounded-xl flex flex-col justify-between backdrop-blur-sm`}>
                        <div>
                            <span className="text-2xl font-black block mb-1">{pillar.percent}</span>
                            <h4 className="text-base font-bold mb-2">{pillar.title}</h4>
                        </div>
                        <p className="text-xs opacity-90">{pillar.desc}</p>
                        </div>
                    ))}
                    </div>
                </section>
                </div>
            )}

            {/* TAB 3: FACEBOOK */}
            {activeTab === 'facebook' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="border-l-4 border-blue-600 pl-4">
                        <h3 className="text-2xl font-bold text-[#0f2852] mb-1 flex items-center gap-2">
                        <Facebook className="w-6 h-6 text-blue-600" /> Chiến Lược Social Media
                        </h3>
                        <p className="text-slate-600">Tạo dựng độ tin cậy và giáo dục thị trường trước khi chạy chiến dịch chuyển đổi.</p>
                    </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-[#0f2852] text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">Engagement</div>
                        <PieChart className="w-8 h-8 text-blue-600 mb-3" />
                        <h4 className="text-lg font-bold mb-2 text-slate-800">Infographic Phân Tích</h4>
                        <p className="text-sm text-slate-600 mb-4 h-16">Trực quan hóa sự chênh lệch: Tiền điện bậc 6 vs. Chi phí khấu hao năng lượng mặt trời.</p>
                        <div className="bg-white p-3 rounded text-sm italic border-l-4 border-blue-500 shadow-sm text-slate-700">
                        "Gửi tiết kiệm 5%/năm hay Lắp điện mặt trời tiết kiệm 30%/năm?"
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-[#0f2852] text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">Trust Building</div>
                        <Clock className="w-8 h-8 text-blue-600 mb-3" />
                        <h4 className="text-lg font-bold mb-2 text-slate-800">Carousel Quy Trình</h4>
                        <p className="text-sm text-slate-600 mb-4 h-16">Album vuốt minh họa tiến độ thực tế: Khảo sát - Lắp đặt - Vận hành (Hoàn thiện trong 72h).</p>
                        <div className="bg-white p-3 rounded text-sm italic border-l-4 border-blue-500 shadow-sm text-slate-700">
                        "Đội ngũ NCSE hoàn thiện hệ thống tại Quận 7 chỉ trong 3 ngày."
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-[#0f2852] text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">Viral Content</div>
                        <Zap className="w-8 h-8 text-blue-600 mb-3" />
                        <h4 className="text-lg font-bold mb-2 text-slate-800">Video Reels Trực Quan</h4>
                        <p className="text-sm text-slate-600 mb-4 h-16">Định dạng Video ngắn Before/After. Cận cảnh hóa đơn giảm mạnh và giao diện theo dõi trên App.</p>
                        <div className="bg-white p-3 rounded text-sm italic border-l-4 border-blue-500 shadow-sm text-slate-700">
                        "Giải pháp giảm ngay 3 triệu tiền điện mỗi tháng cho nhà phố."
                        </div>
                    </div>
                    </div>

                    {/* BỔ SUNG CONTENT PLAN CHI TIẾT */}
                    <div>
                        <h4 className="text-xl font-bold text-[#0f2852] mb-4 flex items-center gap-2">
                        <CalendarDays className="w-6 h-6 text-yellow-500" /> Content Plan Thực Chiến (Phase 1)
                        </h4>
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                            <thead className="bg-[#0f2852] text-white">
                                <tr>
                                <th className="p-4 font-semibold w-1/5">Giai đoạn</th>
                                <th className="p-4 font-semibold w-2/5">Tuyến Nội Dung (Content Angle)</th>
                                <th className="p-4 font-semibold w-1/5">Định Dạng</th>
                                <th className="p-4 font-semibold w-1/5">Mục Tiêu (KPI)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 align-top">
                                    <span className="bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded text-xs block w-max mb-1">Tuần 1</span>
                                    <span className="text-slate-600 text-xs font-semibold uppercase">Giáo Dục (Educate)</span>
                                </td>
                                <td className="p-4 align-top">
                                    <ul className="space-y-2 text-slate-700">
                                    <li><strong>Angle 1:</strong> Đánh thức nỗi đau giá điện bậc 6. Bài toán ROI 2-3 năm của hệ Bám Tải.</li>
                                    <li><strong>Angle 2:</strong> Giải mã công nghệ Tier 1 & Inverter Hybrid (Tại sao rẻ hơn lại tiềm ẩn rủi ro cháy nổ).</li>
                                    </ul>
                                </td>
                                <td className="p-4 align-top text-slate-600">
                                    Infographic<br/>Bài viết dài (Long-form)
                                </td>
                                <td className="p-4 align-top text-slate-600">
                                    Reach, Lượt chia sẻ (Share), Thảo luận (Comment).
                                </td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 align-top">
                                    <span className="bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded text-xs block w-max mb-1">Tuần 2</span>
                                    <span className="text-slate-600 text-xs font-semibold uppercase">Niềm Tin (Trust)</span>
                                </td>
                                <td className="p-4 align-top">
                                    <ul className="space-y-2 text-slate-700">
                                    <li><strong>Angle 1:</strong> Đập tan rào cản "Đục phá nhà". Show quy trình thi công 3 ngày an toàn, giữ nguyên thẩm mỹ.</li>
                                    <li><strong>Angle 2:</strong> Case Study thực tế: Biệt thự Quận 7 giảm 4 triệu tiền điện/tháng với gói 9.375kWp.</li>
                                    </ul>
                                </td>
                                <td className="p-4 align-top text-slate-600">
                                    Album Carousel<br/>Video Reels (1 phút)
                                </td>
                                <td className="p-4 align-top text-slate-600">
                                    Video Views, Lượt lưu (Save), Tương tác sâu.
                                </td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors bg-yellow-50/30">
                                <td className="p-4 align-top">
                                    <span className="bg-yellow-400 text-[#0f2852] font-bold px-2 py-1 rounded text-xs block w-max mb-1">Tuần 3-4</span>
                                    <span className="text-slate-600 text-xs font-semibold uppercase">Chuyển Đổi (Convert)</span>
                                </td>
                                <td className="p-4 align-top">
                                    <ul className="space-y-2 text-slate-700">
                                    <li><strong>Angle 1:</strong> Demo công cụ tính toán tự động. Kêu gọi khách hàng tự check ROI cho nhà mình.</li>
                                    <li><strong>Angle 2:</strong> Lead Magnet Offer: "Đăng ký nhận báo giá & Bản vẽ 3D bố trí tấm pin hoàn toàn miễn phí".</li>
                                    </ul>
                                </td>
                                <td className="p-4 align-top text-slate-600 font-semibold">
                                    Video Demo UI<br/>Lead Form Ads<br/>Click-to-Web
                                </td>
                                <td className="p-4 align-top font-bold text-[#0f2852]">
                                    Số lượng Form (Leads)<br/>Chi phí/Lead (CPL).
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            )}

            {/* TAB 4: WEBSITE & CÔNG CỤ TÍNH TOÁN */}
            {activeTab === 'website' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="border-l-4 border-green-500 pl-4">
                        <h3 className="text-2xl font-bold text-[#0f2852] mb-1 flex items-center gap-2">
                        <Globe className="w-6 h-6 text-green-500" /> Phễu Chuyển Đổi (Lead Gen Web)
                        </h3>
                        <p className="text-slate-600">Sử dụng công cụ tính toán tự động làm nam châm thu hút Data khách hàng.</p>
                    </div>
                    </div>

                    <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0f2852] to-yellow-400"></div>
                        <div className="text-center mb-6">
                        <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block">Interactive Demo</span>
                        <h4 className="text-xl font-bold text-slate-800">Hệ Thống Ước Tính Đầu Tư</h4>
                        </div>

                        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative">
                        
                        <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
                            <button 
                            onClick={() => setSystemType('zero-export')}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all flex flex-col items-center justify-center ${systemType === 'zero-export' ? 'bg-white shadow text-[#0f2852]' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                            <span>Hệ Bám Tải</span>
                            <span className="text-[10px] font-normal opacity-70">Tiết kiệm max 60%</span>
                            </button>
                            <button 
                            onClick={() => setSystemType('hybrid')}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all flex flex-col items-center justify-center ${systemType === 'hybrid' ? 'bg-[#0f2852] shadow text-white' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                            <span>Hệ Lưu Trữ</span>
                            <span className="text-[10px] font-normal opacity-70">Tiết kiệm 75% - 90%</span>
                            </button>
                        </div>

                        <label className="block text-center text-sm font-semibold text-slate-700 mb-4">
                            Hóa đơn điện trung bình/tháng?
                            <span className="block text-xs text-slate-500 font-normal mt-1">
                            (Dữ liệu ước tính: {avgPricePerKwh.toLocaleString('vi-VN')}đ/kWh)
                            </span>
                        </label>
                        
                        <div className="mb-8">
                            <div className="text-center text-3xl font-black text-blue-600 mb-4">
                            {(billValue).toLocaleString('vi-VN')} VNĐ
                            </div>
                            <input 
                            type="range" 
                            min="1500000" 
                            max="10000000" 
                            step="500000"
                            value={billValue}
                            onChange={(e) => setBillValue(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0f2852]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="col-span-2 bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-center justify-between mb-1 relative">
                            {isOptimalPackage && systemType === 'hybrid' && (
                                <span className="absolute -top-3 -right-2 bg-yellow-400 text-[#0f2852] text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                <Award className="w-3 h-3" /> Gói Tối Ưu
                                </span>
                            )}
                            <span className="text-xs font-bold text-slate-600 uppercase">Cấu hình hệ thống ({systemSize} kWp):</span>
                            <span className="text-base font-bold text-[#0f2852]">{panelsRequired} Tấm <span className="text-[10px] text-slate-500 font-normal">x 625W</span></span>
                            </div>
                            
                            <div className="col-span-2 bg-slate-50 border border-slate-100 p-3 rounded-lg grid grid-cols-2 gap-2 text-center mb-1">
                            <div>
                                <span className="block text-[10px] text-slate-500 uppercase font-bold">Sản lượng dự kiến</span>
                                <span className="text-sm font-bold text-[#0f2852]">{dailyGeneration.toFixed(1)} kWh/ngày</span>
                            </div>
                            {systemType === 'hybrid' ? (
                                <div className="border-l border-slate-200">
                                <span className="block text-[10px] text-slate-500 uppercase font-bold">Dung lượng Battery</span>
                                <span className="text-sm font-bold text-green-600">{chosenBatteryPack} kWh (Xả Max 90%)</span>
                                </div>
                            ) : (
                                <div className="border-l border-slate-200">
                                <span className="block text-[10px] text-slate-500 uppercase font-bold">Giải pháp cung cấp</span>
                                <span className="text-sm font-bold text-blue-600">Zero-Export (Bám tải)</span>
                                </div>
                            )}
                            </div>

                            <div className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
                            <span className="block text-[10px] text-green-700 uppercase font-bold mb-1">Tiết kiệm dự kiến</span>
                            <span className="text-lg font-bold text-green-700">~{(Math.round(monthlySavingsVnd/100000)*100).toLocaleString('vi-VN')}k/tháng</span>
                            </div>
                            <div className="bg-[#0f2852] p-3 rounded-lg text-center shadow-inner relative overflow-hidden">
                            <div className="absolute -right-2 -bottom-2 opacity-20"><Zap className="w-12 h-12 text-yellow-400"/></div>
                            <span className="block text-[10px] text-blue-200 uppercase font-bold mb-1 relative z-10">Hoàn vốn dự kiến</span>
                            <span className="text-lg font-bold text-yellow-400 relative z-10">{paybackYears} năm</span>
                            </div>
                            <div className="col-span-2 bg-slate-50 p-3 rounded-lg flex justify-between items-center border border-slate-100 px-4">
                            <div className="text-left">
                                <span className="block text-[10px] text-slate-500 uppercase font-bold">
                                Chi phí dự kiến 
                                </span>
                                <span className="text-[10px] text-slate-400 italic block mt-0.5">Vật tư Tier 1, trọn gói thi công</span>
                            </div>
                            <span className="text-2xl font-black text-[#0f2852]">~{estimatedCost.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>

                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#0f2852] font-bold py-3 rounded-lg transition shadow-sm hover:shadow text-sm flex items-center justify-center gap-2">
                            Nhận Báo Giá & Bản Vẽ 3D Miễn Phí
                        </button>
                        </div>
                    </div>

                    <div className="md:col-span-5 space-y-5">
                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                        <h5 className="font-bold text-[#0f2852] mb-2 flex items-center gap-2 text-sm">
                            <TrendingUp className="w-4 h-4"/> Định hướng SEO Local
                        </h5>
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0"/> Báo giá điện mặt trời tự dùng TP.HCM 2026</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0"/> Hệ lưu trữ 5kW, 10kW Hybrid cho nhà phố</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0"/> Giải pháp cắt giảm hóa đơn điện bậc 6</li>
                        </ul>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <h5 className="font-bold text-[#0f2852] mb-3 flex items-center gap-2 text-sm">
                            <ShieldCheck className="w-4 h-4"/> USP Hiển Thị Trang Chủ
                        </h5>
                        <ul className="text-sm text-slate-600 space-y-3">
                            <li className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-lg"><Sun className="w-4 h-4 text-slate-700"/></div>
                            <span>Vật tư chuẩn <strong>Tier 1 Quốc tế (625W)</strong></span>
                            </li>
                            <li className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-lg"><Clock className="w-4 h-4 text-slate-700"/></div>
                            <span>Thi công <strong>3 ngày</strong>, cam kết không đục phá</span>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {/* TAB 5: PLAN */}
            {activeTab === 'plan' && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in duration-300">
                <div className="mb-8 border-l-4 border-yellow-400 pl-4">
                    <h3 className="text-2xl font-bold text-[#0f2852] mb-1">Kế Hoạch Thực Thi (Phase 1)</h3>
                    <p className="text-slate-600">Lộ trình 30 ngày khởi chạy chiến dịch Lead Generation.</p>
                </div>

                <div className="relative border-l-2 border-slate-200 ml-4 md:ml-8 space-y-8">
                    <div className="relative pl-8 md:pl-10">
                    <div className="absolute w-8 h-8 bg-slate-100 rounded-full text-slate-600 border border-slate-300 flex items-center justify-center font-bold -left-[17px] top-0 text-sm">W1</div>
                    <h4 className="text-lg font-bold text-slate-800">Foundation (Nền tảng)</h4>
                    <ul className="mt-2 text-slate-600 space-y-1 text-sm">
                        <li>• Thống nhất nhận diện Visual (Logo, Cover, Template).</li>
                        <li>• Hoàn thiện Code & Tích hợp công cụ tính toán ROI lên Web.</li>
                    </ul>
                    </div>
                    
                    <div className="relative pl-8 md:pl-10">
                    <div className="absolute w-8 h-8 bg-blue-100 rounded-full text-blue-600 border border-blue-400 flex items-center justify-center font-bold -left-[17px] top-0 text-sm">W2</div>
                    <h4 className="text-lg font-bold text-[#0f2852]">Seeding (Phân phối nội dung)</h4>
                    <ul className="mt-2 text-slate-600 space-y-1 text-sm">
                        <li>• Đăng tải nội dung định hình kênh (10 Posts chuẩn Cấu trúc 4-3-2-1).</li>
                        <li>• Sản xuất 2 Video Reels Review thực tế.</li>
                    </ul>
                    </div>

                    <div className="relative pl-8 md:pl-10">
                    <div className="absolute w-8 h-8 bg-yellow-400 rounded-full text-[#0f2852] border border-yellow-500 shadow-sm flex items-center justify-center font-bold -left-[17px] top-0 text-sm">W3-4</div>
                    <h4 className="text-lg font-bold text-[#0f2852]">Performance Marketing (Thu Lead)</h4>
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mt-3 max-w-2xl">
                        <p className="text-sm font-medium text-[#0f2852] mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4"/> Triển khai Facebook Ads (Objective: Lead Generation)
                        </p>
                        <ul className="text-sm text-slate-700 space-y-1 ml-6 list-disc marker:text-blue-500">
                        <li><strong>Target:</strong> Khách hàng quan tâm BĐS, kiến trúc, xe điện (EV) tại khu vực TP.HCM.</li>
                        <li><strong>Lead Magnet:</strong> Miễn phí khảo sát và thiết kế bản vẽ 3D hệ thống năng lượng.</li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            )}

            </div>
        </main>

        <footer className="mt-12 text-slate-400 text-center text-sm px-6">
            <p>Strategic Pitching Deck NCSE - Data Update: 2026</p>
        </footer>
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
