import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment';

const mapBoxApiKey: string = environment.mapBoxApiKey;
declare const mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapa', { static: true }) mapa: ElementRef;
  @Input() coords: string;

  ngAfterViewInit() {
    this.printMap();
  }

  private printMap() {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = mapBoxApiKey;
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  }
}
