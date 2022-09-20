import {calculateModes, closestEl, modeClassNames, str2array, str2color, tagNameIs, timer, uuidv4} from '../assets/js/util';
import {modeMoniker} from '../assets/js/constants';

test('calculateModes', () => {
  expect(calculateModes(modeMoniker, '')).toEqual({});
  expect(calculateModes(modeMoniker, 'vo')).toEqual({'@': true, '+': true});
  expect(calculateModes(modeMoniker, '+vx')).toEqual({'+': true, 'x': true});
  expect(calculateModes(modeMoniker, '-xo')).toEqual({'@': false, 'x': false});
  expect(calculateModes(modeMoniker, '-im+n')).toEqual({i: false, m: false, n: true});
});

test('closestEl', () => {
  const el = document.createElement('div');
  expect(closestEl(el, el)).toBe(el);

  const parent = document.createElement('div');
  expect(closestEl(el, parent)).toBe(null);

  parent.appendChild(el)
  expect(closestEl(el, parent)).toBe(parent);

  expect(closestEl(el, '.foo')).toBe(null);
  parent.className = 'foo';
  expect(closestEl(el, '.foo')).toBe(parent);
  el.className = 'foo';
  expect(closestEl(el, '.foo')).toBe(el);
});

test('modeClassNames', () => {
  expect(modeClassNames({})).toBe('');
  expect(modeClassNames({operator: true})).toBe('has-mode-operator');
  expect(modeClassNames({operator: true, voice: true})).toBe('has-mode-operator has-mode-voice');
  expect(modeClassNames({operator: false, voice: true})).toBe('has-mode-voice');
});

test('str2array', () => {
  expect(str2array()).toEqual([]);
  expect(str2array(undefined)).toEqual([]);
  expect(str2array(false)).toEqual([]);
  expect(str2array('  ')).toEqual([]);
  expect(str2array(' foo,. bar  ')).toEqual(['foo', 'bar']);
});

test('str2color', () => {
  expect(str2color('')).toBe('#000');
  expect(str2color('supergirl')).toBe('#b06bb2');
});

test('tagNameIs', () => {
  expect(tagNameIs(null, 'body')).toBe(false);
  expect(tagNameIs({}, 'body')).toBe(false);
  expect(tagNameIs({tagName: 'BODY'}, 'body')).toBe(true);
});

test('uuidv4', () => {
  const re = expect.stringMatching('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');
  const uuid = [uuidv4(), uuidv4()];
  expect(uuid[0]).toEqual(re);
  expect(uuid[1]).toEqual(re);
  expect(uuid[0]).not.toBe(uuid[1]);
});
