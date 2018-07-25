import { RouteList } from './Routes';
import shifts from '../data/shifts.json';
import config from '../data/config.json'

describe('Testing for Routes.js', () => {
  it('RouteList is defined correctly', () => {
    const routeArray = RouteList({ shifts, config });
    expect(routeArray.length).toBeGreaterThan(0);
  })
})