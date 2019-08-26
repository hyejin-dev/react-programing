## var

- 함수형 [스코프](2장_단어정리.md#스코프)  

```js
var hello='hello!'  // 전역변수
function sayHello() {
  var hello='hello in function!'; // 지역변수
  console.log(hello);
}
sayHello(); // hello in function!
console.log(hello); // hello! 
```
```js
// for문 예제
for (var i=1; i<=10; i++) {  // 전역변수
     console.log(i); // 1~10까지 출력, 11 X
}
function aNumber() {
     console.log(i); 
}
aNumber(); // 11, 함수 호출시 i는 for문에서 실행된 후 마지막 값을 가르키게 됩니다.
```

```js
// setTimeout 안에서 선언된 모든 함수는 전역 범위에서 실행
var a = 200;
var b = 2;
var myObj = {
     a: 20,
     b: 5,
     result: function() {
          setTimeout(function() {
               console.log(this.a * this.b);
          }, 2000);
     }
}
myObj.result(); //400
```

<br>

- 재선언, 재할당 가능
```js
var a = 1;
var a = 2;
a = 3;
b = 1; 
// b처럼 키워드없이 변수를 정의하면 전역변수가 됨 (에러 X)
// 'use strict' 를 사용하면 에러로 표시됨
```

<br>


- 호이스팅 문제

  변수가 함수내에서 정의 -> 함수의 최상위 선언  
  변수가 함수 바깥에서 정의 -> 전역 컨텍스트의 최상위 선언  
  [임시적 사각지대 TDZ](2장_단어정리.md#임시적) -> 에러 X , undefined 

```js
function aaa() {
  console.log(x); // undefined
  var x = 100;
  console.log(x); // 100
}
aaa();

// 호이스팅 작동 순서
function aaa() {
  var x;  // 변수 호이스팅  (TDZ)
  console.log(x); // undefined
  x = 100;
  console.log(x); // 100
}
aaa();

// 즉시실행함수 : 전역변수 사용을 억제하기 위해 사용 (실행 후 사라짐)
(function () {
  var aaa = {};

  aaa.student = {
    name: 'Lee',
    gender: 'male'
  };
  console.log(aaa.student.name); // Lee
}());
console.log(aaa.student.name); // Uncaught ReferenceError: aaa is not defined
```

<br/>

## let & const
- 블록형 스코프   

  모든 코드 블록(함수, if, for, while, try/catch 등) 내에서 선언 -> 지역변수, 코드블록 외에서 참조 불가능
```js
let foo = 123; // 전역 변수

{
  let foo = 456; // 지역 변수
  let bar = 456; // 지역 변수
}

console.log(foo); // 123
console.log(bar); // ReferenceError: bar is not defined
```


<br>

- [임시적 사각지대 TDZ](2장_단어정리.md#임시적) -> 에러 O (호이스팅 되는것을 보여줌)

```js
console.log(x);  //TDZ에 의해 ReferenceError가 발생
const x = 42;
```

```js
const x = 42;
console.log(x); // 42
```

<br>

## let
- 재선언 불가능, 재할당 가능
```js
let a = 1;
let a = 2;  // 불가능
a = 3; // 가능
```

## const
- 재선언/재할당 불가능
- const로 정의된 객체의 내부 속성값은 수정 가능
```js
const aaa = { name: 'hyejin' };
console.log(aaa.name);  // hyejin

aaa.name = 'react hyejin';
console.log(aaa.name);  // react hyejin

aaa = { age: '20' };  // 재할당 Error 
```


