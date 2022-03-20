import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  AcMapComponent,
  AcNotification,
  ViewerConfiguration,
  ActionType,
  CameraService,
} from 'angular-cesium';
import { map, mergeMap, Observable, of, tap } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
const randomLocation = require('random-location');

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration],
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(private viewerConf: ViewerConfiguration , private postService:PostService) {
    viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: false,
      infoBox: false,
      fullscreenButton: false,
      baseLayerPicker: false,
      animation: false,
      homeButton: false,
      geocoder: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      useDefaultRenderLoop: true,
    };
  }
  selectedPost!: Post;
  showDialog = false;

  @ViewChild('map') map!: AcMapComponent;
  entities$!: Observable<any>;
  private camera!: CameraService;
  Cesium = Cesium;
  ngAfterViewInit(): void {
    this.camera = this.map.getCameraService();
  }
  ngOnInit(): void {
    console.log("map")
    this.putPostsOnMap()
  }
  putPostsOnMap() {
    this.entities$ = this.postService.getAllPosts().pipe(
      map((posts) => {
        return posts.map((post: Post) => ({
          id: post.id,
          actionType: ActionType.ADD_UPDATE,
          entity: {
            ...post,
            location: {
              x: post.x_Position,
              y: post.y_Position,
              z: post.z_Position
            },
          },
        }));
      }),
      tap((posts) => console.log(posts)),
      mergeMap((entity) => entity)
    );
  }
  goHome(): void {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const { latitude, longitude } = data.coords;
        const position = Cesium.Cartesian3.fromDegrees(longitude, latitude);
        const entity = {
          id: 'my-home',
          position,
        };
        this.entities$ = of({
          id: entity.id,
          actionType: ActionType.ADD_UPDATE,
          entity,
        });
        this.zoomToLocation(position, 1000);
      },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }
  goRandom(): void {
    const randomStart = {
      latitude: 37.7768006 * Math.random(),
      longitude: -122.4187928 * Math.random(),
    };
    const radius = 5000000000 * Math.random(); // meters
    const { latitude, longitude } = randomLocation.randomCirclePoint(
      randomStart,
      radius
    );

    this.zoomToLocation(
      Cesium.Cartesian3.fromDegrees(longitude, latitude),
      100000
    );
  }
  private zoomToLocation(position: any, zoom: number): void {
    this.camera.cameraFlyTo({
      destination: position,
      complete: () => {
        this.camera.zoomOut(zoom);
      },
    });
  }
  showFullPost(post: Post): void {
    this.showDialog = true;
    this.selectedPost = post;
  }
}