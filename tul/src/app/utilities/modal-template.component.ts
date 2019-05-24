import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-template',
  template: `<button type="button" class="btn btn-info btn-lg" (click)="openModal()">click to open</button>
  <div class="backdrop" *ngIf="isOpen" ></div>
  <div class="modal" tabindex="-1" role="dialog"  [ngStyle]="{'display':display}">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" aria-label="Close" (click)="onCloseHandled()"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Model Title</h4>
        </div>
        <div class="modal-body">
          <p>Model body text</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" (click)="onCloseHandled()" >Close</button>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    .backdrop{
      background-color:rgba(0,0,0,0.6);
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100vh;
      z-index:1050;
      }

    `
  ],
})
export class ModalTemplateComponent implements OnInit {

  display: string;
  isOpen = false;
  constructor() {}

  ngOnInit() {
    this.display = 'none';
  }

  openModal() {
    this.isOpen = true;
    this.display = 'block';
  }

  onCloseHandled() {
    this.isOpen = false;
    this.display = 'none';
  }

}
