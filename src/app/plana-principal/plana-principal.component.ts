import { Component } from '@angular/core';
import {io} from "socket.io-client";

@Component({
  selector: 'app-plana-principal',
  templateUrl: './plana-principal.component.html',
  styleUrls: ['./plana-principal.component.css']
})
export class PlanaPrincipalComponent {

  socket: any;

  constructor() {

    this.socket = io("http://localhost:8888", { transports : ['websocket']});

    this.socket.on("hello", (arg: any) => {
      console.log(arg);
    });

  }

  requestCodiPeli() {
    this.socket.emit("RequestCodiPeli", 4);

    this.socket.on("CodiPeli", (args: any) => {
      console.log(args);
    });
  }
}
