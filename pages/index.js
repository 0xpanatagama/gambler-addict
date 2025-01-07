import { useState, useEffect } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Coins, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function Home() {
  const [currentAmount, setCurrentAmount] = useState(100);
  const [history, setHistory] = useState([]);
  const [chartData, setChartData] = useState([{ flip: 0, amount: 100 }]);
  const [betSize, setBetSize] = useState(1); // 1 means 100% of current amount
  const [isLogScale, setIsLogScale] = useState(false);
  const [statistics, setStatistics] = useState({
    longestWinStreak: 0,
    longestLoseStreak: 0,
    currentStreak: 0,
    totalFlips: 0,
    winRate: 0,
    maxAmount: 100,
    minAmount: 100
  });

  const updateStatistics = (isWin, newAmount) => {
    setStatistics(prev => {
      const newStats = { ...prev };
      // Update streaks
      if (isWin) {
        newStats.currentStreak = prev.currentStreak > 0 ? prev.currentStreak + 1 : 1;
        newStats.longestWinStreak = Math.max(prev.longestWinStreak, newStats.currentStreak);
      } else {
        newStats.currentStreak = prev.currentStreak < 0 ? prev.currentStreak - 1 : -1;
        newStats.longestLoseStreak = Math.min(prev.longestLoseStreak, newStats.currentStreak);
      }
      // Update other stats
      newStats.totalFlips = prev.totalFlips + 1;
      newStats.winRate = (history.filter(h => h.isHeads).length / newStats.totalFlips) * 100;
      newStats.maxAmount = Math.max(prev.maxAmount, newAmount);
      newStats.minAmount = Math.min(prev.minAmount, newAmount);
      return newStats;
    });
  };

  const flipCoin = () => {
    const isHeads = Math.random() < 0.5;
    const multiplier = isHeads ? (1 + betSize) : (1 - 0.4 * betSize);
    const newAmount = currentAmount * multiplier;
    
    setCurrentAmount(newAmount);
    updateStatistics(isHeads, newAmount);
    
    setHistory([...history, {
      isHeads,
      prevAmount: currentAmount,
      newAmount
    }].slice(-5));
    
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
    setStatistics({
      longestWinStreak: 0,
      longestLoseStreak: 0,
      currentStreak: 0,
      totalFlips: 0,
      winRate: 0,
      maxAmount: 100,
      minAmount: 100
    });
  };

  // Animated coin flip component
  const CoinFlip = ({ isHeads }) => (
    <div className={`transform transition-all duration-500 ${isHeads ? 'rotate-y-180' : ''}`}>
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl">
        {isHeads ? 'H' : 'T'}
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded border border-gray-700">
          <p className="text-white">Flip {payload[0].payload.flip}</p>
          <p className="text-white">${payload[0].payload.amount.toFixed(2)}</p>
          {payload[0].payload.result && (
            <p className={`${payload[0].payload.result === 'Heads' ? 'text-blue-400' : 'text-orange-400'}`}>
              {payload[0].payload.result}
            </p>
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
        
        {/* Interactive Controls */}
        <div className="mb-6 p-4 border border-gray-700 rounded-lg">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Bet Size (% of current amount)</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={betSize}
                onChange={(e) => setBetSize(parseFloat(e.target.value))}
                className="w-48"
              />
              <span className="ml-2">{(betSize * 100).toFixed(0)}%</span>
            </div>
            <div>
              <button
                onClick={() => setIsLogScale(!isLogScale)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                {isLogScale ? 'Linear Scale' : 'Log Scale'}
              </button>
            </div>
          </div>
        </div>

        {/* Game Rules */}
        <div className="grid grid-cols-2 gap-8 mb-8 p-4 border border-gray-700 rounded-lg">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-blue-400 font-bold text-xl">Heads</div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl">H</div>
            <div className="flex items-center text-blue-400">
              <ArrowUpCircle className="mr-2" />
              +{(betSize * 100).toFixed(0)}%
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-orange-400 font-bold text-xl">Tails</div>
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-2xl">T</div>
            <div className="flex items-center text-orange-400">
              <ArrowDownCircle className="mr-2" />
              -{(betSize * 40).toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Analytics Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Win Rate</div>
            <div className="text-xl font-bold">{statistics.winRate.toFixed(1)}%</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Longest Win Streak</div>
            <div className="text-xl font-bold">{statistics.longestWinStreak}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Max Amount</div>
            <div className="text-xl font-bold">${statistics.maxAmount.toFixed(2)}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Min Amount</div>
            <div className="text-xl font-bold">${statistics.minAmount.toFixed(2)}</div>
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
                  scale={isLogScale ? 'log' : 'linear'}
                  domain={['auto', 'auto']}
                  label={{ 
                    value: 'Amount ($)', 
                    angle: -90, 
                    position: 'insideLeft',
                    fill: '#9CA3AF'
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={100} stroke="#4B5563" strokeDasharray="3 3" />
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
