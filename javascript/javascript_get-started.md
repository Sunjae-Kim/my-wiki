# Javascript

## Get Started

Browser에서 적용되는 언어

> Browser마다 사용해야하는 문법따위가 너무 달라서 표준을 정함
>
> iexplorer를 제외한 대부분의 브라우저가 ECMA script의 표준을 따름

### Web Service?

> **Web** : web은 컴퓨터들이 정보를 서로 공유할 수 있는 공간이다.
>
> **Service** : server와 client간의 request와 response를 하는 것
>
> * request : get (받다) / post (보내다)
>
> **Web Service** : 서버컴퓨터에서 요청과 응답을 처리할 프로그램

<br>

### HTML

> **HTML** : HyperText Mark-up Language
>
> **HTTP** : HyperText Transfer Protocol
>
> **URL** : Uniform Resource Locator / 네트워크 상에서 자우너이 어디 있는지를 알려주기 위한 고유 규약

### Hyper Text?

선형적인 텍스트가 아닌 비 선형적으로 이루어진 텍스트이며 기본적으로 Hyper Link를 통해 텍스트를 이동한다.

<br>

## Practice

##### a태그 클릭을 통해 h1의 내용을 변경시켜보기

```html
<body>
    <h1 id="hphk">I am JS Ninja</h1>
    <div>
        <a id="who" href="#">who said that?</a> 
    </div>
    <div>
        <a id="what" href="#">said what?</a>
    </div>
</body>
```

```js
const who = document.querySelector('#who');
const what = document.querySelector('#what');

who.addEventListener('click', () => {
    const text = document.querySelector('#hphk');
    text.innerHTML = 'Richard Stallman';
})

what.addEventListener('click', () => {
    const text = document.querySelector('#hphk');
    text.innerHTML = 'Happy hacking.';
})
```










