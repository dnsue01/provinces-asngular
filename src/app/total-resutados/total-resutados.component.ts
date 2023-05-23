import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-total-resutados',
  templateUrl: './total-resutados.component.html',
  styleUrls: ['./total-resutados.component.css'],
})
export class TotalResutadosComponent {
  @Input() totalResultados: number = 0;
}
