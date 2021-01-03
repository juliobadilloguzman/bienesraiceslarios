import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceModalComponent } from '../modals/service-modal/service-modal.component';
import { MapMarker, MapInfoWindow } from '@angular/google-maps';
import { ServiceLanding } from '../../../models/LandingPage/service-landing';
import { FraccionamientoModalComponent } from '../modals/fraccionamiento-modal/fraccionamiento-modal.component';
import { FraccionamientoLanding } from 'src/app/models/LandingPage/fraccionamiento-landing';
import { VideoModalComponent } from '../modals/video-modal/video-modal.component';

@Component({
  selector: 'app-landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.scss']
})
export class LandingViewComponent implements OnInit {

  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  
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

  openServiceModal(service: string): void{

    switch (service) {
      case 'terrenos':
          this.serviceTerrenos =  {
            name: 'Venta de Terrenos',
            description: 'Confía en nosotros para adquirir tu próximo terreno en el estado de Morelos. Tenemos más de 35 años que nos respaldan. La tierra es el inicio de lo que puede ser la casa o el negocio de tus sueños.'
          };
          break;
      case 'construccion':
        this.serviceTerrenos =  {
          name: 'Construcción',
          description: 'Haz realidad la casa o negocio de tus sueños con nosotros.'
        };
          break;
      case 'planos':
        this.serviceTerrenos =  {
          name: 'Planos Arquitectónicos',
          description: 'Permítenos plasmar tu sueño en una hoja de papel, para que sea el inicio de llevar a la realidad la casa de tus sueños.'
        };
          break;
  }

    this.dialog.open(ServiceModalComponent, {
      width: '600px',
      data: {servicio: this.serviceTerrenos}
    });
    
  }

  openFraccionamientoModal(name: string): void{

    let fraccionamiento: FraccionamientoLanding;

    switch (name) {
      case 'realdelvalle':
        fraccionamiento = {
          name: 'Real del Valle',
          map: '/assets/img/fraccionamientos/realdelvalle/plano.jpg',
          priceList: '/assets/img/fraccionamientos/realdelvalle/priceList.jpeg',
          location: 'https://maps.google.com?q=18.8292730,-98.8943100&hl=es-MX&gl=mx'
        }
        break;

      case 'lomasyeca':
        fraccionamiento = {
          name: 'Lomas de Yecapixtla',
          map: '/assets/img/fraccionamientos/lomasyeca/plano.png',
          priceList: '/assets/img/fraccionamientos/lomasyeca/priceList.jpg',
          location: 'https://goo.gl/maps/CfVCzL5hvUtQ7egj8'
        }
      break;

      case 'pedregalcocoyoc':
        fraccionamiento = {
          name: 'Pedregal de Cocoyoc',
          map: '/assets/img/fraccionamientos/pedregalcocoyoc/plano.jpg',
          priceList: '/assets/img/fraccionamientos/pedregalcocoyoc/priceList.jpg',
          location: 'https://www.google.com/maps?q=18.928638,-98.947364&hl=es&gl=us&shorturl=1'
        }
      break;
      default:
        break;
    }

    this.dialog.open(FraccionamientoModalComponent, {
      width: '800px',
      data: {fraccionamiento}
    });
  }

  openPromotionalVideo(): void{

    this.dialog.open(VideoModalComponent, {
      width: '800px',
      data: {}
    });

  }


  scrollTo(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }


}
