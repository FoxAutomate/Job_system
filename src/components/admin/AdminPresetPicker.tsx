"use client";

import { Label } from "@/components/ui/label";
import type { AdminPreset } from "@/lib/admin/presets";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  /** Shown above the native select */
  label: string;
  /** First option label (no selection) */
  placeholder: string;
  options: AdminPreset[];
  /** Called when user picks a row; use to set linked input value */
  onPick: (value: string) => void;
  className?: string;
};

export function AdminPresetPicker({
  id,
  label,
  placeholder,
  options,
  onPick,
  className,
}: Props) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id} className="text-xs font-normal text-neutral-500">
        {label}
      </Label>
      <select
        id={id}
        className="flex h-9 w-full rounded-md border border-neutral-200 bg-white px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
        defaultValue=""
        onChange={(e) => {
          const v = e.target.value;
          if (v) onPick(v);
          e.target.selectedIndex = 0;
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
