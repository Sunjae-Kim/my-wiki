# Scope

모든 binding 에는 **scope** 가 존재한다. function 혹은 block 의 밖에서 선언되는 binding 들의 scope 는 프로그램 전체에 해당되는데 이를 **global scope** 라고 한다.

반면에 함수의 매개변수로 선언되거나 혹은 함수 body 내에서 선언되는 함수는 해당 함수 내에서만 참조할 수 있으며 이는 **local binding ** 이라고 부른다. 함수가 매번 호출될 때마다 새로운 local binding 들이 생성이 되며 이는 같은 함수가 호출이 되더라도 해당 함수만의 고유 binding 으로 독립적으로 존재한다.

`let` 과 `const` 로 선언된 바인딩은 해당 바인딩이 선언된 **블록**에 대해서 local binding 이기 때문에, 반복문을 작성한다고 한다면 반복문 내부에서 바인딩 하나를 생성하면 반복문 전후의 코드가 이를 볼 수 없다. 2015년 이전 JS 에서는 함수만이 새로운 scope 를 만들 수 있었고 블록 단위의 스코프가 없었기 때문에, `var` 키워드로 만든 이전 방식의 binding 은 모든 함수, 또는 함수에 없는 경우 글로벌 범위에서 볼 수 있었다.

```js
let x = 10;
if (true) {
  let y = 20;
  var z = 30;
  console.log(x + y + z);
  // → 60
}
// y is not visible here
console.log(x + z);
// → 40
```

scope 는 주변의 scope 를 '관찰' 할 수 있다. 만약 동일한 이름의 여러개의 binding 이 있다면 어떻게 될까? 이 경우에는 가장 안쪽에 있는 binding 을 인식하게 된다. 아래의 예시를 살펴보자.

```js
const halve = function(n) {
  return n / 2;
};

let n = 10;
console.log(halve(100));
// → 50
console.log(n);
// → 10
```

> global `n` 이 선언이 됐어도 매개변수로 받은 `n` 이 가장 안쪽의 scope 이기 때문에 `halve` 의 반환 값은 매개변수로 받은 `n` 을 계산한 값이 된다.

<br>

## Nesting Scope

JS 는 글로벌 바인딩과 로컬 바인딩만 구별하지 않는다. 블록과 함수는 다른 블록과 함수 안에서 생성될 수 있으며, 여러번 nesting 이 발생할 수 있다.

아래의 예시를 살펴보자 :

```js
const hummus = function(factor) {
  const ingredient = function(amount, unit, name) {
    let ingredientAmount = amount * factor;
    if (ingredientAmount > 1) {
      unit += "s";
    }
    console.log(`${ingredientAmount} ${unit} ${name}`);
  };
  ingredient(1, "can", "chickpeas");
  ingredient(0.25, "cup", "tahini");
  ingredient(0.25, "cup", "lemon juice");
  ingredient(1, "clove", "garlic");
  ingredient(2, "tablespoon", "olive oil");
  ingredient(0.5, "teaspoon", "cumin");
};
```

`ingredient` 함수에서 외부에서 호출된 `hummus` 의 매개변수를 사용하는 모습을 볼 수 있다. 그러나 해당 함수의 local binding 들은 외부에서 호출된 함수에서는 볼 수 없다.

Block 안에서 볼 수 있는 binding 의 집합은 프로그램 텍스트에서 해당 블록 위치에 따라 결정된다. 각 local scope 는 이를 포함하는 모든 local scope 도 볼 수 있으며, 모든 scope 는 global scope 를 볼 수 있다. 이러한 형태로 binding 의 가시성에 접근하는것을 **lexical scoping** 이라고 한다.

<br>

## Examples

아래 코드로 흔히 실수할 수 있는 scope 문제의 예시를 살펴보자 :

```js
function addEventHandler() {
	  var box = document.getElementsByClassName("box");
	  for (var i = 0; i < box.length; i++) {
	    var ingredient = elTweet[i].getElementsByClassName("ingredient");
	    ingredient[0].onclick = function() {
	      var ingredientName = ingredient[0].innerHTML;
	      filterByName(ingredientName);
	    };
	  }
	}
```

해당 함수의 경우에는 모든 ingredient 에 `onclick` 함수가 생기고 난 다음 모든 ingredient에서  `onclick` 이벤트가 발생될 때 항상 box 의 마지막 index 에 있는 ingredient 의 이름으로 분류가 될 것이다. 그 이유는 scope 의 문제인데 `var` 는 함수단위 scope 로 어느 index 에서 `onclick` 이벤트가 발생 되더라도 항상 마지막으로 선언된 `var ingredient` 의 `innerHTML` 속성을 취하게 된다. 이러한 문제를 해결하는 방법은 세가지 정도가 있다.

1. block 단위 scope 로 바꾸어져서 for loop 가 돌아가는 매 순간마다 새로운 `ingredient` 가 생성되게 하는 법
2. IIFE (즉시 실행 함수) 를 사용하여 함수가 선언됨가 동시에 실행을 시켜 모든 `ingredient` 를 즉시 실행되는 함수의 scope 로 생성되게 하는 법
3. `ingredient` 를 생성하고 `onclick` event 를 부여하는 함수를 따로 만들어서 for loop 안에서 호출하는 법

아래에서 위 3가지 방법에 대한 코드를 확인해보자.

1. ```js
   function addEventHandler() {
   	  var box = document.getElementsByClassName("box");
   	  for (var i = 0; i < box.length; i++) {
   	    let ingredient = box[i].getElementsByClassName("ingredient");
   	    ingredient[0].onclick = function() {
   	      var ingredientName = ingredient[0].innerHTML;
   	      filterByName(ingredientName);
   	    };
   	  }
   }
   ```

2. ```js
   function addEventHandler() {
   	  var box = document.getElementsByClassName("box");
   	  for (var i = 0; i < box.length; i++) {
           (function() {
   	      var ingredient = box[i].getElementsByClassName("ingredient");
   	      ingredient[0].onclick = function() {
   	        var ingredientName = ingredient[0].innerHTML;
   	        filterByName(ingredientName);
   	      };
           })();
   	  }
   }
   ```

3. ```js
   function addEventHandler() {
   	  var box = document.getElementsByClassName("box");
   	  for (var i = 0; i < box.length; i++) {
           addOnClickEvent(box[i].getElementsByClassName("ingredient"))
   	  }
   }
   
   function addOnClickEvent(ingredient) {
   	  ingredient[0].onclick = function() {
   	        var ingredientName = ingredient[0].innerHTML;
   	        filterByName(ingredientName);
         };
   }
   ```

<br>

## Lexical Scope

Lexical scoping 에 대해 더 자세히 알아보자.

```js
const x = 10;
const first = function(){
    console.log(x);
}

const second = function(){
    const x = 20;
    first();
}

second();
```

lexical scoping rule 을 따르는 Javascript 에서는 함수가 실행되는 순간이 아닌 code 를 작성할 때의 scope 를 따른다. 아래에서 위의 코드를 흐름을 순차적으로 보면서 어떤 일들이 벌어지는지 확인해보자.

1. ```js
   second(); 					// second 함수가 실행된다.
   ```

2. ```js
   const second = function(){ 	// 실행되는 second 함수
       const x = 20; 			// local binding 이 생성된다.
       first(); 				// first 함수가 실행된다.
   }
   ```

3. ```js
   const first = function(){ 	// 실행되는 first 함수
       console.log(x); 		// ?????
   }
   ```

 `second` 함수가 실행되는 순간에 `second` 함수 내부에서 `x` 가 local binding 으로 생성이 된다. 그리고 `first` 함수가 실행이 되면서 `x` 를 출력을 하게 되는데 이 때 `x` 는 전역에서 생성한 `x` 가 될까 `second` 에서 생성한 `x` 가 될까? 

정답은 전역 binding `x` 이다. `first` 함수가 `second` 함수 내부에서 동작하기 때문에 `second` 함수의 local binding `x` 가 `first` 함수의 `console.log(x)` 으로 출력이 된다고 생각할 수도 있지만 JavaScript 는 lexical scoping rule 을 따르기 때문에 함수가 실행이 되는 시점이 아닌 코드를 작성을 하는 순간의 scope 를 따르게 되어 전역 binding `x` 를 출력하게 된다. 때문에 이미 `first` 함수를 작성하고 있는 시점에 `console.log(x)` 의 `x` 는 전역에서 생성한 `x` 를 가르키게 되는 것이다.

