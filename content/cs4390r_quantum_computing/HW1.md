# Assignment 1: Linear Algebra Basics
## Problem 1: Vectors and States
A qubit can be written as:

$$
\begin{bmatrix}
a \\
b
\end{bmatrix}
$$

**(a)** What is the vector for state $|0\rangle$?
$\begin{bmatrix} 1 \\ 0 \end{bmatrix}$
**(b)** What is the vector for state $|1\rangle$?
$\begin{bmatrix} 0 \\ 1 \end{bmatrix}$
**(c)** Which of the following is a valid quantum state? (explain briefly)

1. $\begin{bmatrix} 1 \\ 0 \end{bmatrix}$ - $|1|^2 + |0|^2 = 1$, so the vector is a unit vector, and is VALID.
2. $\begin{bmatrix} 1 \\ 1 \end{bmatrix}$ - $|1|^2 + |1|^2 = 2$, so the vector is not a unit vector, and is INVALID.
3. $\begin{bmatrix} \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} \end{bmatrix}$ - $|\frac{1}{\sqrt{2}}|^2 + |\frac{1}{\sqrt{2}}|^2 = \frac{1}{2} + \frac{1}{2} = 1$, VALID

---

## Problem 2: Simple Matrix Multiplication

Given:

$$
X = \begin{bmatrix}
0 & 1 \\
1 & 0
\end{bmatrix}
$$

**(a)** Compute:

$$
X \begin{bmatrix}
1 \\
0
\end{bmatrix}
$$
$\begin{bmatrix}0 & 1 \\1 & 0\end{bmatrix} \begin{bmatrix}1 \\0\end{bmatrix} = \begin{bmatrix}0\times1+1\times0 \\ 1\times1+0\times0\end{bmatrix} = \begin{bmatrix}0 \\1\end{bmatrix}$ 
**(b)** Compute:

$$
X \begin{bmatrix}
0 \\
1
\end{bmatrix}
$$
$\begin{bmatrix}0 & 1 \\1 & 0\end{bmatrix} \begin{bmatrix}0 \\1\end{bmatrix} = \begin{bmatrix}0\times0+1\times1 \\ 1\times0+0\times1\end{bmatrix} = \begin{bmatrix}1 \\0\end{bmatrix}$
**(c)** What does this matrix do to a qubit?
It flips the states, toggling between $|0\rangle$ and $|1\rangle$ when multiplying the state by it. On a Bloch sphere, it makes a $180^\circ$ turn, from North to South and back again.

---

## Problem 3: Hadamard Gate

The Hadamard matrix is:

$$
H = \frac{1}{\sqrt{2}} \begin{bmatrix}
1 & 1 \\
1 & -1
\end{bmatrix}
$$

**(a)** Apply $H$ to $|0\rangle$
$H\vert{}0\rangle = \frac{1}{\sqrt{2}} \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} = \frac{1}{\sqrt{2}} \begin{bmatrix}1\times1+1\times0 \\ 1\times1+-1\times0\end{bmatrix} = \frac{1}{\sqrt{2}} \begin{bmatrix}1 \\1\end{bmatrix} = \begin{bmatrix}\frac{1}{\sqrt{2}} \\\frac{1}{\sqrt{2}}\end{bmatrix} = |+\rangle$ 
**(b)** Apply $H$ to $|1\rangle$
$H\vert{}1\rangle = \frac{1}{\sqrt{2}} \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix} \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \frac{1}{\sqrt{2}} \begin{bmatrix}1\times0+1\times1 \\ 1\times0+-1\times1\end{bmatrix} = \frac{1}{\sqrt{2}} \begin{bmatrix}1 \\-1\end{bmatrix} = \begin{bmatrix}\frac{1}{\sqrt{2}} \\-\frac{1}{\sqrt{2}}\end{bmatrix} = |-\rangle$ 
**(c)** What do these results represent (in words)?
	It maps the qubit state from the computational $Z$-basis to the superposition $X$-basis

---

## Problem 4: Two-Qubit States

We write:
$$
|00\rangle = \begin{bmatrix}
1 \\
0 \\
0 \\
0
\end{bmatrix}
$$
**(a)** What is $|01\rangle$?
$|01\rangle = |0\rangle \otimes |1\rangle = \begin{bmatrix} 1 \\ 0 \end{bmatrix} \otimes \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 1 \cdot \begin{bmatrix} 0 \\ 1 \end{bmatrix} \\ 0 \cdot \begin{bmatrix} 0 \\ 1 \end{bmatrix} \end{bmatrix} = \begin{bmatrix} 1 \cdot 0 \\ 1 \cdot 1 \\ 0 \cdot 0 \\ 0 \cdot 1 \end{bmatrix} = \begin{bmatrix} 0 \\ 1 \\ 0 \\ 0 \end{bmatrix}$
**(b)** What is $|10\rangle$?
$|10\rangle = |1\rangle \otimes |0\rangle = \begin{bmatrix} 0 \\ 1 \end{bmatrix} \otimes \begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 0 \cdot \begin{bmatrix} 1 \\ 0 \end{bmatrix} \\ 1 \cdot \begin{bmatrix} 1 \\ 0 \end{bmatrix} \end{bmatrix} = \begin{bmatrix} 0 \cdot 1 \\ 0 \cdot 0 \\ 1 \cdot 1 \\ 1 \cdot 0 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 1 \\ 0 \end{bmatrix}$
**(c)** What is $|11\rangle$?

$|11\rangle = |1\rangle \otimes |1\rangle = \begin{bmatrix} 0 \\ 1 \end{bmatrix} \otimes \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 0 \cdot \begin{bmatrix} 0 \\ 1 \end{bmatrix} \\ 1 \cdot \begin{bmatrix} 0 \\ 1 \end{bmatrix} \end{bmatrix} = \begin{bmatrix} 0 \cdot 0 \\ 0 \cdot 1 \\ 1 \cdot 0 \\ 1 \cdot 1 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 0 \\ 1 \end{bmatrix}$

---

## Problem 5: Simple Tensor Product

Compute:
$$
|0\rangle \otimes |1\rangle
$$
*(Hint: just write the result as a 4-element vector)*
$|01\rangle = |0\rangle \otimes |1\rangle = \begin{bmatrix} 1 \\ 0 \end{bmatrix} \otimes \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 1 \cdot \begin{bmatrix} 0 \\ 1 \end{bmatrix} \\ 0 \cdot \begin{bmatrix} 0 \\ 1 \end{bmatrix} \end{bmatrix} = \begin{bmatrix} 1 \cdot 0 \\ 1 \cdot 1 \\ 0 \cdot 0 \\ 0 \cdot 1 \end{bmatrix} = \begin{bmatrix} 0 \\ 1 \\ 0 \\ 0 \end{bmatrix}$
---

## Problem 6: Basic Interpretation

Consider the state:
$$
\frac{1}{\sqrt{2}} (|0\rangle + |1\rangle)
$$
**(a)** What are the probabilities of measuring $0$ and $1$?
$P(0) = |\alpha|^2 = \left| \frac{1}{\sqrt{2}} \right|^2 = \frac{1}{2} = 50\%$
$P(1) = |\beta|^2 = \left| \frac{1}{\sqrt{2}} \right|^2 = \frac{1}{2} = 50\%$
**(b)** Why do the probabilities add to 1?
When a quantum state is measured, it is measured at either $0$ or $1$. It cannot resolve to any other number. The amplitudes for both outcomes are the same, $\frac{1}{\sqrt{2}}$, so they must have the same probability. If $2x = 100\%$, $x=50\%$.

---

## Problem 7: Short Reflection

Answer briefly:

**(a)** What is a qubit?
It is a unit of information that encodes a quantum state through a state vector.

**(b)** How is it different from a classical bit?
A qubit's state is in superposition and not a definite zero or one but basically both at the same time, as opposed to a classical bit, which can only be a single zero or one at once.

---

## Problem 8: Qubit State Identification

If a qubit is:
$$
\begin{bmatrix}
0 \\
1
\end{bmatrix}
$$
What state is it?
That vector represents the state $|1\rangle$, which is a state vector that points directly to the South pole of a Bloch sphere.

---

## Problem 9: Coding (NumPy)

Starting from

$$
|00\rangle = \begin{bmatrix}
1 \\
0 \\
0 \\
0
\end{bmatrix},
$$

apply:
1. An $X$ gate to qubit 0.
2. A Hadamard gate to qubit 1.
3. A CNOT with qubit 1 as control and qubit 0 as target.

Compute:
- **The final state vector:** (you should get: `[0. +0.j, 0.70710678+0.j, 0.70710678+0.j, 0. +0.j]`, which is another Bell state $|\Psi^{+}\rangle = \frac{|01\rangle + |10\rangle}{\sqrt{2}}$)
- **The measurement probabilities:** (you should get: `[0.0, 0.5, 0.5, 0.0]`)

```python
import numpy as np
# Basis states
zero = np.array([1, 0], dtype=complex)

# Initial state |00>
psi = np.kron(zero, zero)

# Gates
X = np.array([[0, 1], [1, 0]], dtype=complex)
H = (1 / np.sqrt(2)) * np.array([[1, 1], [1, -1]], dtype=complex)
CNOT_10 = np.array(
    [[1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0]], dtype=complex
)

# Circuit operations
U1 = np.kron(X, H)
psi = U1 @ psi
psi = CNOT_10 @ psi

# Probabilities
probs = np.abs(psi) ** 2

# Outputs
print("Final state vector:\n", psi)
print("Measurement probabilities:\n", probs)
```
Terminal output:
```
Final state vector:
 [0.        +0.j 0.70710678+0.j 0.70710678+0.j 0.        +0.j]
Measurement probabilities:
 [0.  0.5 0.5 0. ]
```