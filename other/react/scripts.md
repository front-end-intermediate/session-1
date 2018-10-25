# Scripts to Accompany React Demo
  
## scripts One 

```html
<script type="text/javascript">
```

```js
const rootElement = document.getElementById('root')

const element = React.createElement('div', {
  className: 'container',
  children: 'Hello World',
})

ReactDOM.render(element, rootElement)
```

## scripts two

```html
<script type="text/babel">
```

```js
const rootElement = document.getElementById('root')

const content = 'Hello World'
const myClassName = 'container'

const elem = <div className={myClassName}>{content}</div>

ReactDOM.render(elem, rootElement)
```

## scripts three

```html
<script type="text/babel">
```

```js
const rootElement = document.getElementById('root')

const props = {
  className: 'container',
  children: 'Hello World',
}

const element = <div {...props} />

ReactDOM.render(element, rootElement)
```