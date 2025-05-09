import React, { useState } from 'react';

const DriverAppWireframe = () => {
  const [driverStatus, setDriverStatus] = useState('online');
  const [currentScreen, setCurrentScreen] = useState('home');
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* App Header */}
      <header className="bg-blue-700 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-700 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold">ที่นี่ วังสามหมอ</h1>
              <p className="text-xs text-blue-100">สำหรับคนขับส่งอาหาร</p>
            </div>
          </div>
          <div className="w-6 h-6 bg-white/20 rounded-full"></div>
        </div>
      </header>
      
      {/* Driver Status Toggle */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-medium">สวัสดี, คุณสมชาย</h2>
            <p className="text-xs text-gray-500">รหัสคนขับ: DR-1234</p>
          </div>
          <button 
            className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
              driverStatus === 'online' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setDriverStatus(driverStatus === 'online' ? 'offline' : 'online')}
          >
            <div className={`w-3 h-3 ${driverStatus === 'online' ? 'bg-green-500' : 'bg-gray-500'} rounded-full mr-2`}></div>
            {driverStatus === 'online' ? 'ออนไลน์' : 'ออฟไลน์'}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {currentScreen === 'home' && (
          <div className="p-4">
            {/* Earnings Summary */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm text-gray-500 mb-1">รายได้วันนี้</h3>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">฿385</span>
                <span className="text-xs text-green-600 ml-2">+฿85 จากเมื่อวาน</span>
              </div>
              
              <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500">จำนวนเที่ยวส่ง</p>
                  <p className="font-medium">7</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">ระยะทางรวม</p>
                  <p className="font-medium">12.5 กม.</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">เวลาออนไลน์</p>
                  <p className="font-medium">3.5 ชม.</p>
                </div>
              </div>
            </div>
            
            {/* New Delivery Request */}
            {driverStatus === 'online' && (
              <div className="bg-white p-4 rounded-lg shadow-md mb-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">คำขอส่งอาหารใหม่</h3>
                  <span className="text-sm text-blue-600">2 นาทีที่แล้ว</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-orange-400 rounded"></div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">ร้านครัวคุณแม่</p>
                    <p className="text-xs text-gray-500">ถนนวังสามหมอ, 0.8 กม. จากคุณ</p>
                  </div>
                </div>
                
                <div className="border-t border-b border-gray-100 py-3 my-2">
                  <div className="flex items-start">
                    <div className="mt-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="w-0.5 h-10 bg-gray-300 mx-auto my-1"></div>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="ml-3">
                      <div className="mb-3">
                        <p className="text-sm font-medium">รับอาหารจาก</p>
                        <p className="text-xs text-gray-600">ร้านครัวคุณแม่ (ถนนวังสามหมอ)</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">ส่งที่</p>
                        <p className="text-xs text-gray-600">บ้านเลขที่ 123 หมู่ 4 ต.วังสามหมอ</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <p className="text-xs text-gray-500">ระยะทางทั้งหมด</p>
                    <p className="font-medium">3.2 กม.</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">เวลาโดยประมาณ</p>
                    <p className="font-medium">15 นาที</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">รายได้</p>
                    <p className="font-medium text-green-600">฿45</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                    ปฏิเสธ
                  </button>
                  <button 
                    className="flex-1 py-2 bg-blue-600 text-white rounded text-sm font-medium"
                    onClick={() => setCurrentScreen('active-delivery')}
                  >
                    รับงาน
                  </button>
                </div>
              </div>
            )}
            
            {/* Hotspots Map (Simplified) */}
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">พื้นที่ที่มีออเดอร์มาก</h3>
              <div className="bg-gray-200 h-48 rounded-lg mb-2 relative">
                {/* Simplified Map */}
                <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-red-400 rounded-full opacity-30"></div>
                <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-red-500 rounded-full opacity-40"></div>
                <div className="absolute bottom-1/4 left-1/2 w-10 h-10 bg-orange-400 rounded-full opacity-30"></div>
              </div>
              <p className="text-xs text-gray-500 text-center">แสดงพื้นที่ที่มีออเดอร์มากในขณะนี้</p>
            </div>
          </div>
        )}
        
        {currentScreen === 'active-delivery' && (
          <div className="p-4">
            {/* Order Progress */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">ออเดอร์ #1234</h3>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">กำลังดำเนินการ</span>
              </div>
              
              {/* Progress Steps */}
              <div className="relative pt-1 pb-4">
                <div className="flex mb-2 items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <div className="text-center w-1/3 relative">
                    <div className="w-4 h-4 bg-blue-600 rounded-full mx-auto mb-1"></div>
                    <div>รับงาน</div>
                  </div>
                  <div className="text-center w-1/3 relative">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mx-auto mb-1"></div>
                    <div>รับอาหาร</div>
                  </div>
                  <div className="text-center w-1/3 relative">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mx-auto mb-1"></div>
                    <div>ส่งอาหาร</div>
                  </div>
                </div>
              </div>
              
              {/* Current Task */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-1">กำลังไปรับอาหาร</h4>
                <p className="text-sm text-gray-700">ร้านครัวคุณแม่ (ถนนวังสามหมอ)</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-600">ระยะห่าง: 0.5 กม.</span>
                  <span className="text-xs text-gray-600">เวลาโดยประมาณ: 3 นาที</span>
                </div>
              </div>
              
              {/* Restaurant Info */}
              <div className="mt-3 border-t border-gray-100 pt-3">
                <h4 className="font-medium mb-2">รายละเอียดร้านค้า</h4>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-6 h-6 bg-orange-400 rounded"></div>
                  </div>
                  <div>
                    <p className="font-medium">ร้านครัวคุณแม่</p>
                    <p className="text-xs text-gray-500">ติดต่อ: 088-123-4567</p>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="mt-3 border-t border-gray-100 pt-3">
                <h4 className="font-medium mb-2">รายการอาหาร</h4>
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span>ข้าวกระเพราหมูสับ × 1</span>
                    <span>฿80</span>
                  </div>
                  <div className="flex justify-between">
                    <span>น้ำเปล่า × 1</span>
                    <span>฿15</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map View */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="h-48 bg-gray-200 relative">
                {/* Simplified Map */}
                <div className="absolute h-full w-full bg-gray-200">
                  <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </div>
                  {/* Route Line */}
                  <div className="absolute top-1/3 left-1/4 w-24 h-1 bg-blue-400 transform rotate-45"></div>
                  <div className="absolute top-2/5 left-2/5 w-28 h-1 bg-blue-400 transform rotate-12"></div>
                </div>
              </div>
              <div className="p-3 flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <input 
                  type="text" 
                  className="flex-1 text-sm bg-gray-100 py-2 px-3 rounded-lg" 
                  placeholder="ค้นหาเส้นทาง..."
                  readOnly
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                ติดต่อลูกค้า
              </button>
              <button 
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium"
                onClick={() => setCurrentScreen('home')}
              >
                รับอาหารแล้ว
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-3 flex justify-between">
        {['หน้าแรก', 'ประวัติงาน', 'รายได้', 'โปรไฟล์'].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-6 h-6 ${i === 0 ? 'bg-blue-500' : 'bg-gray-300'} rounded-full`}></div>
            <span className={`text-xs mt-1 ${i === 0 ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>{item}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default DriverAppWireframe;