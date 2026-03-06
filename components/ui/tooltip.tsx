"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({
  children,
  className = "",
  sideOffset = 6,
  ...props
}: TooltipPrimitive.TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={`
          z-50 max-w-xs rounded-lg border border-neutral-200 bg-white
          dark:border-neutral-700 dark:bg-neutral-800
          px-3 py-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300
          shadow-md
          animate-in fade-in-0 zoom-in-95
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          data-[side=bottom]:slide-in-from-top-2
          data-[side=top]:slide-in-from-bottom-2
          ${className}
        `}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
