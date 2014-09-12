/*! inflector.js - v1.0.0 - 2014-09-12
* Copyright (c) 2014 ; */
var Rule = function(expression, replacement) {
    var expressionPattern = new RegExp(expression);


    /**
     * Apply the rule against the input string, returning the modified
     * string or null if the rule didn't apply (and no modifications were
     * made)
     *
     * @public
     * @param {string} input The input string
     * @return The modified string if this rule applied, or null if the
     *         input was not modified by this rule
     */
    this.apply = function(input) {
        if (!expressionPattern.test(input))
            return null;

        return input.replace(new RegExp(expression), replacement);
    };
};
(function() {
    /**
     * @description Transforms words to singular or plural.
     * This is a (not complete) js port of inflector class by Randall Hauch
     * http://docs.jboss.org/jbossdna/0.5/apidocs/org/jboss/dna/common/text/Inflector.html
     **/
    var Inflector = function() {
        'use strict';

        /**
         * @private
         **/
        var plurals = [];
        /**
         *@private
         **/
        var singulars = [];

        /**
         * The lowercase words that are to be excluded and not processed. This map
         * can be modified by the users via getUncountables().
         */
        var uncountables = [];
        /**
         * @param {string} str string to look for
         * @return {boolean} true if uncountables contains str, otherwise false.
         **/
        uncountables.contains = function(str) {
            var i = this.length;
            while (i--) {
                if (this[i] === str)
                    return true;
            }
            return false;
        };


        /**
         * @description Add to plurals array
         * @param {string} rule
         * @param {string} replacement
         **/
        var addPluralize = function(rule, replacement) {
            var pluralizeRule = new Rule(rule, replacement);
            plurals.push(pluralizeRule);
        };

        /**
         * @description Add to singulars array
         * @param {string} rule
         * @param {string} replacement
         **/
        var addSingularize = function(rule, replacement) {
            var singularizeRule = new Rule(rule, replacement);
            singulars.push(singularizeRule);
        };

        var addIrregular = function(singular, plural) {
            var singularRemainder = singular.length > 1 ? singular.substring(1) : "";
            var pluralRemainder = plural.length > 1 ? plural.substring(1) : "";
            addPluralize("(" + singular.charAt(0) + ")" + singularRemainder + "$", "$1" + pluralRemainder);
            addSingularize("(" + plural.charAt(0) + ")" + pluralRemainder + "$", "$1" + singularRemainder);
        };

        var addUncountable = function(words) {
            words.forEach(function(word) {
                uncountables.push(word.trim().toLowerCase());
            });
        };

        /**
         * @description Add rules
         */
        var initialize = function() {

            addIrregular('person', 'people');
            addIrregular('man', 'men');
            addIrregular('child', 'children');
            addIrregular('sex', 'sexes');
            addIrregular('move', 'moves');
            addIrregular('stadium', 'stadiums');
            addIrregular('quiz', 'quizzes');
            addIrregular('testis', 'testes');

            addUncountable(['equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep']);


            addPluralize('(oxen|octopi|viri|aliases|quizzes)$', '$1'); // special rules
            // Need to check for the following words that are already pluralized:
            addPluralize('(people|men|children|sexes|moves|stadiums)$', '$1'); // irregulars
            addPluralize('(quiz)$', '$1zes');
            addPluralize('^(ox)$', '$1en');
            addPluralize('([m|l])ice$', '$1ice');
            addPluralize('([m|l])ouse$', '$1ice');
            addPluralize('(matr|vert|ind)ix|ex$', '$1ices');
            addPluralize('(x|ch|ss|sh)$', '$1es');
            addPluralize('([^aeiouy]|qu)y$', '$1ies');
            addPluralize('(hive)$', '$1s');
            addPluralize('(?:([^f])fe|([lr])f)$', '$1$2ves');
            addPluralize('sis$', 'ses');
            addPluralize('([ti])a$', '$1a'); // already plural
            addPluralize('([ti])um$', '$1a');
            addPluralize('(buffal|tomat)o$', '$1oes');
            addPluralize('(bu)s$', '$1ses');
            addPluralize('(alias|status)$', '$1es');
            addPluralize('(octop|vir)i$', '$1i'); // already plural
            addPluralize('(octop|vir)us$', '$1i');
            addPluralize('(ax|test)is$', '$1es');
            addPluralize('s$', 's');
            addPluralize('$', 's');


            addSingularize('s$', '');
            addSingularize('(s|si|u)s$', '$1s'); // '-us' and '-ss' are already singular
            addSingularize('(n)ews$', '$1ews');
            addSingularize('([ti])a$', '$1um');
            addSingularize('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$', '$1$2sis');
            addSingularize('(^analy)ses$', '$1sis');
            addSingularize('(^analy)sis$', '$1sis'); // already singular, but ends in 's'
            addSingularize('([^f])ves$', '$1fe');
            addSingularize('(hive)s$', '$1');
            addSingularize('(tive)s$', '$1');
            addSingularize('([lr])ves$', '$1f');
            addSingularize('([^aeiouy]|qu)ies$', '$1y');
            addSingularize('(s)eries$', '$1eries');
            addSingularize('(m)ovies$', '$1ovie');
            addSingularize('(x|ch|ss|sh)es$', '$1');
            addSingularize('([m|l])ice$', '$1ouse');
            addSingularize('(bus)es$', '$1');
            addSingularize('(o)es$', '$1');
            addSingularize('(shoe)s$', '$1');
            addSingularize('(cris|ax|test)is$', '$1is'); // already singular, but ends in 's'
            addSingularize('(cris|ax|test)es$', '$1is');
            addSingularize('(octop|vir)i$', '$1us');
            addSingularize('(octop|vir)us$', '$1us'); // already singular, but ends in 's'
            addSingularize('(alias|status)es$', '$1');
            addSingularize('(alias|status)$', '$1'); // already singular, but ends in 's'
            addSingularize('^(ox)en', '$1');
            addSingularize('(vert|ind)ices$', '$1ex');
            addSingularize('(matr)ices$', '$1ix');
            addSingularize('(quiz)zes$', '$1');


        };

        /**
         * @description Determine whether the supplied word is considered uncountable by
         * the pluralize and singularize methods.
         *
         * @param {string} word the word
         * @return {boolean} true if the plural and singular forms of the word are the same
         */
        var isUncountable = function(word) {
            if (word === null)
                return false;
            var trimmedLower = word.trim().toLowerCase();
            return uncountables.contains(trimmedLower);
        };




        /**
         * Returns the plural form of the word in the string.
         *
         * @param {string} word the word that is to be pluralized.
         * @return {string} The pluralized form of the word, or the word itself if it could
         *         not be pluralized
         */
        this.pluralize = function(word) {
            if (word === null)
                return null;
            var wordStr = word.toString().trim();
            if (wordStr.length === 0)
                return wordStr;
            if (isUncountable(wordStr))
                return wordStr;

            for (var i = 0; i < plurals.length; i++) {
                var result = plurals[i].apply(wordStr);
                if (result !== null)
                    return result;
            }
            return wordStr;
        };

        /**
         * Returns the singular form of the word in the string.
         *
         * @param  {string} word to singularize.
         * @return {string} the singularized form of the word, or the word itself if it could
         *         not be singularized
         */
        this.singularize = function(word) {
            if (word === null)
                return null;
            var wordStr = word.toString().trim();
            if (wordStr.length === 0)
                return wordStr;
            if (isUncountable(wordStr))
                return wordStr;

            for (var i = 0; i < singulars.length; i++) {
                var result = singulars[i].apply(wordStr);
                if (result !== null)
                    return result;
            }
            return wordStr;
        };

        initialize();
    };

    inflector = new Inflector();
})();