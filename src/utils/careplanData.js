export const availableTreatmentData = [
  {
    id: "active-release-technique",
    title: "Active Release Technique",
    select: false,
  },
  { id: "class-iv-laser", title: "Class IV Laser", select: false },
  { id: "creams-ointments", title: "Creams / Ointments", select: false },
  { id: "cold-therapy", title: "Cold Therapy", select: false },
  {
    id: "decompression-therapy",
    title: "Decompression Therapy",
    select: false,
  },
  { id: "diathermy", title: "Diathermy", select: false },
  { id: "dry-needling", title: "Dry Needling", select: false },
  {
    id: "electric-muscle-stimulation",
    title: "Electric Muscles Stimulation",
    select: false,
  },
  {
    id: "electrical-nerve-stimulation",
    title: "Electrical Nerve Stimulation",
    select: false,
  },
  { id: "ergonomics", title: "Ergonomics", select: false },
  { id: "exercise", title: "Exercise", select: false },
  { id: "flexion-distraction", title: "Flexion Distraction", select: false },
  { id: "graston-technique", title: "Graston Technique", select: false },
  { id: "heat-cold", title: "Heat & Cold", select: false },
  { id: "heat-therapy", title: "Heat Therapy", select: false },
  { id: "hydrotherapy", title: "Hydrotherapy", select: false },
  {
    id: "hyaluronic-knee-injections",
    title: "Hyaluronic Knee Injections",
    select: false,
  },
  { id: "ice-and-heat-therapy", title: "Ice and Heat Therapy", select: false },
  { id: "infrared-therapy", title: "Infrared Therapy", select: false },
  {
    id: "intersegmental-traction",
    title: "Intersegmental Traction",
    select: false,
  },
  { id: "laser-therapy", title: "Laser Therapy", select: false },
  { id: "massage-therapy", title: "Massage Therapy", select: false },
  { id: "myofascial-release", title: "Myofascial Release", select: false },
  { id: "orthotics", title: "Orthotics", select: false },
  { id: "pelvic-stabilization", title: "Pelvic Stabilization", select: false },
  { id: "pemf-therapy", title: "PEMF Therapy", select: false },
  { id: "platelet-rich-plasma", title: "Platelet Rich Plasma", select: false },
  { id: "red-light-therapy", title: "Red Light Therapy", select: false },
  { id: "shockwave-therapy", title: "Shockwave Therapy", select: false },
  {
    id: "sigma-systems-ultralign",
    title: "Sigma Systems Ultralign",
    select: false,
  },
  { id: "spinal-adjustment", title: "Spinal Adjustment", select: false },
  {
    id: "spine-rehab-posture-correction",
    title: "Spine Rehab & Posture Correction",
    select: false,
  },
  { id: "steroid-injection", title: "Steroid Injection", select: false },
  { id: "supplements", title: "Supplements", select: false },
  { id: "supplies", title: "Supplies", select: false },
  {
    id: "trigger-point-injections",
    title: "Trigger Point Injections",
    select: false,
  },
  { id: "traction", title: "Traction", select: false },
  { id: "ultrasound", title: "Ultrasound", select: false },
  { id: "vibration-therapy", title: "Vibration Therapy", select: false },
];

export const careplanData = [
  {
    id: "ankle",
    title: "Ankle",
    subItems: [
      {
        id: "ankle-sprain",
        title: "Ankle Sprain",
        treatments: [...availableTreatmentData],
      },
    ],
  },
  {
    id: "cervical",
    title: "Cervical",
    subItems: [
      {
        id: "bulging-disc",
        title: "Bulging disc",
        treatments: [...availableTreatmentData],
      },
      {
        id: "cervical-radiculopathy",
        title: "Cervical radiculopathy",
        treatments: [...availableTreatmentData],
      },
      {
        id: "degenerated-disc",
        title: "Degenerated disc",
        treatments: [...availableTreatmentData],
      },
      {
        id: "facet-syndrome",
        title: "Facet Syndrome",
        treatments: [...availableTreatmentData],
      },
      {
        id: "forward-head-posture",
        title: "Forward Head Posture",
        treatments: [...availableTreatmentData],
      },
      {
        id: "herniated-disc",
        title: "Herniated disc",
        treatments: [...availableTreatmentData],
      },
      {
        id: "kyphosis",
        title: "Kyphosis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "lordosis",
        title: "Lordosis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "neck-pain",
        title: "Neck Pain",
        treatments: [...availableTreatmentData],
      },
      {
        id: "spondylolithesis",
        title: "Spondylolithesis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "stenosis",
        title: "Stenosis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "subluxation",
        title: "Subluxation",
        treatments: [...availableTreatmentData],
      },
    ],
  },
  {
    id: "elbow",
    title: "Elbow",
    subItems: [
      {
        id: "epicondylitis",
        title: "Epicondylitis",
        treatments: [...availableTreatmentData],
      },
    ],
  },
  {
    id: "foot",
    title: "Foot",
    subItems: [
      {
        id: "plantar-fasciitis",
        title: "Plantar Fasciitis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "pronation",
        title: "Pronation",
        treatments: [...availableTreatmentData],
      },
      {
        id: "supination",
        title: "Supination",
        treatments: [...availableTreatmentData],
      },
    ],
  },
  {
    id: "hip",
    title: "Hip",
    subItems: [
      {
        id: "piriformis-syndrome",
        title: "Piriformis Syndrome",
        treatments: [...availableTreatmentData],
      },
    ],
  },
  {
    id: "knee",
    title: "Knee",
    subItems: [
      {
        id: "acl-injury",
        title: "ACL Injury",
        treatments: [...availableTreatmentData],
      },
      {
        id: "mcl-injury",
        title: "MCL Injury",
        treatments: [...availableTreatmentData],
      },
      {
        id: "meniscus-tear",
        title: "Meniscus Tear",
        treatments: [...availableTreatmentData],
      },
      {
        id: "osteoarthritis",
        title: "Osteoarthritis",
        treatments: [...availableTreatmentData],
      },
    ],
  },
  {
    id: "lumbar",
    title: "Lumbar",
    subItems: [
      {
        id: "bulging-disc",
        title: "Bulging disc",
        treatments: [...availableTreatmentData],
      },
      {
        id: "cervical-radiculopathy",
        title: "Cervical radiculopathy",
        treatments: [...availableTreatmentData],
      },
      {
        id: "degenerated-disc",
        title: "Degenerated disc",
        treatments: [...availableTreatmentData],
      },
      {
        id: "facet-syndrome",
        title: "Facet Syndrome",
        treatments: [...availableTreatmentData],
      },
      {
        id: "forward-head-posture",
        title: "Forward Head Posture",
        treatments: [...availableTreatmentData],
      },
      {
        id: "herniated-disc",
        title: "Herniated disc",
        treatments: [...availableTreatmentData],
      },
      {
        id: "kyphosis",
        title: "Kyphosis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "lordosis",
        title: "Lordosis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "neck-pain",
        title: "Neck Pain",
        treatments: [...availableTreatmentData],
      },
      {
        id: "spondylolithesis",
        title: "Spondylolithesis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "stenosis",
        title: "Stenosis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "subluxation",
        title: "Subluxation",
        treatments: [...availableTreatmentData],
      },
    ],
  },
  {
    id: "pelvis",
    title: "Pelvis",
    subItems: [
      {
        id: "psoas-hip-flexor-tightness",
        title: "Psoas & Hip Flexor Tightness",
        treatments: [...availableTreatmentData],
      },
    ],
  },
  {
    id: "shoulder",
    title: "Shoulder",
    subItems: [
      {
        id: "adhesive-capsulitis",
        title: "Adhesive Capsulitis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "impingement",
        title: "Impingement",
        treatments: [...availableTreatmentData],
      },
      {
        id: "rotator-cuff-injury",
        title: "Rotator Cuff Injury",
        treatments: [...availableTreatmentData],
      },
    ],
  },
  {
    id: "thoracic",
    title: "Thoracic",
    subItems: [
      {
        id: "bulging-disc",
        title: "Bulging disc",
        treatments: [...availableTreatmentData],
      },
      {
        id: "degenerated-disc",
        title: "Degenerated disc",
        treatments: [...availableTreatmentData],
      },
      {
        id: "facet-syndrome",
        title: "Facet Syndrome",
        treatments: [...availableTreatmentData],
      },
      {
        id: "herniated-disc",
        title: "Herniated disc",
        treatments: [...availableTreatmentData],
      },
      {
        id: "kyphosis",
        title: "Kyphosis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "lordosis",
        title: "Lordosis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "scoliosis",
        title: "Scoliosis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "spondylolithesis",
        title: "Spondylolithesis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "stenosis",
        title: "Stenosis",
        treatments: [...availableTreatmentData],
      },
      {
        id: "subluxation",
        title: "Subluxation",
        treatments: [...availableTreatmentData],
      },
      {
        id: "thoracic-pain",
        title: "Thoracic Pain",
        treatments: [...availableTreatmentData],
      },
    ],
  },
  {
    id: "wrist",
    title: "Wrist",
    subItems: [
      {
        id: "carpal-tunnel",
        title: "Carpal Tunnel",
        treatments: [...availableTreatmentData],
      },
    ],
  },
];
