Converting a function that takes multiple arguments into a sequence of functions, each taking a single argument
Uncurried:
```sml
fun addTuple (x, y) = x + y;
val res1 = addTuple (3, 4);
```
Curried:
```sml
fun addCurried x y = x + y;
val res2 = addCurried 3 4;
```