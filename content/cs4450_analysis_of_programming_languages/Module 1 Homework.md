### Chapter 4
#### Exercise 2
What is the binding time for each of the following in a C or C++ program? State the binding time as precisely as possible (language-definition time, language-implementation time, compile time, link time, load time, or runtime). Explain how each of the following is bound and why it is bound when it is. 
a. The location in memory of a local variable in a function. 
	 This is bound at runtime. When a function is called, a stack frame is pushed onto the call stack. The local variable is then given a memory addressed based on the stack pointer at runtime. Because C/C++ support recursion and multithreading, the same local variable can exist in more than one place at once and it's impossible to predict all memory addresses ahead of time.
b. The meaning of the keyword `while`. 
	This is bound at language-definition time, because that is when the meanings of all keywords are defined. Meanings need to be established before we can think of any of the other steps in the binding process, or even before we can write sensible programs in the language.
c. The size in memory of a variable of type int. 
	This is bound at language-implementation time. The C/C++ designers chose an adaptable size for int based on the hardware's word size and register width, so a specific size couldn't be bound to the language definition. Instead, the definition includes standards for how to set that size and min or max limits.
d. The location in memory of a global static variable. 
	This is bound at load time. When compiling, the variable is assigned an offset. Then, the linker combines the different files and sets of offsets, and then, the loader allocates virtual memory. It is only at this point that static variables have a place they can sit safely throughout program execution.
e. The code for the `printf` function. 
	Either link time (when using static linking) or load time (when using dynamic linking). With static linking, the linker finds the `printf` function within the standard library and copies the machine code into the executable. With dynamic linking, the linker just grabs a reference to the library with `printf`, which tells the loader to bring it in later. 
f. The type of a local variable in a function.
	Compile time. Because C and C++ are statically typed, the compiler must know what the types of variables are to allocate space and select the correct assembly instructions. Because each program can have different variables, type binding cannot happen any earlier.
g. The value(s) assigned to a variable. 
	Runtime, although constants are assigned earlier at compile time. Generally, variables change on the fly as the program is executed, so we cannot bind them any sooner. Constants never change, and the compiler can evaluate those immediately to optimize the program.
h. The size in memory of a pointer.
	Language-implementation time. This is something else that cannot be defined directly into the language because memory address sizes differ between hardware. But on specific hardware, the pointer sizes should not change. 
#### Exercise 4
Suppose the target assembly language for a compiler has these five instructions for integers:
```assembly
load address,reg 
add reg,reg,reg 
sub reg,reg,reg 
mul reg,reg,reg 
store reg,address
```
In these instructions, an address is the name of a static variable (whose actual address will be filled in by the loader). A `reg` is the name of an integer register, a special extra-fast memory location inside the processor. The target assembly language has three integer registers: `r1`, `r2`, and `r3`. The `load` instruction loads the integer from the given memory address into the given register. The `add` instruction adds the second register to the first register and places the result in the third register. The `sub` instruction subtracts the second register from the first register and places the result in the third register. The `mul` instruction multiplies the first register by the second register and places the result in the third register. The `store` instruction stores the integer from the given register at the given memory address. So, for example, the compiler might translate the assignment `result := offset+(width\*n)` into this:
```assembly
load width,r1 
load n,r2 
mul r1,r2,r1 
load offset,r2 
add r2,r1,r1 
store r1,result
```
Using this assembly language, give translations of the following assignment statements. Use as few instructions as possible. 
a. `net := gross - costs` 
```assembly
load gross,r1
load costs,r2
sub r1,r2,r3
store r3,net
```
b. `volume := (length * width) * height`
```
load length,r1
load width,r2
mul r1,r2,r1
load height,r2
mul r1,r2,r1
store r1,volume
```
c. `cube := (x * x) * x` 
```assembly
load x,r1
mul r1,r1,r2
mul r1,r2,r1
store r1,cube
```
d. `final := ((a - abase) * (b - bbase)) * (c - cbase)`
```assembly
load a,r1
load abase,r2
sub r1,r2,r1
load b,r2
load bbase,r3
sub r2,r3,r2
mul r1,r2,r1
load c,r2
load cbase,r3
sub r2,r3,r2
mul r1,r2,r1
store r1,final
```
### Canvas
Indicate the binding times for each of the following for a typical statically-typed, statically scoped language (C, C++, C#, Java):
1. Which built-in functions are to be provided by the standard library that accompanies the language development system
	Language definition time. The official language specifications mandate specific built-in functions for cross-compatibility and the library writers use those specifications for the programmer to use.
2. The variable declaration corresponding to a particular use of the variable (For example, in the statement **x = a;**, when is this use of **a** bound to the appropriate definition of the variable **a** elsewhere in the code?)
	Compile time. The compiler parses scope, type checks, and determines if the assignment is valid. If we were dealing with a dynamically scoped language, we would have to wait until later. 
3. The maximum length allowed for a string literal
	In language-definition time, the language specifications can define upper bounds of any type in the language. However, at language-implementation time, compiler designers need to implement exact bounds, which may change depending on the hardware.
4. The address in memory of a particular library function
	Load time when using dynamic linking, but link time when using static linking. With dynamic linking, the library is loaded into virtual memory, and the function's address is written into the program's imports so that it's ready to be executed when runtime comes. With static linking, the linker puts the library's machine code direcly into the program's, so the address is defined at that point.