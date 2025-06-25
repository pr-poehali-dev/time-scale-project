export interface TimelineObject {
  id: string;
  type: "passenger" | "vehicle";
  name: string;
  startTime: number;
  duration: number;
  color: string;
  position: {
    x: number;
    y: number;
  };
  description?: string;
  priority?: "low" | "medium" | "high";
}

export interface TimeRange {
  start: number;
  end: number;
}

export type TimelineMode = "schedule" | "data";

export interface DroppableZone {
  id: string;
  type: "passenger" | "vehicle";
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
