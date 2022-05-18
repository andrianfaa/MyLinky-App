import { Notyf as Notification } from "notyf";

const Notyf = new Notification({
  duration: 3000,
  position: {
    x: "right",
    y: "top",
  },
});

export default Notyf;
