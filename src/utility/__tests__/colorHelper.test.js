const {
    determineColorForIndex,
    colors: supportedColors,
} = require('./../colorHelper');

describe('colorHelper', () => {
    describe('with an index within the number of colors available', () => {
        it('should always return a different color', () => {
            const colorsUsed = [];

            [0, 1, 2, 3, 4, 5].map(index => {
                let currentColor = determineColorForIndex(index);

                expect(supportedColors).toContain(currentColor);
                expect(currentColor).toMatch(supportedColors[index]);
                expect(colorsUsed.includes(currentColor)).toBe(false);

                colorsUsed.push(currentColor);
            });
        });
    });

    describe('with an index outside the number of colors available', () => {
        it("should always return a color matching it's rest counterpart", () => {
            [6, 7, 8, 9, 10, 11].map(index => {
                let currentColor = determineColorForIndex(index);

                expect(supportedColors).toContain(currentColor);
                expect(currentColor).toMatch(
                    supportedColors[index % supportedColors.length]
                );
            });
        });
    });

    describe('with an index below zero', () => {
        it("should give the same result as with it's absolute counterpart", () => {
            [-1, -2, -3, -4, -5].map(index => {
                let currentColor = determineColorForIndex(index);

                expect(supportedColors).toContain(currentColor);
                expect(currentColor).toMatch(supportedColors[Math.abs(index)]);
            });
        });
    });
});
