import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const Bento = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn('grid grid-cols-12 gap-4 md:gap-8', className)}>{children}</div>;
};

const BentoCard = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        'bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300',
        className
      )}
    >
      {children}
    </div>
  );
};

export { Bento, BentoCard };
