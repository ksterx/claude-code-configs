# ML Package Profile

## Markers

- `train.py`, `models/`, `datasets/`
- torch/tensorflow imports

## Principles

- Reproducibility first (seeds, versioning)
- Config-driven experiments
- Clear separation: data -> model -> training -> inference
- Checkpoint management

## Structure

```
src/
├── config/          # Experiment configurations
│   └── default.yaml
├── data/            # Data loading, preprocessing
│   ├── dataset.py
│   └── transforms.py
├── models/          # Model definitions
│   └── transformer.py
├── training/        # Training loops, callbacks
│   └── trainer.py
├── inference/       # Inference pipelines
│   └── predictor.py
└── utils/           # Logging, metrics, etc.
```

## Rules

- Every experiment must be reproducible
- Log hyperparameters and metrics
- Version models and data
- Separate training from inference
