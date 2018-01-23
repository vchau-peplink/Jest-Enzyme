import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'

class TestComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  getData () {
    return Promise.resolve([1, 2, 3])
  }

  componentWillMount () {
    this.getData()
      .then(data => {
        this.setState({
          data
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  render () {
    return (
      <div>
        {this.state.data.map(n => <span key={n} />)}
      </div>
    )
  }
}

let wrapper

beforeEach(async () => {
  wrapper = await shallow(<TestComponent />)
  wrapper.update()
})

describe('----- Testing Component ------', () => {
  it('should have three <span />', () => {
    expect(wrapper.find('span')).toHaveLength(3)
  })
})
