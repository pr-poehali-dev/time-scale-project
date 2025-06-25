import React from "react";
import Icon from "@/components/ui/icon";
import { TimeRange, TimelineMode } from "../types/timeline";

interface TimelineControlsProps {
  timeRange: TimeRange;
  zoom: number;
  onTimeRangeChange: (range: TimeRange) => void;
  onZoomChange: (zoom: number) => void;
  mode: TimelineMode;
}

export const TimelineControls: React.FC<TimelineControlsProps> = ({
  timeRange,
  zoom,
  onTimeRangeChange,
  onZoomChange,
  mode,
}) => {
  const timeUnits = mode === "schedule" ? "часы" : "этапы";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              {timeRange.start}-{timeRange.end} {timeUnits}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onTimeRangeChange({
                  start: Math.max(0, timeRange.start - 4),
                  end: Math.max(4, timeRange.end - 4),
                })
              }
              className="p-1 hover:bg-slate-100 rounded"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={() =>
                onTimeRangeChange({
                  start: timeRange.start + 4,
                  end: timeRange.end + 4,
                })
              }
              className="p-1 hover:bg-slate-100 rounded"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Icon name="ZoomOut" size={16} className="text-slate-500" />
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => onZoomChange(parseFloat(e.target.value))}
            className="w-20"
          />
          <Icon name="ZoomIn" size={16} className="text-slate-500" />
          <span className="text-sm text-slate-600 ml-2">
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
