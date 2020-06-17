import Player from './player';

describe('testing player methods', () => {
  // create player instance
  const player1 = Player();

  test('Setting player username', () => {
    const mockSetUsername = jest.fn(username => player1.setUsername(username));
    mockSetUsername('simo');
    expect(mockSetUsername.mock.calls[0][0]).toBe('simo');
  });

  test('Getting player username', () => {
    expect(player1.getUsername()).toBe('simo');
  });

  test('Setting player XO css backgroud string', () => {
    const mockSetXOField = jest.fn(XOString => player1.setXOField(XOString));
    mockSetXOField('center no-repeat url("./01.svg")');
    expect(mockSetXOField.mock.calls[0][0]).toBe('center no-repeat url("./01.svg")');
  });

  test('Getting player XO css backgroud string', () => {
    expect(player1.getXOField()).toBe('center no-repeat url("./01.svg")');
  });

  test('Setting player X or O pick', () => {
    const mockSetXO = jest.fn(XO => player1.setXO(XO));
    mockSetXO('X');
    expect(mockSetXO.mock.calls[0][0]).toBe('X');
  });

  test('Getting player X or O pick', () => {
    expect(player1.getXO()).toBe('X');
  });

  test('Setting/getting player score', () => {
    // since after every call score increment by 1
    expect(player1.setScore()).toBe(1);
    expect(player1.getScore()).toBe(1);
  });

  test('Setting player picked field number(from 1 to 9) while return array of picked fields if array size greater than 2 or return false otherwise', () => {
    expect(player1.fieldsPick(8)).toBe(false);
    expect(player1.fieldsPick(2)).toBe(false);
    expect(player1.fieldsPick(1)).toStrictEqual([8, 2, 1]);
  });

  test('Reset player picked fields', () => {
    expect(player1.resetPickedFields()).toStrictEqual([]);
  });

  test('Reset player score', () => {
    expect(player1.resetScore()).toBe(0);
  });
});