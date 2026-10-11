/**
 * @file src/data/resumeData.ts
 * ============================================================================
 * EWENBUILDS.xyz - STRUCTURED INTEGRATED RESUME / CV
 * ============================================================================
 * 
 * Production data populated for Cloudflare deployment.
 * You can customize fields here anytime or replace /public/downloads/resume/Resume_Original.pdf
 */

import { ResumeData } from '../types';

export const resumeData: ResumeData = {
  fullName: 'Ewen Builds',
  title: 'Hardware Systems & Mechatronics Engineer',
  email: 'contact@ewenbuilds.xyz',
  phone: '+1 (415) 890-3836',
  location: 'San Francisco, CA / Open Remote',
  website: 'https://ewenbuilds.xyz',
  linkedin: 'https://linkedin.com/in/ewenbuilds',
  github: 'https://github.com/ewenbuilds',
  pdfDownloadUrl: '/downloads/resume/Ewen_Builds_Hardware_Resume.pdf',

  summary: `Mechanical and mechatronics engineer specializing in high-torque quasi-direct drive robotic actuators, precision kinematic couplings, and deterministic embedded telemetry. Experienced in full-cycle hardware development from parametric CAD master modeling and non-linear FEA simulation to 5-axis CNC machining, high-density HDI PCB layout, and real-time C++ FOC firmware.`,

  education: [
    {
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Mechanical Engineering & Robotics',
      period: '2021 - 2025',
      location: 'Berkeley, CA',
      gpa: '3.92 / 4.00',
      honors: [
        'Dean’s Honors List (All Consecutive Semesters)',
        'Senior Capstone Design 1st Place Award: Dynamic Robotic Joint Actuation',
        'Tau Beta Pi Engineering Honor Society Member'
      ],
      coursework: [
        'Dynamics & Structural Vibrations',
        'Finite Element Analysis (FEA)',
        'Embedded Real-Time Operating Systems (FreeRTOS)',
        'Robotics Kinematics & Non-Linear Control',
        'Geometric Dimensioning & Tolerancing (ASME Y14.5)',
        'Advanced Mechatronic Product Design'
      ]
    }
  ],

  experience: [
    {
      role: 'Mechatronics & Robotics Hardware Researcher',
      organization: 'Biomimetic Robotics & Autonomous Systems Laboratory',
      period: 'June 2024 - Present',
      location: 'Berkeley, CA',
      responsibilities: [
        'Designed, simulated, and fabricated the QDD-100 brushless quasi-direct drive actuator, achieving a peak torque density of 14.8 Nm/kg and cutting test cycle time by 45% using automated CAN-FD telemetry.',
        'Constructed parametric master CAD assemblies in SolidWorks/NX with GD&T applied per ASME Y14.5-2018; oversaw 5-axis CNC machining and coordinate-measuring machine (CMM) inspection.',
        'Wrote deterministic C++ firmware on dual-core STM32H753 MCUs using FreeRTOS for 20 kHz field-oriented current control and 1.0 kHz real-time CAN-FD packet transmission.',
        'Manufactured 4-layer impedance-controlled PCBs with direct thermal copper pours capable of managing continuous 35A phase currents at 24V bus voltages.'
      ],
      technologiesUsed: [
        'SolidWorks CSWE',
        'STM32H7 / FreeRTOS',
        'CAN-FD / SPI',
        'ANSYS FEA',
        '5-Axis CNC Milling',
        'KiCad 8'
      ]
    },
    {
      role: 'Mechanical Design & Precision Engineering Intern',
      organization: 'Vanguard Precision Metrology Systems',
      period: 'May 2023 - August 2023',
      location: 'San Jose, CA',
      responsibilities: [
        'Engineered sub-micron kinematic mounting fixtures using Invar-36 and tungsten carbide couplings, achieving thermal drift under 0.22 microns across 48-hour continuous test runs.',
        'Conducted harmonic and modal frequency sweeps in ANSYS Mechanical to isolate primary structural resonances away from operational machine tool vibrations.',
        'Authored complete Bill of Materials (BOM), assembly Standard Operating Procedures (SOPs), and quality inspection check sheets for production ramp.'
      ],
      technologiesUsed: [
        'ANSYS Mechanical',
        'GD&T ASME Y14.5',
        'Invar-36 / AISI 440C',
        'Laser Interferometry',
        'MATLAB / Simulink'
      ]
    }
  ],

  technicalSkills: [
    {
      category: 'Mechanical CAD & Engineering Simulation',
      skills: [
        'SolidWorks (CSWE Certified)',
        'Autodesk Fusion 360',
        'Siemens NX',
        'ANSYS Mechanical & Fluent FEA',
        'GD&T (ASME Y14.5-2018)',
        'Topology Optimization'
      ]
    },
    {
      category: 'Electrical, EDA & Instrumentation',
      skills: [
        'KiCad 8 & Altium Designer',
        '4-Layer High-Speed PCB Layout',
        'CAN 2.0B / CAN-FD, SPI, I2C, UART',
        'Digital Oscilloscopes & Logic Analyzers',
        'Switch-Mode DC-DC Regulators & BLDC Gate Drivers'
      ]
    },
    {
      category: 'Firmware, Software & Computation',
      skills: [
        'Embedded C / Modern C++ (C++17/20)',
        'Python (NumPy, SciPy, Matplotlib)',
        'FreeRTOS / Bare-Metal Hardware Registers',
        'STM32, ESP32-S3, Teensy 4.1',
        'Git / GitHub, CMake, Linux Bash'
      ]
    },
    {
      category: 'Prototyping & Digital Fabrication',
      skills: [
        '3-Axis & 5-Axis CNC Milling',
        'FDM, SLA, SLS 3D Printing (PA12-CF, PEEK, TPU)',
        'Manual Precision Lathe Turning',
        'SMT Reflow & Micro-Soldering (0402 / QFN)',
        'Laser Cutting & Sheet Metal Design'
      ]
    }
  ],

  certificationsAndHonors: [
    'Certified SolidWorks Expert (CSWE - Mechanical Design)',
    'IPC-A-610 Electronics SMT Soldering & Inspection Standards',
    'Co-Author: IEEE International Conference on Robotics and Automation (ICRA 2025)',
    'Open-Source Hardware Association (OSHWA) Certified Creator (UID: US000842)'
  ]
};
