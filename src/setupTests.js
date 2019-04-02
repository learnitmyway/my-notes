import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { cleanup } from 'react-testing-library'

configure({ adapter: new Adapter() })

beforeEach(() => {
  jest.resetAllMocks()
})

afterEach(cleanup)
