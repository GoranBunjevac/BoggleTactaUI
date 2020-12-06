import { SinglePlayerService } from './single-player.service';
import { Component, OnInit } from '@angular/core';
import { Dice } from './models/dice';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
})
export class SinglePlayerComponent implements OnInit {
  dices: Array<Dice>;
  selectedDices = new Array<Dice>();
  wordsList = new Array<string>();
  isGameStarted: boolean = false;
  lastSelectedDice: Dice;
  score: number;

  countDown: Subscription;
  counter: number = 180;
  tick: number = 1000;

  constructor(private _singlePlayerService: SinglePlayerService) {}

  ngOnInit(): void {
    this.loadEmptyBoard();
  }

  loadEmptyBoard = () => {
    this.dices = new Array(16);
    this.dices.fill(new Dice(0, 0, '?'));
  };

  loadBoardDices = () => {
    this._singlePlayerService.getBoard().subscribe((response) => (this.dices = response));
  };

  startSinglePlayerGame = () => {
    this.loadBoardDices();
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter > 0) {
        --this.counter;
      }
      if (this.counter === 0) {
        this.isGameStarted = false;
        this.resetCounter();
        this.calculateScore();
      }
    });
    this.isGameStarted = true;
  };

  resetCounter = () => {
    this.counter = 180;
    this.countDown.unsubscribe();
  };

  selectDice = (event: Event, dice: Dice) => {
    if (this.isGameStarted) {
      const selectedCard = event.target as HTMLElement;
      const selectedCardLetter = selectedCard.getElementsByTagName('p');

      selectedCard.classList.contains('selected-card')
        ? selectedCard.classList.remove('selected-card')
        : selectedCard.classList.add('selected-card');

      const selectIsValid = this.selectValidation(dice);
      if (selectIsValid) {
        this.lastSelectedDice = dice;
        this.selectedDices.push(dice);
      }
    }
  };

  getCurrentWord = () => {
    return this.selectedDices?.reduce((acc, curr) => acc + curr.letter, '');
  };

  addToWordsList = () => {
    this.wordsList.push(this.getCurrentWord());
    this.resetBoard();
  };

  calculateScore = () => {
    this._singlePlayerService.getScore(this.wordsList).subscribe((res) => (this.score = res));
  };

  private resetBoard = () => {
    this.selectedDices = new Array<Dice>();
    this.lastSelectedDice = null;
  };

  private selectValidation = (dice: Dice): boolean => {
    if (!this.lastSelectedDice) {
      return true;
    }

    const validX = [
      this.lastSelectedDice.xPosition - 1,
      this.lastSelectedDice.xPosition,
      this.lastSelectedDice.xPosition + 1,
    ];
    const validY = [
      this.lastSelectedDice.yPosition - 1,
      this.lastSelectedDice.yPosition,
      this.lastSelectedDice.yPosition + 1,
    ];
    return (
      validX.some((x) => x === dice.xPosition) && validY.some((y) => y === dice.yPosition)
    );
  };

  ngOnDestroy() {
    this.countDown = null;
  }
}
