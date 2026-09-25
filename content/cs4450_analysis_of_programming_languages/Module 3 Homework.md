![[Pasted image 20260918225548.png]]
```sml
- fun member (e, L) =
=   if L = [] then false
=   else if e = hd L then true
=   else member (e, tl L);
stdIn:17.8 Warning: calling polyEqual
stdIn:18.13 Warning: calling polyEqual
val member = fn : ''a * ''a list -> bool
- member (1, [3, 2, 10, 1]);
val it = true : bool
```
![[Pasted image 20260918225609.png]]
```sml
- fun less (_, []) = []
=   | less (e, l::ls) =
=     if l < e then
=       l :: less (e, ls)
=     else
=       less (e, ls);
val less = fn : int * int list -> int list
- less (10, [2,4,5,210,53,1,6]);
val it = [2,4,5,1,6] : int list
```

![[Pasted image 20260918225624.png]]
```sml
val repeats = fn : ''a list -> bool
- fun repeats ([]) = false
=   | repeats([_]) = false
=   | repeats(l::ls) =
=     if l = hd ls then 
=       true
=     else
=       repeats ls;
stdIn:48.10 Warning: calling polyEqual
val repeats = fn : ''a list -> bool
- repeats [1, 2, 3, 4];
val it = false : bool
- repeats [1, 2, 2, 3, 4];
val it = true : bool
```

![[Pasted image 20260918225639.png]]
```sml
- fun eval (cos, x) =
= let
=   fun f ([], _) = 0.0
=     | f (c::cs, e) = (c * e) + f (cs, e * x)
= in
=   f (cos, 1.0)
= end;
val eval = fn : real list * real -> real
- eval ([1.0, 5.0, 3.0], 2.0);
val it = 23 : real
```

![[Pasted image 20260918225655.png]]
```sml
- fun compare (a : int, b : int) = a < b;
val compare = fn : int * int -> bool
- 
- fun filter f L = foldr (fn (x,r) => if f x then x::r else r) nil L;
val filter = fn : ('a -> bool) -> 'a list -> 'a list
- 
- fun qsort (nil, _) = nil
= |   qsort ([a], _) = [a]
= |   qsort (x::xs, compare) = (qsort (filter (fn y => compare(y, x)) xs, compare)) 
=     @ [x] @ (qsort (filter (fn y => not(compare(y, x))) xs, compare));
val qsort = fn : 'a list * ('a * 'a -> bool) -> 'a list
- qsort ([32,23,132,4,1,42,49], compare);
val it = [1,4,23,32,42,49,132] : int list
```

**Extra Problems** for Chapter 7:
**A**: What does the following function, **g**, do?
```sml
fun g stuff =  
let  
    fun f (nil,y) = [y]  
    | f (x::rest,y) = f (rest,y) @ f (rest,x::y)  
in  
    f (stuff,nil)  
end;
```
It creates a power set of the list that is passed into g. The base case is the first argument (stuff) being empty. The recursive case removes the first element from the first argument and concatenates the subsets that don't contain the first element with the subsets that do contain it. Honestly, kinda feels like black magic and I doubt I could write this from scratch.

**B**: Write a function, `f2n (f,n,x)`, that computes applying `f n` times to `x`. For example, given the function `p`:
`fun p x = x + 1;`
then `f2n (p,3,1)` computes `f(f(f(1)))` = 1+(1+(1+1)) = 4 (adding 1 to 1 3 times).
If `n` is 0, then return the argument `x`, so `f2n(p,0,1)` returns 1.
```sml
- fun f2n (f, 0, x) = x
= | f2n (f, n, x) = f2n (f, n - 1, f x);
val f2n = fn : ('a -> 'a) * int * 'a -> 'a
- fun p x = x + 1;
val p = fn : int -> int
- f2n (p,3,1);
val it = 4 : int
```

![[Pasted image 20260918225901.png]]
a. If this were a case of coercion, all numbers would have to be converted to a common type. Either integer -> real or real -> integer, and then they would be processed together as that common type. The + operator would not have separate implementations, but one that only covers either real or integer.
b. When it comes to only overloading, the + operator could have different underlying implementations depending on the input types. It would process (int, real). (real, real), (real, int), (int, int), while never changing the types of the operands.
c. The language could coerce an int into a real if they are ever operands together. Overloading would then allow both an (int, int) and (real, real) implementation with no type mixing.
d. When considering real as the supertype and int as the subtype, ints could be fundamentally defined as reals, and just presented to the user without the decimal. The + operator only needs to accept (real, real). Because ints are always reals, there is no need for overloading or coercion.

![[Pasted image 20260918225915.png]]
a. Prediction: `'a -> int`
Actual:
```sml
- fun f x = 1;
val f = fn : 'a -> int
```
b. Prediction: `'a * 'b -> int`
Actual:
```sml
- fun f (x, y) = 1;
val f = fn : 'a * 'b -> int
```
c. Prediction: `'a -> 'a`
Actual:
```sml
- fun f x = x;
val f = fn : 'a -> 'a
```
d. Prediction: `'a * 'b -> 'a`
Actual:
```sml
- fun f (x, y) = x;
val f = fn : 'a * 'b -> 'a
```
e. Prediction: `'a -> 'int`
Actual:
```sml
- fun f g = g 1;
val f = fn : (int -> 'a) -> 'a
```
f. Prediction: `fn : ('b -> 'c) * 'a -> 'b`
Actual:
```sml
- fun f (g, x) = g x;
val f = fn : ('a -> 'b) * 'a -> 'b
```
g. Prediction: `fn : ('a * 'b -> 'c) * 'c * 'b * 'a -> 'd`
Actual:
```sml
- fun f (g, x, y) = g (x, y);
val f = fn : ('a * 'b -> 'c) * 'a * 'b -> 'c
```
h. Prediction: `fn : ('a -> 'b) * ('c -> 'a) * 'c -> 'b`
Actual:
```sml
- fun f (g, h, x) = g(h(x));
val f = fn : ('a -> 'b) * ('c -> 'a) * 'c -> 'b
```
i. Prediction: `fn : ('a -> 'a) * 'a -> 'a`
Actual:
```sml
- fun f (g, x) = g(g(x));
val f = fn : ('a -> 'a) * 'a -> 'a
```

![[Pasted image 20260918225937.png]]
a. Examples of expressions that would no longer have errors:
`"string" ^ #"c";`
`["string", #"c", "morestring"];`
Benefits:
- You can append chars onto strings much more easily
- You don't have to use helper functions
Drawbacks:
- Strings and chars are represented differently at the machine code level, so we would need to add extra functionality to translate

b. Examples of expressions that would no longer have errors:
`1 + 1.5;`
`[1, 1.5, 2];`
Benefits:
- Makes more sense to the beginner user
- Don't have to append .0 at the end of each int to make it a real
Drawbacks:
- Reals and ints are represented differently in machine code, and conversion would be tricky and potentially inaccurate
- This can introduce bugs where floating-point inaccuracies appear unexpectedly