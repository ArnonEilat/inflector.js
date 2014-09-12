/**
 *  @param {string} expression
 *  @param {string} replacement
 *  @constructor
 **/
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