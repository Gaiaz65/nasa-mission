import {
  SingleDayPhoto,
} from './../models/mission-manifest.model';
import { MissionService } from './../services/mission.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SingleDayInfo } from '../models/mission-manifest.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private mService: MissionService) {}
  isLoading = false;

  roverOptions = ['Curiosity', 'Opportunity', 'Spirit'];
  maxSol: number = 0;
  chosenSol!: number;
  earthDate!: string;
  photos: SingleDayInfo[] = [];
  cameras: string[] = [];
  cameraImages: SingleDayPhoto[]=[];
  ngOnInit(): void {}

  confirmSol(chosenSol: number) {
    for (var i = 0; i < this.photos.length; i++) {
      if (
        this.photos[i].sol === chosenSol &&
        this.photos[i].cameras.length > 0
      ) {
        this.cameras = this.photos[i].cameras;
        return;
      }
    }
    this.cameras = [];
    console.log('sorry, no photos taken on that sol, you can try another one!');

    return;
  }

  getInitialInfo(rover: string) {
    this.isLoading = true;
    if (this.maxSol > 0) {
      this.maxSol = 0;
    }
    this.mService.load(rover).subscribe((res) => {
      let {
        name,
        landing_date,
        launch_date,
        status,
        max_sol,
        max_date,
        total_photos,
        photos,
      } = res;
      this.maxSol = max_sol;
      this.photos = photos;
      console.log(res);
      this.isLoading = false;
    });
  }

  loadPhotos() {
    let { roverType, chosenDate, chosenCamera } = this.imageLoadingForm.value;

    this.mService
      .loadPhotos(roverType, chosenDate, chosenCamera)
      .subscribe((res) => {
        this.cameraImages = res.photos;
        console.log(this.cameraImages);
      });
  }

  roverType = new FormControl();
  chosenDate = new FormControl();
  chosenCamera = new FormControl();
  page = new FormControl();

  imageLoadingForm = new FormGroup({
    roverType: this.roverType,
    chosenDate: this.chosenDate,
    chosenCamera: this.chosenCamera,
    page: this.page,
  });
}
