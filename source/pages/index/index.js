import './index.pug';
import 'normalize.css';
import './index.scss';


// задачка по числам
let numberArray = [1, 3, 5, 7.9, 9.1, 11, 13, 15];

for (let x=0; x<numberArray.length; x++) {
  let a = numberArray[x];
  //  console.log(numberArray[x] + ' X');
  for (let y=0; y<numberArray.length; y++) {
    let b = numberArray[y];
    //    console.log(numberArray[y] + ' Y');
    for (let z=0; z<numberArray.length; z++) {
      let c = numberArray[z];
      //      console.log(numberArray[z] + ' Z');
      let answer = a + b + c;
      //      console.log(answer + ' ответ');

      if (answer === 30) {
        console.log(a + ' + ' + b + ' + ' + c + ' = 30');
      }
    }
  }
}

console.log('index');