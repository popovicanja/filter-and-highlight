import {Component, OnInit, ViewChild} from '@angular/core';
import {CoursesService} from './course/courses.service';
import {FormModalConfigBuilder} from '../shared/global/form-modal-config-builder';
import {MatDialog} from '@angular/material';
import {CourseComponent} from './course/course.component';
import {MessageBar} from '../shared/components/message-bar/message-bar.service';
import {SearchComponent} from '../shared/components/search/search.component';
import {Course} from './course/course.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  courses: Course[];
  filteredCourses: Course[];

  searchTerm;

  storageKey = 'courses';

  @ViewChild(SearchComponent, {static: true}) searchComponent: SearchComponent;

  constructor(
    private _coursesService: CoursesService,
    private _formModalConfigBuilder: FormModalConfigBuilder,
    private _messageBar: MessageBar,
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.initializeCourses();
  }

  initializeCourses() {
    if (this.searchComponent) {
      this.searchComponent.clear();
    }
    const savedCoursesKey = localStorage.getItem(this.storageKey);
    const savedCourses: Course[] = savedCoursesKey ? JSON.parse(savedCoursesKey) : null;
    if (savedCourses) {
      this.courses = savedCourses;
      this.filteredCourses = [...this.courses];
    } else {
      this._coursesService.getListOfCourses()
        .subscribe(response => {
          this.courses = response;
          this.filteredCourses = [...this.courses];
          localStorage.setItem(this.storageKey, JSON.stringify(this.courses));
        });
    }
  }
  
  updateCourses() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.courses));
    this.initializeCourses();
  }

  filterItems(searchValue: string) {
    this.searchTerm = searchValue;
    const filterBy = (key: string) => (item) => item[key].toLowerCase().includes(searchValue.toLowerCase());
    this.filteredCourses = this.courses.filter(item => filterBy('title')(item) || filterBy('description')(item));
  }

  openCourseModal(course?: Course, index?: number) {
    const config = this._formModalConfigBuilder
      .create()
      .withTitle('Preview of uploaded document')
      .withWidth('400px')
      .withDataProperty('title', course ? 'Edit course' : 'Add new course')
      .withDataProperty('saveLabel', 'Confirm')
      .withDataProperty('course', course)
      .getConfig();
    const dialogRef = this._dialog.open(CourseComponent, config);
    dialogRef.componentInstance.close
      .subscribe(value => {
        if (value) {
          if (!course) {
            this.courses.push(value);
            this._messageBar.info('Course successfully added!');
          } else {
            this.courses[index] = value;
            this._messageBar.info('Course successfully edited!');
          }
          this.updateCourses();
        }
        dialogRef.close();
    });
  }

  deleteCourse(index: number) {
    this.courses.splice(index, 1);
    this._messageBar.info('Course is successfully deleted!');
    this.updateCourses();
  }

}
