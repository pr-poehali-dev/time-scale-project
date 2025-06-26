import React from "react";
import Icon from "@/components/ui/icon";
import { TimelineMode, TimelineFilters } from "../types/timeline";

interface TimelineHeaderProps {
  activeMode: TimelineMode;
  filters: TimelineFilters;
  onModeChange: (mode: TimelineMode) => void;
  onFiltersChange: (filters: TimelineFilters) => void;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  activeMode,
  filters,
  onModeChange,
  onFiltersChange,
}) => {
  return (
    <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            onFiltersChange({
              ...filters,
              showPassengers: !filters.showPassengers,
            })
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border transition-all ${
            filters.showPassengers
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Icon name="Users" size={18} />
          Пассажиры
        </button>

        <button
          onClick={() =>
            onFiltersChange({ ...filters, showVehicles: !filters.showVehicles })
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border transition-all ${
            filters.showVehicles
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Icon name="Car" size={18} />
          Машины
        </button>
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
