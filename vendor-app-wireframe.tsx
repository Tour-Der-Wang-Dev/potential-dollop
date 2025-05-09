import React, { useState } from 'react';

const VendorAppWireframe = () => {
  const [activeTab, setActiveTab] = useState('orders');
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* App Header */}
      <header className="bg-green-700 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-green-700 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold">ที่นี่ วังสามหมอ</h1>
              <p className="text-xs text-green-100">สำหรับร้านค้า</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="w-6 h-6 bg-white/20 rounded-full"></div>
            <div className="w-6 h-6 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </header>
      
      {/* Restaurant Status Toggle */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-medium">ร้านครัวคุณแม่</h2>
            <p className="text-xs text-gray-500">เปิด 08:00 - 20:00 น.</p>
          </div>
          <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-green-700">เปิดรับออเดอร์</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-white">
          {['orders', 'menu', 'reports', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === tab 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'orders' && 'ออเดอร์'}
              {tab === 'menu' && 'เมนู'}
              {tab === 'reports' && 'รายงาน'}
              {tab === 'settings' && 'ตั้งค่า'}
            </button>
          ))}
        </div>
        
        {/* Orders Content */}
        {activeTab === 'orders' && (
          <div className="p-4">
            {/* Order Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'รอรับออเดอร์', count: 2, color: 'bg-yellow-500' },
                { label: 'กำลังปรุง', count: 1, color: 'bg-blue-500' },
                { label: 'รอส่งมอบ', count: 3, color: 'bg-green-500' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <div className={`w-8 h-8 ${stat.color} rounded-full mx-auto mb-1 flex items-center justify-center text-white font-medium`}>
                    {stat.count}
                  </div>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
            
            {/* Incoming Orders */}
            <h3 className="font-medium mb-2">ออเดอร์ใหม่</h3>
            <div className="space-y-3">
              {[1, 2].map(order => (
                <div key={order} className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-yellow-500">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">ออเดอร์ #{1000 + order}</span>
                    <div className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                      รอรับออเดอร์
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">เวลาที่สั่ง:</span>
                    <span>12:{30 + order} น.</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 mt-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>ข้าวกระเพรา × 1</span>
                      <span>80฿</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>น้ำเปล่า × 1</span>
                      <span>15฿</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">รวม:</span>
                      <span className="font-medium">95฿</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 bg-red-100 text-red-700 py-2 rounded text-sm font-medium">
                      ปฏิเสธ
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-medium">
                      รับออเดอร์
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Active Orders */}
            <h3 className="font-medium mb-2 mt-4">กำลังดำเนินการ</h3>
            <div className="space-y-3">
              {[1].map(order => (
                <div key={order} className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">ออเดอร์ #{999 + order}</span>
                    <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                      กำลังปรุง
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>ส้มตำไทย × 1</span>
                    <span>60฿</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>ไก่ย่าง × 1</span>
                    <span>80฿</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">รวม:</span>
                      <span className="font-medium">140฿</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium mt-3">
                    เสร็จสิ้นการปรุงอาหาร
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Menu Content (Simplified) */}
        {activeTab === 'menu' && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">เมนูทั้งหมด (12)</h3>
              <button className="bg-green-600 text-white px-3 py-1.5 rounded text-sm">
                + เพิ่มเมนูใหม่
              </button>
            </div>
            
            <div className="space-y-3">
              {[1, 2, 3].map(item => (
                <div key={item} className="bg-white p-3 rounded-lg shadow-sm flex">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">ข้าวกระเพรา {item === 1 ? 'หมูสับ' : item === 2 ? 'ไก่' : 'ทะเล'}</h4>
                      <div className="flex space-x-2">
                        <div className="w-5 h-5 bg-gray-200 rounded"></div>
                        <div className="w-5 h-5 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">อาหารจานเดียว • ยอดนิยม</p>
                    <div className="flex justify-between mt-2">
                      <span className="font-medium">{70 + (item * 10)}฿</span>
                      <div className="flex items-center space-x-1">
                        <div className={`w-4 h-4 ${item !== 3 ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
                        <span className="text-xs">{item !== 3 ? 'มีจำหน่าย' : 'หมด'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VendorAppWireframe;
