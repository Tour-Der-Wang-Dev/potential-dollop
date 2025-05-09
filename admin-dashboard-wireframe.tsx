import React, { useState } from 'react';

const AdminDashboardWireframe = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-600 rounded mr-3 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded"></div>
            </div>
            <div>
              <h1 className="font-bold text-lg">ที่นี่ วังสามหมอ</h1>
              <p className="text-xs text-gray-400">แผงควบคุมผู้ดูแลระบบ</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-4">
          {[
            { id: 'dashboard', label: 'แดชบอร์ด', icon: 'grid' },
            { id: 'orders', label: 'คำสั่งซื้อ', icon: 'shopping-bag' },
            { id: 'restaurants', label: 'ร้านอาหาร', icon: 'store' },
            { id: 'drivers', label: 'คนขับส่งอาหาร', icon: 'truck' },
            { id: 'customers', label: 'ลูกค้า', icon: 'users' },
            { id: 'reports', label: 'รายงาน', icon: 'bar-chart' },
            { id: 'promotions', label: 'โปรโมชัน', icon: 'gift' },
            { id: 'settings', label: 'ตั้งค่า', icon: 'settings' },
          ].map(item => (
            <button
              key={item.id}
              className={`flex items-center w-full px-4 py-3 text-left ${
                currentSection === item.id ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setCurrentSection(item.id)}
            >
              <div className="w-5 h-5 bg-gray-600 rounded mr-3"></div>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-600 rounded-full mr-3"></div>
            <div>
              <p className="font-medium">แอดมิน หลัก</p>
              <p className="text-xs text-gray-400">admin@thainee.com</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button className="mr-4">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </button>
            <h2 className="text-xl font-medium">
              {currentSection === 'dashboard' && 'แดชบอร์ด'}
              {currentSection === 'orders' && 'คำสั่งซื้อ'}
              {currentSection === 'restaurants' && 'ร้านอาหาร'}
              {currentSection === 'drivers' && 'คนขับส่งอาหาร'}
              {currentSection === 'customers' && 'ลูกค้า'}
              {currentSection === 'reports' && 'รายงาน'}
              {currentSection === 'promotions' && 'โปรโมชัน'}
              {currentSection === 'settings' && 'ตั้งค่า'}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-6 h-6 bg-gray-300 rounded-full">
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        {currentSection === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {[
                { label: 'รายได้วันนี้', value: '฿18,456', change: '+12%', color: 'bg-blue-500' },
                { label: 'คำสั่งซื้อวันนี้', value: '142', change: '+8%', color: 'bg-green-500' },
                { label: 'ร้านอาหารที่ใช้งาน', value: '38', change: '+2', color: 'bg-yellow-500' },
                { label: 'คนขับออนไลน์', value: '22', change: '-3', color: 'bg-purple-500' }
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${stat.color}`}></div>
                  <h3 className="text-sm text-gray-500 mb-1">{stat.label}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} จากเมื่อวาน
                  </p>
                </div>
              ))}
            </div>
            
            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Orders Chart */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">คำสั่งซื้อรายวัน</h3>
                  <select className="text-sm border rounded p-1">
                    <option>7 วันที่ผ่านมา</option>
                    <option>30 วันที่ผ่านมา</option>
                  </select>
                </div>
                <div className="h-64 relative">
                  {/* Simplified Bar Chart */}
                  <div className="absolute bottom-0 left-0 w-full flex items-end justify-between h-48 px-4">
                    {[35, 42, 58, 40, 45, 60, 50].map((value, i) => (
                      <div key={i} className="w-10 bg-blue-500 mx-1 rounded-t" style={{ height: `${value}%` }}></div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 w-full border-t border-gray-200 pt-2 flex justify-between px-4 text-xs text-gray-500">
                    {['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'].map((day, i) => (
                      <div key={i} className="w-10 text-center">{day}</div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Revenue Chart */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">รายได้รายวัน</h3>
                  <select className="text-sm border rounded p-1">
                    <option>7 วันที่ผ่านมา</option>
                    <option>30 วันที่ผ่านมา</option>
                  </select>
                </div>
                <div className="h-64 relative">
                  {/* Simplified Line Chart */}
                  <div className="absolute inset-0 flex items-center">
                    <svg className="w-full h-48" viewBox="0 0 300 100">
                      <polyline
                        points="0,80 50,70 100,50 150,65 200,40 250,35 300,50"
                        className="stroke-green-500 stroke-2 fill-none"
                      />
                      <polyline
                        points="0,80 50,70 100,50 150,65 200,40 250,35 300,50"
                        className="stroke-none fill-green-100 opacity-50"
                        transform="translate(0, 80) scale(1, -1)"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 w-full border-t border-gray-200 pt-2 flex justify-between px-4 text-xs text-gray-500">
                    {['21 เม.ย', '22 เม.ย', '23 เม.ย', '24 เม.ย', '25 เม.ย', '26 เม.ย', '27 เม.ย'].map((date, i) => (
                      <div key={i} className="text-center">{date}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">คำสั่งซื้อล่าสุด</h3>
                <button className="text-sm text-purple-600">ดูทั้งหมด</button>
              </div>
              <table className="w-full">
                <thead className="text-xs text-gray-500 uppercase border-b">
                  <tr>
                    <th className="py-3 text-left">หมายเลขคำสั่งซื้อ</th>
                    <th className="py-3 text-left">ลูกค้า</th>
                    <th className="py-3 text-left">ร้านอาหาร</th>
                    <th className="py-3 text-left">คนขับ</th>
                    <th className="py-3 text-left">ราคา</th>
                    <th className="py-3 text-left">สถานะ</th>
                    <th className="py-3 text-left">วันที่</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { id: '#12345', customer: 'อภิชาติ ส.', restaurant: 'ร้านครัวคุณแม่', driver: 'สมชาย ข.', price: '฿195', status: 'เสร็จสิ้น', date: '27 เม.ย 2025 12:30' },
                    { id: '#12344', customer: 'สมหญิง ล.', restaurant: 'ร้านก๋วยเตี๋ยวเจ๊แดง', driver: 'วิชัย ร.', price: '฿120', status: 'กำลังจัดส่ง', date: '27 เม.ย 2025 12:15' },
                    { id: '#12343', customer: 'ธนากร พ.', restaurant: 'ร้านข้าวมันไก่สมบูรณ์', driver: 'ปรีชา ม.', price: '฿155', status: 'กำลังปรุงอาหาร', date: '27 เม.ย 2025 12:05' },
                    { id: '#12342', customer: 'วิภาพร ก.', restaurant: 'ร้านก๋วยเตี๋ยวเจ๊แดง', driver: 'สมชาย ข.', price: '฿110', status: 'เสร็จสิ้น', date: '27 เม.ย 2025 11:45' },
                    { id: '#12341', customer: 'ชัยวัฒน์ บ.', restaurant: 'ร้านส้มตำแม่จันทร์', driver: 'อดิศร ด.', price: '฿225', status: 'เสร็จสิ้น', date: '27 เม.ย 2025 11:30' },
                  ].map((order, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-3 text-blue-600">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.restaurant}</td>
                      <td className="py-3">{order.driver}</td>
                      <td className="py-3 font-medium">{order.price}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'เสร็จสิ้น' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'กำลังจัดส่ง'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Bottom Sections Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Top Restaurants */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">ร้านอาหารยอดนิยม</h3>
                  <select className="text-sm border rounded p-1">
                    <option>วันนี้</option>
                    <option>สัปดาห์นี้</option>
                    <option>เดือนนี้</option>
                  </select>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'ร้านครัวคุณแม่', orders: 42, revenue: '฿4,230', rating: 4.8 },
                    { name: 'ร้านก๋วยเตี๋ยวเจ๊แดง', orders: 38, revenue: '฿3,650', rating: 4.7 },
                    { name: 'ร้านส้มตำแม่จันทร์', orders: 35, revenue: '฿3,500', rating: 4.6 },
                    { name: 'ร้านข้าวมันไก่สมบูรณ์', orders: 32, revenue: '฿3,200', rating: 4.5 },
                  ].map((restaurant, i) => (
                    <div key={i} className="flex items-center border-b pb-3">
                      <div className="w-2 font-medium text-gray-500 mr-3">{i+1}</div>
                      <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{restaurant.name}</h4>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                            <span className="text-sm">{restaurant.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between mt-1 text-sm text-gray-500">
                          <span>{restaurant.orders} ออเดอร์</span>
                          <span>{restaurant.revenue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Top Drivers */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">คนขับส่งอาหารยอดเยี่ยม</h3>
                  <select className="text-sm border rounded p-1">
                    <option>วันนี้</option>
                    <option>สัปดาห์นี้</option>
                    <option>เดือนนี้</option>
                  </select>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'สมชาย ข.', orders: 18, rating: 4.9, earnings: '฿1,260' },
                    { name: 'วิชัย ร.', orders: 15, rating: 4.8, earnings: '฿1,050' },
                    { name: 'ปรีชา ม.', orders: 14, rating: 4.8, earnings: '฿980' },
                    { name: 'อดิศร ด.', orders: 12, rating: 4.7, earnings: '฿840' },
                  ].map((driver, i) => (
                    <div key={i} className="flex items-center border-b pb-3">
                      <div className="w-2 font-medium text-gray-500 mr-3">{i+1}</div>
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{driver.name}</h4>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                            <span className="text-sm">{driver.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between mt-1 text-sm text-gray-500">
                          <span>{driver.orders} ออเดอร์</span>
                          <span>{driver.earnings}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentSection !== 'dashboard' && (
          <div className="flex-1 p-6">
            <div className="bg-white p-12 rounded-lg shadow-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-medium mb-2">หน้า{' '}
                  {currentSection === 'orders' && 'คำสั่งซื้อ'}
                  {currentSection === 'restaurants' && 'ร้านอาหาร'}
                  {currentSection === 'drivers' && 'คนขับส่งอาหาร'}
                  {currentSection === 'customers' && 'ลูกค้า'}
                  {currentSection === 'reports' && 'รายงาน'}
                  {currentSection === 'promotions' && 'โปรโมชัน'}
                  {currentSection === 'settings' && 'ตั้งค่า'}
                </h3>
                <p className="text-gray-500">รายละเอียดสำหรับหน้านี้จะแสดงที่นี่</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardWireframe;