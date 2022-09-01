import test from 'ava'
import {add} from "../src/example.mjs";

test('add', t => {
    t.deepEqual(add(2, 3), 5)
})
