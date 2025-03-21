import { ReactComponent as Pencil } from "../assets/actionbar/pencil.svg";
import { ReactComponent as Erase } from "../assets/actionbar/erase.svg";
import { ReactComponent as Exercise } from "../assets/actionbar/exercise_black.svg";
import { ReactComponent as Care } from "../assets/actionbar/care_black.svg";
import { ReactComponent as User } from "../assets/actionbar/user_black.svg";
import { ReactComponent as Share } from "../assets/actionbar/share.svg";

export const actionItems = [
  { icon: <Pencil />, text: "Draw", tool: "draw" },
  { icon: <Erase />, text: "Erase", tool: "erase" },
  { icon: <Exercise />, text: "Exercise", tool: "exercise" },
  { icon: <Care />, text: "Care", tool: "care" },
  { icon: <User />, text: "User", tool: "user" },
  { icon: <Share />, text: "Share", tool: "share" },
];
