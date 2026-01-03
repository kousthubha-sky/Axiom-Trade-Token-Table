"use client";

import { memo } from "react";

export const TokenSkeletonRow = memo(function TokenSkeletonRow() {
  return (
    <tr className="border-t border-white/5">
      <td className="px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03] shimmer" />
          <div className="min-w-0 flex-1">
            <div className="h-4 w-[180px] rounded-md bg-white/[0.03] shimmer" />
            <div className="mt-2 h-3 w-[240px] rounded-md bg-white/[0.03] shimmer" />
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-right sm:px-6">
        <div className="ml-auto h-4 w-[90px] rounded-md bg-white/[0.03] shimmer" />
        <div className="ml-auto mt-2 h-3 w-[70px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="px-4 py-4 sm:px-6">
        <div className="ml-auto h-7 w-[72px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="px-4 py-4 sm:px-6">
        <div className="ml-auto h-7 w-[72px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="hidden px-4 py-4 sm:table-cell sm:px-6">
        <div className="ml-auto h-7 w-[72px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="px-4 py-4 text-right sm:px-6">
        <div className="ml-auto h-4 w-[90px] rounded-md bg-white/[0.03] shimmer" />
        <div className="ml-auto mt-2 h-3 w-[70px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="hidden px-4 py-4 text-right md:table-cell md:px-6">
        <div className="ml-auto h-4 w-[90px] rounded-md bg-white/[0.03] shimmer" />
        <div className="ml-auto mt-2 h-3 w-[70px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="hidden px-4 py-4 text-right lg:table-cell lg:px-6">
        <div className="ml-auto h-4 w-[90px] rounded-md bg-white/[0.03] shimmer" />
        <div className="ml-auto mt-2 h-3 w-[70px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="hidden px-4 py-4 text-right xl:table-cell xl:px-6">
        <div className="ml-auto h-4 w-[90px] rounded-md bg-white/[0.03] shimmer" />
        <div className="ml-auto mt-2 h-3 w-[70px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="hidden px-4 py-4 text-right xl:table-cell xl:px-6">
        <div className="ml-auto h-7 w-[120px] rounded-md bg-white/[0.03] shimmer" />
      </td>
    </tr>
  );
});
