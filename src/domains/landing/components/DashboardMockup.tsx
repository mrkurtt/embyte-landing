"use client";

import { motion } from "motion/react";
import { BarChart3, QrCode, Users } from "lucide-react";

export function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      className="gradient-border rounded-2xl bg-surface/80 p-1 shadow-xl shadow-black/40 backdrop-blur-sm"
    >
      <div className="rounded-[calc(1rem-1px)] bg-[#0f1520] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Live Dashboard
            </p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">
              Spring Gala 2026
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-3">
          {[
            { icon: Users, label: "Checked In", value: "1,247" },
            { icon: QrCode, label: "Scans/min", value: "84" },
            { icon: BarChart3, label: "Capacity", value: "78%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-white/[0.03] p-3"
            >
              <stat.icon className="mb-2 h-4 w-4 text-[#ff7e5f]" />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-4 rounded-xl border border-border bg-white/[0.03] p-4">
          <p className="mb-3 text-xs font-medium text-muted">
            Attendance — last 2 hours
          </p>
          <div className="flex h-20 items-end gap-1.5">
            {[35, 52, 48, 70, 65, 88, 92, 78, 84, 95, 88, 100].map(
              (height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-brand-gradient opacity-80"
                  style={{ height: `${height}%` }}
                />
              ),
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.03] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient">
            <QrCode className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">
              Gate Scanner Active
            </p>
            <p className="text-[10px] text-muted">North Entrance · Staff Web</p>
          </div>
          <span className="text-xs font-medium text-emerald-400">Online</span>
        </div>
      </div>
    </motion.div>
  );
}
