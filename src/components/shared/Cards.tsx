import React from 'react';
import { ServiceIcons, IconName } from '../ui/Icons';
import { formatPrice } from '../../config/siteConfig';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  startingPrice: number;
  icon: IconName;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  startingPrice,
  icon,
  className = ""
}) => {
  const IconComponent = ServiceIcons[icon];
  
  return (
    <div className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ${className}`}>
      <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        <IconComponent className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
      <div className="text-indigo-600 dark:text-indigo-400 font-semibold">
        Starting at {formatPrice(startingPrice)}
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: IconName;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className = ""
}) => {
  const IconComponent = ServiceIcons[icon];
  
  return (
    <div className={`text-center ${className}`}>
      <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <IconComponent className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

interface IndustryCardProps {
  title: string;
  description: string;
  icon: IconName;
  detailed?: boolean;
  className?: string;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({
  title,
  description,
  icon,
  detailed = false,
  className = ""
}) => {
  const IconComponent = ServiceIcons[icon];
  
  if (detailed) {
    return (
      <div className={`text-center ${className}`}>
        <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <IconComponent className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    );
  }

  return (
    <div className={`text-gray-700 dark:text-gray-300 ${className}`}>
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-sm">{description}</div>
    </div>
  );
};

interface PackageCardProps {
  name: string;
  priceRange: { min: number; max: number | null };
  features: string[];
  popular?: boolean;
  className?: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  name,
  priceRange,
  features,
  popular = false,
  className = ""
}) => {
  const formatPriceRange = (min: number, max: number | null): string => {
    if (max === null) {
      return `${formatPrice(min)}+`;
    }
    return `${formatPrice(min)} - ${formatPrice(max)}`;
  };

  return (
    <div className={`text-center p-6 bg-white dark:bg-gray-800 rounded-lg ${popular ? 'border-2 border-indigo-500' : ''} ${className}`}>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{name}</h4>
      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
        {formatPriceRange(priceRange.min, priceRange.max)}
      </div>
      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
      {popular && (
        <div className="mt-4 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Most Popular</div>
      )}
    </div>
  );
};
