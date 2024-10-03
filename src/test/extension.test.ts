import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { sortObject } from '../sortObject';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});

suite('sortObject Tests', () => {
    test('should sort object keys', () => {
        const input = { b: 2, a: 1, c: 3 };
        const expected = { a: 1, b: 2, c: 3 };
        assert.deepStrictEqual(sortObject(input), expected);
    });

    test('should sort nested objects', () => {
        const input = { b: { d: 4, c: 3 }, a: 1 };
        const expected = { a: 1, b: { c: 3, d: 4 } };
        assert.deepStrictEqual(sortObject(input), expected);
    });

    test('should sort arrays of objects', () => {
        const input = [{ b: 2, a: 1 }, { d: 4, c: 3 }];
        const expected = [{ a: 1, b: 2 }, { c: 3, d: 4 }];
        assert.deepStrictEqual(sortObject(input), expected);
    });

    test('should handle primitive types', () => {
        assert.strictEqual(sortObject(1), 1);
        assert.strictEqual(sortObject('string'), 'string');
        assert.strictEqual(sortObject(true), true);
    });

    test('should handle null and undefined', () => {
        assert.strictEqual(sortObject(null), null);
        assert.strictEqual(sortObject(undefined), undefined);
    });
});