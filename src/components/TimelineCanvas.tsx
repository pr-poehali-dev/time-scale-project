import React, { forwardRef, useCallback, useRef, useState } from "react";
import {
  TimelineObject,
  TimeRange,
  TimelineMode,
  TimelineFilters,
} from "../types/timeline";
import Icon from "@/components/ui/icon";

interface TimelineCanvasProps {
  objects: TimelineObject[];
  selectedObject: string | null;
  timeRange: TimeRange;
  zoom: number;
  mode: TimelineMode;
  filters: TimelineFilters;
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
      filters,
      onSelectObject,
      onUpdateObject,
    },
    ref,
  ) => {
    const [draggedObject, setDraggedObject] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);

    const timeToY = (time: number) => {
      const totalHours = timeRange.end - timeRange.start;
      return (
        ((time - timeRange.start) / totalHours) * (window.innerHeight - 200)
      );
    };

    const yToTime = (y: number) => {
      const totalHours = timeRange.end - timeRange.start;
      return timeRange.start + (y / (window.innerHeight - 200)) * totalHours;
    };

    const getTimeLabels = () => {
      const labels = [];
      for (let i = timeRange.start; i <= timeRange.end; i += 2) {
        labels.push(i);
      }
      return labels;
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

        // Определяем зону (пассажиры или машины)
        const isPassengerZone = newX < rect.width / 2;
        const constrainedX = isPassengerZone
          ? 120 // Фиксированная позиция для пассажиров
          : rect.width - 180; // Фиксированная позиция для машин

        const constrainedY = Math.max(0, Math.min(newY, rect.height - 60));
        const newTime = yToTime(constrainedY);

        onUpdateObject(draggedObject, {
          position: { x: constrainedX, y: constrainedY },
          startTime: newTime,
          type: isPassengerZone ? "passenger" : "vehicle",
        });
      },
      [draggedObject, dragOffset, onUpdateObject, timeRange],
    );

    const handleMouseUp = useCallback(() => {
      setDraggedObject(null);
    }, []);

    return (
      <div
        ref={canvasRef}
        className="fixed inset-0 bg-slate-50 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Центральная временная шкала */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-400 transform -translate-x-0.5 z-10" />

        {/* Временные метки в центре */}
        <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-8 z-20">
          {/* Метка СЕЙЧАС на самом верху */}
          <div
            className="absolute flex items-center justify-center"
            style={{ top: "10px" }}
          >
            <div className="bg-red-500 text-white px-3 py-1 rounded-full shadow-sm border text-sm font-bold min-w-[80px] text-center">
              СЕЙЧАС
            </div>
          </div>

          {getTimeLabels().map((time) => (
            <div
              key={time}
              className="absolute flex items-center justify-center"
              style={{ top: `${timeToY(time)}px` }}
            >
              <div className="bg-white px-3 py-1 rounded-full shadow-sm border text-sm font-bold text-slate-700 min-w-[60px] text-center">
                {time}:00
              </div>
            </div>
          ))}
        </div>

        {/* Горизонтальные линии времени */}
        {getTimeLabels().map((time) => (
          <div
            key={time}
            className="absolute left-0 right-0 h-px bg-slate-200 opacity-30"
            style={{ top: `${timeToY(time)}px` }}
          />
        ))}

        {/* Заголовки зон - убираем, так как они теперь в хедере */}

        {/* Разделительная линия и зоны */}
        <div className="absolute inset-0 pointer-events-none">
          {filters.showPassengers && (
            <div className="w-1/2 h-full bg-blue-50 opacity-20" />
          )}
          {filters.showVehicles && (
            <div className="absolute right-0 top-0 w-1/2 h-full bg-green-50 opacity-20" />
          )}
        </div>

        {/* Индикатор текущего времени */}
        <div
          className="absolute left-0 right-0 h-0.5 bg-red-500 z-20 shadow-lg"
          style={{ top: `${timeToY(new Date().getHours())}px` }}
        />

        {/* Объекты на временной шкале с фильтрацией */}
        {objects
          .filter((object) => {
            if (object.type === "passenger" && !filters.showPassengers)
              return false;
            if (object.type === "vehicle" && !filters.showVehicles)
              return false;
            return true;
          })
          .map((object) => (
            <div
              key={object.id}
              className={`absolute cursor-move rounded-lg shadow-md border-2 transition-all ${
                selectedObject === object.id
                  ? "border-purple-400 shadow-lg scale-105"
                  : "border-white hover:shadow-lg"
              }`}
              style={{
                left: `${object.position.x}px`,
                top: `${object.position.y}px`,
                width: "100px",
                height: `${Math.max(40, object.duration * 20)}px`,
                backgroundColor: object.color,
                opacity: draggedObject === object.id ? 0.8 : 1,
              }}
              onMouseDown={(e) => handleMouseDown(e, object.id)}
            >
              <div className="p-2 text-white">
                <div className="flex items-center gap-1 mb-1">
                  <Icon
                    name={object.type === "passenger" ? "User" : "Car"}
                    size={12}
                  />
                  <span className="text-xs font-medium truncate">
                    {object.name}
                  </span>
                </div>
                <div className="text-xs opacity-80">
                  {Math.round(object.startTime)}:00
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  },
);

TimelineCanvas.displayName = "TimelineCanvas";
