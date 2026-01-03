"use client";

import { memo, ReactNode } from "react";

interface TokenCellProps {
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
}

export const TokenCell = memo(function TokenCell({
  children,
  align = "left",
  className = "",
}: TokenCellProps) {
  return (
    <td
      className={[
        "px-4 py-4 sm:px-6",
        align === "right" ? "text-right" : "",
        className,
      ].join(" ")}
    >
      {children}
    </td>
  );
});
