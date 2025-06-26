import React, { useState, useRef, useCallback } from "react";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineControls } from "./TimelineControls";
import { TimelineCanvas } from "./TimelineCanvas";
import { ObjectPanel } from "./ObjectPanel";
import { TimelineObject } from "../types/timeline";

export interface TimelineAppProps {}

const TimelineApp: React.FC<TimelineAppProps> = () => {
  const [activeMode, setActiveMode] = useState<"schedule" | "data">("schedule");
  const [objects, setObjects] = useState<TimelineObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState({ start: 0, end: 24 });
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCreateObject = useCallback(
    (type: "event" | "process", name: string) => {
      const newObject: TimelineObject = {
        id: Date.now().toString(),
        type,
        name,
        startTime: timeRange.start + 2,
        duration: type === "event" ? 1 : 3,
        color: type === "event" ? "#9b87f5" : "#0EA5E9",
        position: { x: 100, y: 60 },
      };
      setObjects((prev) => [...prev, newObject]);
    },
    [timeRange.start],
  );

  const handleUpdateObject = useCallback(
    (id: string, updates: Partial<TimelineObject>) => {
      setObjects((prev) =>
        prev.map((obj) => (obj.id === id ? { ...obj, ...updates } : obj)),
      );
    },
    [],
  );

  const handleDeleteObject = useCallback((id: string) => {
    setObjects((prev) => prev.filter((obj) => obj.id !== id));
    setSelectedObject(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        <TimelineHeader activeMode={activeMode} onModeChange={setActiveMode} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <TimelineControls
              timeRange={timeRange}
              zoom={zoom}
              onTimeRangeChange={setTimeRange}
              onZoomChange={setZoom}
              mode={activeMode}
            />

            <TimelineCanvas
              ref={canvasRef}
              objects={objects}
              selectedObject={selectedObject}
              timeRange={timeRange}
              zoom={zoom}
              mode={activeMode}
              onSelectObject={setSelectedObject}
              onUpdateObject={handleUpdateObject}
            />
          </div>

          <div className="lg:col-span-1">
            <ObjectPanel
              mode={activeMode}
              selectedObject={selectedObject}
              objects={objects}
              onCreateObject={handleCreateObject}
              onUpdateObject={handleUpdateObject}
              onDeleteObject={handleDeleteObject}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineApp;
