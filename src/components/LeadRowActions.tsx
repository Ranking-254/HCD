// src/components/LeadRowActions.tsx
"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus, deleteLead } from "@/app/actions/leadActions";
import { LeadStatus } from "@prisma/client";
import { Trash2, CheckCircle2, XCircle, Clock } from "lucide-react";

interface LeadRowActionsProps {
  id: string;
  initialStatus: LeadStatus;
}

export function LeadRowActions({ id, initialStatus }: LeadRowActionsProps) {
  const [status, setStatus] = useState<LeadStatus>(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: LeadStatus) => {
    setStatus(newStatus);
    startTransition(async () => {
      await updateLeadStatus(id, newStatus);
    });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to permanently delete this lead?"))
      return;
    startTransition(async () => {
      await deleteLead(id);
    });
  };

  const statusStyles: Record<LeadStatus, string> = {
    NEW: "bg-blue-50 text-blue-700 border-blue-200",
    CONTACTED: "bg-amber-50 text-amber-700 border-amber-200",
    WON: "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold",
    LOST: "bg-slate-100 text-slate-500 border-slate-300",
  };

  return (
    <div className="flex items-center gap-2">
      {/* Status Selector */}
      <select
        value={status}
        disabled={isPending}
        onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
        className={`rounded border px-2 py-1 text-xs uppercase font-medium focus:outline-none transition ${statusStyles[status]}`}
      >
        <option value="NEW">New</option>
        <option value="CONTACTED">In Progress</option>
        <option value="WON">Closed (Won)</option>
        <option value="LOST">Unsuccessful (Lost)</option>
      </select>

      {/* Quick Delete */}
      <button
        type="button"
        disabled={isPending}
        onClick={handleDelete}
        title="Delete lead"
        className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
