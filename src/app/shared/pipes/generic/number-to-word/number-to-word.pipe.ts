import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWord',
})
export class NumberToWordPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    return this.convertAmount(value);
  }

  // prettier-ignore
  iWords = [ "zero", " one", " two", " three", " four", " five", " six", " seven", " eight", " nine", ];
  // prettier-ignore
  ePlace = [ "ten", " eleven", " twelve", " thirteen", " fourteen", " fifteen", " sixteen", " seventeen", " eighteen", " nineteen", ];
  // prettier-ignore
  tensPlace = [ "", " ten", " twenty", " thirty", " forty", " fifty", " sixty", " seventy", " eighty", " ninety", ];
  inWords: string[] = [];

  numReversed: any;
  actNumber: any;
  // i: number=0;
  // j: number=0;

  // section: function to convert tens to words
  tensComplication(i: number, j: number) {
    if (this.actNumber[i] == 0) {
      this.inWords[j] = '';
    } else if (this.actNumber[i] == 1) {
      this.inWords[j] = this.ePlace[this.actNumber[i - 1]];
    } else {
      this.inWords[j] = this.tensPlace[this.actNumber[i]];
    }
    console.log('inWords[j]', this.inWords[j]);
  }

  // section: main function to convert input value to words
  convert(numericValue: any) {
    this.inWords = [];
    if (numericValue == '00' || numericValue == '0' || Number(numericValue) == 0) {
      return 'zero';
    }
    let obStr = numericValue.toString();
    console.log('obStr', obStr);
    this.numReversed = obStr.split('');
    this.actNumber = this.numReversed.reverse();
    console.log('actNumber', this.actNumber);

    let iWordsLength = this.numReversed.length;
    let finalWord = '';
    let j = 0;
    for (let i = 0; i < iWordsLength; i++) {
      switch (i) {
        case 0:
          if (this.actNumber[i] == '0' || this.actNumber[i + 1] == '1') {
            this.inWords[j] = '';
          } else {
            this.inWords[j] = this.iWords[this.actNumber[i]];
          }
          console.log('inWords[j]', this.inWords[j]);
          this.inWords[j] = this.inWords[j] + '';
          break;
        case 1:
          this.tensComplication(i, j);
          break;
        case 2:
          if (this.actNumber[i] == '0') {
            this.inWords[j] = '';
          } else if (this.actNumber[i - 1] !== '0' && this.actNumber[i - 2] !== '0') {
            this.inWords[j] = this.iWords[this.actNumber[i]] + ' hundred';
          } else {
            this.inWords[j] = this.iWords[this.actNumber[i]] + ' hundred';
          }
          break;
        case 3:
          if (this.actNumber[i] == '0' || this.actNumber[i + 1] == '1') {
            this.inWords[j] = '';
          } else {
            this.inWords[j] = this.iWords[this.actNumber[i]];
          }
          if (this.actNumber[i + 1] !== '0' || this.actNumber[i] > '0') {
            this.inWords[j] = this.inWords[j] + ' thousand';
          }
          break;
        case 4:
          this.tensComplication(i, j);
          break;
        case 5:
          if (this.actNumber[i] == '0' || this.actNumber[i + 1] == '1') {
            this.inWords[j] = '';
          } else {
            this.inWords[j] = this.iWords[this.actNumber[i]];
          }
          if (this.actNumber[i + 1] !== '0' || this.actNumber[i] > '0') {
            this.inWords[j] = this.inWords[j] + ' lakh';
          }
          break;
        case 6:
          this.tensComplication(i, j);
          break;
        case 7:
          if (this.actNumber[i] == '0' || this.actNumber[i + 1] == '1') {
            this.inWords[j] = '';
          } else {
            this.inWords[j] = this.iWords[this.actNumber[i]];
          }
          this.inWords[j] = this.inWords[j] + ' crore';
          break;
        case 8:
          this.tensComplication(i, j);
          break;
        default:
          break;
      }
      j++;
    }

    this.inWords.reverse();
    for (let i = 0; i < this.inWords.length; i++) {
      finalWord += this.inWords[i];
    }
    return finalWord;
  }

  // section: function to get input value, call convert function and display output
  convertAmount(numericValue: number) {
    let amount = numericValue.toString().split('.');
    let taka = amount[0];
    let paisa = amount[1];

    let takaInWords = this.convert(taka);
    let paisaInWords;
    paisa ? (paisaInWords = this.convert(paisa)) : (paisaInWords = 'zero');

    return takaInWords + ' taka and ' + paisaInWords + ' paisa only';
  }
}
