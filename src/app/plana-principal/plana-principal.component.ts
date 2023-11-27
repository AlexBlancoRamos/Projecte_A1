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

  constructor() {

    this.socket = io("http://192.168.56.2:8888", { transports : ['websocket']});

    this.socket.on("hello", (arg: any) => {
      console.log(arg);
    });

    this.getVideoListServer();
    this.videoList.forEach(element => console.log(element.title))
  }

  getVideoListServer() {
    this.socket.emit("RequestVideo", "");
    this.socket.on("VideoList", (videoObj: any[]) => {
      videoObj.forEach(element => {
        this.videoList.push(element)
      })
    })
  }

  toggleAndRequestVideo(video: any) {
    video.opened = !video.opened;
    this.requestCodiPeli();
  }


  requestCodiPeli() {

    this.socket.emit("RequestVideoVerification", "Video requested");

    this.socket.on("CodiVideo", (args: any) => {
      this.codi = args; //Codi from server
      console.log(args);
    });

    let socketVerifiedResponse = this.socket.on("VerifiedCorrectly", (response) => response);
    console.log("TEST     |     " + socketVerifiedResponse);
    if (socketVerifiedResponse === true) {
      //Random codi from each video
      this.verified = true;
      console.log("this.verified: " , this.verified);
    }

  }


}
