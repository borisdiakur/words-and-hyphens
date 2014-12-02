'use strict';
/* global describe, it */

var assert = require('assert');
var pattern = require('hyphenation.de');
var extractor = require('../index.js')(pattern);

describe('words-and-hyphens', function () {

    describe('unit tests', function () {

        describe('uniqueWords', function () {

            it('should return an array of unique words', function () {
                var output = extractor.uniqueWords('My, st[ring] *full* of %punct) "and\' of the same Same same words.');
                assert.strictEqual(output[0], 'and');
                assert.strictEqual(output[1], 'full');
                assert.strictEqual(output[2], 'My');
                assert.strictEqual(output[3], 'of');
                assert.strictEqual(output[4], 'punct');
                assert.strictEqual(output[5], 'same');
                assert.strictEqual(output[6], 'string');
                assert.strictEqual(output[7], 'the');
                assert.strictEqual(output[8], 'words');
            });

            it('should return an array of unique case sensitive words', function () {
                var output = extractor.uniqueWords('My, st[ring] *full* of %punct) "and\' of the same Same same words.', true);
                assert.strictEqual(output[0], 'and');
                assert.strictEqual(output[1], 'full');
                assert.strictEqual(output[2], 'My');
                assert.strictEqual(output[3], 'of');
                assert.strictEqual(output[4], 'punct');
                assert.strictEqual(output[5], 'Same');
                assert.strictEqual(output[6], 'same');
                assert.strictEqual(output[7], 'string');
                assert.strictEqual(output[8], 'the');
                assert.strictEqual(output[9], 'words');
            });
        });

        describe('uniqueHyphens', function () {

           it('should return an array of lower-case unique hyphens', function () {
                var output = extractor.uniqueHyphens('Fischers\' Fritz fischt frische Fische.');
                assert.strictEqual(output[0], 'fi');
                assert.strictEqual(output[1], 'fischt');
                assert.strictEqual(output[2], 'fri');
                assert.strictEqual(output[3], 'fritz');
                assert.strictEqual(output[4], 'sche');
                assert.strictEqual(output[5], 'schers');
            });
        });
    });
});
