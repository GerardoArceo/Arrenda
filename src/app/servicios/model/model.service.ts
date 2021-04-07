import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private data = null;
  private extraData = null;

  constructor() {
    this.data = null;
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData() {
    this.data = null;
  }

  setExtraData(data) {
    this.extraData = data;
  }

  getExtraData(param) {
    let temp = null;
    if(this.extraData!=null){
      temp=this.extraData[param];
      this.clearExtraData();
    }
    return temp;
  }

  clearExtraData() {
    this.extraData = null;
  }

}
