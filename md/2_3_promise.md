```js
// 동기
var sync1 = function(param){ return param*2; }
var sync2 = function(param){ return param*3; }
  
var start = 1;
console.log(sync2(sync1(start))); // 6

// Promise 등장 전에 사용 되었던 비동기 (콜백 패턴)
// 단점: 함수가 많아질 수록 코드가 상당히 복잡해짐
var async1 = function(param, callback) { callback(param*2); }
var async2 = function(param, callback) { callback(param*3); }
 
var start = 1;
 
async1(start, result => {
    async2(result, result => {
        async3(result, result => {
            console.log(result); // 6
        });
    });
});
```

<br>


### Promise

- 비동기 처리에 사용되는 객체
- 서버에서 받아온 데이터를 화면에 표시할 때 사용

- 상태
  > 대기중 (pending): 초기 상태, 이행(fulfilled) 또는 거절(rejected) 되기 이전의 상태  
  > 이행됨 (fulfilled): 동작이 성공된 상태 (결과값을 가지고 있음)  
  > 거부됨,처리됨 (rejected): 동작이 실패한 상태
  > 
  > 대기중 -> 이행됨 or 거절됨
- 사용방식1 : `new Promise( (resolve, reject) => {} )` (객체생성)
- 사용방식2 : `Promise.resolve( )`  or  `Promise.reject( )` (resolve 일때만 객체생성)

  ```js
  const a = Promise.resoleve(123);
  console.log( a !== 123 ); // true
  console.log(a); // Promise { <resoleved> : 123 }  (이행됨 프로미스 반환됨)
  ```

  ```js
  // Promise.resolve( ) 안에 프로미스가 입력되면 그 자신이 반환됨 - ???
  const b = new Promise(resolve => setTimeout(() => resolve(10), 1));
  console.log(Promise.resolve(b) === b);  // true
  ```

<br>

### then 메서드

- 거부/처리됨(reject) 상태가 된 프로미스를 처리할 때 사용되는 메서드   
- **항상 연결된 순서대로 호출 (비동기지만 동기처럼 코드 작성 가능)**   
- 프로미스가 아닌 값을 반환하면 then 메서드는 **이행됨 프로미스**를 반환함   
- 함수 내부에서 예외가 발생되면 then 메서드는 **거부됨 프로미스를** 반환함  

    ```js
    requestData().then(onResolve, onReject);  // 상태에 따른 함수 호출
    Promise.resolve(123).then(data => { console.log(data) });  // 123
    Promise.reject('err').then(null, error => { console.log(error) }); //에러 O
    ```

    `onFulfilled` : Promise가 수행될 때 호출되는 Function으로, 이행 값(fulfillment value) 하나를 인수로 받습니다.  
    `onRejected` : Promise가 거부될 때 호출되는 Function으로, 거부 이유(rejection reason) 하나를 인수로 받습니다.

<br>

- 여러 개의 프로미스 연결하기 (Promise Chaining)

  ```js
  new Promise((resolve, reject) => {

    setTimeout(() => { resolve(1) }, 2000);  // 2초 후에 resolve()를 호출

    .then((result) => {
      console.log(result); // 1
      return result + 10;
    })
    .then((result) => {
      console.log(result); // 11
      return result + 20;
    })
    .then((result) => {
      console.log(result); // 31
    });

  });
  ```

<br>


### Promise Error 처리

1. then()의 두 번째 인자로 에러를 처리하는 방법  

    ```js
    .then(null,, error => {
        console.log(error);
    })
    ```    

1. catch()를 이용하는 방법

    catch 메서드도 새로운 프로미스를 반환함 -> catch 메서드 이후에도 계속해서 then 메서드 사용 가능
   
    ```js
    Promise.resolve()
        .then( () => { 
            throw new Error('some error'); 
        })
        .catch( 
            error => { console.log(error); 
        });

    ```

<br>

### finally 메서드

- finally 핸들러는 onFinally 라는 지정된 함수의 Promise가 반환 (어떠한 인수도 전달받지 않음 -> 성공/실패를 알 수 없음)
- 처리됨 상태인 프로미스의 데이터를 건드리지 않고 추가 작업을 할 때 유용하게 사용


```js
// 데이터 요청 성공/실패 와 상관없이 서버에 로그를 보낼때

function requestData()
    .then( data => {
        // 
    })
    .catch( error => {
        // 
    })
    .finally( () => {
        sendLogToServer('requestData finished');
    });
}
requestData().then(data => { console.log(data) });
```

<br>

### Promise.all

- 여러 개의 프로미스를 동시에 처리할 때 사용되는 함수
- 비동기 함수 간에 서로 의존성이 없다면 동시에 처리하는게 빠르다
- 하나라도 거부됨 상태가 된다면 Promise.all 함수가 반환하는 프로미스도 거부됨 상태가 됨

```js
// 사용전
aaa1().then(data => { console.log(data) });
aaa2().then(data => { console.log(data) });

//사용후
Promise.all([aaa1(), aaa2()]).then(([data1, data2]) => {
    console.log( data1, data2 );
});
```

<br>

### 주의할 점

- return 키워드 깜박하지않기
- 프로미스는 불변 객체 라는 사실 명심하기