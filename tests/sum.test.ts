import { sumt } from "../src/sum";
import sum from "../src/sums";


describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});

describe('sumt module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sumt(1, 2)).toBe(3);
    });
});