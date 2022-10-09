export const getUserCoordinates = (setLat, setLong) => {
    const geolocationAPI = navigator.geolocation;

    if (!geolocationAPI) {
        console.log("no location service :(")
        setLat(null);
        setLong(null);

    } else {
        geolocationAPI.getCurrentPosition((position) => {
        const { coords } = position;
        setLat(coords.latitude);
        setLong(coords.longitude);

        }, (error) => {
        // console.log("some geolocation error")
        // console.log(error)
        setLat(null);
        setLong(null);
        })
    }
}



export const haversineDistance = (coords1, coords2) => {
    const R = 6371; // km
    function toRad(x) { return x * Math.PI / 180; }

    let lon1 = coords1[0];
    let lat1 = coords1[1];

    let lon2 = coords2[0];
    let lat2 = coords2[1];

    let dLat = toRad(lat2 - lat1);
    let dLon = toRad(lon2 - lon1);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

}



export const getProximity = (lat, long, request) =>{

    const distanceRound = (dist) => {
      if (dist > 1) {
        // If More than 1km, return in km
        return Math.ceil(dist).toString() + "km";
      } else {
        // If less than 1km, return in m
        return Math.ceil(dist * 1000).toString() + "m";
      }
    }

    if (lat === null || long === null) {
      return ""
    }

    let num;

    if (request.request_type === "transport") {
      num = haversineDistance([long, lat], [request.location.from.lng, request.location.from.lat])
      let to = haversineDistance([long, lat], [request.location.to.lng, request.location.to.lat])

      return [ distanceRound(num), distanceRound(to) ]

    }

    num = haversineDistance([long, lat], [request.location.lng, request.location.lat])
    return [ distanceRound(num) ]
  }