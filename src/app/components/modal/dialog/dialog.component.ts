import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data)
    {
    }

  ngOnInit(): void {
  }

  // public cancel() {
  //   this.close(false);
  // }
  // public close(value) {
  //   this.mdDialogRef.close(value);
  // }
  // public confirm() {
  //   this.close(true);
  // }
  // @HostListener("keydown.esc")
  // public onEsc() {
  //   this.close(false);
  // }

}
