declare global {
  interface Window {
    mapkit: typeof mapkit;
  }
}

declare namespace mapkit {
  class Coordinate {
    constructor(latitude: number, longitude: number);
    latitude: number;
    longitude: number;
  }
  
  class CoordinateSpan {
    constructor(latitudeDelta: number, longitudeDelta: number);
    latitudeDelta: number;
    longitudeDelta: number;
  }
  
  class CoordinateRegion {
    constructor(center: Coordinate, span: CoordinateSpan);
    center: Coordinate;
    span: CoordinateSpan;
  }
  
  interface MapSelectEvent {
    target: {
      coordinate: Coordinate;
    };
  }
  
  interface Map {
    setRegionAnimated(region: CoordinateRegion, animate?: boolean): void;
    addEventListener(type: 'select', listener: (event: MapSelectEvent) => void): void;
    addEventListener(type: string, listener: (event: any) => void): void;
    removeEventListener(type: string, listener: (event: any) => void): void;
  }
}

export {};