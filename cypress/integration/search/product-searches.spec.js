import { Search } from "../../page-objects/search";
import search from "../../fixtures/search";
import selectors from "../../fixtures/selectors/hyva/search";

describe("Perform searches", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Can perform search with multiple hits", () => {
        Search.search(search.productCategory);
        cy.get(selectors.pageHeader).should(
            "have.text",
            `Search results for: '${search.productCategory}'`
        );
    });

    it("Can find a single product", () => {
        Search.search(search.singleProduct);
        cy.get(selectors.successMessage)
            .should("be.visible")
            .should(
                "contain.text",
                `${search.sinpleProductName} is the only product matching your '${search.singleProduct}' search.`
            );
    });

    it("Can show a page for no search results when the searchterm cannot give any results", () => {
        Search.search(search.noResults);
        cy.get(selectors.pageHeader)
            .should("be.visible")
            .should(
                "contain.text",
                `Search results for: '${search.noResults}'`
            );
        cy.get(selectors.noResultsMessage)
            .should("be.visible")
            .should("contain.text", "Your search returned no results.");
    });

    it("Can show suggestions when entering search terms", () => {
        cy.get(selectors.headerSearchIcon).click();
        cy.get(selectors.headerSearchField)
            .should("be.visible")
            .type(`${search.getHint}`);
        cy.get(selectors.searchSuggestions)
            .should("be.visible")
            .should("contain.text", search.hintResult);
    });
});
