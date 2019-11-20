import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageBar} from '../../shared/components/message-bar/message-bar.service';
import {Course} from './course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  close = new EventEmitter();

  form: FormGroup;

  get title()       { return this.form.get('title'); }
  get description() { return this.form.get('description'); }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {course: Course, title: string, saveLabel: string, cancelLabel: string},
    private messageBar: MessageBar,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'title':        [null, Validators.required],
      'description':  [null, Validators.required]
    });

    if (this.data && this.data.course) {
      this.form.patchValue(this.data.course as any);
    }
  }

  onSave() {
    if (this.form.valid) {
      this.close.emit(this.form.value);
    } else {
      this.markFormGroupTouched();
      this.messageBar.info('Fields can not be empty!');
    }
  }

  markFormGroupTouched() {
    this.form.markAllAsTouched();
  }

}
