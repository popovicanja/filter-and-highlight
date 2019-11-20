import {MessageBarType} from './message-bar.model';
import {Injectable, Injector} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {MessageBarComponent} from './message-bar.component';
import {Overlay} from '@angular/cdk/overlay';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {BreakpointObserver} from '@angular/cdk/layout';

@Injectable()
export class MessageBar extends MatSnackBar {

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private breakpointObserver: BreakpointObserver,
    private liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar,
  ) {
    super(overlay, liveAnnouncer, injector, breakpointObserver, snackBar, new MatSnackBarConfig());
  }

  private message(text: string, type: MessageBarType) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = type;
    const messageBarRef = this.openFromComponent(MessageBarComponent, config);
    setTimeout(() => messageBarRef.instance.data = { type, text });
  }

  info(text: string) {
    this.message(text, MessageBarType.Info);
  }

  warning(text: string) {
    this.message(text, MessageBarType.Warning);
  }

  error(text: string) {
    this.message(text, MessageBarType.Error);
  }

}
