import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import {
  SingleDayPhoto,
  SingleDayPhotos,
} from './../models/mission-manifest.model';
import MissionManifest from '../models/mission-manifest.model';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  page = 0;
  SingleDayPhotos = new BehaviorSubject<SingleDayPhoto[] | null>(null);
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}
  httpReqest: string = 'https://api.nasa.gov/mars-photos/api/v1/';
  apiKey: string = 'api_key=bfgT5a4x7Uagom6duaIqavIlsPClQK9gvW1mnQAi';
  photosRequest: string = '';
  pageRequest: string = `&page=${this.page}`;

  load(roverInfo: string) {
    let requestBody: string = `manifests/${roverInfo}/?`;
    return this.http
      .get<MissionManifest>(this.httpReqest + requestBody + this.apiKey)
      .pipe(
        map((manifest) => {
          return manifest.photo_manifest;
        })
      );
  }

  createPhotosRequest(
    roverType: string,
    chosenDate: number,
    chosenCamera: string
  ) {
    this.photosRequest = `${this.httpReqest}/rovers/${roverType}/photos?sol=${chosenDate}&camera=${chosenCamera}`;
  }

  loadPhotos() {
    this.page++;
    this.pageRequest = `&page=${this.page}`;
    this.pageRequest = `${this.pageRequest}&${this.apiKey}`;

    return this.http.get<SingleDayPhotos>(
      this.photosRequest + this.pageRequest
    );
  }
}
