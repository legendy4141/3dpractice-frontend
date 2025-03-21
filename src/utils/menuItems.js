import { ReactComponent as ElbowNwrist } from "../assets/sidebar/elbowNwrist.svg";
import { ReactComponent as AnkleNfoot } from "../assets/sidebar/ankleNfoot.svg";
import { ReactComponent as Jaw } from "../assets/sidebar/jaw.svg";
import { ReactComponent as Hip } from "../assets/sidebar/hip.svg";
import { ReactComponent as Knee } from "../assets/sidebar/knee.svg";
import { ReactComponent as Nervous } from "../assets/sidebar/nervous.svg";
import { ReactComponent as Phase } from "../assets/sidebar/phase.svg";
import { ReactComponent as Shoulder } from "../assets/sidebar/shoulder.svg";
import { ReactComponent as Spine } from "../assets/sidebar/spine.svg";
import { ReactComponent as Treatment } from "../assets/sidebar/treatment.svg";
import { ReactComponent as Video } from "../assets/sidebar/video.svg";
import { ReactComponent as Wallart } from "../assets/sidebar/wallart.svg";

export const menuItems = [
  { id: "dashboard", text: "Dashboard", route: "/" },
  { id: "spine", text: "Spine", icon: <Spine />, route: "/spine" },
  { id: "shoulder", text: "Shoulder", icon: <Shoulder />, route: "/shoulder" },
  { id: "knee", text: "Knee", icon: <Knee />, route: "/knee" },
  {
    id: "ankleNfoot",
    text: "Ankle & Foot",
    icon: <AnkleNfoot />,
    route: "/ankleNfoot",
  },
  {
    id: "elbowNwrist",
    text: "Elbow & Wrist",
    icon: <ElbowNwrist />,
    route: "/elbowNwrist",
  },
  { id: "hip", text: "Hip", icon: <Hip />, route: "/hip" },
  { id: "jaw", text: "Jaw", icon: <Jaw />, route: "/jaw" },
  {
    id: "nervous_system",
    text: "Nervous System",
    icon: <Nervous />,
    route: "/nervous_system",
  },
  {
    id: "treatments",
    text: "Treatments",
    icon: <Treatment />,
    route: "/treatments",
  },
  {
    id: "phase_of_care",
    text: "Phase of Care",
    icon: <Phase />,
    route: "/phase_of_care",
  },
  {
    id: "wall_art",
    text: "Wall Art",
    icon: <Wallart />,
    route: "/wallart/index.html",
  },
  { id: "videos", text: "Videos", icon: <Video />, route: "/videos" },
];
