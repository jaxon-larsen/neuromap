# Facial Coding

## Introduction to the Problem
### Background and Motivation
Originally, I had no idea what I wanted to do for my final project. I landed on Facial Expression Recognition (FER) or Facial Coding, because I thought it would be an interesting challenge that could be turned into a visible, unique product. Facial expressions are fairly consistent across humans, but there are so many little variables and nuances that recognizing facial expressions seemed like a difficult issue for computers to solve. I also wanted to contrast a simpler baseline model against a more modern neural network, which would allow me to determine the benefit of deep feature extraction over linear methods.
### Problem Definition
I wanted to develop a pipeline that took a labeled dataset of faces and turned it into a website that anyone could go to in order to see if a ML model could recognize their facial expression. The specific facial expressions defined by my dataset were: Anger, Contempt, Disgust, Fear, Happiness, Neutral, Sadness, Surprise, and Uncertain.
### Planning and Preparation
It took a lot of research to nail down the exact architecture I wanted to use, but I settled on a CNN, as we have used it to solve similar problems in class, like with handwritten number recognition. I fine-tuned my plan by deciding to start with a base model (originally MobileNetv2, eventually EfficientNet-B0) and building off of it using transfer learning. I discovered that it was possible to freeze certain early, fundamental layers that have already learned basic image recognition and fine-tune the higher-level ones to recognize faces. I found a dataset and downloaded all of the thousands of images. I soon learned that I did not have nearly good enough hardware to train the model in any reasonable amount of time, so I switched to using Kaggle, which integrated with the dataset seamlessly and provides free GPU usage.
## Model Architecture
### Model A: PCA + Logistic Regression
As this class has been focused more on "classical" machine learning, with linear or tree-based methods, I figured I would compare the old to the new and try to solve this deep, complex problem with something simpler like logistic regression. After all, the 9 labels are simply encoded as yes/no. However, as the images are really complex, even after being reduced to 128x128 pixels, I decided to use PCA to reduce the features even more and focus on the most important things. I flattened the images and cast them to grayscale to facilitate this. Simpler images were also helpful because scikit-learn, which I used for this model, doesn't support the Kaggle GPU, so processing more complex images would take significantly more time. After training, I was left with a PCA components matrix and Logistic Regression weights. Multiplying those and folding the PCA mean into the bias left me with a single 1-layer PyTorch `nn.Linear(16384, 9)` module, which made export really easy.
### Model B: Deep Transfer Learning (EfficientNet-B0)
Implementing this model had a steep learning curve. It involved converting NumPy arrays into PyTorch tensors, switching dimensions around, and applying normalization before I could even get started.

After testing everything and ensuring it worked, I was left wondering how I might improve my process. Although I probably should have stopped there, as the project was almost due, I did a little more research. Originally having MobileNetv2 as the base model, I found a more accurate, albeit slightly bigger and more time-consuming to train model, EfficientNet-B0, and decided to try using that. Originally, it was slower, but I found several optimizations I could make. I added Automatic Mixed Precision (AMP) to better utilize the GPU, cached the cropped images, and saved the model weights in RAM instead of writing files to disk.
### Web Application (HTML/JavaScript Powered By ONNX)
This was actually a lot simpler than I thought it would be. Originally, I had the plan to host the model and site on Hugging Face using Gradio and Pyodide, but ran into errors. My next choice was to host the model and access it through their API, but I had trouble interfacing with it. Ditching HuggingFace altogether, I learned about ONNX (Open Neural Network Exchange), which was developed by Microsoft and Facebook as a universal neural network format, along with ORT (ONNX Runtime), which runs ONNX models natively in the browser. I changed my weights file into the ONNX standard, and built a simple HTML file that could read it, then hosted my site on GitHub Pages. Later, I added support for both of my models so you can compare them in real-time and added a bounding box so that the picture taken could have a similar crop to the dataset images.

Both models needed the images to be processed in different ways, but luckily JavaScript could handle the computation. I also used Softmax to turn the logits the models spat out into percentages for the user end. Once things were working locally, I hosted it on GitHub pages and tested with friends and classmates.

## Training and Testing Data
### Dataset Selection and Overview
When selecting my dataset and browsing Kaggle and other sites, I found myself kind of grossed out by synthetic datasets, which were far and away the majority I could find. I considered gaming addiction, social media impact on mental health, and other datasets, but most text-based datasets I found and were interested in were all synthetic. I wanted to use real data to solve a real problem, not just show that I was able to manipulate numbers. I apologize to all of those synthetic dataset fans out there. The one I chose -- "9 Facial Expressions for YOLO," was combined from dozens of other datasets from universe.roboflow.com, an open source computer vision dataset site, and seemed to have a lot of variety. Although I experimented with subsampling for speed and accuracy testing, I ended up using every image and annotation, which left me with about 54k training images, 13k validation images, and thus 427/107 batches.
### YOLO Format Rundown
The dataset was organized according to the Ultralytics YOLO format, which is designed for object detection (in our case, faces). It uses individual text files per image and has a specific file structure. It also normalizes coordinates of image bounding boxes relatively instead of at pixel barriers. Overall, it was easy to process, although I shook the original format up a bit.
### Data Pre-Processing
This dataset was integrated with Kaggle already, so it was simple to import. Because the images were all over the place in terms of resolution, I set a specific pixel size at the beginning: 128x128. A larger size could potentially get more accurate results, but would take significantly longer.

The dataset came with a specific train/test/validate set, but because I'm not seeking a final test score, and wanted to use my resources the best I could while maintaining simplicity, I ditched the test set, and made my own 80/20 train/validate split. I also made it possible to specify how many pictures to use, with the default being all of them.

The next step was to crop the images according to the bounding boxes so that the model could be more focused on facial features. Because YOLO uses relative coordinates, it's easy to scale regardless of the original image resolution. I added color jitter and random flips to make it more robust to asymmetry and different lighting. I also originally added small rotations, but realized that it didn't add very much, as most of the people taking a picture on the website will have their face straight up like those in the dataset. The first dataset had its images grayscaled and flattened, as I've already explained. I also incorporated stratified sampling so that rare emotions were split proportionally across train and validation sets.
## Training Process and Challenges
### Hyperparameters and Optimization
As I started training, I quickly ran into problems. My first couple of runs stalled at around 55% validation accuracy. Eventually, I realized that I was freezing too many layers of the base model and underfitting was the result. I unfroze more blocks, lowered the learning base rate, added an `Adam` optimizer to auto-tune the learning rate based on gradients, and reduced the learning rate further whenever the validation loss plateaued.
Final choices -
Batch size: 128
Learning rate: 0.0003
Unfreezing strategy: Top two, then top four after 8 epochs
Optimizer: `Adam`
Loss function: `CrossEntropyLoss`, with 0.1 label smoothing to prevent overconfidence
Learning rate scheduler: `ReduceLROnPlateau`
Regularization: Random dropouts, flips, and color jitters
### Bottlenecks and Hardware
- Because scikit-learn is CPU-bound, I couldn't take advantage of the GPU. I sampled less rows and used `svd_solver='randomized'` in PCA, which sped things up.
- I added `num_workers=4` and `pin_memory=True` to PyTorch's `DataLoader` to utilize the GPU better.
- ONNX export didn't work at first, so I had to move the inputs and the weights both to CPU.
## Results and Performance Analysis
### Performance Comparison
It's important to note that because there are nine emotion classes, random guessing is 1/9, or 11.1% accuracy. Model A was consistently around 30-35% accuracy no matter what I changed, but optimizations to model B lead me from around 55% validation accuracy at the beginning to 70% and then ~80% at the end. The models are not meant to be compared directly to each other, as Model A got less and lower-quality data, but our results clearly show that the deep learning method recognizes patterns that our regression model does not.
### Graphs and Analysis (Model B Only)
![[Pasted image 20260804164840.png]]
Overall, the model learned quickly at the beginning. Once we moved to phase 2 (Epoch 8), we unfroze more of the model backbone and decreased the learning rate. The goal was to maximize validation accuracy while decreasing the probability the model would just memorize the dataset.  We stopped training once validation accuracy started plateauing.
![[Pasted image 20260804164852.png]]This is about as expected. More obvious expressions like Happiness and Surprise are easier to spot. Subtle emotions are harder for the model to guess. Some expressions that are tricky for humans to distinguish, like fear and uncertainty, are hard for the model as well.
![[Pasted image 20260804165056.png]]
We can learn the same lessons here. It makes sense that "Neutral" is the worst-performing emotion, as there isn't much distinctive about it.
![[Pasted image 20260804165106.png]]
![[Pasted image 20260804165122.png]]
Honestly, I would have misclassified many of these emotions as well.
## Conclusion and Future Work
### Takeaways
In the task I undertook in this project, deep convolutional neural networks with transfer learning dramatically outperform classical statistical feature expression. This was an interesting, engaging project, and although there are many things I could change for the future, I'm glad it turned out this way.
### Issues and Limitations
- I used fewer and less detailed images for Model A. However, this probably didn't make too much of a difference.
- No test set, so it is difficult to validate our accuracy. We ended up optimizing for validation accuracy, but it would have been better to optimize for best validation loss or have created a test set. Now that I think about it, the test set could have been real pictures that I and people testing the site with me took.
- 128x128 is fairly low-resolution. Most FER models are higher.
- The snapshots taken on the website are an approximation of the dataset, but not exact.
- The dataset is kind of janky, with a lot of pictures upside down/sideways, some images very similar to each other, etc.
- Labels are one-dimensional, when in reality, facial expressions bleed into each other.
- I only captured detailed statistics for Model B.
### Future Work
- Real-time bounding box tracking
- Train on larger, more diverse datasets
- Generalize the model to faces of different orientations and angles
- Pushing Model A to its limits.