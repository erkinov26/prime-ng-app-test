import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { ButtonDirective } from 'primeng/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-users',
  imports: [ButtonDirective, LeafletModule, RouterLink],
  template: `
    <h1 class="mb-4 text-xl font-bold">Users</h1>

    <!-- <div class="overflow-hidden">
      <div
        id="map"
        leaflet
        [leafletOptions]="options"
        [leafletLayers]="layers"
      ></div>
    </div> -->

    @if (!data) {
    <h2 class="mt-4 text-gray-500">Loading...</h2>
    } @else {
    <ul class="flex flex-col gap-2 mt-4">
      @for (u of data; track $index) {
      <li
        [routerLink]="['/mfi/users', u.id]"
        class="border rounded-md p-2 flex justify-between items-center hover:bg-gray-50 transition"
      >
        <b>{{ u.name }}</b>
        <button pButton size="small">Click Me</button>
      </li>
      }
    </ul>
    }
  `,
  styles: [
    `
      // #map {
      //   height: 400px;
      //   width: 100%;
      //   border-radius: 8px;
      //   margin-bottom: 1rem;
      //   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      // }
    `,
  ],
})
export class Users implements OnInit {
  data: any[] = [];
  userService = inject(UserService);
  private route = inject(ActivatedRoute);
  // options = {
  //   layers: [
  //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attribution: '&copy; OpenStreetMap contributors',
  //     }),
  //   ],
  //   zoom: 2,
  //   center: L.latLng(20, 0),
  // };

  // layers: L.Layer[] = [];
  // currentUser: any;

  // constructor() {
  //   this.route.data.subscribe((data) => {
  //     console.log('resolverdan keldi:', data);
  //     this.currentUser = data['userDetail'];
  //   });
  // }
  ngOnInit(): void {
    // this.userService.getUsers().subscribe((val: any) => {
    //   this.data = val;
    // this.layers = this.data.map((u) => {
    //   const lat = Number(u.address.geo.lat);
    //   const lng = Number(u.address.geo.lng);
    //   return L.marker([lat, lng]).bindPopup(
    //     `<b>${u.name}</b><br>${u.address.city}`
    //   );
    // });
    // });
    this.route.data.subscribe((data) => {
      console.log('resolverdan data keldi', data);
      this.data = data['users'];
    });
  }
}
