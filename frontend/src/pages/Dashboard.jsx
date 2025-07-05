import React from 'react';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Clock, 
  Award, 
  Calendar, 
  PlayCircle, 
  FileText, 
  Users, 
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  Zap,
  Brain,
  CheckCircle
} from 'lucide-react';

export default function MockIQDashboard() {
  // const [activeTab, setActiveTab] = useState('overview');

  const mockData = {
    student: {
      name: "Rahul Verma",
      class: "Class 12 - Science",
      targetExam: "JEE Main 2025",
      streak: 15,
      rank: 342
    },
    stats: {
      testsCompleted: 47,
      avgScore: 76,
      studyTime: 145, // hours this month
      questionsAttempted: 2340
    },
    recentTests: [
      { name: "JEE Main Physics Mock #15", score: 82, date: "2 days ago", status: "completed" },
      { name: "NEET Chemistry Practice", score: 78, date: "4 days ago", status: "completed" },
      { name: "Math Integration Test", score: 85, date: "6 days ago", status: "completed" }
    ],
    upcomingTests: [
      { name: "JEE Main Full Test #16", date: "Today, 4:00 PM", difficulty: "High" },
      { name: "NEET Biology Mock", date: "Tomorrow, 2:00 PM", difficulty: "Medium" },
      { name: "Physics Waves Test", date: "Jun 15, 10:00 AM", difficulty: "Medium" }
    ]
  };

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center ${color}`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color.includes('green') ? 'bg-green-100' : color.includes('blue') ? 'bg-blue-100' : color.includes('purple') ? 'bg-purple-100' : 'bg-orange-100'}`}>
          <Icon className={`h-6 w-6 ${color.includes('green') ? 'text-green-600' : color.includes('blue') ? 'text-blue-600' : color.includes('purple') ? 'text-purple-600' : 'text-orange-600'}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {mockData.student.name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-600 mt-2">Ready to crack your Dream College? Let's continue your preparation journey.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Target}
            title="Tests Completed"
            value={mockData.stats.testsCompleted}
            change="+3 this week"
            color="text-green-600"
          />
          <StatCard
            icon={TrendingUp}
            title="Average Score"
            value={`${mockData.stats.avgScore}%`}
            change="+5% improvement"
            color="text-blue-600"
          />
          <StatCard
            icon={Clock}
            title="Study Time"
            value={`${mockData.stats.studyTime}h`}
            change="This month"
            color="text-purple-600"
          />
          <StatCard
            icon={Award}
            title="Current Rank"
            value={`#${mockData.student.rank}`}
            change="↑ 28 positions"
            color="text-orange-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <PlayCircle className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Start Test</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                  <BookOpen className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Study Notes</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <Brain className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Practice</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                  <Users className="h-8 w-8 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Leaderboard</span>
                </button>
              </div>
            </div>

            {/* Recent Test Results */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Test Results</h2>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
              </div>
              <div className="space-y-4">
                {mockData.recentTests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{test.name}</h3>
                        <p className="text-sm text-gray-500">{test.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        test.score >= 80 ? 'bg-green-100 text-green-800' : 
                        test.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {test.score}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Study Streak */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Study Streak</h2>
                <Zap className="h-6 w-6" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{mockData.student.streak}</div>
                <p className="text-orange-100">Days in a row!</p>
                <p className="text-sm text-orange-100 mt-2">Keep it up! You're doing great 🔥</p>
              </div>
            </div>

            {/* Upcoming Tests */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tests</h2>
              <div className="space-y-3">
                {mockData.upcomingTests.map((test, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{test.name}</h3>
                      <p className="text-xs text-gray-500">{test.date}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        test.difficulty === 'High' ? 'bg-red-100 text-red-800' :
                        test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {test.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
  );
}