// src/app/page.tsx
'use client'

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function Home() {
  const [values, setValues] = useState({
    adSpend: 500,
    orders: 20,
    avgOrderValue: 50
  })

  const [metrics, setMetrics] = useState({
    totalSales: 1000,
    roas: 2.0,
    profit: 500,
    acos: 50.0
  })

  useEffect(() => {
    const totalSales = values.orders * values.avgOrderValue
    const roas = values.adSpend === 0 ? 0 : totalSales / values.adSpend
    const profit = totalSales - values.adSpend
    const acos = totalSales === 0 ? 0 : (values.adSpend / totalSales) * 100

    setMetrics({
      totalSales,
      roas,
      profit,
      acos
    })
  }, [values])

  const generateChartData = () => {
    return Array.from({ length: 41 }, (_, i) => ({
      orders: i,
      revenue: i * values.avgOrderValue,
      adSpend: values.adSpend
    }))
  }

  return (
    <main className="min-h-screen bg-[#1A1A1A] p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-white">ROAS Calculator</h1>
        
        {/* Ad Spend Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-gray-300">
            <span>Ad Spend ($)</span>
            <span>${values.adSpend}</span>
          </div>
          <input 
            type="range"
            value={values.adSpend}
            onChange={(e) => setValues(prev => ({ ...prev, adSpend: Number(e.target.value) }))}
            min="0"
            max="1000"
            step="10"
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Order Values Section */}
        <div className="flex items-center gap-4 text-gray-300">
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <span>Number of Orders</span>
              <span>{values.orders}</span>
            </div>
            <input 
              type="range"
              value={values.orders}
              onChange={(e) => setValues(prev => ({ ...prev, orders: Number(e.target.value) }))}
              min="0"
              max="40"
              step="1"
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <span className="text-2xl">×</span>
          
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <span>Average Order Value ($)</span>
              <span>{values.avgOrderValue}</span>
            </div>
            <input 
              type="range"
              value={values.avgOrderValue}
              onChange={(e) => setValues(prev => ({ ...prev, avgOrderValue: Number(e.target.value) }))}
              min="0"
              max="100"
              step="5"
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <span className="text-2xl">=</span>
          
          <div className="text-right">
            <div className="text-sm">Total Sales</div>
            <div className="text-2xl text-purple-400">${metrics.totalSales}</div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-[#252525] rounded-lg">
            <div className="text-sm text-gray-400">ROAS</div>
            <div className="text-xl text-purple-400">{metrics.roas.toFixed(1)}x</div>
          </div>
          <div className="p-4 bg-[#252525] rounded-lg">
            <div className="text-sm text-gray-400">Profit</div>
            <div className="text-xl text-purple-400">${metrics.profit}</div>
          </div>
          <div className="p-4 bg-[#252525] rounded-lg">
            <div className="text-sm text-gray-400">ACOS</div>
            <div className="text-xl text-purple-400">{metrics.acos.toFixed(1)}%</div>
          </div>
        </div>

        {/* Explanation Text */}
        <div className="space-y-2 text-sm text-gray-400">
          <p>If you spend ${values.adSpend} on advertising to get ${metrics.totalSales} in sales from {values.orders} orders with an average order value of ${values.avgOrderValue}, your ROAS will be {metrics.roas.toFixed(1)}x.</p>
          <p>This indicates that for every $1 spent on ads, you earn ${metrics.roas.toFixed(2)} in revenue.</p>
          <p>Your ACOS (Advertising Cost of Sale) indicates that {metrics.acos.toFixed(1)}% of your revenue will go to advertising costs. You have an additional {(100 - metrics.acos).toFixed(1)}% (${metrics.profit}) to cover additional expenses and keep a profit.</p>
        </div>

        {/* Performance Chart */}
        <div className="space-y-4">
          <h3 className="text-white">Performance Analysis</h3>
          <div className="h-64 bg-[#252525] rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateChartData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid stroke="#333" />
                <XAxis dataKey="orders" stroke="#666" />
                <YAxis stroke="#666" />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="adSpend" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  )
}