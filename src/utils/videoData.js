import DiscAilments from "../assets/thumbnail/disc_ailments.png";
import FacetSyndrome from "../assets/thumbnail/facet_syndrome.png";
import ForwardHeadPosture from "../assets/thumbnail/forward_head_posture.png";
import LigamentInjury from "../assets/thumbnail/ligament_injury.png";
import Posture from "../assets/thumbnail/posture.png";
import Sciatica from "../assets/thumbnail/sciatica.png";
import Scoliosis from "../assets/thumbnail/scoliosis.png";
import SIJoint from "../assets/thumbnail/si_joint.png";
import SpinalDegeneration from "../assets/thumbnail/spinal_degeneration.png";
import Spondylolisthesis from "../assets/thumbnail/spondylolisthesis.png";
import Stenosis from "../assets/thumbnail/disc_ailments.png";
import Subluxation from "../assets/thumbnail/subluxation.png";
import TextNeckAndDesk from "../assets/thumbnail/text_neck_and_desk.png";
import Whiplash from "../assets/thumbnail/whiplash.png";
import ROM from "../assets/thumbnail/rom.png";
import InteractiveFullSpine from "../assets/thumbnail/interactive_full_spine.png";
import InteractiveCervicalSpine from "../assets/thumbnail/interactive_cervical_spine.png";

//Nervous System
import Dermatomes from "../assets/thumbnail/dermatomes.png";
import Peripheral from "../assets/thumbnail/peripheral.png";
import Myotomes from "../assets/thumbnail/myotomes.png";
import Autonomic from "../assets/thumbnail/autonomic.png";

export const spineVideoData = [
  {
    title: "Disc Ailments",
    image: DiscAilments,
    subItems: ["Left Lateral", "Right Lateral", "Posterior Lateral", "Central"],
    routing: "/video/disc-ailments",
  },
  {
    title: "Facet Syndrome",
    image: FacetSyndrome,
    subItems: ["Lumbar", "Cervical", "Lateral Lumbar"],
    routing: "/video/facet-syndrome",
  },
  {
    title: "Forward Head Posture",
    image: ForwardHeadPosture,
    subItems: ["Cervical Spine", "Full Spine"],
    routing: "/video/forward-head-posture",
  },
  {
    title: "Ligament Injury",
    image: LigamentInjury,
    subItems: [
      "Ligament Laxity Flexion",
      "Ligament Laxity Extension",
      "Ligament Laxity Side",
    ],
    routing: "/video/ligament-injury",
  },
  {
    title: "Posture",
    image: Posture,
    subItems: [
      "Kyphosis Side",
      "Kyphosis Posterior",
      "Lordosis Side",
      "Lordosis Posterior",
      "Pelvic Tilt",
    ],
    routing: "/video/posture",
  },
  {
    title: "Sciatica",
    image: Sciatica,
    subItems: ["Piriformis", "Degeneration"],
    routing: "/video/sciatica",
  },
  {
    title: "Scoliosis",
    image: Scoliosis,
    subItems: ["Scoliosis"],
    routing: "/video/scoliosis",
  },
  {
    title: "SI Joint",
    image: SIJoint,
    subItems: ["SI Joint"],
    routing: "/video/si-joint",
  },
  {
    title: "Spinal Degeneration",
    image: SpinalDegeneration,
    subItems: ["Cervical", "Lumbar"],
    routing: "/video/spinal-degeneration",
  },
  {
    title: "Spondylolisthesis",
    image: Spondylolisthesis,
    subItems: ["Spondylolisthesis", "Retrolisthesis"],
    routing: "/video/spondylolisthesis",
  },
  {
    title: "Stenosis",
    image: Stenosis,
    subItems: ["Foraminal", "Ligamentous Hypertrophy", "Axial - Lateral View"],
    routing: "/video/stenosis",
  },
  {
    title: "Subluxation",
    image: Subluxation,
    subItems: [
      "Cervical Lateral",
      "Cervical Rotation",
      "Cervical Posterolateral",
      "Lumbar Lateral",
      "Lumbar Rotation",
    ],
    routing: "/video/subluxation",
  },
  {
    title: "Text Neck and Desk",
    image: TextNeckAndDesk,
    subItems: ["Text Neck", "Desk"],
    routing: "/video/text-neck-and-desk",
  },
  {
    title: "Whiplash",
    image: Whiplash,
    subItems: ["Ligaments", "Muscles", "Mechanics", "Interactive Whiplash"],
    routing: "/video/whiplash",
  },
  {
    title: "ROM",
    image: ROM,
    subItems: [
      "Normal",
      "Suboccipital muscles",
      "Obliquus Capitis Injury",
      "Rectus Capitis Injury",
      "Degeneration",
    ],
    routing: "/video/rom",
  },
  {
    title: "Interactive Full Spine",
    image: InteractiveFullSpine,
    subItems: [],
    routing: "/video/interactive-full-spine",
  },
  {
    title: "Interactive Cervical Spine",
    image: InteractiveCervicalSpine,
    subItems: [],
    routing: "/video/interactive-cervical-spine",
  },
];

export const shoulderVideoData = [
  {
    title: "shoulder",
    image: "shoulder", //modify
    subItems: [
      "Rotator Cuff Injury",
      "AC Joint Injuries",
      "Adhesive Capsulitis",
      "Impingement",
      "Interactive Rotator Cuff Injury",
    ],
    routing: "/video/shoulder",
  },
];

export const kneeVideoData = [
  {
    title: "knee",
    image: "knee", //modify
    subItems: [
      "Meniscus Injury",
      "ACL Injury",
      "MCL Injury",
      "Knee Degeneration",
      "PatellarTendon Injury",
      "Interactive Knee Degeneration",
    ],
    routing: "/video/knee",
  },
];

export const ankleNfootVideoData = [
  {
    title: "Ankle & Foot",
    image: "ankleNfoot", //modify
    subItems: [
      "Pronation",
      "Pronation Chain Reaction",
      "Plantar Fasciitis",
      "Ankle",
      "Supination",
    ],
    routing: "/video/ankleNfoot",
  },
];

export const elbowNwristVideoData = [
  {
    title: "Elbow & Wrist",
    image: "elbowNwrist", //modifyxc
    subItems: [
      "Carpal Tunnel Syndrome Axial View",
      "Capral Tunnel Syndrome Lateral",
      "Tennis Elbow",
      "Golfers Elbow",
    ],
    routing: "/video/elbowNwrist",
  },
];

export const hipVideoData = [
  {
    title: "Hip",
    image: "hip", //modify
    subItems: ["Hip"],
    routing: "/video/hip",
  },
];

export const jawVideoData = [
  {
    title: "Jaw",
    image: "jaw", //modify
    subItems: ["Jaw"],
    routing: "/video/jaw",
  },
];

export const nervousSystemVideoData = [
  {
    title: "Dermatomes",
    image: Dermatomes,
    subItems: [
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "C7",
      "C8",
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
      "L1",
      "L2",
      "L3",
      "L4",
      "L5",
      "S1",
      "S2",
    ],
    routing: "/video/dermatomes",
  },
  {
    title: "Peripheral",
    image: Peripheral,
    subItems: [
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "C7",
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
      "L1",
      "L2",
      "L3",
      "L4",
      "L5",
      "S",
    ],
    routing: "/video/peripheral",
  },
  {
    title: "Myotomes",
    image: Myotomes,
    subItems: [
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "C7",
      "T1",
      "T2,3,4",
      "T5,6",
      "T7,8",
      "T9,10,11",
      "T12",
      "L1",
      "L2",
      "L3",
      "L4",
      "L5",
      "S1",
      "S2",
      "S3",
    ],
    routing: "/video/myotomes",
  },
  {
    title: "Autonomic",
    image: Autonomic,
    subItems: [
      "C1",
      "C2",
      "C3",
      "C4,5",
      "C6,7",
      "T1,2",
      "T3,4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11,12",
      "L1",
      "L2,3",
      "L4",
      "L5,S",
    ],
    routing: "/video/autonomic",
  },
];

export const treatmentsVideoData = [
  {
    title: "Adjustment",
    image: "adjustmnet", //modify
    subItems: [
      "Spinal Adjustment",
      "Upper Cervical",
      "Mid Cervical",
      "Joint Fixation",
    ],
    routing: "/video/adjustment",
  },
  {
    title: "Corrective",
    image: "corrective", //modify
    subItems: ["Denneroll", "Pro - Lordotic Exerciser"],
    routing: "/video/corrective",
  },
  {
    title: "Decompression",
    image: "decompression", //modify
    subItems: [
      "Decompression Lumbar",
      "Decompression Cervical",
      "Decompression Axial - Lateral View",
      "Distraction",
      "Back On Trac",
      "Knee On Trac",
    ],
    routing: "/video/decompression",
  },
  {
    title: "Laser",
    image: "laser", //modify
    subItems: [
      "Laser - Plantar Fasciitis",
      "Laser - Peripheral Neuropathy",
      "Class IV Laser",
    ],
    routing: "/video/laser",
  },
  {
    title: "Shockwave",
    image: "shockwave", //modify
    subItems: [
      "Radial Shockwave",
      "Focused Shockwave - Foot",
      "Focused Shockwave - Patellar Tendon",
    ],
    routing: "/video/shockwave",
  },
];

export const phaseOfCareVideoData = [
  {
    title: "Phase of Care",
    image: "phaseofcare", //modifyxc
    subItems: ["Good Compliance", "Bad Compliance", "Phases of Repair"],
    routing: "/video/phase_of_care",
  },
];
