const map = () => {
  const map = L.map('map').setView([50.44, , 30.51], 15.25);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        // const { latitude } = position.coords;
        // const { longitude } = position.coords;
        // console.log(position);
        // console.log(
        //   `https://www.google.com/maps/@50.441665,30.5149715,15.25z?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D`
        // );
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([50.44, , 30.51])
          .addTo(map)
          .bindPopup('A pretty CSS popup.<br> Easily customizable.')
          .openPopup();
      },
      () => {
        alert(`check your privacy settings`);
      }
    );
  }
};

export default map;
