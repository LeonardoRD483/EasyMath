import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-generic-message',
  templateUrl: './pop-up-generic-message.component.html',
  styleUrls: ['./pop-up-generic-message.component.scss']
})
export class PopUpGenericMessageComponent implements OnInit {
  title?:string;
  message?: string;
  constructor(private popup: MatDialogRef<PopUpGenericMessageComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.setData()
  }

  setData(){
    this.title = this.data.title
    this.message = this.data.message
  }

}
