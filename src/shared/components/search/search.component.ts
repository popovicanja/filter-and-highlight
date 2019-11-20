import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  @Input() placeholder: string;
  @Output() search = new EventEmitter<string>();
  filterControl = new FormControl();

  ngOnInit(): void {
    this.filterControl
      .valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(value => this.search.emit(value));
  }

  clear() {
    this.filterControl.patchValue('');
  }

}
