import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Tabs
content = content.replace("label: '1. Insight Thị Trường'", "label: '1. Thị Hiếu (Insight)'")
content = content.replace("label: '2. Chiến Lược Lõi'", "label: '2. Chiến Lược Lõi (Core)'")
content = content.replace("label: '3. Facebook Ads'", "label: '3. Quảng Cáo Facebook (Ads)'")
content = content.replace("label: '4. Lead Gen (Web)'", "label: '4. Phễu Chuyển Đổi (Lead)'")
content = content.replace("label: '5. Action Plan'", "label: '5. Kế Hoạch (Action Plan)'")

# 2. Hero Section
content = content.replace("STRATEGIC PROPOSAL 2026", "ĐỀ XUẤT CHIẾN LƯỢC 2026 (Strategic Proposal)")
content = content.replace("Key Message (Tùy chọn chiến dịch)", "Thông Điệp Chính (Key Message)")

# 3. Tab 1
content = content.replace("Điểm Đau (Pain Points)", "Nỗi Đau Khách Hàng (Pain Points)")
content = content.replace("Nhu Cầu Lõi (Needs)", "Nhu Cầu Cốt Lõi (Core Needs)")

# 4. Tab 2
content = content.replace("Định Vị Truyền Thông (Positioning)", "Định Vị Truyền Thông (Brand Positioning)")
content = content.replace("Cấu Trúc Phân Bổ Nội Dung (4-3-2-1)", "Tỷ Lệ Tiêu Điểm Nội Dung (Content Pillar)")
content = content.replace("{ percent: '10%', title: 'Chuyển Đổi (Lead)'", "{ percent: '10%', title: 'Chuyển Đổi (Lead Gen)'")

# Tab 2 Competitor Review Replacement
old_competitor = """                            <div className="mb-6 border-l-4 border-blue-500 pl-4">
                            <h3 className="text-xl font-bold text-[#0f2852] mb-1">Competitor Review (Phân Tích Đối Thủ)</h3>
                            <p className="text-slate-600 text-sm">Chiến lược Đại Dương Xanh (Blue Ocean Strategy) của NCSE.</p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 opacity-70">
                                <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <Frown className="w-5 h-5" /> Thị Trường Điển Hình (Red Ocean)
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-600">
                                <li>• Đua nhau giảm giá, chiết khấu sâu để chốt Sales.</li>
                                <li>• Chạy Ads chèo kéo: "Lắp điện MT giá rẻ nhất khu vực".</li>
                                <li>• Target chung chung, Leads đa phần là khách tham khảo giá không có nhu cầu thực.</li>
                                </ul>
                            </div>
                            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                                <h4 className="font-bold text-[#0f2852] mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5 text-blue-600" /> Chiến Lược Của NCSE (Blue Ocean)
                                </h4>
                                <ul className="space-y-2 text-sm text-[#0f2852]">
                                <li>• <strong>Giáo dục ROI:</strong> Chọn cách đánh vào dòng tiền & hiệu suất sinh lời dài hạn 25 năm.</li>
                                <li>• <strong>Công cụ hóa:</strong> Dùng "Interactive Demo" biến Web thành nam châm hút Lead chất lượng.</li>
                                <li>• <strong>Nâng tầm định vị:</strong> Giá trị đi kèm chất lượng Tier 1 Quốc tế & Cam kết thi công độc quyền.</li>
                                </ul>
                            </div>
                            </div>"""

new_competitor = """                            <div className="mb-6 border-l-4 border-blue-500 pl-4">
                            <h3 className="text-xl font-bold text-[#0f2852] mb-1">Phân Tích Đối Thủ & Lợi Thế Kép (Competitor Review & USP)</h3>
                            <p className="text-slate-600 text-sm">Chiến lược Đại Dương Xanh (Blue Ocean Strategy) của NCSE.</p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 opacity-70">
                                <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <Frown className="w-5 h-5" /> Thị Trường Điển Hình (Red Ocean)
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-600">
                                <li>• Cạnh tranh bằng linh kiện giá rẻ, trôi nổi, kém chất lượng để lấy giá thầu thấp.</li>
                                <li>• Chạy quảng cáo chèo kéo chung chung, thông điệp (Key Message) nhạt nhoà.</li>
                                <li>• Nhắm mục tiêu (Target Audience) không sâu, đa phần thu về dữ liệu rác (Junk leads), khách chỉ tham khảo giá.</li>
                                </ul>
                            </div>
                            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                                <h4 className="font-bold text-[#0f2852] mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5 text-blue-600" /> Điểm Mạnh Của NCSE (Unique Selling Points)
                                </h4>
                                <ul className="space-y-2 text-sm text-[#0f2852]">
                                <li>• <strong>Thi công thần tốc & Chất lượng dẫn đầu:</strong> Triển khai quy chuẩn trong 3 ngày với hệ thống vật tư TIER 1 Quốc tế.</li>
                                <li>• <strong>Quyền lực chiết khấu:</strong> Khả năng cung cấp mức giá (Price Point) và chiết khấu tốt nhất phân khúc nhờ tối ưu chuỗi cung ứng.</li>
                                <li>• <strong>Đòn bẩy tài chính (Installment):</strong> Hỗ trợ trả trước 30%, trả góp lãi suất 0% trong 6 tháng, tối ưu tỷ suất đầu tư.</li>
                                <li>• <strong>Công cụ hóa:</strong> Dùng "Trải nghiệm tương tác" biến Website thành nam châm hút số điện thoại chất lượng cao.</li>
                                </ul>
                            </div>
                            </div>"""

content = content.replace(old_competitor, new_competitor)

# Tab 3 Social Media Timeline Sync
old_table = """                                <h4 className="text-xl font-bold text-[#0f2852] mb-4 flex items-center gap-2">
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
                                            Số lượng Form (Leads)<br/>Tỷ lệ chốt (Qualified Leads) / CPL
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>"""

new_table = """                                <h4 className="text-xl font-bold text-[#0f2852] mb-4 flex items-center gap-2">
                                <CalendarDays className="w-6 h-6 text-yellow-500" /> Cấu Trúc Nội Dung Triển Khai (Content Plan Đồng Bộ Action Plan)
                                </h4>
                                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                                    <thead className="bg-[#0f2852] text-white">
                                        <tr>
                                        <th className="p-4 font-semibold w-1/5">Lộ Trình</th>
                                        <th className="p-4 font-semibold w-2/5">Tuyến Nội Dung (Content Angle)</th>
                                        <th className="p-4 font-semibold w-1/5">Định Dạng (Format)</th>
                                        <th className="p-4 font-semibold w-1/5">Chỉ Số KPI</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 align-top">
                                            <span className="bg-slate-100 text-slate-800 font-bold px-2 py-1 rounded text-xs block w-max mb-1">Tháng 1</span>
                                            <span className="text-slate-600 text-xs font-semibold uppercase">Giáo Dục & Niềm Tin</span>
                                        </td>
                                        <td className="p-4 align-top">
                                            <ul className="space-y-2 text-slate-700">
                                            <li><strong>Nỗi đau (Educate):</strong> Bài toán tỷ suất sinh lời (ROI) dài hạn 2-3 năm của hệ linh kiện TIER 1.</li>
                                            <li><strong>Uy tín (Trust):</strong> Triển khai quy trình thi công thần tốc 3 ngày, cam kết chất lượng.</li>
                                            </ul>
                                        </td>
                                        <td className="p-4 align-top text-slate-600">
                                            Infographic<br/>Album Carousel<br/>Video Reels (1 phút)
                                        </td>
                                        <td className="p-4 align-top text-slate-600">
                                            Lượt tiếp cận (Reach), Thảo luận tự nhiên (Engagement).
                                        </td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 align-top">
                                            <span className="bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded text-xs block w-max mb-1">Tháng 2</span>
                                            <span className="text-slate-600 text-xs font-semibold uppercase">Tăng Tốc Thu Lead</span>
                                        </td>
                                        <td className="p-4 align-top">
                                            <ul className="space-y-2 text-slate-700">
                                            <li><strong>Chuyển đổi (Covert):</strong> Demo công cụ tính toán tự động. Kêu gọi khách hàng tự check ROI rủi ro bằng không.</li>
                                            <li><strong>Mồi câu (Lead Magnet):</strong> Báo giá chiết khấu ưu đãi & Trả trước 30%, Trả góp 0% 6 tháng.</li>
                                            </ul>
                                        </td>
                                        <td className="p-4 align-top text-slate-600">
                                            Video Demo UI<br/>Lead Form Ads<br/>Click-to-Web
                                        </td>
                                        <td className="p-4 align-top text-slate-600 font-bold text-[#0f2852]">
                                            Tỷ lệ chốt (Qualified Leads)<br/>Chi phí/Lead (CPL).
                                        </td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 transition-colors bg-yellow-50/30">
                                        <td className="p-4 align-top">
                                            <span className="bg-yellow-400 text-[#0f2852] font-bold px-2 py-1 rounded text-xs block w-max mb-1">Tháng 3</span>
                                            <span className="text-slate-600 text-xs font-semibold uppercase">Bám Đuổi & Đóng Cổng</span>
                                        </td>
                                        <td className="p-4 align-top">
                                            <ul className="space-y-2 text-slate-700">
                                            <li><strong>Bằng Chứng (Testimonial):</strong> Case Study thực tế hoá đơn điện đã giảm thực tế qua App điện lực.</li>
                                            <li><strong>Bám đuôi (Retargeting):</strong> Target tệp khách hàng truy cập Web chưa để lại SĐT (Custom Audience).</li>
                                            </ul>
                                        </td>
                                        <td className="p-4 align-top text-slate-600 font-semibold">
                                            Video Testimonial<br/>Dynamic Ads
                                        </td>
                                        <td className="p-4 align-top font-bold text-[#0f2852]">
                                            Tỷ lệ chuyển đổi phễu cuối (CR)
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>"""

content = content.replace(old_table, new_table)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
