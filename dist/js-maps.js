"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The `UnsortedMap` object holds key-value pairs and remembers the original
 * insertion order of the keys.
 *
 * @typeparam KeyType The type of elements to be stored as keys.
 * @typeparam ValueType The type of elements to be stored as values.
 */
class UnsortedMap {
    /**
     * @param keys An array of elements to be used as initial keys.
     * @param values An array of elements to be used as initial values.
     */
    constructor(keys = [], values = []) {
        this.keys = keys;
        this.values = values;
    }
    /**
     * The `get()` method returns a specified element from the calling object.
     *
     * @param key The key of the element to return from the calling object.
     * @returns The element associated with the specified key, or `undefined` if
     * the key can't be found in the calling object.
     */
    get(key) {
        const index = this.keys.indexOf(key);
        return this.values[index];
    }
    /**
     * The `set()` method adds or updates an element with a specified key and a
     * value to the object.
     *
     * @param setKey The key of the element to add to the object.
     * @param setValue The value of the element to add to the object.
     * @returns The object itself.
     */
    set(setKey, setValue) {
        let index = this.keys.indexOf(setKey);
        if (index === -1) {
            this.keys.push(setKey);
            this.values.push(setValue);
        }
        else {
            this.keys[index] = setKey;
            this.values[index] = setValue;
        }
        return this;
    }
    /**
     * The `has()` method returns a boolean indicating whether an element with the
     * specified key exists or not.
     * @param key The key of the element to test for presence in the object.
     * @returns `true` if an element with the specified key exists in the object;
     * otherwise `false`.
     */
    has(key) {
        return this.keys.indexOf(key) > -1;
    }
    /**
     * The `map()` method creates a new object of the same class with the results
     * of calling a provided function on every element in the calling object.
     *
     * @returns A new object of the same class with each element being the result
     * of the callback function.
     */
    map(callback) {
        const keys = this.keys.concat([]);
        const values = this.keys.map((key, i) => callback(key, this.values[i]));
        return new this.constructor(keys, values);
    }
    /**
     * The `upsert()` method adds or updates an element with a specified key and a
     * value with the results of calling a provided function on element that
     * is currently assigned to the specified key in the calling object. If the
     * specified key does not exist in the calling object, the provided function
     * with be called with `undefined` as current element.
     *
     * @param setKey The key of the element to add or update to the object.
     * @returns The object itself.
     */
    upsert(setKey, callback) {
        const value = this.get(setKey);
        this.set(setKey, callback(value));
        return this;
    }
}
exports.UnsortedMap = UnsortedMap;
/**
 * The `SortedMap` object holds key-value pairs and automatically reorders them
 * by values in descending order.
 *
 * @typeparam KeyType The type of elements to be stored as keys.
 * @typeparam ValueType The type of elements to be stored as values. Should
 * extend `number` type.
 */
class SortedMap extends UnsortedMap {
    /**
     * @param keys An array of elements to be used as initial keys.
     * @param values An array of elements to be used as initial values.
     */
    constructor(keys = [], values = []) {
        if (!!keys && !!values) {
            let tempKey, tempValue;
            for (let i = 0, il = values.length; i < il; i++) {
                for (let j = i + 1, jl = values.length; j < jl; j++) {
                    if (values[i] < values[j]) {
                        tempValue = values[j];
                        values[j] = values[i];
                        values[i] = tempValue;
                        tempKey = keys[j];
                        keys[j] = keys[i];
                        keys[i] = tempKey;
                    }
                }
            }
        }
        super();
    }
    /**
     * The `set()` method adds or updates an element with a specified key and a
     * value to the object while keeping both keys and values sorted.
     *
     * @param setKey The key of the element to add to the object.
     * @param setValue The value of the element to add to the object.
     * @returns The object itself.
     */
    set(setKey, setValue) {
        // if key already exists - remove key value
        const index = this.keys.indexOf(setKey);
        if (index > -1) {
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
        }
        // start from end, move all elements one index up, until finds a
        // suitable place for value
        for (let i = this.values.length; i > -1; i--) {
            if (i === 0 || this.values[i - 1] > setValue) {
                this.keys[i] = setKey;
                this.values[i] = setValue;
                break;
            }
            else {
                this.keys[i] = this.keys[i - 1];
                this.values[i] = this.values[i - 1];
            }
        }
        return this;
    }
}
exports.SortedMap = SortedMap;
//# sourceMappingURL=js-maps.js.map