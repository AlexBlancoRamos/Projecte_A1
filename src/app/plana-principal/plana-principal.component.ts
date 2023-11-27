import {Component} from '@angular/core';
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

    this.socket = io("http://169.254.180.117:8888", { transports : ['websocket']});

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
    this.requestCodiPeli();

    let verificationResponse = await this.getVericficationPromise();
    console.log("GVMEAFDKZHBMIAE=TZFD || ", verificationResponse);
    //TEST
    // this.verified = true;
    // this.getVideoFromServer()
    this.validateRequest(verificationResponse);
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

  }

  async getVericficationPromise() {
    return new Promise(async (resolve, reject) => {
      await this.socket.on("VerifiedCorrectly", (response) => {
        if (response != undefined) resolve(response);
        else reject("No s'ha esperat a la verificació del codi")
      });
    });
  }

  validateRequest(code: any) {
    if (code) {
      this.verified = true;
      console.log("this.verified: " , this.verified);
    } else
      console.log("gg");
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
