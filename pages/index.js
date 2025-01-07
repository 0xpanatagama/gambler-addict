import { useState, useEffect } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Coins } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [currentAmount, setCurrentAmount] = useState(100);
  const [history, setHistory] = useState([]);
  const [chartData, setChartData] = useState([{ flip: 0, amount: 100 }]);

  const flipCoin = () => {
    const isHeads = Math.random() < 0.5;
    const newAmount = isHeads ? currentAmount * 2 : currentAmount * 0.6;
    setCurrentAmount(newAmount);
    
    // Update history for recent flips list
    setHistory([...history, {
      isHeads,
      prevAmount: currentAmount,
      newAmount
    }].slice(-5));
    
    // Update chart data
    setChartData([...chartData, {
      flip: chartData.length,
      amount: newAmount,
      result: isHeads ? 'Heads' : 'Tails'
    }]);
  };

  const reset = () => {
    setCurrentAmount(100);
    setHistory([]);
    setChartData([{ flip: 0, amount: 100 }]);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded border border-gray-700">
          <p className="text-white">Flip {payload[0].payload.flip}</p>
          <p className="text-white">${payload[0].payload.amount.toFixed(2)}</p>
          {payload[0].payload.result && (
            <p className="text-white">{payload[0].payload.result}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="bg-gray-900 text-white p-6 rounded-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">The Gambler&apos;s Paradox</h1>
        
        {/* Game Rules */}
        <div className="grid grid-cols-2 gap-8 mb-8 p-4 border border-gray-700 rounded-lg">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-blue-400 font-bold text-xl">Heads</div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl">H</div>
            <div className="flex items-center text-blue-400">
              <ArrowUpCircle className="mr-2" />
              +100%
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-orange-400 font-bold text-xl">Tails</div>
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-2xl">T</div>
            <div className="flex items-center text-orange-400">
              <ArrowDownCircle className="mr-2" />
              -40%
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-8 p-4 border border-gray-700 rounded-lg">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="flip"
                  stroke="#9CA3AF"
                  label={{ value: 'Number of Flips', position: 'bottom', fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  label={{ 
                    value: 'Amount ($)', 
                    angle: -90, 
                    position: 'insideLeft',
                    fill: '#9CA3AF'
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#60A5FA" 
                  dot={{ fill: '#60A5FA' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Amount */}
        <div className="text-center mb-6">
          <div className="text-xl text-gray-400 mb-2">Current Amount:</div>
          <div className="text-4xl font-bold">${currentAmount.toFixed(2)}</div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={flipCoin}
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-colors"
          >
            <Coins className="mr-2" />
            Flip Coin
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-semibold transition-colors"
          >
            Reset
          </button>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="border-t border-gray-700 pt-4">
            <div className="text-gray-400 mb-2">Last {history.length} flips:</div>
            <div className="space-y-2">
              {history.map((flip, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded">
                  <div className={`flex items-center ${flip.isHeads ? 'text-blue-400' : 'text-orange-400'}`}>
                    {flip.isHeads ? (
                      <>
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">H</div>
                        <span>Heads</span>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">T</div>
                        <span>Tails</span>
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-sm">${flip.prevAmount.toFixed(2)} →</div>
                    <div className="font-bold">${flip.newAmount.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
