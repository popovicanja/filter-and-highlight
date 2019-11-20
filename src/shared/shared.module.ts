import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SearchComponent} from './components/search/search.component';
import {HighlightPipe} from './pipes/highlight.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {MessageBarComponent} from './components/message-bar/message-bar.component';
import {MessageBar} from './components/message-bar/message-bar.service';
import {FormModalConfigBuilder} from './global/form-modal-config-builder';

@NgModule({
  declarations: [
    SearchComponent,
    MessageBarComponent,

    // pipes:
    HighlightPipe,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // Material
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // Material
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,

    // Pipes
    HighlightPipe,

    // Components
    SearchComponent,
  ],
  providers: [
    MessageBar,
    FormModalConfigBuilder,
  ],
  entryComponents: [
    MessageBarComponent,
  ]
})
export class SharedModule {}
