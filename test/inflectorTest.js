var expect = chai.expect;

describe("Inflector", function() {

    describe("Pluralize", function() {
        it("should pluralize word", function() {
            expect(inflector.pluralize("post")).to.equal("posts");
            expect(inflector.pluralize("octopus")).to.equal("octopi");
            expect(inflector.pluralize("sheep")).to.equal("sheep");
            expect(inflector.pluralize("words")).to.equal("words");
            expect(inflector.pluralize("the blue mailman")).to.equal("the blue mailmen");
        });

    });


    describe("Singularize", function() {
        it("should singularize word", function() {
            expect(inflector.singularize("posts")).to.equal("post");
            expect(inflector.singularize("octopi")).to.equal("octopus");
            expect(inflector.singularize("sheep")).to.equal("sheep");
            expect(inflector.singularize("words")).to.equal("word");
            expect(inflector.singularize("the blue mailmen")).to.equal("the blue mailman");
        });




    });


});