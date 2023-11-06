import { RouterModule, Routes } from '@angular/router';


import { RouterOutlet} from "@angular/router";
import {PlanaPrincipalComponent} from "./plana-principal/plana-principal.component";

const routes: Routes =[
  {path: '', redirectTo: '/inici', pathMatch: 'full'},
  {path: 'inici', component: PlanaPrincipalComponent},
  {path: 'oulet', component: RouterOutlet},

];
export const routing = RouterModule.forRoot(routes);
