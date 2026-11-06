'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
}

export function Accordion({
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const [uncontrolledItems, setUncontrolledItems] = React.useState<string[]>(() => {
    if (Array.isArray(defaultValue)) return defaultValue;
    if (typeof defaultValue === 'string') return [defaultValue];
    return [];
  });

  const isControlled = controlledValue !== undefined;
  const currentItems = React.useMemo(() => {
    if (!isControlled) return uncontrolledItems;
    if (Array.isArray(controlledValue)) return controlledValue;
    if (typeof controlledValue === 'string') return [controlledValue];
    return [];
  }, [isControlled, controlledValue, uncontrolledItems]);

  const toggleItem = React.useCallback(
    (itemValue: string) => {
      let nextItems: string[];
      if (type === 'single') {
        nextItems = currentItems.includes(itemValue) ? [] : [itemValue];
      } else {
        nextItems = currentItems.includes(itemValue)
          ? currentItems.filter((i) => i !== itemValue)
          : [...currentItems, itemValue];
      }

      if (!isControlled) {
        setUncontrolledItems(nextItems);
      }
      onValueChange?.(type === 'single' ? (nextItems[0] || '') : nextItems);
    },
    [currentItems, isControlled, onValueChange, type]
  );

  return (
    <AccordionContext.Provider value={{ openItems: currentItems, toggleItem, type }}>
      <div className={cn('divide-y divide-[#E7E5E0] border-y border-[#E7E5E0]', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItemContext = React.createContext<{ value: string }>({ value: '' });

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div ref={ref} className={cn('transition-colors', className)} {...props}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);
  if (!context) throw new Error('AccordionTrigger must be used within Accordion');

  const isOpen = context.openItems.includes(item.value);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => context.toggleItem(item.value)}
      aria-expanded={isOpen}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-serif-luxury text-lg font-medium text-[#1C1A17] transition-all hover:text-[#9B7A4F] cursor-pointer group',
        isOpen && 'text-[#9B7A4F]',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          'size-4 shrink-0 text-[#8C8880] transition-transform duration-200 group-hover:text-[#1C1A17]',
          isOpen && 'rotate-180 text-[#9B7A4F]'
        )}
      />
    </button>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);
  if (!context) throw new Error('AccordionContent must be used within Accordion');

  const isOpen = context.openItems.includes(item.value);
  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'pb-4 pt-0 text-sm leading-relaxed text-[#5E5A54] animate-in fade-in-50 duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AccordionContent.displayName = 'AccordionContent';
