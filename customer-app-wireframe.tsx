import React from 'react';

const CustomerAppWireframe = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* App Header */}
      <header className="bg-orange-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
            </div>
            <h1 className="text-xl font-bold">ที่นี่ วังสามหมอ</h1>
          </div>
          <div className="flex space-x-4">
            <div className="w-6 h-6 bg-white/20 rounded-full"></div>
            <div className="w-6 h-6 bg-white/20 rounded-full"></div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mt-4 relative">
          <input 
            type="text" 
            className="w-full p-2 pl-10 rounded-lg text-gray-800" 
            placeholder="ค้นหาร้านอาหารหรือเมนู..." 
          />
          <div className="absolute left-3 top-2.5">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {/* Location Bar */}
        <div className="bg-white p-3 rounded-lg shadow-sm mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-orange-600 rounded-full"></div>
            <span className="text-gray-700">กำลังส่งที่: บ้านวังสามหมอ</span>
          </div>
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
        </div>
        
        {/* Promotions Carousel */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">โปรโมชัน</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[260px] h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-md flex-shrink-0"></div>
            ))}
          </div>
        </div>
        
        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">หมวดหมู่</h2>
          <div className="grid grid-cols-4 gap-3">
            {['อาหารตามสั่ง', 'ก๋วยเตี๋ยว', 'เครื่องดื่ม', 'ของหวาน', 'อาหารอีสาน', 'ฟาสต์ฟู้ด', 'สตรีทฟู้ด', 'ผลไม้'].map((cat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-orange-100 rounded-full mb-1 flex items-center justify-center">
                  <div className="w-8 h-8 bg-orange-300 rounded-full"></div>
                </div>
                <span className="text-xs text-center">{cat}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Popular Restaurants */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">ร้านยอดนิยม</h2>
            <span className="text-orange-600 text-sm">ดูทั้งหมด</span>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-3 rounded-lg shadow-sm flex">
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">ร้านอาหาร {i}</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm">4.{7+i}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">อาหารตามสั่ง • 0.{i} กม.</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-orange-600">ฟรีค่าส่ง</span>
                    <span className="text-xs text-gray-500">15-25 นาที</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-3 flex justify-between">
        {['หน้าแรก', 'ค้นหา', 'คำสั่งซื้อ', 'แชท', 'โปรไฟล์'].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-6 h-6 ${i === 0 ? 'bg-orange-500' : 'bg-gray-300'} rounded-full`}></div>
            <span className={`text-xs mt-1 ${i === 0 ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>{item}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default CustomerAppWireframe;
