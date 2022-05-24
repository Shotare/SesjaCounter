import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  //9 czerwca ostatni niemiecki
  //13 czerwca początek sesji
  lastGermanClassesDate = new Date('2022-06-12T00:00:01');
  examSessionDate = new Date('2022-06-13T00:00:01');

  germanClassesLeftCount = 0;

  examSessionDaysLeft = "";
  examSessionHoursLeft = "";
  examSessionMinutesLeft = "";
  examSessionSecondsLeft = "";

  germanClassesText = "";
  examSessionText = "";

  screen = screen;

  week = 7 * 24 * 60 * 60 * 1000;
  day = 24 * 60 * 60 * 1000;

  ngOnInit(): void {
      setInterval(() => {
        this.germanClassesLeftCount = this.germanClassesLeft();
        this.setExamSessionValues();
        
        this.germanClassesText = this.germanClassesLeftCount > 0
          ? `Pozostało ${this.germanClassesLeftCount} niemieckich`
          : "JEBAĆ ASKE!!! Gratulacje że przeżyłaś";
  
        this.examSessionText = Number(this.examSessionDaysLeft) > 0
          ? `${this.examSessionDaysLeft}:${this.examSessionHoursLeft}:${this.examSessionMinutesLeft}:${this.examSessionSecondsLeft}`
          : "SESJA IS HERE :(";
      }, 1000);
  }

  private setExamSessionValues(): void {
    var delta = Math.abs(this.examSessionDate.valueOf() - new Date().valueOf()) / 1000;

    let days = Math.floor(delta / 86400);
    this.examSessionDaysLeft = days.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    delta -= days * 86400;

    let hours = Math.floor(delta / 3600) % 24;
    this.examSessionHoursLeft = hours.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    delta -= hours * 3600;

    let minutes = Math.floor(delta / 60) % 60;
    this.examSessionMinutesLeft = minutes.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    delta -= minutes * 60;

    this.examSessionSecondsLeft = Math.floor(delta % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
  }

  private startOfWeek(dt: Date) {
    const weekday = dt.getDay();
    return new Date(dt.getTime() - Math.abs(0 - weekday) * this.day).valueOf();
  }
  
  private weeksBetween(d1: Date, d2: Date) {
    return Math.ceil((this.startOfWeek(d2) - this.startOfWeek(d1)) / this.week);
  }

  private germanClassesLeft() {
    let weekday = new Date().getDay();

    if (weekday <= 1)
      return this.weeksBetween(new Date(), this.lastGermanClassesDate) * 2;
    if (weekday < 5)
      return (this.weeksBetween(new Date(), this.lastGermanClassesDate) * 2) - 1;
    return (this.weeksBetween(new Date(), this.lastGermanClassesDate) * 2) - 2;
  }
}
