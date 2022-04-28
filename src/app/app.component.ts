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
  daysUntilExamSession = 0;

  germanClassesText = "";
  examSessionText = "";

  week = 7 * 24 * 60 * 60 * 1000;
  day = 24 * 60 * 60 * 1000;

  ngOnInit(): void {
      this.germanClassesLeftCount = this.germanClassesLeft();
      this.daysUntilExamSession = Math.round(
        Math.abs((this.examSessionDate.valueOf() - new Date().valueOf()) / this.day));
      
      this.germanClassesText = this.germanClassesLeftCount > 0
        ? `Pozostało ${this.germanClassesLeftCount} niemieckich`
        : "JEBAĆ ASKE!!! Gratulacje że przeżyłaś";

      this.examSessionText = this.daysUntilExamSession > 0
        ? `Do sesji pozostało ${this.daysUntilExamSession} dni`
        : "SESJA IS HERE :(";
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
      return this.weeksBetween(new Date(), this.lastGermanClassesDate) * 2 - 1;
    if (weekday < 5)
      return (this.weeksBetween(new Date(), this.lastGermanClassesDate) * 2) - 2;
    return (this.weeksBetween(new Date(), this.lastGermanClassesDate) * 2) - 3;
  }
}
