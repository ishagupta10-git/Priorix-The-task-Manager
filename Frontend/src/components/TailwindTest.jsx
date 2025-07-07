import React from 'react';

const TailwindTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tailwind CSS v4 Test
          </h1>
          <p className="text-lg text-gray-600">
            Testing all Tailwind CSS features and custom theme
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1 - Primary Color */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-primary rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Primary Color</h3>
            <p className="text-gray-600">Using custom primary color from theme</p>
          </div>

          {/* Card 2 - Responsive Design */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Responsive</h3>
            <p className="text-gray-600">Grid adapts to screen size</p>
          </div>

          {/* Card 3 - Animations */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4 flex items-center justify-center animate-pulse">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Animations</h3>
            <p className="text-gray-600">Hover effects and animations</p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Button Styles</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Primary Button
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200">
              Secondary Button
            </button>
            <button className="border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200">
              Outline Button
            </button>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200">
              Gradient Button
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Form Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 resize-none"
                placeholder="Enter your message"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Typography (Poppins Font)</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">Heading 1 - Bold</h1>
            <h2 className="text-3xl font-semibold text-gray-700">Heading 2 - Semibold</h2>
            <h3 className="text-2xl font-medium text-gray-600">Heading 3 - Medium</h3>
            <p className="text-lg text-gray-600">
              This is a paragraph with regular weight. The font family is set to Poppins 
              through our custom theme configuration.
            </p>
            <p className="text-sm text-gray-500">
              Small text with light color for secondary information.
            </p>
          </div>
        </div>

        {/* Custom Breakpoint Test */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Custom Breakpoint (3xl: 1920px)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <p className="text-sm font-medium">1 col on mobile</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <p className="text-sm font-medium">2 cols on md</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <p className="text-sm font-medium">3 cols on lg</p>
            </div>
            <div className="bg-pink-100 p-4 rounded-lg text-center">
              <p className="text-sm font-medium">4 cols on 3xl</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest;
