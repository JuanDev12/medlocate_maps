import { Component, OnInit } from '@angular/core';
declare var google;

interface WayPoint {
  location: {
    lat: number;
    lng: number;
  };
  stopover: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  wayPoints: WayPoint[] = [
    {
      location: { lat: 7.074336598418412, lng: -73.11001311534002 }, // Clinica Foscal
      stopover: true,
    },
    {
      location: { lat: 7.120594686228601, lng: -73.11495772924494 }, // Clinica chicamocha
      stopover: true,
    },
    {
      location: { lat: 7.136906043391182, lng: -73.12008175808135 }, // Clinica la merced
      stopover: true,
    },
  ];

  // Mi ubicacion
  origin = { lat: 7.08349306478786, lng: -73.09882293912358 };

  // UIS
  destination = { lat: 7.13887515463313, lng: -73.12116037606249 };

  constructor() {}

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 15,
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  private calculateRoute() {
    this.directionsService.route(
      {
        origin: this.origin,
        destination: this.origin,
        waypoints: this.wayPoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        } else {
          alert(
            'No se pudo mostrar la ruta. Google cloud console no pudo resolver la solicitud: ' +
              status
          );
        }
      }
    );
  }
}
