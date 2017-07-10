import React from 'react';
import renderer from 'react-test-renderer';
import { Date } from './Date';

describe("Date component", () => {

  test("should create and configure month, day, and year components", () => {
    let day = '10',
        month = '07',
        year = '2017';
    let changeMock = jest.fn((type, value) => {
      return value;
    });
    let date = renderer.create(
      <Date day={day}
            month={month}
            year={year}
            dateChange={changeMock}
      />
    );

    expect(date.toJSON().children[0].props.value).toBe('07');
    expect(date.toJSON().children[1].props.value).toBe('10');
    expect(date.toJSON().children[2].props.value).toBe('2017');

    expect(date.toJSON().children[0].props.onChange({target: { value: 'month changed'}})).toBe('month changed');
    expect(changeMock.mock.calls[0]).toEqual(["month", "month changed"]);
    expect(date.toJSON().children[1].props.onChange({target: { value: 'day changed'}})).toBe('day changed');
    expect(changeMock.mock.calls[1]).toEqual(["day", "day changed"]);
    expect(date.toJSON().children[2].props.onChange({target: { value: 'year changed'}})).toBe('year changed');
    expect(changeMock.mock.calls[2]).toEqual(["year", "year changed"]);
  });

});
