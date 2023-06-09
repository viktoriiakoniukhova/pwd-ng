import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pwd-ng';
  inputValue = '';
  strength = '';

  onKey(value: string) {
    this.inputValue = value;
    this.strength = !this.inputValue.length
      ? 'unset'
      : calcStrength(this.inputValue);
  }
}

interface Validations {
  [key: string]: RegExp;
}

//symbols:  "#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]

const validations: Validations = {
  easy: /^[A-Za-z]+$|^\d+$|^[^\w\s]+$/,
  medium:
    /(^\d*[a-zA-Z][a-zA-Z\d]*$)|^\d*[\d#\$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]*$|^[#\$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]*[a-zA-Z][a-zA-Z#\$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]*$/,
  strong: /^[a-zA-Z0-9#\$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]*$/,
};

function calcStrength(inputValue: string) {
  if (inputValue.length < 8) return 'short';

  for (const key in validations) {
    if (validations.hasOwnProperty(key)) {
      if (validations[key].test(inputValue)) {
        return key;
      }
    }
  }
  return 'unset'; // Return str if no match is found
}
