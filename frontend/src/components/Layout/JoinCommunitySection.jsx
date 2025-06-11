import React from "react";

export default function JoinCommunitySection() {
  return (
    <section className="mt-20 mb-16">
      <div className="bg-gray-900 text-white rounded-3xl p-12 max-w-6xl mx-auto relative overflow-hidden">
        <div className="text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Join The Community</h2>
          <p className="text-gray-300 mb-8">At MockIQ, we believe that learning is a collaborative process.</p>
          
          <div className="flex justify-center">
            <div className="flex bg-white rounded-full overflow-hidden max-w-md w-full">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-3 text-gray-900 outline-none"
              />
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full m-1">Subscribe →</button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 text-gray-600">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
          </svg>
        </div>
        <div className="absolute top-4 right-4 text-gray-600">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
          </svg>
        </div>
        <div className="absolute bottom-4 left-8 text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
          </svg>
        </div>
      </div>
    </section>
  );
}