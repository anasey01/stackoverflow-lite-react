import calculateTime from './calculateTime';

describe('calculate Time', () => {
  it('it should return the time from date', () => {
    const date = '2018-12-09 16:58:41.213+01';
    const time = calculateTime(date);

    expect(time).toBeTruthy();
  });

  it('it should return less than a min ago', () => {
    const date = Date.now();
    const time = calculateTime(date);

    expect(time).toBeTruthy();
  });
});
