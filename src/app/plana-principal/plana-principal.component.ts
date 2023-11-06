import { Component } from '@angular/core';
import {io} from "socket.io-client";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-plana-principal',
  templateUrl: './plana-principal.component.html',
  styleUrls: ['./plana-principal.component.css']
})
export class PlanaPrincipalComponent {

  constructor() {

    const socket = io("ws://localhost:3000");

    socket.on("hello", (arg) => {
      console.log(arg);
    })

    socket.emit("howdy", "stranger")
  }
}
