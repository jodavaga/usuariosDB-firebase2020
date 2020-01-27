import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StatusComponent)
    }
  ]
})
export class StatusComponent implements ControlValueAccessor {

  employed = true;
  onChanged: (val) => void;
  onTouched: () => void;

  constructor() { }

  updateStatus( val: boolean ) {
    this.employed = val;
    this.onChanged(val);
    this.onTouched();
  }

  writeValue( val: boolean ) {
    this.employed = val;
  }

  registerOnChange( fn: any ): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
