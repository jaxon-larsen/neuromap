## 9.5
Write a function `inclist` of type `int list -> int -> int list` that takes a list of integers and an integer increment, and returns the same list of integers but with the integer increment added to each one. For example, if you evaluate `inclist [1,2,3,4] 10` you should get `[11,12,13,14]`. Note that the function is curried.
```sml
- fun inclist l i = map (fn x => x + i) l;
val inclist = fn : int list -> int -> int list
- inclist [1, 2, 3, 4] 10;
val it = [11,12,13,14] : int list
```

## 9.9
 Write a function `bxor` of `type bool list -> bool` that takes a list of boolean values and returns the logical exclusive OR of all of them. (It should return `true` if the number of `true` values in the list is odd and `false` if the number of `true` values is even.) If the list is empty, your function should return `false`.
```sml
- fun bxor l = foldr (fn (x, acc) => if x then not acc else acc) false l;
val bxor = fn : bool list -> bool
- bxor [true,false,true,true];
val it = true : bool
```

## 9.10
Write a function `dupList` of type `'a list -> 'a list` whose output list is the same as the input list, but with each element of the input list repeated twice in a row. For example, if the input list is `[1,3,2]`, the output list should be `[1,1,3,3,2,2]`. If the input list is `[]`, the output list should be `[]`.
```sml
- fun dupList l = foldr (fn (x, acc) => x::x::acc) [] l;
val dupList = fn : 'a list -> 'a list
- dupList [1,2,3,4,5];
val it = [1,1,2,2,3,3,4,4,5,5] : int list
```


## 9.14
Write a function `maxpairs` of `type (int * int) list -> int list` that takes a list of pairs of integers and returns the list of the max elements from each pair. For example, if you evaluate `maxpairs [(1,3),(4,2),(~3,~4)]` you should get `[3,4,~3]`.
```sml
- fun maxpairs l = foldr (fn ((a, b), acc) => (if a > b then a else b) :: acc) [] l;
val maxpairs = fn : (int * int) list -> int list
- maxpairs [(1,3),(4,2),(~3,~4)];
val it = [3,4,~3] : int list
```

## 9.19
Write a function member of type `''a * ''a list -> bool` so that `member(e,L) `is true if and only if `e` is an element of list `L`.
```sml
- fun member e L = foldr (fn (x, acc) => (x = e) orelse acc) false L;
stdIn:20.43 Warning: calling polyEqual
val member = fn : ''a -> ''a list -> bool
- member 3 [1, 2, 3, 4];
val it = true : bool
- member 3 [1, 2, 4];
val it = false : bool
```

## 9.22
Write a function evens of type `int list -> int list` that takes a list of integers and returns the list of all the even elements from the original list (in the original order). For example, if you evaluate evens `[1,2,3,4]` you should get `[2,4].`
```sml
- fun evens l = foldr (fn (x, acc) => if (x mod 2 = 0) then x::acc else acc) nil l;
val evens = fn : int list -> int list
- evens [1,2,3,4];
val it = [2,4] : int list
```

## 10.3
Here again is the example used to show the difference between scoping with blocks and dynamic scoping:
```sml
[fun g x = <- g x are defined [1] [2]
	[let
		val inc = 1; <- inc defined [3]
		{fun f y = y + inc;} (3) <- f y defined [4] [5]
		{fun h z = <- h z defined [6] [7]
			(let
				val inc = 2; <- inc defined (different scope) [8]
			in
				f z
			end) (5) } (4)
		in
			h x
		end;] (2)
] (1)
```

Copy it and then annotate it as follows: 
a. Draw a circle around every block, and number the blocks. 
Blocks denoted by a `[]` (with `{}` and `()` in deeper nesting) around them  and `(n)` as labels
b. Identify each definition of a name. 
Definitions denoted by `<- x defined [n]`
c. For each definition, describe its scope in terms of your block numbers. 

1 (g). Scope extends to the level above all labeled blocks
2 (x). All of block `(1)`
3 (inc). From its definition through blocks `(2)`, `(3)`, `(4)` excluding `(5)` due to type shadowing
4 (f). From definition `(3)` to the end of block `(2)`, including `(4)`, `(5)`
5 (y). Just block `(3)`
6 (h). From definition to end of block `2`, including `(4)`, `(5)`
7 (z). Blocks `(4)` and `(5)`
8 (inc). From definition to end of block `(5)`

d. For each occurrence of a name (other than a definition of that name), show which definition is used to bind it. Check that this agrees with your scopes.
Not gonna lie, I don't know what it means by "Check that this agrees with your scopes."
`y` in `y + inc`: Bound to `y [5]`, scoped to `(3)`
`inc` in `y + inc`: Bound to `inc [3]`, scoped to `(3)`
**`f`** in `f z`: Bound to `f [4]`, scoped to `(2)`
**`z`** in `f z`: Bound to `z [7]`, scoped to `(4)`
**`h`** in `h x`: Bound to `h [6]`, scoped to `(2)`
**`x`** in `h x`: Bound to `x [2]`, scoped to `(1)`
## 10.4
Here again is the example used to show primitive namespaces in Java:
```java
class Reuse(1) {
	Reuse(2) Reuse(3) (Reuse(4) Reuse(5)) {
		Reuse(6):
			for (;;) {
				if (Reuse(7).Reuse(8)(Reuse(9)) == Reuse(10))
					break Reuse(11);
			}
			return Reuse(12)
	}
}
```
a. For each occurrence of the name `Reuse` that is a definition, describe what binding for Reuse is established.
(1) A class is defined in the package namespace
(3) A class method is defined in the class (1) namespace
(5) A local variable in the method (3) namespace
(6) A statement label in the method (3) namespace

b. For each occurrence of `Reuse` that is not a definition, show which definition is used to bind it.
(2) A return type, bound to (1)
(4) A parameter type, bound to (1)
(7) A variable, bound to (5) 
(8) Method name, bound to (3)
(9) Variable, bound to (5)
(10) Variable, bound to (5)
(11) Label, bound to (6)
(12) Variable, bound to 5
## 10.B
Name two examples from C/C++ where a variable is “live” (in use) but not in scope (i.e.. not visible in some places in code).
1. When a variable of the same name is declared within a block. For instance, the first `x` is in use but not in scope here:
```c
	int x = 0;
	{
		int x = 50;
	}
```
2. When a helper function is called:
```c
void fun() 
{
}

int main()
{
x = 0;
fun();
}
```