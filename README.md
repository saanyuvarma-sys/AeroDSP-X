
# AeroDSP-X
### Aerospace-Inspired Sensor Signal Conditioning and Vibration Monitoring Using Verilog RTL

## Project Overview
AeroDSP-X is a digital signal processing RTL project designed to explore sensor signal conditioning and vibration event detection.

The system combines an 8-tap symmetric FIR filter with a programmable vibration monitoring module.

## Architecture

1. **FIR Filter:** Processes incoming 16-bit signed samples using fixed-point coefficients.
2. **Vibration Monitor:** Detects high vibration using programmable threshold and hysteresis.
3. **Top Module:** Integrates both modules into one system.

## Features
- 8-tap symmetric FIR filter
- Fixed-point arithmetic (Q1.15 coefficients)
- Signed 16-bit input and output
- Saturation handling
- Programmable threshold and hysteresis
- Consecutive-sample alarm detection
- Functional verification using SystemVerilog testbenches

## Verification

FIR verification:
- Total comparisons: 172
- Passed: 172
- Failed: 0

Integrated system scenarios:
- Normal vibration
- High vibration detection
- Alarm clearing

## Synthesis

Tool: Yosys

Previously recorded synthesis results:
- Generic logic cells: 3,940
- Wires: 3,828
- Wire bits: 4,118

These are generic synthesis statistics, not physical chip area, power, or timing measurements.

## Files

| File | Description |
|---|---|
| design.sv | RTL design |
| testbench.sv | Integrated system testbench |
| fir_testbench.sv | FIR verification testbench |
| run.ys | Yosys synthesis script |

## Tools Used
- Verilog / SystemVerilog
- Icarus Verilog
- EDA Playground
- EPWave
- Yosys
- GitHub

## Learning Outcomes
- RTL design and module integration
- Fixed-point DSP implementation
- Functional verification
- Testbench development
- Logic synthesis using Yosys

## Disclaimer
This is an educational prototype inspired by aerospace sensor applications. It is not certified or qualified for actual aerospace or flight-critical use.

## Author
B.Tech Electronics and Communication Engineering Student
