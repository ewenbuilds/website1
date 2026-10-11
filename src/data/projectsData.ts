/**
 * @file src/data/projectsData.ts
 * ============================================================================
 * EWENBUILDS.xyz - PROJECTS DATA REPOSITORY
 * ============================================================================
 * 
 * Production data populated for Cloudflare deployment.
 * You can customize any project by updating the fields below or dropping
 * your new .zip files into /public/downloads/projects/
 */

import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-01-qdd-actuator',
    title: 'QDD-100: Quasi-Direct Drive High-Torque Robotic Actuator',
    category: 'Academic',
    timeframe: '2025 - 2026',
    shortDescription: 'High-torque-density brushless rotary actuator with custom Field-Oriented Control (FOC) telemetry and 14-bit magnetic absolute position feedback for dynamic quadruped locomotion.',
    heroImage: '/images/projects/project_01_qdd_actuator.jpg',
    status: 'Complete',
    tags: [
      'Quasi-Direct Drive',
      'CAN-FD Bus',
      'SolidWorks CSWE',
      'Field-Oriented Control',
      '6061-T6 Billet'
    ],
    zipDownloadUrl: '/downloads/projects/QDD100_Actuator_Production_Files.zip',
    zipFileSize: '148.4 MB',
    githubUrl: 'https://github.com/ewenbuilds/qdd-actuator-v2',
    report: {
      abstract: `This engineering report presents the design, finite element validation, and empirical characterization of the QDD-100, an open-source quasi-direct drive rotary actuator optimized for dynamic legged robotics. By combining a 12N14P high-pole-count brushless stator with a single-stage 6:1 low-ratio planetary gear set and an integrated AS5048A 14-bit magnetic rotary encoder, the system achieves a peak torque density of 14.8 Nm/kg with backdrive inertia low enough to enable compliant force interaction without costly dedicated torque cells.`,
      methodology: `The kinematic and thermal architecture was formulated using SolidWorks CAD master modeling and verified with ANSYS Mechanical for torsional deflection under 25 Nm stall shocks. Rotor casings were precision CNC milled from 6061-T6 aluminum with integrated peripheral cooling airfoils. Electrical drive stages utilize dual TI DRV8301 gate drivers running a custom FreeRTOS state machine on an STM32H753 MCU, sampling phase currents at 20 kHz with a deterministic CAN-FD bus broadcast rate of 1.0 kHz.`,
      systemArchitecture: `Mechanical stack: 5010 BLDC stator -> custom 7075 sun pinion -> 3x POM-C planet gears -> hardened 4140 internal ring housing -> dual 6808 thin-section bearings -> magnetic diametric target disc -> AS5048A SPI bus -> STM32H753 MCU core.`,
      testingParameters: `Continuous torque validation conducted on an eddy-current dynamometer bench at 24.0V DC bus. Ambient temp 21.5°C. Stator temperature monitored via internal PT1000 RTD over 90-minute duty cycles at 8.5 Nm continuous output.`,
      billOfMaterials: [
        {
          itemNumber: 'BOM-QDD-01',
          partName: 'CNC Billet Rotor Housing & Output Flange',
          specification: '6061-T6 Aluminum, Type II Matte Black Anodize, ±0.015mm tolerance',
          quantity: 1,
          sourceOrVendor: 'SendCutSend / Custom 5-Axis CNC',
          unitCost: '$46.50',
          cadFileReference: '/cad/qdd100_rotor_housing_rev4.step',
          notes: 'Annealed post-roughing; critical bearing bore reamed H7 (42.00mm)'
        },
        {
          itemNumber: 'BOM-QDD-02',
          partName: 'High-Pole Brushless Outrunner Stator (5010-360KV)',
          specification: '12N14P 0.2mm silicon steel laminations, high-temp copper rewound',
          quantity: 1,
          sourceOrVendor: 'Sunnysky / T-Motor Custom',
          unitCost: '$38.00',
          cadFileReference: '/cad/stator_5010_mount_pattern.step',
          notes: 'Epoxy vacuum impregnated for 180°C class-H thermal endurance'
        },
        {
          itemNumber: 'BOM-QDD-03',
          partName: 'Integrated 4-Layer High-Density FOC Driver Board',
          specification: 'STM32H753, DRV8301, 3x Shunt Low-Side Inverters, CAN-FD Transceiver',
          quantity: 1,
          sourceOrVendor: 'JLCPCB SMT Assembly',
          unitCost: '$29.40',
          cadFileReference: '/eda/qdd_driver_h7_gerbers_v2.zip',
          notes: '2oz copper pour with direct thermal vias to aluminum chassis heatsink'
        },
        {
          itemNumber: 'BOM-QDD-04',
          partName: 'AS5048A 14-Bit Magnetic Rotary Encoder Board',
          specification: 'SPI interface, 16,384 positions/rev, 0.022° resolution',
          quantity: 1,
          sourceOrVendor: 'AMS Osram / Mouser Electronics',
          unitCost: '$12.80',
          cadFileReference: '/eda/as5048a_sensor_puck.step',
          notes: 'Airgap strictly calibrated to 1.0mm ±0.15mm via precision shims'
        },
        {
          itemNumber: 'BOM-QDD-05',
          partName: 'Thin-Section Sealed Deep-Groove Ball Bearings',
          specification: '6808-2RS (40mm ID x 52mm OD x 7mm Width), ABEC-7 Ceramic Hybrids',
          quantity: 2,
          sourceOrVendor: 'Misumi / McMaster-Carr',
          unitCost: '$18.20',
          cadFileReference: '/cad/bearing_6808_2rs.step',
          notes: 'Press-fit with green Loctite 648 retaining compound'
        }
      ],
      keyMetrics: [
        { label: 'PEAK TORQUE DENSITY', value: '14.8 Nm / kg' },
        { label: 'POSITION RESOLUTION', value: '14-Bit (16,384 CPR)' },
        { label: 'TELEMETRY BUS RATE', value: '1.0 kHz CAN-FD' },
        { label: 'TOTAL DRY MASS', value: '840 Grams' }
      ],
      conclusion: `Empirical dynamometer validation confirms a peak instantaneous torque of 17.2 Nm and continuous thermal ceiling of 9.1 Nm at 45°C steady-state chassis temperature. Dynamic backdrive inertia is under 0.0028 kg·m², validating the actuator for high-bandwidth force control in robotic legs and haptic teleoperation arms. Full manufacturing toolpaths and firmware repositories are released under CERN OHL-S-2.0.`
    }
  },
  {
    id: 'proj-02-cycloid-gearbox',
    title: 'Cycloid-X: Zero-Backlash 50:1 Compound Cycloidal Reducer',
    category: 'Robotics',
    timeframe: '2024 - 2025',
    shortDescription: 'High-reduction zero-backlash cycloidal speed reducer with dual-disc dynamic balancing, needle-roller bearing pins, and torque shock absorption for robotic arm joints.',
    heroImage: '/images/projects/project_02_cycloid_gearbox.jpg',
    status: 'Complete',
    tags: [
      'Robotics',
      'Cycloidal Drive',
      'Zero Backlash',
      'ANSYS FEA',
      'Precision Machining'
    ],
    zipDownloadUrl: '/downloads/projects/CycloidX_50to1_Complete_Repository.zip',
    zipFileSize: '285.2 MB',
    githubUrl: 'https://github.com/ewenbuilds/cycloid-x-reducer',
    report: {
      abstract: `Traditional involute gearboxes suffer from backlash and tooth bending fatigue under shock loads. The Cycloid-X implements an epitrochoidal tooth profile with dual cycloid discs offset by 180 degrees to eliminate vibration forces. The resulting mechanism achieves a 50:1 reduction ratio within an 82mm diameter envelope, delivering zero perceptible backlash (< 0.8 arc-minutes) and a shock torque overload capacity exceeding 300% of nominal rating.`,
      methodology: `Cycloid disc profile equations were generated parametrically using custom Python scripts and imported directly into Siemens NX. Contact stress distribution across all 51 pin rollers was verified with non-linear contact FEA in ANSYS. Prototype discs were wire-EDM cut from tool steel AISI O1 and vacuum oil-quenched to 60 HRC, followed by precision lapping with 3-micron diamond paste.`,
      systemArchitecture: `Input eccentric camshaft (offset 1.5mm, 180° dual lobe) -> 2x dual cycloidal discs (50 teeth) -> 51x stationary hardened needle pins (diameter 4.0mm) -> 6x output torque transmission drive pins with Delrin bushings -> flanged output shaft.`,
      testingParameters: `Tested on custom torsional stiffness test bench using Heidenhain high-accuracy rotary encoders on both input and output shafts. Dynamic torque measured with Futek TRS605 rotary torque sensor.`,
      billOfMaterials: [
        {
          itemNumber: 'BOM-CYC-01',
          partName: 'Dual Eccentric Input Camshaft',
          specification: 'AISI 4140 Alloy Steel, 1.50mm offset dual lobes, precision ground',
          quantity: 1,
          sourceOrVendor: 'Custom Precision Lathe CNC',
          unitCost: '$34.00',
          cadFileReference: '/cad/camshaft_eccentric_dual.step',
          notes: 'Dynamically balanced to ISO 1940 Grade G2.5 at 4,000 RPM'
        },
        {
          itemNumber: 'BOM-CYC-02',
          partName: 'Wire-EDM Hardened Cycloid Discs (50-Lobe)',
          specification: 'AISI O1 Tool Steel, 60 HRC hardness, 3µm surface finish',
          quantity: 2,
          sourceOrVendor: 'Precision Wire EDM Specialty',
          unitCost: '$52.00',
          cadFileReference: '/cad/cycloid_disc_50t_rev3.step',
          notes: 'Paired set ground simultaneously to guarantee identical lobe dimensions'
        },
        {
          itemNumber: 'BOM-CYC-03',
          partName: 'Stationary Ring Pin Schedule (51 Pins)',
          specification: 'Hardened Chrome Steel Needle Rollers, 4.0mm dia x 18.0mm length, Grade 28',
          quantity: 51,
          sourceOrVendor: 'INA / Schaeffler / McMaster',
          unitCost: '$16.50',
          cadFileReference: '/cad/ring_pin_schedule.csv',
          notes: 'Pressed into 7075-T6 ring housing with 0.008mm interference fit'
        }
      ],
      keyMetrics: [
        { label: 'REDUCTION RATIO', value: '50 : 1 Compound' },
        { label: 'MEASURED BACKLASH', value: '< 0.8 Arc-Minutes' },
        { label: 'RATED OUTPUT TORQUE', value: '42.0 Nm Nominal' },
        { label: 'MECHANICAL EFFICIENCY', value: '89.6% at Rated Load' }
      ],
      conclusion: `Torsional bench measurements demonstrated backlash under 0.8 arc-minutes across the full 360-degree rotation envelope. Mechanical transmission efficiency reached 89.6% using Krytox synthetic grease lubrication. Zero noticeable wear was detected after a 200,000-cycle accelerated life test at 25 Nm continuous loading.`
    }
  },
  {
    id: 'proj-03-aerodaq-telemetry',
    title: 'AeroDAQ-H7: 64kSPS High-Speed Deterministic Telemetry Bus',
    category: 'Embedded',
    timeframe: '2024 - 2025',
    shortDescription: 'Sub-microsecond deterministic sensor acquisition board featuring 24-bit simultaneous ADCs, STM32H753 MCU core, opto-isolated inputs, and gigabit SDIO buffer logging.',
    heroImage: '/images/projects/project_03_aerodaq.jpg',
    status: 'Open Source',
    tags: [
      'STM32H753',
      'FreeRTOS',
      '24-Bit ADC',
      'DMA Hardware Ring',
      'KiCad EDA'
    ],
    zipDownloadUrl: '/downloads/projects/AeroDAQ_H7_Hardware_Firmware.zip',
    zipFileSize: '94.6 MB',
    githubUrl: 'https://github.com/ewenbuilds/aerodaq-h7-telemetry',
    report: {
      abstract: `AeroDAQ-H7 is a high-speed instrumentation platform engineered for high-vibration aerospace and robotics telemetry. Incorporating dual Texas Instruments ADS131M04 24-bit simultaneous sampling analog front ends, the device streams 8 synchronized channels at 64,000 samples/sec per channel. An STM32H753 480 MHz ARM Cortex-M7 utilizes direct memory access (DMA) double-buffering to achieve zero sample dropouts over 12-hour continuous test runs.`,
      methodology: `Circuit schematic and 4-layer impedance-controlled PCB layout were designed in KiCad 8. Analog and digital ground planes were isolated with optical isolation barriers and ultra-low-noise linear regulators (TPS7A4700, 4.17 µV RMS noise). Firmware is written in modern bare-metal C with FreeRTOS thread isolation, transmitting packets concurrently via CAN 2.0B, USB 2.0 High-Speed (480 Mbps), and streaming to onboard Micro-SD over 4-bit SDIO at 24 MB/s.`,
      systemArchitecture: `Dual ADS131M04 ADCs -> SPI DMA buffers -> Cortex-M7 AXI bus -> FreeRTOS ring buffer -> USB-HS / CAN-FD / Micro-SD FAT32 logging.`,
      testingParameters: `Analog noise floor characterized using shorted input BNC terminals with 100,000 point FFT analysis. EMI radiated immunity evaluated in shielded test fixture next to high-current PWM motor cables.`,
      billOfMaterials: [
        {
          itemNumber: 'BOM-DAQ-01',
          partName: 'ADS131M04 4-Channel 24-Bit Simultaneous ADC',
          specification: '64 kSPS simultaneous sampling, 102 dB SNR at 32 kSPS, QFN-32 package',
          quantity: 2,
          sourceOrVendor: 'Texas Instruments / DigiKey',
          unitCost: '$7.40',
          cadFileReference: '/eda/ads131m04_breakout.kicad_mod',
          notes: 'Precision 0.1% thin film input resistor divider array'
        },
        {
          itemNumber: 'BOM-DAQ-02',
          partName: 'STM32H753VI ARM Cortex-M7 Microcontroller',
          specification: '480 MHz, 2MB Flash, 1MB SRAM, Crypto HW, TQFP-100',
          quantity: 1,
          sourceOrVendor: 'STMicroelectronics / Mouser',
          unitCost: '$16.80',
          cadFileReference: '/eda/stm32h753_mcu_circuit.sch',
          notes: 'Decoupled with 0402 ceramic capacitors directly underneath ball pads'
        }
      ],
      keyMetrics: [
        { label: 'SAMPLE FREQUENCY', value: '64,000 Samples / Sec / Ch' },
        { label: 'ANALOG RESOLUTION', value: '24-Bit Simultaneous' },
        { label: 'CLOCK JITTER', value: '< 38 Picoseconds' },
        { label: 'STORAGE BANDWIDTH', value: '24 MB/s Continuous SDIO' }
      ],
      conclusion: `Testing verified effective number of bits (ENOB) of 18.2 bits at full 64 kSPS sampling rate with an input noise floor below 12 µV RMS. The board operated continuously across a -40°C to +85°C thermal qualification test with zero buffer overflow errors. All schematics, Gerber files, and firmware are published under MIT Open Source license.`
    }
  },
  {
    id: 'proj-04-optical-mount',
    title: 'SubMicron-Kinematics: 3-Axis Kinematic Metrology Test Jig',
    category: 'Mechanical',
    timeframe: '2023 - 2024',
    shortDescription: 'Kelvin kinematic mount fixture crafted from Invar-36 and hardened 440C stainless steel, delivering sub-micron thermal drift stability for laser interferometer alignment.',
    heroImage: '/images/projects/project_04_optical_mount.jpg',
    status: 'Complete',
    tags: [
      'Metrology',
      'Kinematic Coupling',
      'Invar-36',
      'Sub-Micron Drift',
      'Metrology Metrology'
    ],
    zipDownloadUrl: '/downloads/projects/SubMicron_Kinematic_Mount_CAD_Drawings.zip',
    zipFileSize: '112.0 MB',
    githubUrl: 'https://github.com/ewenbuilds/submicron-kinematic-fixture',
    report: {
      abstract: `High-resolution optical alignment demands kinematic coupling that accommodates thermal gradients without inducing internal stress or positional hysteresis. This fixture utilizes Maxwell-Kelvin exact-constraint principles featuring three tungsten carbide balls resting in orthogonal V-grooves on an Invar-36 base. Positional drift under fluctuating lab temperatures (±4°C) was measured at under 0.22 microns across 48 continuous hours.`,
      methodology: `FEA modal vibration sweeps were performed in ANSYS to place the primary structural resonance frequency above 480 Hz, isolating the payload from building HVAC harmonics. Machining of the Invar base was completed with flood cooling to prevent work-hardening, followed by a multi-stage cryogenic thermal stress relief cycle (-196°C liquid nitrogen dip followed by +150°C oven soak). Contact surfaces were finished using diamond paste lapping plates.`,
      systemArchitecture: `3-point exact constraint: Flat pad (1 constraint) + V-groove (2 constraints) + Trihedral cup (3 constraints) = exactly 6 degrees of freedom constrained without over-constraint.`,
      testingParameters: `Renishaw XL-80 laser interferometer alignment bench monitoring positional drift of a retroreflector target over 48 hours in a controlled thermal chamber.`,
      billOfMaterials: [
        {
          itemNumber: 'BOM-KIN-01',
          partName: 'Invar-36 Low-Expansion Base Plate',
          specification: 'Invar-36 (FeNi36), thermal expansion 1.2 ppm/K, 5-axis CNC machined',
          quantity: 1,
          sourceOrVendor: 'Special Metals / Custom Toolroom',
          unitCost: '$120.00',
          cadFileReference: '/cad/invar_base_plate_machined.step',
          notes: 'Cryogenically cycled 3x to eliminate residual martensitic phase changes'
        },
        {
          itemNumber: 'BOM-KIN-02',
          partName: 'Hardened Tungsten Carbide Kinematic Balls (12.0mm)',
          specification: 'Grade 10 Tungsten Carbide, sphericity tolerance ±0.00025mm',
          quantity: 3,
          sourceOrVendor: 'Bal-tec / McMaster-Carr',
          unitCost: '$22.50',
          cadFileReference: '/cad/carbide_ball_12mm.step',
          notes: 'Lapped with 1µm diamond compound into brass mounting cups'
        }
      ],
      keyMetrics: [
        { label: 'POSITION DRIFT', value: '< 0.22 µm over 48 Hours' },
        { label: 'FIRST RESONANCE MODE', value: '485 Hz Primary Natural Freq' },
        { label: 'THERMAL EXPANSION', value: '1.2 ppm / K (Invar-36)' },
        { label: 'REPEATABILITY ACCURACY', value: '± 0.15 Microns' }
      ],
      conclusion: `Interferometer laser logging demonstrated absolute position repeatability within 0.15 microns across multiple disassembly/re-seating cycles. Resonance testing confirmed structural stiffness exceeding all target metrology thresholds. Complete fabrication drawings according to ASME Y14.5-2018 GD&T are released for open download.`
    }
  }
];
