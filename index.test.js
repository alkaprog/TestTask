const { TreeStore } = require("./index");
const cloneDeep = require("lodash.clonedeep");
var isEqual = require("lodash.isequal");

const testArr = [
    { id: 1, parent: "root" },
    { id: 2, parent: 1, type: "test" },
    { id: 3, parent: 1, type: "test" },
    { id: 4, parent: 2, type: "test" },
    { id: 5, parent: 2, type: "test" },
    { id: 6, parent: 2, type: "test" },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

test("getItem test", () => {
    const ts = new TreeStore(cloneDeep(testArr));
    expect(isEqual(ts.getItem(1), { id: 1, parent: "root" })).toBe(true);
    expect(isEqual(ts.getItem(100), undefined)).toBe(true);
    expect(isEqual(ts.getItem("1"), undefined)).toBe(true);
    expect(isEqual(ts.getItem(), undefined)).toBe(true);
});

test("getAll test", () => {
    let ts = new TreeStore(cloneDeep(testArr));
    expect(isEqual(ts.getAll(), cloneDeep(testArr))).toBe(true);

    ts = new TreeStore([]);
    expect(isEqual(ts.getAll(), [])).toBe(true);
});

test("getChildren test", () => {
    let ts = new TreeStore(cloneDeep(testArr));
    expect(
        isEqual(ts.getChildren(4), [
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ])
    ).toBe(true);

    expect(isEqual(ts.getChildren(5), [])).toBe(true);

    expect(
        isEqual(ts.getChildren(2), [
            { id: 4, parent: 2, type: "test" },
            { id: 5, parent: 2, type: "test" },
            { id: 6, parent: 2, type: "test" },
        ])
    ).toBe(true);

    expect(() => {
        ts.getChildren(100);
    }).toThrow();

    ts = new TreeStore([]);

    expect(() => {
        ts.getChildren(1);
    }).toThrow();
});

test("getAllChildren test", () => {
    let ts = new TreeStore(cloneDeep(testArr));

    expect(
        isEqual(ts.getAllChildren(2), [
            { id: 4, parent: 2, type: "test" },
            { id: 5, parent: 2, type: "test" },
            { id: 6, parent: 2, type: "test" },
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ])
    ).toBe(true);

    expect(isEqual(ts.getAllChildren(3), [])).toBe(true);

    expect(() => {
        ts.getAllChildren(100);
    }).toThrow();
});
test("getAllParents test", () => {
    let ts = new TreeStore(cloneDeep(testArr));

    expect(
        isEqual(ts.getAllParents(7), [
            { id: 4, parent: 2, type: "test" },
            { id: 2, parent: 1, type: "test" },
            { id: 1, parent: "root" },
        ])
    ).toBe(true);

    expect(isEqual(ts.getAllParents(2), [{ id: 1, parent: "root" }])).toBe(
        true
    );

    expect(isEqual(ts.getAllParents(1), [])).toBe(true);

    expect(() => {
        ts.getAllParents(100);
    }).toThrow();
});
