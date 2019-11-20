import {MessageBarType} from './message-bar.model';
import {Component} from '@angular/core';

@Component({
  selector: 'app-message-bar',
  templateUrl: 'message-bar.component.html',
  styleUrls: ['message-bar.component.scss']
})
export class MessageBarComponent {

  public data: { text: String, type: MessageBarType };

}
