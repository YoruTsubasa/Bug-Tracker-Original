import {Component, OnInit, Input} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit{
  @Input() label: string = "";
  @Input() controlName : string = "";
  @Input() inputType : string = "";
  @Input() pattern : string = "";

  @Input() formGroup!: FormGroup;
  public control!: FormControl;

  constructor(private controlContainer: ControlContainer) {
  }

  clearInput(){
    this.control.reset();
  }

  ngOnInit(){
    this.formGroup = <FormGroup>this.controlContainer.control;
    this.control = <FormControl>this.formGroup.get(this.controlName);

    this.addValidators();

    this.control.valueChanges.subscribe((item)=> {
      //this.control.updateValueAndValidity()
     console.log('text-input control: ' + this.control.status);
    });
  }

  addValidators() : void {
    this.control.addValidators([Validators.required,
      Validators.pattern(this.pattern)]);
  }
}
