import { Component } from '@angular/core';
import {io} from "socket.io-client";

@Component({
  selector: 'app-plana-principal',
  templateUrl: './plana-principal.component.html',
  styleUrls: ['./plana-principal.component.css']
})
export class PlanaPrincipalComponent {

  socket: any;
  videoList: any[] = [];
  opened: boolean = false;
  verified: boolean = false;
  codi: string = "";
  showDiv = false;

  constructor() {

    this.socket = io("http://192.168.16.204:8888", { transports : ['websocket']});

    this.socket.on("hello", (arg: any) => {
      console.log(arg);
    });

    this.getVideoListServer();
    this.videoList.forEach(element => console.log(element.title));

  }

  getVideoListServer() {
    this.socket.emit("RequestVideo", "");
    this.socket.on("VideoList", (videoObj: any[]) => {
      videoObj.forEach(element => {
        this.videoList.push(element);
      })
    })
  }

  async toggleAndRequestVideo(video: any) {
    video.opened = !video.opened;
    let codiPeli = await this.requestCodiPeli();
    //TEST
    // this.verified = true;
    // this.getVideoFromServer()
    this.validateRequest(codiPeli);
  }

  openVideoList() {
    this.showDiv = !this.showDiv;
  }


  requestCodiPeli() {
    this.socket.emit("RequestVideoVerification", "Video requested");

    this.socket.on("CodiVideo", (args: any) => {
      this.codi = args; //Codi from server
      console.log("Random Code: " + args);
    });

    let socketVerifiedResponse;
    this.socket.on("VerifiedCorrectly", (response) => {
      console.log("GG   |   " + response);
      socketVerifiedResponse = response;
    });

    return socketVerifiedResponse;
  }

  validateRequest(code: string) {
    if (code === "true") {
      this.verified = true;
      console.log("this.verified: " , this.verified);
    }
  }

  mostrarPopup() {
    document.getElementById('popup')!.style.display = 'block';
    document.getElementById('overlay')!.style.display = 'block';
  }

  ocultarPopup() {
    document.getElementById('popup')!.style.display = 'none';
    document.getElementById('overlay')!.style.display = 'none';
  }

}
