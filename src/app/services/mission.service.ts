import { FormGroup } from '@angular/forms';
import { SingleDayPhotos } from './../models/mission-manifest.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import MissionManifest from '../models/mission-manifest.model';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor(private http: HttpClient) {}
  httpReqest: string = 'https://api.nasa.gov/mars-photos/api/v1/';
  apiKey: string = '=bfgT5a4x7Uagom6duaIqavIlsPClQK9gvW1mnQAi';

  load(roverInfo: string) {
    let requestBody: string = `manifests/${roverInfo}/?api_key`;
    return this.http
      .get<MissionManifest>(this.httpReqest + requestBody + this.apiKey)
      .pipe(
        map((manifest) => {
          console.log(manifest);
          return manifest.photo_manifest;
        })
      );
  }

  loadPhotos(roverType:string, chosenDate:number, chosenCamera:string, page?:number) {
    let defaultPage:number = 1;
    let roverInfo = roverType.toLowerCase()
    let cameraInfo = chosenCamera.toLowerCase()
    let photosRequest: string = `${this.httpReqest}/rovers/${roverInfo}/photos?sol=${chosenDate}&camera=${cameraInfo}&page=${page}&api_key${this.apiKey}`;
    return this.http.get<SingleDayPhotos>(photosRequest);
  }
}
