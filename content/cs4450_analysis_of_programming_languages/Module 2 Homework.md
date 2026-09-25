## Chapter 5

Exercise 3: Write a function `fourth` of type `'a list -> 'a` that returns the fourth element of a list. Your function need not behave well on lists with less than four elements.
```sml
- fun fourth l = hd(tl(tl(tl l)));
val fourth = fn : 'a list -> 'a
- fourth [1, 2, 3, 4, 5];
val it = 4 : int
```

Exercise 4: Write a function `min3` of type `int * int * int -> int` that returns the smallest of three integers.
```sml
- fun min3 (a, b, c) = if a < b andalso a < c then a else if b < c then b else c;
val min3 = fn : int * int * int -> int
- min3 (1, 2, 3);
val it = 1 : int
- min3 (19, 192, 10);
val it = 10 : int
```

Exercise 5: Write a function `red3` of type `'a * 'b * 'c -> 'a * 'c` that converts a tuple with three elements into one with two by eliminating the second element.
```sml
- fun red3 (a, b, c) = (a, c);
val red3 = fn : 'a * 'b * 'c -> 'a * 'c
- red3 (2, 3, 2);
val it = (2,2) : int * int
```

Exercise 6: Write a function `thirds` of type `string -> char` that returns the third character of a string. Your function need not behave well on strings with lengths less than 3.
```sml
- fun thirds s = hd(tl(tl(explode s)));
val thirds = fn : string -> char
- thirds "urmom";
val it = #"m" : char
```

Exercise 7: Write a function `cycle1` of type `'a list -> 'a list` whose output list is the same as the input list, but with the first element of the list moved to the end. For example, `cycle1 [1,2,3,4]` should return `[2,3,4,1]`.
```sml
- fun cycle1 l = tl l @ [hd l];
val cycle1 = fn : 'a list -> 'a list
- cycle1 [1, 2, 3, 4];
val it = [2,3,4,1] : int list
```

Exercise 8: Write a function `sort3` of type `real * real * real -> real list` that returns a list of three real numbers, in sorted order with the smallest first.
```sml
- fun sort3 (a: real, b, c) =
=     if a < b then
=         if b < c then [a, b, c]
=         else if a < c then [a, c, b]
=         else [c, a, b]
=     else
=         if a < c then [b, a, c]
=         else if b < c then [b, c, a]
=         else [c, b, a];
- sort3 (4.2, 6.44, 1.9);
val it = [1.9,4.2,6.44] : real list
```

Exercise 9: Write a function `del3` of type `'a list -> 'a list` whose output list is the same as the input list, but with the third element deleted. Your function need not behave well on lists with lengths less than 3.
```sml
- fun del3 l = hd(l)::hd(tl(l))::tl(tl(tl(l))); 
val del3 = fn : 'a list -> 'a list
- del3 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
val it = [1,2,4,5,6,7,8,9,10] : int list
```

Exercise 10: Write a function `sqsum` of type `int -> int` that takes a non-negative integer $n$ and returns the sum of the squares of all the integers $0$ through $n$. Your function need not behave well on inputs less than zero.
```sml
- fun sqsum 0 = 0 | sqsum i = i * i + sqsum(i-1);
val sqsum = fn : int -> int
- sqsum 5;
val it = 55 : int
- sqsum 3;
val it = 14 : int
```

Exercise 11: Write a function `cycle` of type `'a list * int -> 'a list` that takes a list and an integer $n$ as input and returns the same list, but with the first element cycled to the end of the list $n$ times. (Make use of your `cycle1` function from a previous exercise.) For example, `cycle ([1,2,3,4,5,6], 2)` should return the list `[3,4,5,6,1,2]`.
```sml
- fun cycle (l, i) =
=     if i = 0 then l
=     else cycle (cycle1 l, i - 1);
val cycle = fn : 'a list * int -> 'a list
- cycle ([1, 2, 3], 2);
val it = [3,1,2] : int list
```

Exercise 13: Write a function `max` of type `int list -> int` that returns the largest element of a list of integers. Your function need not behave well if the list is empty. Hint: Write a helper function `maxhelper` that takes as a second parameter the largest element seen so far. Then you can complete the exercise by defining `fun max x = maxhelper (tl x, hd x);`.
```sml
- fun maxhelper (l, i) = if l = [] then i else if hd l > i then maxhelper(tl l, hd l) else maxhelper(tl l, i);
val maxhelper = fn : int list * int -> int
- fun max x = maxhelper (tl x, hd x);
val max = fn : int list -> int
- max [1, 2, 300, 2, 3, 5];
val it = 300 : int
```

Exercise 14: Write a function `isPrime` of type `int -> bool` that returns `true` if and only if its integer parameter is a prime number. Your function need not behave well if the parameter is negative. Only check divisors up to the square root of the number being tested (you don't have to use `Math.sqrt` to solve this! Remember, if $x \le \sqrt{y}$, then $x \cdot x \le y$).
```sml
- fun primeHelper (i, d) =
= if d * d > i then true
= else if i mod d = 0 then false
= else primeHelper(i, d+1);
- fun isPrime n =
= if n < 2 then false
= else primeHelper (n, 2);
val isPrime = fn : int -> bool
- isPrime 33;
val it = false : bool
```

Exercise 15: Write a function `select` of type `'a list * ('a -> bool) -> 'a list` that takes a list and a function `f` as parameters. Your function should apply `f` to each element of the list and should return a new list containing only those elements of the original list for which `f` returned `true`. (The elements of the new list may be given in any order.) For example, evaluating `select ([1,2,3,4,5,6,7,8,9,10], isPrime)` should result in a list like `[7,5,3,2]`. This is an example of a higher-order function, since it takes another function as a parameter.
```sml
- fun select (l, f) =
=     if null l then []
=     else if f (hd l) then hd l :: select (tl l, f)
=     else select (tl l, f);
val select = fn : ''a list * (''a -> bool) -> ''a list
- select ([1,2,3,4,5,6,7,8,9,10], isPrime)
= ;
val it = [2,3,5,7] : int list
```

## Chapter 6

Exercise 1: Let $X$ and $Y$ be any two sets, and let $|X|$ and $|Y|$ be their sizes. What is the size of each of the following sets? If you cannot determine the answer exactly, try to give upper and lower bounds.
- a. $X \cup Y$: The size is unable to be perfectly determined, because we don't know how much is shared between the two sets. They could be completely overlapping (lower bound), in which case the size would be the greater of the two, or completely separate (upper bound), in which case it would be equal to the size of both combined.
- b. $X \times Y$: In a Cartesian product, the size is always the product of the two, so $|X| \cdot |Y|$.
- c. $X^n$: This will contain every element in X, so $|X^n| = |X|^n$
- d. $X^*$: If $X$ is empty, $X^*$ will contain only an empty set, and will have a length of 1. If $X$ is any larger, the combinations of sequences go on forever, so $|X^*| = \infty$

Exercise 2: Write the ML type constructor that corresponds to each of the following sets. The curly braces are not ML records—they're just sets.
- a. $\{\text{true}, \text{false}\}$: `bool`
- b. $\{\text{true}, \text{false}\} \to \{\text{true}, \text{false}\}$: `bool -> bool`
- c. $\{(\text{true}, \text{true}), (\text{true}, \text{false}), (\text{false}, \text{true}), (\text{false}, \text{false})\}$: `bool * bool` 


Exercise 4: Suppose there are three variables $X$, $Y$, and $Z$ with these types:
- $X$: integer that is divisible by 3
- $Y$: integer that is divisible by 12
- $Z$: integer

For each of the following assignments, knowing nothing about the values of the variables except their types, answer whether a language system can tell before running the program whether the assignment is safe? Why or why not?
- a. `X := Y` - Yes, because every int divisible by 12 is also divisible by 3.
- b. `X := X` - Yes, because every int divisible by 3 is also divisible by 3.
- c. `Y := Y + 1` - No, because adding 1 will make every int divisible by 12 have a remainder of 1.
- d. `Z := X` - Yes, because every int divisible by 3 is always an int.
- e. `X := Z` - No, because not every int is divisible by 3. 
- f. `X := X + 3` - Yes, because every int divisible by 3, + 3, is still divisible by 3.
- g. `X := X + Y;` - Yes, because every int divisible by 12, +3 any number of times, is still divisible by 3.

## Additional Problem

Write a short C/C++ program that reads a 64-bit machine instruction as a hex integer and extracts the values for its components from certain bits, specified left-to-right, as follows:

| Bits | Field | Description |
| :--- | :--- | :--- |
| 0–4 | `code` | Instruction code |
| 5–8 | `ladrm` | Left address mode |
| 9–12 | `radrm` | Right address mode |
| 13–19 | `si` | Short immediate |
| 20–25 | `lreg` | Left register |
| 26–31 | `rreg` | Right register |
| 32–63 | `li` | Long immediate |

Tests:
```text
08800080000004D2  
Instruction: 8800080000004d2

rreg = 0
lreg = 2
si = 0
radrm = 0
ladrm = 1
code = 1
li = 1234

E05000000000008E
Instruction: e05000000000008e

rreg = 0
lreg = 0
si = 0
radrm = 10
ladrm = 0
code = 28
li = 142

1140408300000000
Instruction: 1140408300000000

rreg = 3
lreg = 2
si = 4
radrm = 8
ladrm = 2
code = 2
li = 0

5008000300000000
Instruction: 5008000300000000

rreg = 3
lreg = 0
si = 0
radrm = 1
ladrm = 0
code = 10
li = 0
```