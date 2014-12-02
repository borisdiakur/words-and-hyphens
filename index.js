'use strict';

module.exports = function (pattern) {

    var _ = require('lodash'),
        S = require('string'),
        Hypher = require('hypher'),
        h = new Hypher(pattern);

    function comperator(a, b) {
        var aLower = a.toLowerCase(),
            bLower = b.toLowerCase();
        if (aLower === bLower) {
            return a > b;
        }
        return aLower > bLower;
    }
    function uniqueWords(str, matchCase) {
        str = String(str);
        return _.uniq(S(str).stripPunctuation().split(' '), function (word) {
            return matchCase ? word : word.toLowerCase();
        }).sort(comperator);
    }
    function uniqueHyphens(str) {
        var uWords = uniqueWords(str),
            uHyphens = [];

        _.forEach(uWords, function (word) {
            uHyphens = _.union(uHyphens, _.uniq(h.hyphenate(word), function (hyphen) {
                return hyphen.toLowerCase();
            }));
        });

        return uHyphens.sort(comperator).join(' ').toLowerCase().split(' ');
    }

    return {
        uniqueWords: uniqueWords,
        uniqueHyphens: uniqueHyphens
    };
};
