import { SinglePlayerService } from './single-player.service';
import { Component, OnInit } from '@angular/core';
import { Dice } from './models/dice';
import { Subscription, timer } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
})
export class SinglePlayerComponent implements OnInit {
  dices: Array<Dice>;
  selectedDices = new Array<Dice>();
  wordsList = new Array<string>();
  selectedElements = new Array<HTMLElement>();
  isGameStarted: boolean = false;
  lastSelectedDice: Dice;
  score: number;

  countDown: Subscription;
  counter: number = 180;
  tick: number = 1000;

  constructor(
    private _singlePlayerService: SinglePlayerService,
    private _toaster: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadEmptyBoard();
  }

  loadEmptyBoard = () => {
    this.dices = new Array(16);
    this.dices.fill(new Dice(0, 0, '?'));
  };

  loadBoardDices = () => {
    this._singlePlayerService.getBoard().subscribe(
      (response) => (this.dices = response),
      (_) => this._toaster.showError('Something went wrong. Try again later.')
    );
  };

  startSinglePlayerGame = () => {
    this.loadBoardDices();
    this.resetScore();
    this.resetWordsList();
    this.resetCurrentWord();
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter > 0) {
        --this.counter;
      } else {
        this.isGameStarted = false;
        this.resetCounter();
        this.calculateScore();
      }
    });
    this.isGameStarted = true;
  };

  onDiceClicked = (event: Event, dice: Dice) => {
    if (this.isGameStarted) {
      const selectIsValid = this.selectValidation(dice);
      if (!selectIsValid) {
        this._toaster.showError('Please select adjacent dice neighbouring the current one');
        return;
      }

      let selectedElement = event.target as HTMLElement;
      if (selectedElement.nodeName === 'SPAN') {
        selectedElement = selectedElement.offsetParent as HTMLElement;
      }

      if (selectedElement.classList.contains('selected-card')) {
        const deselectIsValid = this.deselectValidation(dice);
        if (deselectIsValid) {
          selectedElement?.classList.remove('selected-card');
        } else {
          this._toaster.showError('You can remove only last selected letter.');
        }
      } else {
        selectedElement?.classList.add('selected-card');
        this.selectedElements.push(selectedElement);
        this.lastSelectedDice = dice;
        this.selectedDices.push(dice);
      }
    }
  };

  getCurrentWord = () => {
    return this.selectedDices?.reduce((acc, curr) => acc + curr.letter, '');
  };

  addToWordsList = () => {
    let currentWord = this.getCurrentWord();
    if (currentWord && currentWord !== '') {
      this.wordsList.push(this.getCurrentWord());
      this.resetBoard();
    }
  };

  private calculateScore = () => {
    this._singlePlayerService.getScore(this.wordsList).subscribe((res) => (this.score = res));
  };

  private resetBoard = () => {
    this.resetCurrentWord();
    this.lastSelectedDice = null;
    this.selectedElements.forEach((selectedCard) => {
      selectedCard?.classList.remove('selected-card');
    });
  };

  private resetScore = () => {
    this.score = 0;
  };

  private resetWordsList = () => {
    this.wordsList = new Array<string>();
  };

  private resetCurrentWord = () => {
    this.selectedDices = new Array<Dice>();
  };

  private resetCounter = () => {
    this.counter = 180;
    this.countDown.unsubscribe();
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

  private deselectValidation = (dice: Dice): boolean => {
    if (dice === this.lastSelectedDice) {
      this.selectedDices.pop();
      this.lastSelectedDice = this.selectedDices[this.selectedDices.length - 1];
      return true;
    } else {
      return false;
    }
  };

  ngOnDestroy() {
    this.countDown.unsubscribe();
  }
}
