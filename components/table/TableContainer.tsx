"use client";

import { memo, ReactNode } from "react";

interface TableContainerProps {
  children: ReactNode;
  header?: ReactNode;
}

export const TableContainer = memo(function TableContainer({
  children,
  header,
}: TableContainerProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
      {header && (
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
          {header}
        </div>
      )}
      <div className="overflow-x-auto">
        {children}
      </div>
    </div>
  );
});
