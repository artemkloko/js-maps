/**
 * The `UnsortedMap` object holds key-value pairs and remembers the original
 * insertion order of the keys.
 *
 * @typeparam KeyType The type of elements to be stored as keys.
 * @typeparam ValueType The type of elements to be stored as values.
 */
export declare class UnsortedMap<KeyType, ValueType> {
    /**
     * Storage of the elements used for keys.
     */
    keys: KeyType[];
    /**
     * Storage of the elements used for values.
     */
    values: ValueType[];
    /**
     * @param keys An array of elements to be used as initial keys.
     * @param values An array of elements to be used as initial values.
     */
    constructor(keys?: KeyType[], values?: ValueType[]);
    /**
     * The `get()` method returns a specified element from the calling object.
     *
     * @param key The key of the element to return from the calling object.
     * @returns The element associated with the specified key, or `undefined` if
     * the key can't be found in the calling object.
     */
    get(key: KeyType): ValueType | undefined;
    /**
     * The `set()` method adds or updates an element with a specified key and a
     * value to the object.
     *
     * @param setKey The key of the element to add to the object.
     * @param setValue The value of the element to add to the object.
     * @returns The object itself.
     */
    set(setKey: KeyType, setValue: ValueType): this;
    /**
     * The `has()` method returns a boolean indicating whether an element with the
     * specified key exists or not.
     * @param key The key of the element to test for presence in the object.
     * @returns `true` if an element with the specified key exists in the object;
     * otherwise `false`.
     */
    has(key: KeyType): boolean;
    /**
     * The `map()` method creates a new object of the same class with the results
     * of calling a provided function on every element in the calling object.
     *
     * @returns A new object of the same class with each element being the result
     * of the callback function.
     */
    map(callback: 
    /**
     * Function that produces an element of the new object for each of the keys
     * in the calling object.
     *
     * @param key The key of the current element being processed in the object.
     * @param value The current element being processed in the object.
     * @returns The new element to set for the specified key.
     */
    (key: KeyType, value: ValueType) => ValueType): this;
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
    upsert(setKey: KeyType, callback: 
    /**
     * Function that produces a new element for the specified key in the calling
     * object.
     *
     * @param currentValue The current element that is assigned to the specified
     * key. `undefined` if the key does not exist in the calling object.
     * @returns The new element to set for the specified key.
     */
    (currentValue: ValueType | undefined) => ValueType): this;
}
/**
 * The `SortedMap` object holds key-value pairs and automatically reorders them
 * by values in descending order.
 *
 * @typeparam KeyType The type of elements to be stored as keys.
 * @typeparam ValueType The type of elements to be stored as values. Should
 * extend `number` type.
 */
export declare class SortedMap<KeyType, ValueType extends number> extends UnsortedMap<KeyType, ValueType> {
    /**
     * @param keys An array of elements to be used as initial keys.
     * @param values An array of elements to be used as initial values.
     */
    constructor(keys?: KeyType[], values?: ValueType[]);
    /**
     * The `set()` method adds or updates an element with a specified key and a
     * value to the object while keeping both keys and values sorted.
     *
     * @param setKey The key of the element to add to the object.
     * @param setValue The value of the element to add to the object.
     * @returns The object itself.
     */
    set(setKey: KeyType, setValue: ValueType): this;
}
//# sourceMappingURL=js-maps.d.ts.map