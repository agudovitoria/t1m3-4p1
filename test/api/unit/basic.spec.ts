describe('Basic test', (): any => {
    it('should add two numbers', (): any => {
        const A:number = 2.0;
        const B:number = 3.0;
        const EXPECTED:number = 5.0;

        return expect(A + B).toEqual(EXPECTED);
    });
});