import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss'],
})
export class MissionComponent implements OnInit {
  subscriptions$!: Subscription;
  isLoading: boolean = false;
  loadingSubscription$: Subscription = new Subscription();
  photoSubscription$:Subscription = new Subscription();

  constructor(private mService: MissionService) {}

  ngOnInit() {
    this.loadingSubscription$ = this.mService.isLoading.subscribe(
      (state) => (this.isLoading = state)
    );
  }

  loadPhotos() {
    this.photoSubscription$ = this.mService.loadPhotos().subscribe((res) => {
      this.mService.SingleDayPhotos.next(res.photos);
      this.mService.isLoading.next(false);
    });
  }

  ngOnDestroy() {
    this.loadingSubscription$.unsubscribe();
    this.photoSubscription$.unsubscribe();
  }
}
