import {Injectable} from '@angular/core';
import {MatDialogConfig} from '@angular/material';

@Injectable()
export class FormModalConfigBuilder {

  constructor() { }

  private init() {
    return {
      data: {
        saveLabel: undefined,
        cancelLabel: 'Cancel'
      },
      disableClose: true,
      panelClass: ['cu-form-modal'],
      backdropClass: '',
      width: '600px',
      height: 'auto',
      withTitle(title) {
        this.data.title = title;
        return this;
      },
      withWidth(width: string) {
        this.width = width;
        return this;
      },
      withHeight(height: string) {
        this.height = height;
        return this;
      },
      withPanelClass(className: string) {
        this.panelClass.push(className);
        return this;
      },
      withoutAutoFocus() {
        this.autoFocus = false;
        return this;
      },
      withValue(value) {
        this.data.value = value;
        return this;
      },
      withDataProperty(propName: string, value: any) {
        this.data[propName] = value;
        return this;
      },
      getConfig(): MatDialogConfig {
        delete this.withTitle;
        delete this.withValue;
        delete this.withDataProperty;
        delete this.getConfig;
        return this;
      }
    };
  }

  create() {
    const defaultConfig = this.init();
    defaultConfig.data.saveLabel = 'Create';
    return defaultConfig;
  }

  edit() {
    const defaultConfig = this.init();
    defaultConfig.data.saveLabel = 'Edit';
    return defaultConfig;
  }

}
