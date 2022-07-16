import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IProblem } from '../../../domain/models/problem/IProblem';
import { IProblemAnswer } from '../../../domain/models/problem/IProblemAnswer';

@Component({
  selector: 'app-item-problem',
  templateUrl: './item-problem.component.html',
  styleUrls: ['./item-problem.component.scss'],
})
export class ItemProblemComponent implements OnInit {
  @Input() problem?: IProblem;
  @Output() response = new EventEmitter<IProblemAnswer>();

  numberOne?: number | null;
  numberTwo?: number | null;
  total?: number | null;
  operation?: string | null;
  unknown?: number | null;
  value_response?: IProblemAnswer;
  disabled?: boolean = false;
  check?: number| null;

  constructor() {}

  ngOnInit(): void {
    this.getNumber();
    this.selectUnknown();

  }

  getNumber() {
    this.numberOne = parseInt(this.problem?.fields?.numbers?.split(',')[0]!);
    this.numberTwo = parseInt(this.problem?.fields?.numbers?.split(',')[1]!);
    this.total = this.problem?.fields?.result;
    this.operation = this.problem?.fields?.operation
  }

  selectUnknown() {
    this.unknown = Math.ceil(Math.random() * (3 - 1) + 1);
    this.check = 0

    switch (this.unknown) {
      case 1:
        this.numberOne=null
        this.value_response = {
          numberOne: null,
          numberTwo: this.numberTwo!,
          total: this.total!,
        };
        break;
      case 2:
        this.numberTwo=null
        this.value_response = {
          numberOne: this.numberOne!,
          numberTwo: null,
          total: this.total!,
        };
        break;
      case 3:
        this.total=null
        this.value_response = {
          numberOne: this.numberOne!,
          numberTwo: this.numberTwo!,
          total: null,
        };
        break;

      default:
        break;
    }
  }

  sendResponse() {
    this.disabled = true
    this.value_response = {
      numberOne: this.numberOne!,
      numberTwo: this.numberTwo!,
      total: this.total!,
      pk: this.problem?.pk
    }
    this.response.emit(this.value_response);
  }
}
