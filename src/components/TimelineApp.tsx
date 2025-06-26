import React, { useState, useRef, useCallback } from "react";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineControls } from "./TimelineControls";
import { TimelineCanvas } from "./TimelineCanvas";
import { ObjectPanel } from "./ObjectPanel";
import { TimelineObject, TimelineFilters } from "../types/timeline";

export interface TimelineAppProps {}

const TimelineApp: React.FC<TimelineAppProps> = () => {
  const [activeMode, setActiveMode] = useState<"schedule" | "data">("schedule");
  const [objects, setObjects] = useState<TimelineObject[]>([
    // Примеры пассажиров (левая сторона)
    {
      id: "passenger-1",
      type: "passenger",
      name: "Анна",
      startTime: 9,
      duration: 2,
      color: "#3B82F6",
      position: { x: 50, y: 60 },
    },
    {
      id: "passenger-2",
      type: "passenger",
      name: "Михаил",
      startTime: 11,
      duration: 3,
      color: "#1E40AF",
      position: { x: 180, y: 180 },
    },
    {
      id: "passenger-3",
      type: "passenger",
      name: "Елена",
      startTime: 14,
      duration: 1.5,
      color: "#60A5FA",
      position: { x: 120, y: 360 },
    },
    // Примеры машин (правая сторона)
    {
      id: "vehicle-1",
      type: "vehicle",
      name: "Такси №1",
      startTime: 10,
      duration: 4,
      color: "#10B981",
      position: { x: window.innerWidth / 2 + 80, y: 120 },
    },
    {
      id: "vehicle-2",
      type: "vehicle",
      name: "Автобус",
      startTime: 13,
      duration: 2,
      color: "#059669",
      position: { x: window.innerWidth / 2 + 200, y: 300 },
    },
    {
      id: "vehicle-3",
      type: "vehicle",
      name: "Такси №2",
      startTime: 16,
      duration: 3,
      color: "#34D399",
      position: { x: window.innerWidth / 2 + 50, y: 480 },
    },
  ]);
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
