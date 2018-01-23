# Jest-Enzyme
## Resolved promise callback execution timing

If we don't return a promise in `beforeEach()`, the callback code in `this.getData().then()` is not be executed before `wrapper.update()`.
Thus the test case would fail.

The strange thing is that, in that case, the callback code would be executed between the end of `beforeEach()` and the start of the test case!
As a result, at the begining of the test case, the state is updated, but the rendering is not update.

### Summary

#### Doesn't work
```js
beforeEach(() => {
  wrapper = shallow(<TestComponent />)
  
  // then() callback not executed yet!
  wrapper.update()
})

describe('----- Testing Component ------', () => {
  it('should have three <span />', () => {
    expect(wrapper.find('span')).toHaveLength(3)
  })
})
```

#### Work
```js
beforeEach(async () => {
  wrapper = await shallow(<TestComponent />)
  wrapper.update()
})

describe('----- Testing Component ------', () => {
  it('should have three <span />', () => {
    expect(wrapper.find('span')).toHaveLength(3)
  })
})
```

#### Work
```js
beforeEach(() => {
  wrapper = shallow(<TestComponent />)
})

describe('----- Testing Component ------', () => {
  it('should have three <span />', () => {
    wrapper.update()
    expect(wrapper.find('span')).toHaveLength(3)
  })
})
```

#### Work
```js
beforeEach(() => {
  wrapper = shallow(<TestComponent />)
})

describe('----- Testing Component ------', () => {
  beforeEach(() => {
    wrapper.update()
  })
  
  it('should have three <span />', () => {
    expect(wrapper.find('span')).toHaveLength(3)
  })
})
```
