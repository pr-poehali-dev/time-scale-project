import React, { useState } from "react";
import Icon from "@/components/ui/icon";
import { TimelineObject, TimelineMode } from "../types/timeline";

interface ObjectPanelProps {
  mode: TimelineMode;
  selectedObject: string | null;
  objects: TimelineObject[];
  onCreateObject: (type: "passenger" | "vehicle", name: string) => void;
  onUpdateObject: (id: string, updates: Partial<TimelineObject>) => void;
  onDeleteObject: (id: string) => void;
}

export const ObjectPanel: React.FC<ObjectPanelProps> = ({
  mode,
  selectedObject,
  objects,
  onCreateObject,
  onUpdateObject,
  onDeleteObject,
}) => {
  const [newObjectName, setNewObjectName] = useState("");
  const selectedObj = objects.find((obj) => obj.id === selectedObject);

  const handleCreate = (type: "passenger" | "vehicle") => {
    if (newObjectName.trim()) {
      onCreateObject(type, newObjectName.trim());
      setNewObjectName("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <Icon name="Plus" size={18} />
          Создать объект
        </h3>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Название объекта"
            value={newObjectName}
            onChange={(e) => setNewObjectName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={(e) => e.key === "Enter" && handleCreate("passenger")}
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => handleCreate("passenger")}
            disabled={!newObjectName.trim()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Icon name="User" size={16} />
            Пассажир
          </button>
          <button
            onClick={() => handleCreate("vehicle")}
            disabled={!newObjectName.trim()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Icon name="Car" size={16} />
            Машина
          </button>
        </div>
      </div>

      {selectedObj && (
        <>
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
            <h4 className="font-medium text-slate-900 flex items-center gap-2">
              <Icon name="Edit3" size={16} />
              Редактировать
            </h4>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <label className="text-xs text-slate-600 block mb-1">
                Название
              </label>
              <input
                type="text"
                value={selectedObj.name}
                onChange={(e) =>
                  onUpdateObject(selectedObj.id, { name: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 block mb-1">
                {mode === "schedule"
                  ? "Продолжительность (часы)"
                  : "Длительность"}
              </label>
              <input
                type="number"
                min="1"
                value={selectedObj.duration}
                onChange={(e) =>
                  onUpdateObject(selectedObj.id, {
                    duration: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 block mb-1">Цвет</label>
              <div className="flex gap-2">
                {["#9b87f5", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444"].map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() => onUpdateObject(selectedObj.id, { color })}
                      className={`w-6 h-6 rounded border-2 ${
                        selectedObj.color === color
                          ? "border-slate-800"
                          : "border-slate-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ),
                )}
              </div>
            </div>

            <button
              onClick={() => onDeleteObject(selectedObj.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm"
            >
              <Icon name="Trash2" size={16} />
              Удалить
            </button>
          </div>
        </>
      )}

      <div className="p-4 border-t border-slate-200">
        <h4 className="font-medium text-slate-900 mb-2">
          Объекты ({objects.length})
        </h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {objects.map((obj) => (
            <div
              key={obj.id}
              onClick={() =>
                onUpdateObject === selectedObject ? null : obj.id
              }
              className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                selectedObject === obj.id
                  ? "bg-purple-100 text-purple-800"
                  : "hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: obj.color }}
                />
                <span className="truncate">{obj.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
