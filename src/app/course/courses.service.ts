import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Course} from './course.model';

@Injectable({providedIn: 'root'})
export class CoursesService {

  private _list = [
    {title: 'JavaScript course', description: 'You can learn Angular, React, VueJS'},
    {title: 'Full-stack developer course', description: 'In this course you can learn Laravel, VueJS'},
    {title: 'Javascript engineer', description: 'In this course we will obtain vanilla JavaScript at first, than later NodeJS and Angular'},
    {title: 'Backend developer course', description: 'In this course we will cover Spring Boot'}
  ];

  constructor() {}

  getListOfCourses(): Observable<Course[]> {
    return of(this._list);
  }

}
