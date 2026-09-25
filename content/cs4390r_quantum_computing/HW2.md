**Assignment #2: Simple Quantum Circuits**

**Problem 1: Single Qubit Basics**
Start with a single qubit in state:

$|0\rangle$

**(a)** Apply an $X$ gate. What state do you get?
	$|1\rangle$
	
**(b)** Apply a Hadamard $H$ gate to $|0\rangle$. What does the result mean?
	$H|0\rangle = \frac{1}{\sqrt{2}} \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} = \frac{1}{\sqrt{2}} \begin{bmatrix} 1 \\ 1 \end{bmatrix} = |+\rangle$
	It transforms the basis state into a state of equal superposition of both $|0\rangle$ and |$1\rangle$, a Hadamard basis. It performs a $\pi$ rotation around an axis halfway between the $X$ and $Z$ axes.

**(c)** If you measure after the Hadamard, what outcomes do you expect?
	You should expect a 50% chance of getting either 0 or 1.

**Problem 2: Two-Qubit System**

Consider two qubits starting in:

$|00\rangle$

**(a)** Apply an $X$ gate to the first (left) qubit. What is the new state?
	$|10\rangle$

**(b)** Apply a Hadamard to the first qubit. What kind of state do you get?
	$|+\rangle|0\rangle$

**(c)** Are both qubits independent at this stage?
	$|+\rangle = \frac{1}{\sqrt{2}}|0\rangle + \frac{1}{\sqrt{2}}|1\rangle$
	$\left(\frac{1}{\sqrt{2}}|0\rangle + \frac{1}{\sqrt{2}}|1\rangle\right) \otimes |0\rangle$
	$\frac{1}{\sqrt{2}}(|0\rangle \otimes |0\rangle) + \frac{1}{\sqrt{2}}(|1\rangle \otimes |0\rangle)$
	$\frac{1}{\sqrt{2}}|00\rangle + 0|01\rangle + \frac{1}{\sqrt{2}}|10\rangle + 0|11\rangle$
	$c_0 = \frac{1}{\sqrt{2}}$, $c_1 = 0$, $c_2 = \frac{1}{\sqrt{2}}$, $c_3 = 0$.
	$\frac{1}{\sqrt{2}} \times 0 = 0 \times \frac{1}{\sqrt{2}}$? Yes! The qubits are independent.

**Problem 3: Entanglement**

**(a)** Apply:
- $H$ to qubit 0
- CNOT (control = qubit 0, target = qubit 1)

What state do you get (in words or simple form)?
	First, I want to say that I feel like this question is poorly worded. I am assuming that by "qubit 0," you are referring to a specific qubit that is initialized to $|0\rangle$, and that the "qubit 0" in the second bullet is that same qubit, which has $H$ applied and persists into the second bullet. I think it is confusing to use "0" to refer to a qubit, especially since its state is no longer $|0\rangle$ in the second bullet. I would use $A$ or something similar.
	$H$ to qubit 0 -> $|+\rangle$ = $|+\rangle = \frac{|0\rangle + |1\rangle}{\sqrt{2}}$
	We add qubit 1, that's $|0\rangle$, I guess? So $q_0 \otimes q_1 = \frac{|00\rangle + |10\rangle}{\sqrt{2}}$???
	When CNOT is applied, a qubit is flipped when the control is 1. So, we'll get $\frac{|00\rangle + |11\rangle}{\sqrt{2}}$

**(b)** If you measure both qubits, what results do you expect?
	The only options are 00 and 11, so there is a 50% chance for each.

**(c)** Why is this state special?
	The qubits always match. This means that they are entangled. This specific scenario is a Bell state.

**Problem 4: Build Your First Circuit in Qiskit**

Create a circuit with 2 qubits.

**Steps:**

1. Apply Hadamard to qubit 0 (i.e., first qubit, left qubit)
2. Apply CNOT ($0 \to 1$)
3. Measure both qubits

**Run and Observe**

**(a)** Write a Qiskit code and Run your circuit on a simulator

**(b)** What measurement results do you get?

**(c)** Are both qubits always the same (00 or 11)? Explain briefly

**Problem 5: Modify the Circuit**

Change your circuit (code):

- Remove the Hadamard gate
- Keep the CNOT

**(a)** Run again

**(b)** What result do you get now?
	All 00
**(c)** Why is it different?
	It is different because the Hadamard gate was never applied, and the qubits stayed in their initial state (0)

**Problem 6: Short Reflection**

Answer briefly:

**(a)** What does the Hadamard gate do?
	It puts the into nondeterministic superposition, having a 50/50 chance of 0 or 1

**(b)** What does the CNOT gate do?
	It flips the target qubit if the control is a $|1\rangle$

**(c)** What is entanglement (in your own words)?
	Each qubit affects the one it is entangled with. In this case, with maximum entanglement, they are always in the same state

**Problem 7. (You don’t need to write code for this)**

Try applying $X$ to qubit 1 instead of qubit 0.
	It isn't clear whether you meant to the problem 4 or 5 version. I'm going to guess you mean add a not step at the beginning of the p4 version??
- What state do you get?
 $X |00\rangle \rightarrow H |01\rangle \rightarrow CN \frac{|01\rangle + |11\rangle}{\sqrt{2}} \rightarrow \frac{|01\rangle + |10\rangle}{\sqrt{2}}$
- What measurement results do you see?
01 and 10 are both a 50% probability
## Problem 8:

Do this problem using Python (NumPy) and using Qiskit:

1. Define states  $|0\rangle$ and $|1\rangle$

2. Construct the 2-qubit state $|0\rangle \otimes |1\rangle$

3. Verify its norm is 1.

4. Create the matrix

$X=\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$

and compute

$(X \otimes l) (|0\rangle \otimes |1\rangle)$

You should get $|11\rangle$