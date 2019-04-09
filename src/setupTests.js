import 'jest-dom/extend-expect'
import { cleanup } from 'react-testing-library'

beforeEach(() => {
  jest.resetAllMocks()
})

afterEach(cleanup)
