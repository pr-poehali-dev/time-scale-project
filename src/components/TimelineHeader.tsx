import React from "react";
import Icon from "@/components/ui/icon";
import { TimelineMode } from "../types/timeline";

interface TimelineHeaderProps {
  activeMode: TimelineMode;
  onModeChange: (mode: TimelineMode) => void;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  activeMode,
  onModeChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-montserrat">
          Временные шкалы
        </h1>
        <p className="text-slate-600 mt-1">
          Управляйте расписанием и процессами в едином интерфейсе
        </p>
      </div>

      <div className="flex bg-white rounded-lg shadow-sm border border-slate-200 p-1">
        <button
          onClick={() => onModeChange("schedule")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
            activeMode === "schedule"
              ? "bg-purple-100 text-purple-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Icon name="Calendar" size={18} />
          Расписание
        </button>
        <button
          onClick={() => onModeChange("data")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
            activeMode === "data"
              ? "bg-blue-100 text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Icon name="BarChart3" size={18} />
          Данные
        </button>
      </div>
    </div>
  );
};
