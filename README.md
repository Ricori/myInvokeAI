# YoruAI: A Stable Diffusion Toolkit

This is a fork of
[invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI),
the open source text-to-image generator. It provides a streamlined
process with various new features and options to aid the image
generation process. It runs on Windows, Mac and Linux machines, with
GPU cards with as little as 4 GB of RAM. It provides both a polished
Web interface, and an easy-to-use command-line interface.


## Table of Contents

1. [Installation](#installation)
2. [Hardware Requirements](#hardware-requirements)

### Installation

This fork is supported across multiple platforms. You can find individual installation instructions
below.

- #### [Linux](docs/installation/INSTALL_LINUX.md)

- #### [Windows](docs/installation/INSTALL_WINDOWS.md)

- #### [Macintosh](docs/installation/INSTALL_MAC.md)

### Hardware Requirements

#### System

You wil need one of the following:

- An NVIDIA-based graphics card with 4 GB or more VRAM memory.
- An Apple computer with an M1 chip.

#### Memory

- At least 12 GB Main Memory RAM.

#### Disk

- At least 6 GB of free disk space for the machine learning model, Python, and all its dependencies.

**Note**

If you have a Nvidia 10xx series card (e.g. the 1080ti), please
run the dream script in full-precision mode as shown below.

Similarly, specify full-precision mode on Apple M1 hardware.

Precision is auto configured based on the device. If however you encounter
errors like 'expected type Float but found Half' or 'not implemented for Half'
you can try starting `invoke.py` with the `--precision=float32` flag:

```bash
(ldm) ~/stable-diffusion$ python scripts/invoke.py --precision=float32
```