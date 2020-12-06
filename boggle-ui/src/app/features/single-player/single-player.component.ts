import { SinglePlayerService } from './single-player.service';
import { Component, OnInit } from '@angular/core';
import { Dice } from './models/dice';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
})
export class SinglePlayerComponent implements OnInit {
  dices: Dice[];
  constructor(private _singlePlayerService: SinglePlayerService) {}

  ngOnInit(): void {
    this.loadBoardDices();
  }

  loadBoardDices = () => {
    this._singlePlayerService.getBoard().subscribe((response) => (this.dices = response));
  };

  startSinglePlayerGame = () => {};
}
