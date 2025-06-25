import React, { forwardRef, useCallback, useRef, useState } from "react";
import { TimelineObject, TimeRange, TimelineMode } from "../types/timeline";

interface TimelineCanvasProps {
  objects: TimelineObject[];
  selectedObject: string | null;
  timeRange: TimeRange;
  zoom: number;
  mode: TimelineMode;
  onSelectObject: (id: string | null) => void;
  onUpdateObject: (id: string, updates: Partial<TimelineObject>) => void;
}

export const TimelineCanvas = forwardRef<HTMLDivElement, TimelineCanvasProps>(
  (
    {
      objects,
      selectedObject,
      timeRange,
      zoom,
      mode,
      onSelectObject,
      onUpdateObject,
    },
    ref,
  ) => {
    const [draggedObject, setDraggedObject] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);

    const timeScale = (timeRange.end - timeRange.start) * zoom;
    const hourWidth = 800 / timeScale;

    const getTimelineScale = () => {
      const scale = [];
      for (let i = timeRange.start; i <= timeRange.end; i++) {
        scale.push(i);
      }
      return scale;
    };

    const handleMouseDown = useCallback(
      (e: React.MouseEvent, objectId: string) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const object = objects.find((obj) => obj.id === objectId);
        if (!object) return;

        setDraggedObject(objectId);
        setDragOffset({
          x: e.clientX - rect.left - object.position.x,
          y: e.clientY - rect.top - object.position.y,
        });
        onSelectObject(objectId);
      },
      [objects, onSelectObject],
    );

    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        if (!draggedObject || !canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const newX = e.clientX - rect.left - dragOffset.x;
        const newY = e.clientY - rect.top - dragOffset.y;

        onUpdateObject(draggedObject, {
          position: { x: Math.max(0, newX), y: Math.max(0, newY) },
        });
      },
      [draggedObject, dragOffset, onUpdateObject],
    );

    const handleMouseUp = useCallback(() => {
      setDraggedObject(null);
    }, []);

    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 p-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>
              {mode === "schedule"
                ? "Календарные события"
                : "Процессы и данные"}
            </span>
            <span>{objects.length} объектов</span>
          </div>
        </div>

        <div
          ref={canvasRef}
          className="relative h-96 bg-slate-50 overflow-auto"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Time scale */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-white border-b border-slate-200 flex">
            {getTimelineScale().map((time) => (
              <div
                key={time}
                className="flex-shrink-0 border-r border-slate-200 px-2 py-2 text-xs text-slate-600"
                style={{ width: `${hourWidth}px` }}
              >
                {mode === "schedule" ? `${time}:00` : `Этап ${time}`}
              </div>
            ))}
          </div>

          {/* Timeline objects */}
          {objects.map((object) => (
            <div
              key={object.id}
              className={`absolute cursor-move rounded-lg shadow-sm border-2 transition-all ${
                selectedObject === object.id
                  ? "border-purple-400 shadow-lg"
                  : "border-transparent hover:shadow-md"
              }`}
              style={{
                left: `${object.position.x}px`,
                top: `${object.position.y + 48}px`,
                width: `${object.duration * hourWidth}px`,
                minWidth: "80px",
                height: "40px",
                backgroundColor: object.color,
                opacity: draggedObject === object.id ? 0.8 : 1,
              }}
              onMouseDown={(e) => handleMouseDown(e, object.id)}
            >
              <div className="p-2 text-white text-xs font-medium truncate">
                {object.name}
              </div>
            </div>
          ))}

          {/* Grid lines */}
          <div className="absolute inset-0 pointer-events-none">
            {getTimelineScale().map((time) => (
              <div
                key={time}
                className="absolute top-12 bottom-0 border-l border-slate-200 opacity-30"
                style={{ left: `${(time - timeRange.start) * hourWidth}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
);

TimelineCanvas.displayName = "TimelineCanvas";
