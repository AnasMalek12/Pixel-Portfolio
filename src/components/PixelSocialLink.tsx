
import React from 'react';
import { SocialLink } from '@/config/portfolioConfig';
import { Mail, Linkedin, Github, Instagram, Twitter, FileUser } from 'lucide-react';

interface PixelSocialLinkProps {
  social: SocialLink;
}

const PixelSocialLink: React.FC<PixelSocialLinkProps> = ({ social }) => {
  const getIcon = () => {
    switch (social.platform) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'behance':
        return <div className="text-xs font-bold">Be</div>;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <a 
      href={social.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 mb-3 hover:text-pixel-cyan transition-colors"
    >
      <div className="w-8 h-8 rounded-full bg-pixel-pink flex items-center justify-center text-white">
        {getIcon()}
      </div>
      <span className="font-mono text-sm">{social.username}</span>
    </a>
  );
};

export default PixelSocialLink;
