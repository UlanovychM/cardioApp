import { navigationMap } from '../constants/constants';

const maps = () => {
  if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     const { latitude } = position.coords;
    //     const { longitude } = position.coords;
    //     console.log(position);
    //     console.log(
    //       `https://www.google.com/maps/@50.441665,30.5149715,15.25z?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D`
    //     );
    //   },
    //   () => {
    //     alert(`check your privacy settings`);
    //   }
  }
  navigator.geolocation.getCurrentPosition(
    () => {
      navigationMap();
    },
    () => {
      alert(`check your privacy settings`);
    }
  );
};

export default maps;
