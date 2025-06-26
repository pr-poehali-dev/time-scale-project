import React, { useState, useRef, useCallback } from "react";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineControls } from "./TimelineControls";
import { TimelineCanvas } from "./TimelineCanvas";
import { ObjectPanel } from "./ObjectPanel";
import { TimelineObject, TimelineFilters } from "../types/timeline";

export interface TimelineAppProps {}

const TimelineApp: React.FC<TimelineAppProps> = () => {
  const [activeMode, setActiveMode] = useState<"schedule" | "data">("schedule");
  const [objects, setObjects] = useState<TimelineObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState({ start: 8, end: 20 });
  const [zoom, setZoom] = useState(1);
  const [filters, setFilters] = useState<TimelineFilters>({
    showPassengers: true,
    showVehicles: true,
  });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCreateObject = useCallback(
    (type: "passenger" | "vehicle", name: string) => {
      const newObject: TimelineObject = {
        id: Date.now().toString(),
        type,
        name,
        startTime: new Date().getHours(),
        duration: 2,
        color: type === "passenger" ? "#3B82F6" : "#10B981",
        position: {
          x: type === "passenger" ? 100 : window.innerWidth / 2 + 100,
          y: 100,
        },
      };
      setObjects((prev) => [...prev, newObject]);
    },
    [],
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
      <TimelineHeader
        activeMode={activeMode}
        filters={filters}
        onModeChange={setActiveMode}
        onFiltersChange={setFilters}
      />

      <TimelineCanvas
        objects={objects}
        selectedObject={selectedObject}
        timeRange={timeRange}
        zoom={zoom}
        mode={activeMode}
        filters={filters}
        onSelectObject={setSelectedObject}
        onUpdateObject={handleUpdateObject}
      />

      <ObjectPanel
        mode={activeMode}
        selectedObject={selectedObject}
        objects={objects}
        onCreateObject={handleCreateObject}
        onUpdateObject={handleUpdateObject}
        onDeleteObject={handleDeleteObject}
      />
    </div>
  );
};

export default TimelineApp;
