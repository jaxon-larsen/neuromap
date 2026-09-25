Logit & Sigmoid Equations
$$\text{logit}(p) = \ln\left(\frac{p}{1-p}\right) = \theta^T x \quad \iff \quad p = P(Y=1 \mid X=x) = \frac{1}{1 + e^{-\theta^T x}}$$
Log-Likelihood
$$\frac{1}{n} \ell(\theta) = \frac{1}{n} \sum_{i=1}^n \left[ y_i \ln(\hat{p}_i) + (1 - y_i) \ln(1 - \hat{p}_i) \right] = -\hat{H}\left(P(Y \mid X), \hat{P}_\theta(Y \mid X)\right)$$
Entropy
$$H(P) = -\sum_{x} P(x) \ln P(x)$$
Balance
$$\sum_{i=1}^n y_i x_i = \sum_{i=1}^n \hat{P}_\theta(Y=1 \mid X=x_i) x_i$$
Probit Link
$$P(Y=1 \mid X=x) = \Phi(\beta^T x)$$