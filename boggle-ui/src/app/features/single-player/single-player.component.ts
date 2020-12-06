import { SinglePlayerService } from './single-player.service';
import { Component, OnInit } from '@angular/core';
import { Dice } from './models/dice';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
})
export class SinglePlayerComponent implements OnInit {
  dices: Dice[];
  isGameStarted: boolean = false;
  countDown: Subscription;
  counter: number = 180;
  tick: number = 1000;

  constructor(private _singlePlayerService: SinglePlayerService) {}

  ngOnInit(): void {
    this.loadBoardDices();
  }

  loadBoardDices = () => {
    this._singlePlayerService.getBoard().subscribe((response) => (this.dices = response));
  };

  startSinglePlayerGame = () => {
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter > 0) {
        --this.counter;
      }
      if (this.counter === 0) {
        this.isGameStarted = false;
        this.resetCounter();
      }
    });
    this.isGameStarted = true;
  };

  resetCounter = () => {
    this.counter = 180;
    this.countDown.unsubscribe();
  };

  ngOnDestroy() {
    this.countDown = null;
  }
}
