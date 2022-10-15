
export interface SingleDayPhoto {
earth_date: string; id: string; img_src: string
}

export interface SingleDayPhotos {
  photos: SingleDayPhoto[];
}

export interface SingleDayInfo {
  cameras: string[];
  total_photos: number;
  sol:number;
}


export default interface MissionManifest {
  photo_manifest: {
    name: string;
    landing_date: number;
    launch_date: number;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: string[];
    photos: SingleDayInfo[];
  };
}


