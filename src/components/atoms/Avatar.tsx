interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

export const Avatar = ({ src, alt, className = "" }: AvatarProps) => {
  return (
    <div className={`rounded-full overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};
