import { Component, Inject, OnInit, LOCALE_ID, ViewChild} from '@angular/core';

import { CalendarService } from '../../services/calendar.service';
import { Task } from '../../interfaces/intefaces';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  event: Task = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  };

  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  selectedDate: Date;

  viewTitle: string;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private calendarService: CalendarService,
      private navCtrl: NavController,
      private loadingCtrl: LoadingController,
      private route: ActivatedRoute,
      private alertCtrl: AlertController,
      @Inject(LOCALE_ID) private locale: string
      ) {}

  ngOnInit(){
    this.calendarService.getEvents().subscribe(res => {
      res.forEach(re => {
        console.log(re);
        this.eventSource.push(re);

      });

    });
  }

  next(){
    this.myCal.slideNext();
  }

  back(){
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  async addFaltaInj(event) {
    console.log('date: ' + this.selectedDate);
    this.event = {
      title: 'Falta injustificada',
      desc: 'Falta injustificada',
      startTime: this.selectedDate.toDateString(),
      endTime: '',
      allDay: true
    };

    const loading = await this.loadingCtrl.create({
      message: 'Guardando...'
    });
    await loading.present();

    this.calendarService.addEvent(this.event).then(() => {
      this.loadingCtrl.dismiss();
      this.navCtrl.navigateForward('/calendar');
    });
  }

  async addFaltaJus(event) {
    console.log('date: ' + this.selectedDate);
    this.event = {
      title: 'Falta Justificada',
      desc: 'Falta Justificada',
      startTime: this.selectedDate.toDateString(),
      endTime: '',
      allDay: true
    };

    const loading = await this.loadingCtrl.create({
      message: 'Guardando...'
    });
    await loading.present();

    this.calendarService.addEvent(this.event).then(() => {
      this.loadingCtrl.dismiss();
      this.navCtrl.navigateForward('/calendar');
    });
  }

  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

}
