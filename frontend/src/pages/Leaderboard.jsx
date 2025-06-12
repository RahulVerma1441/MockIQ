import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Users, Target, Clock, Filter, Search, Crown, Star, Zap } from 'lucide-react';

const LeaderboardPage = () => {
  const [selectedExam, setSelectedExam] = useState('JEE Main');
  const [timeRange, setTimeRange] = useState('overall');
  const [category, setCategory] = useState('overall');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      name: 'Arjun Sharma',
      avatar: 'AS',
      score: 287,
      totalMarks: 300,
      percentage: 95.7,
      testsGiven: 45,
      avgScore: 92.3,
      improvement: '+2.3%',
      location: 'Delhi',
      badge: 'gold',
      streak: 15,
      lastActive: '2 hours ago',
      subjects: { physics: 96, chemistry: 94, mathematics: 97 }
    },
    {
      rank: 2,
      name: 'Priya Patel',
      avatar: 'PP',
      score: 281,
      totalMarks: 300,
      percentage: 93.7,
      testsGiven: 42,
      avgScore: 89.8,
      improvement: '+1.8%',
      location: 'Mumbai',
      badge: 'silver',
      streak: 12,
      lastActive: '1 hour ago',
      subjects: { physics: 92, chemistry: 96, mathematics: 93 }
    },
    {
      rank: 3,
      name: 'Rohit Kumar',
      avatar: 'RK',
      score: 276,
      totalMarks: 300,
      percentage: 92.0,
      testsGiven: 48,
      avgScore: 87.5,
      improvement: '+3.2%',
      location: 'Bangalore',
      badge: 'bronze',
      streak: 8,
      lastActive: '30 min ago',
      subjects: { physics: 89, chemistry: 94, mathematics: 93 }
    },
    {
      rank: 4,
      name: 'Sneha Gupta',
      avatar: 'SG',
      score: 269,
      totalMarks: 300,
      percentage: 89.7,
      testsGiven: 38,
      avgScore: 86.2,
      improvement: '+0.9%',
      location: 'Kolkata',
      badge: 'none',
      streak: 6,
      lastActive: '4 hours ago',
      subjects: { physics: 87, chemistry: 91, mathematics: 91 }
    },
    {
      rank: 5,
      name: 'Vikash Singh',
      avatar: 'VS',
      score: 264,
      totalMarks: 300,
      percentage: 88.0,
      testsGiven: 41,
      avgScore: 84.7,
      improvement: '+2.1%',
      location: 'Chennai',
      badge: 'none',
      streak: 10,
      lastActive: '1 day ago',
      subjects: { physics: 86, chemistry: 88, mathematics: 90 }
    },
    {
      rank: 6,
      name: 'Ananya Rao',
      avatar: 'AR',
      score: 258,
      totalMarks: 300,
      percentage: 86.0,
      testsGiven: 35,
      avgScore: 83.1,
      improvement: '+1.5%',
      location: 'Hyderabad',
      badge: 'none',
      streak: 4,
      lastActive: '6 hours ago',
      subjects: { physics: 84, chemistry: 87, mathematics: 87 }
    },
    // Current user (John Doe)
    {
      rank: 247,
      name: 'John Doe',
      avatar: 'JD',
      score: 156,
      totalMarks: 300,
      percentage: 52.0,
      testsGiven: 24,
      avgScore: 48.3,
      improvement: '+8.2%',
      location: 'Kolkata',
      badge: 'none',
      streak: 3,
      lastActive: 'Online',
      subjects: { physics: 45, chemistry: 58, mathematics: 53 },
      isCurrentUser: true
    }
  ];

  // Top performers for different categories
  const topPerformers = {
    physics: { name: 'Arjun Sharma', score: 96, avatar: 'AS' },
    chemistry: { name: 'Priya Patel', score: 96, avatar: 'PP' },
    mathematics: { name: 'Arjun Sharma', score: 97, avatar: 'AS' },
    streak: { name: 'Arjun Sharma', streak: 15, avatar: 'AS' },
    improvement: { name: 'Rohit Kumar', improvement: '+3.2%', avatar: 'RK' }
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'gold': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'silver': return <Medal className="w-4 h-4 text-gray-400" />;
      case 'bronze': return <Award className="w-4 h-4 text-amber-600" />;
      default: return null;
    }
  };

  const getRankStyle = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  const filteredData = leaderboardData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentUser = leaderboardData.find(user => user.isCurrentUser);

  return (
    <div className="p-4 lg:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">See how you rank against other students</p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select 
            value={selectedExam} 
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-0"
          >
            <option value="JEE Main">JEE Main</option>
            <option value="JEE Advanced">JEE Advanced</option>
            <option value="WBJEE">WBJEE</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-0"
          >
            <option value="overall">Overall</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-gray-500" />
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-0"
          >
            <option value="overall">Overall Score</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="mathematics">Mathematics</option>
            <option value="improvement">Most Improved</option>
          </select>
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-0"
          />
        </div>
      </div>

      {/* Top Performers Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 mb-6 lg:mb-8">
        <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-yellow-500" />
            <span className="text-xs lg:text-sm font-medium text-gray-600">Physics King</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-bold">
              {topPerformers.physics.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{topPerformers.physics.name}</p>
              <p className="text-xs text-gray-600">{topPerformers.physics.score}% avg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-green-500" />
            <span className="text-xs lg:text-sm font-medium text-gray-600">Chemistry Pro</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-bold">
              {topPerformers.chemistry.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{topPerformers.chemistry.name}</p>
              <p className="text-xs text-gray-600">{topPerformers.chemistry.score}% avg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-500" />
            <span className="text-xs lg:text-sm font-medium text-gray-600">Math Genius</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-bold">
              {topPerformers.mathematics.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{topPerformers.mathematics.name}</p>
              <p className="text-xs text-gray-600">{topPerformers.mathematics.score}% avg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-orange-500" />
            <span className="text-xs lg:text-sm font-medium text-gray-600">Streak Master</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-bold">
              {topPerformers.streak.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{topPerformers.streak.name}</p>
              <p className="text-xs text-gray-600">{topPerformers.streak.streak} days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-xs lg:text-sm font-medium text-gray-600">Most Improved</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-bold">
              {topPerformers.improvement.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{topPerformers.improvement.name}</p>
              <p className="text-xs text-green-600">{topPerformers.improvement.improvement}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Position Card */}
      {currentUser && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 lg:p-6 text-white mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Current Position</h3>
              <div className="flex items-center gap-4">
                <div className="text-2xl lg:text-3xl font-bold">#{currentUser.rank}</div>
                <div>
                  <p className="text-indigo-100 text-sm">Score: {currentUser.score}/{currentUser.totalMarks}</p>
                  <p className="text-indigo-100 text-sm">Percentage: {currentUser.percentage}%</p>
                </div>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-indigo-100 text-sm">Improvement</p>
              <p className="text-xl lg:text-2xl font-bold text-green-300">{currentUser.improvement}</p>
              <p className="text-indigo-100 text-sm mt-2">Tests Given: {currentUser.testsGiven}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            {selectedExam} Leaderboard - {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
          </h3>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="block md:hidden">
          {filteredData.map((user) => (
            <div 
              key={user.rank} 
              className={`p-4 border-b border-gray-100 ${
                user.isCurrentUser ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankStyle(user.rank)}`}
                    >
                      {user.rank}
                    </div>
                    {getBadgeIcon(user.badge)}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className={`font-medium ${user.isCurrentUser ? 'text-indigo-900' : 'text-gray-900'}`}>
                      {user.name} {user.isCurrentUser && '(You)'}
                    </p>
                    <p className="text-sm text-gray-600">{user.location}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.lastActive === 'Online' ? 'bg-green-100 text-green-800' :
                  user.lastActive.includes('hour') ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {user.lastActive}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Score</p>
                  <p className="font-medium">{user.score}/{user.totalMarks}</p>
                </div>
                <div>
                  <p className="text-gray-600">Percentage</p>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${
                      user.percentage >= 90 ? 'text-green-600' :
                      user.percentage >= 70 ? 'text-blue-600' :
                      user.percentage >= 50 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {user.percentage}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">Tests</p>
                  <p className="font-medium">{user.testsGiven}</p>
                </div>
                <div>
                  <p className="text-gray-600">Improvement</p>
                  <div className="flex items-center gap-1">
                    {user.improvement.startsWith('+') ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      user.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {user.improvement}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Table Layout */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-4 lg:px-6 font-medium text-gray-700">Rank</th>
                  <th className="text-left py-4 px-4 lg:px-6 font-medium text-gray-700">Student</th>
                  <th className="text-left py-4 px-4 lg:px-6 font-medium text-gray-700">Score</th>
                  <th className="text-left py-4 px-4 lg:px-6 font-medium text-gray-700">Percentage</th>
                  <th className="text-left py-4 px-4 lg:px-6 font-medium text-gray-700 hidden lg:table-cell">Tests</th>
                  <th className="text-left py-4 px-4 lg:px-6 font-medium text-gray-700 hidden xl:table-cell">Avg Score</th>
                  <th className="text-left py-4 px-4 lg:px-6 font-medium text-gray-700">Improvement</th>
                  <th className="text-left py-4 px-4 lg:px-6 font-medium text-gray-700 hidden lg:table-cell">Streak</th>
                  <th className="text-left py-4 px-4 lg:px-6 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user) => (
                  <tr 
                    key={user.rank} 
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      user.isCurrentUser ? 'bg-indigo-50 hover:bg-indigo-100' : ''
                    }`}
                  >
                    <td className="py-4 px-4 lg:px-6">
                      <div className="flex items-center gap-2">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankStyle(user.rank)}`}
                        >
                          {user.rank}
                        </div>
                        {getBadgeIcon(user.badge)}
                      </div>
                    </td>
                    <td className="py-4 px-4 lg:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className={`font-medium ${user.isCurrentUser ? 'text-indigo-900' : 'text-gray-900'}`}>
                            {user.name} {user.isCurrentUser && '(You)'}
                          </p>
                          <p className="text-sm text-gray-600">{user.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 lg:px-6">
                      <div className="font-medium text-gray-900">
                        {user.score}/{user.totalMarks}
                      </div>
                    </td>
                    <td className="py-4 px-4 lg:px-6">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${
                          user.percentage >= 90 ? 'text-green-600' :
                          user.percentage >= 70 ? 'text-blue-600' :
                          user.percentage >= 50 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {user.percentage}%
                        </span>
                        <div className="w-16 lg:w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              user.percentage >= 90 ? 'bg-green-500' :
                              user.percentage >= 70 ? 'bg-blue-500' :
                              user.percentage >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${user.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 lg:px-6 text-gray-600 hidden lg:table-cell">
                      {user.testsGiven}
                    </td>
                    <td className="py-4 px-4 lg:px-6 font-medium text-gray-900 hidden xl:table-cell">
                      {user.avgScore}%
                    </td>
                    <td className="py-4 px-4 lg:px-6">
                      <div className="flex items-center gap-1">
                        {user.improvement.startsWith('+') ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          user.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {user.improvement}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 lg:px-6 hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-900">{user.streak}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 lg:px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        user.lastActive === 'Online' ? 'bg-green-100 text-green-800' :
                        user.lastActive.includes('hour') || user.lastActive.includes('min') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {user.lastActive}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 lg:p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Showing {filteredData.length} students</span>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;