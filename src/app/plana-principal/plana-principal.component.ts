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
  verified: any = undefined;
  codi: string = "";
  showDiv = false;

  constructor() {

    this.socket = io("http://169.254.180.117:8887", { transports : ['websocket'], key: 'angular-client' });

    this.socket.on("hello", (arg: any) => {
      console.log(arg);
    });

    this.socket.on("VideoList", (videoObj: any[]) => {
      videoObj.forEach(element => {
        this.videoList.push(element);
      })
    });

    this.socket.on("CodiVideo", (args) => this.codi = args);

    this.getVideoListServer();
    this.videoList.forEach(element => console.log(element.title));

  }

  // promisify(socketCallbackName: string, timeout?: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.socket.once(socketCallbackName, (args) => {
  //       resolve(args);
  //     });
  //
  //     if (!!timeout) {
  //       setTimeout(() => {
  //         this.socket.off(socketCallbackName);
  //         reject();
  //       }, timeout);
  //     }
  //   });
  // }

  getVideoListServer() {
    this.socket.emit("RequestVideo", "");
  }

  openVideoList() {
    this.showDiv = !this.showDiv;
  }

  async toggleAndRequestVideo(video: any) {
    video.opened = !video.opened;

    this.socket.emit("RequestVideoVerification", "Video requested");

    this.socket.on("VerifiedCorrectly", (arg: boolean) => {
      video.verified = arg;
    });

    // await this.promisify("VerifiedCorrectly", 15 * 1000)
    //   .then((args) => {
    //     this.verified = args;
    //     console.log(args);
    //   })
    //   .catch(() => alert('muy lento cabron'));
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
