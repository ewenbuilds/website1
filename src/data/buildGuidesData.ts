/**
 * @file src/data/buildGuidesData.ts
 * ============================================================================
 * EWENBUILDS.xyz - BUILD GUIDES & OPEN SOURCE CAD REPOSITORY
 * ============================================================================
 * 
 * Production data populated for Cloudflare deployment.
 * You can drop your new CAD files in /public/cad/ and archives in /public/downloads/
 */

import { BuildGuideItem } from '../types';

export const buildGuidesData: BuildGuideItem[] = [
  {
    id: 'guide-01-actuator',
    title: 'QDD-100 High-Torque Brushless Rotary Joint Actuator',
    version: 'v2.4.0',
    difficulty: 'Intermediate',
    estimatedBuildTime: '4 - 6 Hours',
    overview: 'A high-precision quasi-direct drive actuator engineered for legged robotics and dynamic animatronics. Features 6061-T6 CNC billet and PA12-CF housings, AS5048A 14-bit magnetic absolute position sensing, and high-frequency CAN-FD bus communication.',
    
    // 3D Model Configuration (Used by the interactive Three.js CAD viewer)
    modelType: 'armature',
    modelCadFileName: 'qdd100_rotary_actuator_assembly.step',
    modelPartCount: 14,
    materials: [
      '6061-T6 Billet Aluminum / PA12-CF Nylon',
      'M3 DIN 912 Class 12.9 Socket Fasteners',
      'Ruthex M3 Brass Heat-Set Threaded Inserts'
    ],
    
    // TWO Required Download Buttons
    buildFilesDownloadUrl: '/downloads/build-files/QDD100_CAD_STEP_STLs_v2_4.zip',
    buildFilesSize: '38.6 MB (CAD / STL / STEP Only)',
    
    fullRepoDownloadUrl: '/downloads/full-repos/QDD100_Full_Project_Archive.zip',
    fullRepoSize: '312.8 MB (Full Repo: Raw CAD + FOC Firmware + Benchmarks)',

    steps: [
      {
        stepNumber: 1,
        title: 'Billet Preparation & Bearing Bore Reaming',
        description: 'Inspect the CNC milled rotor shell and stator carrier. If using 3D-printed PA12-CF parts, anneal at 80°C for 6 hours. Ream the dual 52mm bearing seats with a machine reamer to ensure H7 dimensional tolerance (+0.015/-0.000 mm). Clean all surfaces with isopropyl alcohol.',
        requiredTools: [
          '52.0mm Bearing Arbor Press Guide',
          'Digital Vernier Caliper (Mitutoyo 0.01mm)',
          '99% Isopropyl Alcohol & Lint-Free Wipes'
        ],
        inspectionTip: 'Verify bearing seat concentricity with dial indicator; total runout must not exceed 0.012mm.'
      },
      {
        stepNumber: 2,
        title: 'Thermal Heat-Set Insert Installation & Bearing Pressing',
        description: 'Heat soldering station to 240°C. Press the 16x M3 brass threaded inserts perpendicular to top faces. Allow inserts to cool completely. Lubricate bearing journals with a drop of machine oil and press 6808-2RS thin-section ceramic hybrid bearings using an arbor press.',
        requiredTools: [
          'Soldering Iron with M3 Conical Insert Tip (240°C)',
          '1-Ton Manual Bench Arbor Press',
          'Loctite 648 High-Strength Retaining Compound'
        ],
        inspectionTip: 'Ensure inserts sit 0.2mm sub-flush to eliminate mating face binding.'
      },
      {
        stepNumber: 3,
        title: 'Rotor Assembly & Diametric Magnet Airgap Calibration',
        description: 'Apply Loctite 648 retaining compound to the motor shaft and mount the diametrically magnetized neodymium target disc. Mount the AS5048A sensor board ensuring the air gap between magnet and IC face is strictly 1.0mm ±0.15mm using precision brass feeler gauges.',
        requiredTools: [
          'Brass Non-Magnetic Feeler Gauge Set (0.8 - 1.2mm)',
          'Wiha 2.0mm Ball-End Hex Driver',
          'Loctite 243 Blue Medium Threadlocker'
        ],
        inspectionTip: 'Confirm via SPI monitor that the AS5048A MAG_INC and MAG_DEC error flags remain cleared.'
      },
      {
        stepNumber: 4,
        title: 'CAN-FD Bus Wiring, FOC Calibration & Dyno Verification',
        description: 'Connect 24V DC bus and differential CAN-FD pair through the strain-relief umbilical gland. Connect to PC via CANable 2.0 USB analyzer. Execute automated electrical offset calibration sequence in SimpleFOC to align motor d/q reference frames.',
        requiredTools: [
          'CANable 2.0 Isolated USB-to-CAN Analyzer',
          '24V 10A Current-Limited Regulated Bench PSU',
          'Siglent SDS1104X-E 100MHz Digital Oscilloscope'
        ],
        inspectionTip: 'Verify no-load idle current remains under 165mA at 24.0V operational bus.'
      }
    ],

    billOfMaterials: [
      {
        itemNumber: 'BOM-GUIDE-01',
        partName: '5010 Brushless Outrunner Motor (360KV)',
        specification: '12N14P configuration, hollow 8mm shaft, class H insulation',
        quantity: 1,
        sourceOrVendor: 'Sunnysky / T-Motor / Hobbywing',
        unitCost: '$38.00',
        cadFileReference: '/cad/motor_outrunner_5010.step',
        notes: 'Custom rewound with 0.45mm enameled copper wire'
      },
      {
        itemNumber: 'BOM-GUIDE-02',
        partName: 'AS5048A 14-Bit Magnetic Absolute Encoder',
        specification: '14-Bit resolution (16,384 CPR), SPI interface, 3.3V',
        quantity: 1,
        sourceOrVendor: 'AMS Osram / Mouser Electronics',
        unitCost: '$12.80',
        cadFileReference: '/eda/as5048a_breakout.step',
        notes: 'Diametrically magnetized neodymium disc included'
      },
      {
        itemNumber: 'BOM-GUIDE-03',
        partName: 'Thin-Section Deep-Groove Ball Bearings 6808-2RS',
        specification: '40mm ID x 52mm OD x 7mm Width, ABEC-7 Hybrid Ceramic',
        quantity: 2,
        sourceOrVendor: 'Misumi / McMaster-Carr',
        unitCost: '$18.20',
        cadFileReference: '/cad/bearing_6808_2rs.step',
        notes: 'Pre-lubricated with high-temperature synthetic grease'
      },
      {
        itemNumber: 'BOM-GUIDE-04',
        partName: 'M3 Brass Tapered Heat-Set Threaded Inserts',
        specification: 'M3 x 5.7mm OD x 4.0mm Length, diagonal knurling',
        quantity: 16,
        sourceOrVendor: 'Ruthex / McMaster-Carr',
        unitCost: '$0.35',
        cadFileReference: '/cad/m3_heat_insert.step',
        notes: 'Thermal staking installation at 240°C'
      }
    ]
  },
  {
    id: 'guide-02-gearbox',
    title: 'Modular 10:1 Planetary Speed Reducer with Annular Housing',
    version: 'v1.8.2',
    difficulty: 'Advanced',
    estimatedBuildTime: '5 - 7 Hours',
    overview: 'A modular 10:1 compound planetary reduction gear set engineered with optimized 20-degree involute tooth profiles, internal needle roller cages, and integrated balanced planet carrier for minimum angular backlash.',
    
    // 3D Model Configuration
    modelType: 'gearbox',
    modelCadFileName: 'planetary_gearbox_assembly_10to1.step',
    modelPartCount: 22,
    materials: [
      'Delrin / POM-C Low-Friction Acetal',
      'Case-Hardened AISI 4140 Alloy Steel',
      '6061-T6 Billet Ring Gear Housing'
    ],
    
    // TWO Required Download Buttons
    buildFilesDownloadUrl: '/downloads/build-files/Planetary_10to1_CAD_STEP_Files.zip',
    buildFilesSize: '42.1 MB (CAD / STL / STEP Only)',
    
    fullRepoDownloadUrl: '/downloads/full-repos/Planetary_10to1_Complete_Repository.zip',
    fullRepoSize: '265.0 MB (Full Repo: FEA Analysis + Drawings + SolidWorks Models)',

    steps: [
      {
        stepNumber: 1,
        title: 'Gear Profile Metrology & Involute Verification',
        description: 'Inspect machined Delrin / POM planet gears under an optical toolmakers microscope. Verify pitch diameter within +0.000/-0.015mm to ensure zero-backlash meshing. Chamfer gear edge transitions with a ceramic deburring knife.',
        requiredTools: [
          'Toolmakers Optical Measuring Microscope',
          'Ceramic Micro-Deburring Blade',
          'Precision Pin Gauge Set (3.00mm - 4.50mm)'
        ],
        inspectionTip: 'Backlash target requires pitch diameter tolerance of +0.00 / -0.015mm.'
      },
      {
        stepNumber: 2,
        title: 'Needle Roller Bearing Cage Insertion & Lubrication',
        description: 'Press hardened needle roller cages into the core of each of the 3 planet gears using a gentle 3D-printed alignment guide. Apply synthetic PTFE-infused grease (Krytox GPL 205) evenly across all rolling elements.',
        requiredTools: [
          'Delrin Alignment Press Jig',
          'Syringe Dispenser with Krytox GPL 205 PTFE Grease',
          'Soft Brass Tweezers'
        ],
        inspectionTip: 'Roll each planet gear manually to verify silky rotation with zero radial play.'
      },
      {
        stepNumber: 3,
        title: 'Carrier Plate Dynamic Balancing & Pin Staking',
        description: 'Press hardened steel planet pins into dual-sided aluminum carrier plates. Verify carrier plates remain parallel within 0.02mm across diameter using a dial test indicator mounted to a magnetic base.',
        requiredTools: [
          'Mitutoyo Dial Test Indicator (0.001mm)',
          'Granite Precision Surface Plate',
          'Torque Screwdriver (0.4 - 2.0 Nm)'
        ],
        inspectionTip: 'Run dial indicator around carrier perimeter to confirm runout is under 0.020mm.'
      }
    ],

    billOfMaterials: [
      {
        itemNumber: 'BOM-GEAR-01',
        partName: 'Involute Sun Gear Pinion (Module 0.8, 16 Teeth)',
        specification: 'AISI 4140 Steel, quenched & tempered to 42 HRC, D-bore',
        quantity: 1,
        sourceOrVendor: 'SDP/SI / KHG Gears',
        unitCost: '$24.50',
        cadFileReference: '/cad/sun_gear_m08_16t.step',
        notes: 'D-shaft flat profile secured with M3 cup-point set screw'
      },
      {
        itemNumber: 'BOM-GEAR-02',
        partName: 'Planet Gears with Integral Bearing Seat (24 Teeth)',
        specification: 'Delrin / POM-C CNC machined, Module 0.8, 20° pressure angle',
        quantity: 3,
        sourceOrVendor: 'SendCutSend / Custom CNC',
        unitCost: '$16.00',
        cadFileReference: '/cad/planet_gear_m08_24t.step',
        notes: 'Internal bore accommodates 6mm needle roller cage'
      },
      {
        itemNumber: 'BOM-GEAR-03',
        partName: 'Flanged Annular Ring Gear (64 Teeth)',
        specification: '6061-T6 Aluminum with Hardcoat Anodize Type III (60 HRC equiv)',
        quantity: 1,
        sourceOrVendor: 'Wire EDM / Precision CNC Shop',
        unitCost: '$48.00',
        cadFileReference: '/cad/ring_gear_m08_64t.step',
        notes: 'Flanged exterior with 8x M3 bolt pattern on 74mm BCD'
      }
    ]
  },
  {
    id: 'guide-03-enclosure',
    title: 'IP67 CNC Billet Telemetry & Sensor Enclosure',
    version: 'v1.1.0',
    difficulty: 'Beginner',
    estimatedBuildTime: '2 - 3 Hours',
    overview: 'A rugged CNC milled aluminum enclosure featuring a continuous silicone O-ring gasket compression groove, waterproof M12 industrial circular connectors, and a Gore-Tex automotive pressure equalization vent membrane.',
    
    // 3D Model Configuration
    modelType: 'enclosure',
    modelCadFileName: 'sealed_telemetry_enclosure_chassis.step',
    modelPartCount: 9,
    materials: [
      'CNC Milled 6061-T6 Aluminum Billet',
      'Molded Nitrile / Silicone 1.5mm O-Ring Cord',
      'Gore Automotive Pressure Equalization Vent'
    ],
    
    // TWO Required Download Buttons
    buildFilesDownloadUrl: '/downloads/build-files/IP67_Enclosure_STEP_Drawings.zip',
    buildFilesSize: '18.2 MB (CAD / STL / STEP Only)',
    
    fullRepoDownloadUrl: '/downloads/full-repos/IP67_Enclosure_Full_Archive.zip',
    fullRepoSize: '145.3 MB (Full Repo: Toolpaths + STEP + Pressure Logs)',

    steps: [
      {
        stepNumber: 1,
        title: 'O-Ring Gasket Splicing & Groove Seating',
        description: 'Measure 1.5mm silicone O-ring cord around the perimeter gasket groove with 3% compression stretch. Cut at exact 90-degree angle and bond joint with cyanoacrylate. Seat into the dovetail groove without twisting.',
        requiredTools: [
          'Precision Miter Razor Cutter Guide',
          'Non-Marring Delrin Spline Spreader Tool',
          'Permabond Cyanoacrylate Adhesive'
        ],
        inspectionTip: 'Confirm cord protrudes 0.35mm above groove lip for positive compression seal.'
      },
      {
        stepNumber: 2,
        title: 'Bulkhead Connector Torquing & Vacuum Decay Seal Test',
        description: 'Thread M12 circular connectors into chamfered entry ports. Torque lock nuts to 3.0 Nm. Perform vacuum decay test using hand pump at -30 kPa for 5 minutes.',
        requiredTools: [
          '14mm Calibrated Dial Torque Wrench',
          'Mityvac Digital Vacuum Gauge Hand Pump',
          'Gore Vent 10mm Hex Socket'
        ],
        inspectionTip: 'Gauge pressure drop must not exceed 0.2 kPa over 300 seconds.'
      }
    ],

    billOfMaterials: [
      {
        itemNumber: 'BOM-ENC-01',
        partName: 'CNC Billet Lower Chassis Tub',
        specification: '6061-T6, bead blasted and Type II matte black anodized',
        quantity: 1,
        sourceOrVendor: 'JLCPCB CNC / Protolabs',
        unitCost: '$38.50',
        cadFileReference: '/cad/enclosure_chassis_tub.step',
        notes: 'Integrated PCB riser standoff bosses and heatsink post'
      },
      {
        itemNumber: 'BOM-ENC-02',
        partName: 'M12 8-Pin Industrial Waterproof Bulkhead Connector',
        specification: 'IP68 rated, A-coded, rear panel mount, gold-plated contacts',
        quantity: 2,
        sourceOrVendor: 'Binder / Phoenix Contact / Mouser',
        unitCost: '$11.20',
        cadFileReference: '/cad/m12_bulkhead.step',
        notes: 'Solder cup termination with adhesive heat shrink'
      }
    ]
  }
];
