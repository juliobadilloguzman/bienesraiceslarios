import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceModalComponent } from '../modals/service-modal/service-modal.component';
import { MapMarker, MapInfoWindow } from '@angular/google-maps';
import { ServiceLanding } from '../../../models/LandingPage/service-landing';
import { FraccionamientoModalComponent } from '../modals/fraccionamiento-modal/fraccionamiento-modal.component';

@Component({
  selector: 'app-landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.scss']
})
export class LandingViewComponent implements OnInit {

  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  @ViewChild('sidenav', { static: true }) input: ElementRef;
  
  zoom: number = 12;

  center: google.maps.LatLngLiteral;

  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  infoContent = '';

  marker = {
    position: {
      lat: 18.893112,
      lng: -98.898506,
    },
    label: {
      color: 'red',
      text: 'Bienes Raíces Larios',
    },
    title: 'Marker title ',
    info: 'Marker info ',
    options: {
      animation: google.maps.Animation.BOUNCE,
    }
  };

  serviceTerrenos: ServiceLanding;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: 18.893112,
        lng: -98.898506,
      }
    });
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  openServiceModal(service: string){

    switch (service) {
      case 'terrenos':
          this.serviceTerrenos =  {
            name: 'Venta de Terrenos',
            description: 'si'
          };
          break;
      case 'construccion':
        this.serviceTerrenos =  {
          name: 'Construcción',
          description: 'si'
        };
          break;
      case 'planos':
        this.serviceTerrenos =  {
          name: 'Planos Arquitectónicos',
          description: 'si'
        };
          break;
  }

    this.dialog.open(ServiceModalComponent, {
      width: '600px',
      data: {servicio: this.serviceTerrenos}
    });
    
  }

  openFraccionamientoModal(fraccionamiento: string){
    this.dialog.open(FraccionamientoModalComponent, {
      width: '800px',
      data: {}
    });
  }


  scrollTo(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }


}
