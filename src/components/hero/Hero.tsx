'use client'

interface HeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function Hero({ 
  title = "Transform Your Ideas Into Compelling Content",
  subtitle = "Professional writing services that engage your audience and drive results",
  buttonText = "Get Started Today",
  onButtonClick
}: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-safe mb-6">
          {title}
        </h1>
        
        <p className="text-xl text-safe-muted mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>
        
        <button
          onClick={onButtonClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          {buttonText}
        </button>
      </div>
    </section>
  )
}
